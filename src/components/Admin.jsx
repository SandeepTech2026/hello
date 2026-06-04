import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // In a real application, this should be validated on the backend via session/token
  // For this simple implementation, we check a hardcoded password on the frontend
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      fetchAppointments();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/appointments');
      if (!res.ok) throw new Error('Failed to fetch appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error(err);
      setError('Could not load appointments. Are the Google Sheets credentials configured?');
    } finally {
      setLoading(false);
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
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)' }}>SGL Appointments</h2>
        <div>
          <button onClick={() => fetchAppointments()} style={{...styles.backBtn, marginRight: '10px'}}>↻ Refresh</button>
          <button onClick={() => window.location.href = '/'} style={styles.backBtn}>← Back to Website</button>
        </div>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading appointments from Google Sheets...</div>
      ) : (
        <div style={styles.tableContainer}>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
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
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No appointments found.</td>
                  </tr>
                ) : (
                  appointments.map((row, i) => (
                    <tr key={i} style={styles.tr}>
                      <td style={styles.td}>{row.timestamp}</td>
                      <td style={styles.td}><strong>{row.name}</strong></td>
                      <td style={styles.td}>{row.phone}</td>
                      <td style={styles.td}>{row.age} {row.gender}</td>
                      <td style={styles.td}>{row.prefDate}</td>
                      <td style={styles.td}>{row.dept}</td>
                      <td style={styles.td}>{row.msg}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
    maxWidth: '1200px',
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
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    padding: '2rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
  },
  th: {
    textAlign: 'left',
    padding: '1rem',
    borderBottom: '2px solid #e2e8f0',
    color: 'var(--gray-text)',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  tr: {
    borderBottom: '1px solid #f1f5f9',
  },
  td: {
    padding: '1rem',
    color: 'var(--navy)',
  },
  error: {
    maxWidth: '1200px',
    margin: '0 auto 1rem',
    background: '#fee2e2',
    color: '#991b1b',
    padding: '1rem',
    borderRadius: '8px',
  }
};

export default Admin;
