import React, { useState, useEffect } from 'react';

const Appointment = () => {
  const [formData, setFormData] = useState({
    f_name: '', f_phone: '', f_age: '', f_gender: '', f_date: '', f_dept: '', f_msg: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setFormData(prev => ({ ...prev, f_date: today }));
  }, [today]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.f_name) { alert('Please enter your full name.'); return; }
    if (!formData.f_phone || formData.f_phone.length < 10) { alert('Please enter a valid 10-digit phone number.'); return; }
    if (!formData.f_date) { alert('Please select a preferred date.'); return; }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Failed to submit appointment. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Network error. Is the backend server running?');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      f_name: '', f_phone: '', f_age: '', f_gender: '', f_date: today, f_dept: '', f_msg: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section className="appointment" id="appointment">
      <div className="section-inner">
        <div className="appt-grid">
          <div className="appt-left">
            <div className="section-tag" style={{ color: 'var(--gold-light)' }}>Book OP Consultation</div>
            <h2>Schedule Your<br/>Appointment</h2>
            <p>Book an outpatient (OP) appointment with Dr. B. Sandeep's team. Walk-in patients also welcome. Emergency cases handled 24×7.</p>
            <div className="appt-info-cards">
              <div className="appt-info-card">
                <span className="ic">📍</span>
                <div><span>Location</span><strong>Venkateswara Swamy Temple Road, R.R. Peta, Eluru - 2, Andhra Pradesh, Pin - 534002</strong></div>
              </div>
              <div className="appt-info-card">
                <span className="ic">🕐</span>
                <div><span>Hours</span><strong>Open 24/7 · Sunday to Saturday</strong></div>
              </div>
              <div className="appt-info-card">
                <span className="ic">🚨</span>
                <div><span>Emergency</span><strong>Available Round-the-Clock · 24×7</strong></div>
              </div>
              <div className="appt-info-card">
                <span className="ic">🏥</span>
                <div><span>Specialty</span><strong>General · Laparoscopic · Laser Surgery</strong></div>
              </div>
              <div className="appt-info-card">
                <span className="ic">📞</span>
                <div>
                  <span>Contact</span>
                  <strong>Landline: 08812 252566</strong>
                  <strong>Cell: 9989799521, 9502591688</strong>
                </div>
              </div>
            </div>
          </div>
          <div>
            {!isSubmitted ? (
              <form className="appt-form" id="apptFormWrapper" onSubmit={handleSubmit}>
                <h3>Book OP Appointment</h3>
                <p>Fill the form below — our team will confirm your slot</p>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" id="f_name" value={formData.f_name} onChange={handleChange} placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" id="f_phone" value={formData.f_phone} onChange={handleChange} placeholder="10-digit mobile number" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Age</label>
                    <input type="number" id="f_age" value={formData.f_age} onChange={handleChange} placeholder="Your age" min="1" max="120" />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select id="f_gender" value={formData.f_gender} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Preferred Appointment Date *</label>
                  <input type="date" id="f_date" value={formData.f_date} onChange={handleChange} min={today} required />
                </div>
                <div className="form-group">
                  <label>Department / Concern</label>
                  <select id="f_dept" value={formData.f_dept} onChange={handleChange}>
                    <option value="">Select department</option>
                    <option>Gastro / Laparoscopic Surgery</option>
                    <option>Laser Surgery (Piles, Fistula, Fissure)</option>
                    <option>Varicose Veins</option>
                    <option>General Surgery</option>
                    <option>Diabetes / Diabetic Foot Care</option>
                    <option>Thyroid Surgery</option>
                    <option>Breast Surgery</option>
                    <option>Emergency / Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Brief Description of Complaint</label>
                  <textarea id="f_msg" value={formData.f_msg} onChange={handleChange} placeholder="Describe your symptoms or concern briefly..."></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Confirm Appointment →'}
                </button>
              </form>
            ) : (
              <div className="success-msg" id="successMsg" style={{ display: 'block' }}>
                <div className="check">✅</div>
                <h4>Appointment Requested!</h4>
                <p>Thank you! Your OP appointment request has been received. Our team will call you on the provided number to confirm your slot.</p>
                <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: '#999' }}>For emergency cases, please call directly or visit the hospital — we are available 24×7.</p>
                <button onClick={resetForm} style={{ marginTop: '1.5rem', background: 'var(--teal)', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>Book Another</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
