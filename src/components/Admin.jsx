import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewingSheet, setViewingSheet] = useState(null);
  const [sheetData, setSheetData] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  // In a real application, this should be validated on the backend via session/token
  // For this simple implementation, we check a hardcoded password on the frontend
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      fetchSheets();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchSheets = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3001/api/sheets');
      if (!res.ok) throw new Error('Failed to fetch sheets');
      const data = await res.json();
      setSheets(data);
    } catch (err) {
      console.error(err);
      setError('Could not load Excel sheets. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (filename) => {
    window.open(`http://localhost:3001/api/sheets/${filename}/download`, '_blank');
  };

  const handleView = async (filename) => {
    setViewingSheet(filename);
    setSheetData(null);
    setViewLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/sheets/${filename}/view`);
      if (!res.ok) throw new Error('Failed to fetch sheet data');
      const data = await res.json();
      setSheetData(data);
    } catch (err) {
      console.error(err);
      alert('Error fetching sheet data');
      setViewingSheet(null);
    } finally {
      setViewLoading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm(`Are you sure you want to delete ${filename}? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/sheets/${filename}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete sheet');
      
      // Remove from UI
      setSheets(sheets.filter(s => s.filename !== filename));
    } catch (err) {
      console.error(err);
      alert('Error deleting sheet');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
          <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: 'var(--navy)' }}>Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.btn}>Login</button>
          </form>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--gray-text)' }}>Hint: The password is admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.adminContainer}>
      <div style={styles.header}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>Appointments</h2>
        <button onClick={() => window.location.href = '/'} style={styles.backBtn}>← Back to Website</button>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      
      {loading ? (
        <p>Loading sheets...</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>File</th>
                <th style={{ ...styles.th, whiteSpace: 'nowrap' }}>Created At</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sheets.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No Excel sheets found.</td>
                </tr>
              ) : (
                sheets.map((sheet, idx) => (
                  <tr key={idx} style={styles.tr}>
                    <td style={styles.td}><strong>{sheet.filename}</strong></td>
                    <td style={{ ...styles.td, whiteSpace: 'nowrap' }}>{new Date(sheet.createdAt).toLocaleString()}</td>
                    <td style={{ ...styles.td, display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleView(sheet.filename)}
                        style={styles.btnOutline}
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleDownload(sheet.filename)}
                        style={styles.btnOutline}
                      >
                        Download
                      </button>
                      <button 
                        onClick={() => handleDelete(sheet.filename)}
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--gray-text)' }}>
            Note: Sheets are automatically deleted after 30 days.
          </p>
        </div>
      )}

      {/* View Modal */}
      {viewingSheet && (
        <div style={styles.modalOverlay} onClick={() => setViewingSheet(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: 'var(--navy)' }}>Viewing: {viewingSheet}</h3>
              <button onClick={() => setViewingSheet(null)} style={styles.closeModalBtn}>×</button>
            </div>
            {viewLoading ? (
              <p>Loading data...</p>
            ) : sheetData && sheetData.length > 0 ? (
              <div style={{ overflowX: 'auto', maxHeight: '60vh' }}>
                <table style={{...styles.table, fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Time Booked</th>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Phone</th>
                      <th style={styles.th}>Age/Gen</th>
                      <th style={styles.th}>Pref. Date</th>
                      <th style={styles.th}>Department</th>
                      <th style={styles.th}>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sheetData.map((row, i) => (
                      <tr key={i} style={styles.tr}>
                        <td style={styles.td}>{row.timestamp}</td>
                        <td style={styles.td}><strong>{row.name}</strong></td>
                        <td style={styles.td}>{row.phone}</td>
                        <td style={styles.td}>{row.age} {row.gender}</td>
                        <td style={styles.td}>{row.prefDate}</td>
                        <td style={styles.td}>{row.dept}</td>
                        <td style={styles.td}>{row.msg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No appointments found in this sheet.</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

const styles = {
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--cream)',
    fontFamily: 'var(--font-sans)',
  },
  loginBox: {
    background: 'white',
    padding: '3rem',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1.5px solid #e2e8f0',
    marginBottom: '1rem',
    outline: 'none',
  },
  btn: {
    width: '100%',
    background: 'var(--teal)',
    color: 'white',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  adminContainer: {
    minHeight: '100vh',
    padding: '3rem 2rem',
    background: 'var(--gray-soft)',
    fontFamily: 'var(--font-sans)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '900px',
    margin: '0 auto 2rem',
  },
  backBtn: {
    background: 'transparent',
    border: '1px solid var(--navy)',
    color: 'var(--navy)',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  tableContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    padding: '2rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '1rem',
    borderBottom: '2px solid #e2e8f0',
    color: 'var(--gray-text)',
    fontWeight: '600',
  },
  tr: {
    borderBottom: '1px solid #f1f5f9',
  },
  td: {
    padding: '1rem',
    color: 'var(--navy)',
  },
  btnOutline: {
    background: 'transparent',
    color: 'var(--teal)',
    border: '1px solid var(--teal)',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  deleteBtn: {
    background: 'var(--red-urgent)',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  error: {
    maxWidth: '900px',
    margin: '0 auto 1rem',
    background: '#fee2e2',
    color: '#991b1b',
    padding: '1rem',
    borderRadius: '8px',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modalContent: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    width: '95%',
    maxWidth: '1200px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  closeModalBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: 'var(--gray-text)',
  }
};

export default Admin;
