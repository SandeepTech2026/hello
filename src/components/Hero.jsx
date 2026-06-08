import React from 'react';
import headerVideo from '../assets/header video.mp4';

const Hero = () => {
  return (
    <section className="hero">
      <video className="hero-video-bg" autoPlay loop muted playsInline>
        <source src={headerVideo} type="video/mp4" />
      </video>
      <div className="hero-bg-pattern"></div>
      <div className="hero-circle-1"></div>
      <div className="hero-circle-2"></div>
      <div className="hero-content">
        <div>
          <div className="hero-badge">
            <div className="pulse-dot"></div><span>Emergency Care Available 24&nbsp;&times;&nbsp;7</span>
          </div>
          <h1>Dr. B. Sandeep<span>Hospital · Eluru</span></h1>
          <div className="hero-subtitle">SGL Hospital — General Surgery · Laparoscopic &amp; Laser Centre</div>
          <div className="hero-tel-name">డాక్టర్ బి. సందీప్ ఆసుపత్రి · ఏలూరు</div>
          <p className="hero-desc">Advanced Laparoscopic, Laser &amp; General Surgical Care. Serving Eluru and the Coastal Andhra Region with state-of-the-art minimally invasive procedures and compassionate round-the-clock care.</p>
          <div className="hero-btns">
            <a href="#apptFormWrapper" className="btn-primary">📋 Book OP Appointment</a>
            <a href="tel:08812252566" className="btn-outline">📞 Call Now</a>
          </div>
          <div className="hero-stats">
            <div className="stat-card"><span className="stat-num">24/7</span><span className="stat-label">Emergency Services</span></div>
            <div className="stat-card"><span className="stat-num">4+</span><span className="stat-label">Surgical Specialties</span></div>
            <div className="stat-card"><span className="stat-num">Lap</span><span className="stat-label">Laparoscopic Centre</span></div>
            <div className="stat-card"><span className="stat-num">Laser</span><span className="stat-label">Laser Procedures</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
