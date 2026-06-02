const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ---------------------------------------------------------
// Helper: Get today's filename (e.g. appointments_2023-10-25.xlsx)
// ---------------------------------------------------------
const getTodayFilename = () => {
  const date = new Date();
  const dateString = date.toISOString().split('T')[0];
  return `appointments_${dateString}.xlsx`;
};

// ---------------------------------------------------------
// Endpoint: Save Appointment
// ---------------------------------------------------------
app.post('/api/appointments', async (req, res) => {
  try {
    const { f_name, f_phone, f_age, f_gender, f_date, f_dept, f_msg } = req.body;
    
    if (!f_name || !f_phone || !f_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const filename = getTodayFilename();
    const filePath = path.join(DATA_DIR, filename);
    const workbook = new ExcelJS.Workbook();
    let worksheet;

    if (fs.existsSync(filePath)) {
      await workbook.xlsx.readFile(filePath);
      worksheet = workbook.getWorksheet(1);
    } else {
      worksheet = workbook.addWorksheet('Appointments');
    }

    // Always ensure columns are defined so keys map correctly when adding rows
    worksheet.columns = [
      { header: 'Time Booked', key: 'timestamp', width: 20 },
      { header: 'Full Name', key: 'name', width: 25 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Age', key: 'age', width: 10 },
      { header: 'Gender', key: 'gender', width: 15 },
      { header: 'Pref. Date', key: 'prefDate', width: 15 },
      { header: 'Department', key: 'dept', width: 35 },
      { header: 'Message', key: 'msg', width: 50 }
    ];

    // Append row
    worksheet.addRow({
      timestamp: new Date().toLocaleString(),
      name: f_name,
      phone: f_phone,
      age: f_age || '',
      gender: f_gender || '',
      prefDate: f_date,
      dept: f_dept || '',
      msg: f_msg || ''
    });

    await workbook.xlsx.writeFile(filePath);
    res.status(201).json({ message: 'Appointment saved successfully' });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ---------------------------------------------------------
// Endpoint: List Excel Sheets (Admin)
// ---------------------------------------------------------
app.get('/api/sheets', (req, res) => {
  try {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.xlsx'));
    
    const fileData = files.map(filename => {
      const filePath = path.join(DATA_DIR, filename);
      const stats = fs.statSync(filePath);
      return {
        filename,
        createdAt: stats.birthtime,
        size: stats.size
      };
    });
    
    // Sort newest first
    fileData.sort((a, b) => b.createdAt - a.createdAt);
    
    res.json(fileData);
  } catch (error) {
    console.error('Error reading sheets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ---------------------------------------------------------
// Endpoint: View Excel Sheet Content (Admin)
// ---------------------------------------------------------
app.get('/api/sheets/:filename/view', async (req, res) => {
  try {
    const { filename } = req.params;
    
    if (filename.includes('..') || !filename.endsWith('.xlsx')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }

    const filePath = path.join(DATA_DIR, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Sheet not found' });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    
    const rows = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row
      rows.push({
        timestamp: row.getCell(1).value?.toString() || '',
        name: row.getCell(2).value?.toString() || '',
        phone: row.getCell(3).value?.toString() || '',
        age: row.getCell(4).value?.toString() || '',
        gender: row.getCell(5).value?.toString() || '',
        prefDate: row.getCell(6).value?.toString() || '',
        dept: row.getCell(7).value?.toString() || '',
        msg: row.getCell(8).value?.toString() || ''
      });
    });

    res.json(rows);
  } catch (error) {
    console.error('Error viewing sheet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ---------------------------------------------------------
// Endpoint: Download Excel Sheet (Admin)
// ---------------------------------------------------------
app.get('/api/sheets/:filename/download', (req, res) => {
  try {
    const { filename } = req.params;
    
    if (filename.includes('..') || !filename.endsWith('.xlsx')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }

    const filePath = path.join(DATA_DIR, filename);
    
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).json({ error: 'Sheet not found' });
    }
  } catch (error) {
    console.error('Error downloading sheet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ---------------------------------------------------------
// Endpoint: Delete Excel Sheet (Admin)
// ---------------------------------------------------------
app.delete('/api/sheets/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    
    // Basic security check to prevent directory traversal
    if (filename.includes('..') || !filename.endsWith('.xlsx')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }

    const filePath = path.join(DATA_DIR, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({ message: 'Sheet deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Sheet not found' });
    }
  } catch (error) {
    console.error('Error deleting sheet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ---------------------------------------------------------
// Cron Job: Auto-delete sheets older than 30 days
// Runs every day at midnight (00:00)
// ---------------------------------------------------------
cron.schedule('0 0 * * *', () => {
  console.log('Running daily cron job to clean up old Excel sheets...');
  try {
    const files = fs.readdirSync(DATA_DIR);
    const now = Date.now();
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

    let deletedCount = 0;
    files.forEach(file => {
      if (file.endsWith('.xlsx')) {
        const filePath = path.join(DATA_DIR, file);
        const stats = fs.statSync(filePath);
        const fileAge = now - stats.birthtimeMs; // Use creation time

        if (fileAge > thirtyDaysInMs) {
          fs.unlinkSync(filePath);
          console.log(`Deleted old sheet: ${file}`);
          deletedCount++;
        }
      }
    });
    console.log(`Cleanup complete. Deleted ${deletedCount} files.`);
  } catch (err) {
    console.error('Error running cron job:', err);
  }
});

// ---------------------------------------------------------
// Start Server
// ---------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
