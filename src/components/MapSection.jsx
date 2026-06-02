import React from 'react';

const MapSection = () => {
  return (
    <section className="map-section" id="map">
      <div className="map-wrapper">
        <div className="section-head">
          <div className="section-tag">Find Us</div>
          <h2 className="section-title">Hospital <span>Location</span></h2>
          <div className="divider"></div>
          <p className="section-desc" style={{ margin: '0 auto' }}>SGL Hospital is located in Ramachandra Rao Pet, Eluru, Andhra Pradesh — easily accessible from all parts of the city.</p>
        </div>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.512!2d81.0982196!3d16.7108289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a36150032736893%3A0x74e644a4763d54dc!2sSGL%20hospital.%20Dr.b.sandeep%20hospital%20Eluru!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" 
            title="SGL Hospital Location Map">
          </iframe>
        </div>
        <div className="map-details">
          <div className="map-detail-card">
            <span className="mic">📍</span>
            <div>
              <h4>Address</h4>
              <p>P462+74R, Ramachandra Rao Pet, Eluru, Andhra Pradesh 534002</p>
            </div>
          </div>
          <div className="map-detail-card">
            <span className="mic">🕐</span>
            <div>
              <h4>Hours</h4>
              <p>Open 24 Hours, 7 Days a Week<br/>Sunday to Saturday</p>
            </div>
          </div>
          <div className="map-detail-card">
            <span className="mic">🚌</span>
            <div>
              <h4>How to Reach</h4>
              <p>Centrally located in Eluru city. Auto-rickshaws and cabs available from Eluru Bus Stand.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
