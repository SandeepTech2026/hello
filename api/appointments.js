import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

let doc = null;

const initializeGoogleSheets = async () => {
  if (doc) return doc; // Return existing instance if already initialized

  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.SPREADSHEET_ID) {
    throw new Error('Google Sheets credentials are not fully set in environment variables.');
  }

  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo(); 
  
  const sheet = doc.sheetsByIndex[0];
  try {
    await sheet.loadHeaderRow();
  } catch (e) {
    await sheet.setHeaderRow([
      'Time Booked', 'Full Name', 'Phone', 'Age', 'Gender', 'Pref. Date', 'Department', 'Message'
    ]);
  }
  
  return doc;
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const document = await initializeGoogleSheets();
      const sheet = document.sheetsByIndex[0];
      const rows = await sheet.getRows();

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

      return res.status(200).json(data.reverse());
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { f_name, f_phone, f_age, f_gender, f_date, f_dept, f_msg } = req.body;
      
      if (!f_name || !f_phone || !f_date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const document = await initializeGoogleSheets();
      const sheet = document.sheetsByIndex[0];
      
      await sheet.addRow({
        'Time Booked': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        'Full Name': f_name,
        'Phone': f_phone,
        'Age': f_age || '',
        'Gender': f_gender || '',
        'Pref. Date': f_date,
        'Department': f_dept || '',
        'Message': f_msg || ''
      });

      return res.status(201).json({ message: 'Appointment saved successfully to Google Sheets' });
    } catch (error) {
      console.error('Error saving appointment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
