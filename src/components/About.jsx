import React from 'react';
import doctorPhoto from '../assets/doctor.png';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="section-inner">
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-img-placeholder">
              <img className="doctor-photo" id="doctorAboutPhoto" src={doctorPhoto} alt="Dr. B. Sandeep" />
              <h3>Dr. B. Sandeep</h3>
              <p>M.S., FIAGES, FALS<br/>General Surgeon &amp; Laparoscopic Specialist<br/>Colorectal &amp; Proctologist</p>
            </div>
            <div className="about-badge-float"><span>SGL</span>Hospital</div>
          </div>
          <div className="about-text">
            <div className="section-tag">About the Hospital</div>
            <h2 className="section-title">Expert Surgical Care<br/>in <span>Coastal Andhra</span></h2>
            <div className="divider"></div>
            <p style={{ color: 'var(--gray-text)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1rem' }}>
              Dr. B. Sandeep Hospital (SGL Hospital) in Eluru is a trusted surgical care centre specialising in advanced Laparoscopic,
              Laser, and General Surgeries. Located in the heart of Ramachandra Rao Pet, the hospital is equipped to
              handle everything from routine procedures to complex minimally invasive surgeries.
            </p>
            <p style={{ color: 'var(--gray-text)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              With round-the-clock availability, the hospital ensures that emergency cases receive immediate attention. The
              team is committed to delivering safe, effective and compassionate surgical outcomes.
            </p>
            <div className="about-features">
              <div className="feat-item">Laparoscopic Surgery Centre</div>
              <div className="feat-item">Laser Procedures</div>
              <div className="feat-item">24/7 Emergency Care</div>
              <div className="feat-item">General Surgery OPD</div>
              <div className="feat-item">Diabetic Foot Care</div>
              <div className="feat-item">Minimally Invasive Surgery</div>
              <div className="feat-item">Gall Bladder Surgery</div>
              <div className="feat-item">Varicose Vein Treatment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
