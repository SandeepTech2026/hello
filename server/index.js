require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// Google Sheets Setup
// ---------------------------------------------------------
// Environment variables required:
// GOOGLE_SERVICE_ACCOUNT_EMAIL
// GOOGLE_PRIVATE_KEY
// SPREADSHEET_ID

let doc = null;

const initializeGoogleSheets = async () => {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.SPREADSHEET_ID) {
      console.warn('⚠️ Google Sheets credentials are not fully set in environment variables.');
      return;
    }

    // Format the private key properly (replace literal \n with actual newlines)
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo(); 
    console.log(`✅ Connected to Google Sheet: ${doc.title}`);

    // Ensure headers exist on the first sheet
    const sheet = doc.sheetsByIndex[0];
    try {
      await sheet.loadHeaderRow();
    } catch (e) {
      // If it fails, the sheet might be empty. Let's set headers.
      await sheet.setHeaderRow([
        'Time Booked', 'Full Name', 'Phone', 'Age', 'Gender', 'Pref. Date', 'Department', 'Message'
      ]);
    }
  } catch (error) {
    console.error('❌ Error initializing Google Sheets:', error);
  }
};

initializeGoogleSheets();

// ---------------------------------------------------------
// Endpoint: Save Appointment
// ---------------------------------------------------------
app.post('/api/appointments', async (req, res) => {
  try {
    const { f_name, f_phone, f_age, f_gender, f_date, f_dept, f_msg } = req.body;
    
    if (!f_name || !f_phone || !f_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!doc) {
      return res.status(500).json({ error: 'Google Sheets integration is not configured yet.' });
    }

    const sheet = doc.sheetsByIndex[0];
    
    // Append row
    await sheet.addRow({
      'Time Booked': new Date().toLocaleString(),
      'Full Name': f_name,
      'Phone': f_phone,
      'Age': f_age || '',
      'Gender': f_gender || '',
      'Pref. Date': f_date,
      'Department': f_dept || '',
      'Message': f_msg || ''
    });

    res.status(201).json({ message: 'Appointment saved successfully to Google Sheets' });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ---------------------------------------------------------
// Endpoint: Get all Appointments (Admin)
// ---------------------------------------------------------
app.get('/api/appointments', async (req, res) => {
  try {
    if (!doc) {
      return res.status(500).json({ error: 'Google Sheets integration is not configured yet.' });
    }

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    // Map rows to JSON
    const data = rows.map(row => ({
      timestamp: row.get('Time Booked') || '',
      name: row.get('Full Name') || '',
      phone: row.get('Phone') || '',
      age: row.get('Age') || '',
      gender: row.get('Gender') || '',
      prefDate: row.get('Pref. Date') || '',
      dept: row.get('Department') || '',
      msg: row.get('Message') || ''
    }));

    // Reverse to show newest first
    res.json(data.reverse());
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ---------------------------------------------------------
// Serve Frontend (Production)
// ---------------------------------------------------------
const clientDistPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  
  // Handle client-side routing, return all requests to React app
  app.use((req, res, next) => {
    // Exclude API routes
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    } else {
      next();
    }
  });
}

// ---------------------------------------------------------
// Start Server
// ---------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
