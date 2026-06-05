import React from 'react';

const Footer = ({ onOpenGallery }) => {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>SGL Hospital</h3>
            <p>Dr. B. Sandeep Hospital — Eluru<br/>Advanced Laparoscopic, Laser &amp; General Surgical Centre serving Coastal Andhra since inception. Committed to precision, care &amp; compassion.</p>
            <div className="footer-emergency"><span>🚨</span><span>Emergency 24×7 · అత్యవసర కేసులు</span></div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Gastro / Lap Surgery</a></li>
              <li><a href="#services">Laser Surgeries</a></li>
              <li><a href="#services">General Surgery</a></li>
              <li><a href="#services">Diabetes Care</a></li>
              <li><a href="#services">Emergency Cases</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Hospital</a></li>
              <li><a href="#appointment">Book Appointment</a></li>
              <li><a href="#reviews">Patient Reviews</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenGallery(); }}>Hospital Gallery</a></li>
              <li><a href="#map">Location / Map</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:08812252566">📞 08812 252566</a></li>
              <li><a href="tel:9989799521">📱 99897 99521</a></li>
              <li><a href="tel:9502591688">📱 95025 91688</a></li>
              <li><a href="#map">📍 View on Map</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 SGL Hospital – Dr. B. Sandeep Hospital, Eluru. All rights reserved.</p>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '1.5rem' }}>
            <p style={{ marginBottom: '4px' }}>Developed by <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Sandeep Technologies Pvt Ltd.</strong></p>
            <p style={{ marginBottom: '4px' }}>Developer: Dukkipati Sandeep &nbsp;|&nbsp; Phone: <a href="tel:+919573934919" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>+91 9573934919</a></p>
            <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>Contact us for website-related queries & creations.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
