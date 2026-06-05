import React, { useState } from 'react';
import logo from '../assets/logo.png';

const Navbar = ({ onOpenGallery }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={isMobileMenuOpen ? 'nav-mobile-open' : ''}>
      <div className="nav-brand">
        <div className="nav-logo">
          <img src={logo} alt="SGL Hospital Logo" />
        </div>
        <div className="nav-title">
          <span>SGL Hospital</span>
          <span>Dr. B. Sandeep · General &amp; Laparoscopic Surgery</span>
        </div>
      </div>
      
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#services" onClick={closeMenu}>Services</a></li>
          <li><a href="#reviews" onClick={closeMenu}>Reviews</a></li>
          <li><a href="#map" onClick={closeMenu}>Location</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenGallery(); closeMenu(); }}>Gallery</a></li>
        </ul>
        <div className="nav-ctas">
          <button 
            className="nav-cta" 
            onClick={() => {
              document.getElementById('appointment')?.scrollIntoView({behavior:'smooth'});
              closeMenu();
            }}
          >
            Book OP
          </button>
          <button 
            className="nav-cta admin-cta" 
            onClick={() => window.location.href = '/admin'}
          >
            🔒 Admin Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
