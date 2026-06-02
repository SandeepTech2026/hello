import React from 'react';
import logo from '../assets/logo.png';

const Navbar = ({ onOpenGallery }) => {
  return (
    <nav>
      <div className="nav-brand">
        <div className="nav-logo">
          <img src={logo} alt="SGL Hospital Logo" />
        </div>
        <div className="nav-title">
          <span>SGL Hospital</span>
          <span>Dr. B. Sandeep · General &amp; Laparoscopic Surgery</span>
        </div>
      </div>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#reviews">Reviews</a></li>
        <li><a href="#map">Location</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenGallery(); }}>Gallery</a></li>
      </ul>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          className="nav-cta" 
          onClick={() => document.getElementById('appointment')?.scrollIntoView({behavior:'smooth'})}
        >
          Book OP
        </button>
        <button 
          className="nav-cta" 
          onClick={() => window.location.href = '/admin'}
        >
          🔒 Admin Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
