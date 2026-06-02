import React from 'react';

const Services = () => {
  return (
    <section className="services" id="services">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-tag">Our Specialties</div>
          <h2 className="section-title">Comprehensive <span>Surgical Services</span></h2>
          <div className="divider"></div>
          <p className="section-desc">From advanced laparoscopic procedures to laser surgeries and emergency care — we cover a wide spectrum of surgical needs under one roof.</p>
        </div>
        <div className="services-grid">

          {/* Gastro */}
          <div className="service-card gastro">
            <div className="svc-icon">🔬</div>
            <h3>Gastro Surgeries</h3>
            <div className="tel">గ్యాస్ట్రో సర్జరీస్ · లాప్రోస్కోపిక్ శస్త్రచికిత్సలు</div>
            <ul className="svc-list">
              <li><span className="en">Gall Bladder / Gall Stones</span><span className="te">పిత్తాశయ రాళ్ళు, కామెర్లు</span></li>
              <li><span className="en">Hysterectomy</span><span className="te">గర్భాశయ శస్త్రచికిత్సలు</span></li>
              <li><span className="en">Ovarian Cyst</span><span className="te">అండాశయ గడ్డలు</span></li>
              <li><span className="en">Appendicitis (24hr)</span><span className="te">అపెండిసైటిస్</span></li>
              <li><span className="en">All Lap Hernias</span><span className="te">అన్ని రకాల ల్యాప్ హెర్నియాలు</span></li>
              <li><span className="en">Advanced Lap Surgeries</span><span className="te">అధునాతన లాప్రోస్కోపిక్</span></li>
            </ul>
          </div>

          {/* Laser */}
          <div className="service-card laser">
            <div className="svc-icon">✨</div>
            <h3>Laser Surgeries</h3>
            <div className="tel">లేజర్ శస్త్రచికిత్సలు</div>
            <ul className="svc-list">
              <li><span className="en">Fistula</span><span className="te">ఫిస్టులా</span></li>
              <li><span className="en">Haemorrhoids (Piles)</span><span className="te">మొలలు</span></li>
              <li><span className="en">Fissures</span><span className="te">ఫిషర్స్, పగుళ్లు</span></li>
              <li><span className="en">Varicose Veins</span><span className="te">అనారోగ్య సిరలు, వెరికోస్ వెన్స్</span></li>
            </ul>
          </div>

          {/* General */}
          <div className="service-card general">
            <div className="svc-icon">🏥</div>
            <h3>General Surgeries</h3>
            <div className="tel">సాధారణ శస్త్రచికిత్సలు</div>
            <ul className="svc-list">
              <li><span className="en">Hydrocele</span><span className="te">హైడ్రోసెల్</span></li>
              <li><span className="en">Thyroid Disorders</span><span className="te">థైరాయిడ్ శస్త్రచికిత్సలు</span></li>
              <li><span className="en">Breast Surgery</span><span className="te">రొమ్ము శస్త్రచికిత్స</span></li>
              <li><span className="en">Skin Grafting</span><span className="te">స్కిన్ గ్రాఫ్టింగ్</span></li>
              <li><span className="en">Leg Amputation</span><span className="te">కాలు తొలగించడం</span></li>
              <li><span className="en">Head/Neck/Back Swellings</span><span className="te">తల, మెడ, వీపు వాపులు</span></li>
            </ul>
          </div>

          {/* Diabetes */}
          <div className="service-card diabetes">
            <div className="svc-icon">💉</div>
            <h3>Diabetes Care</h3>
            <div className="tel">మధుమేహం, షుగర్ సంబంధించిన సమస్యలు</div>
            <ul className="svc-list">
              <li><span className="en">Diabetic Foot</span><span className="te">డయాబెటిక్ పాదం</span></li>
              <li><span className="en">Cellulitis / Abscess</span><span className="te">సెల్యులైటిస్, కురుపులు</span></li>
              <li><span className="en">Gangrene of Foot</span><span className="te">పాదాల గ్యాంగ్రీన్</span></li>
              <li><span className="en">Uncontrolled Diabetes</span><span className="te">నియంత్రిచలేని మధుమేహం</span></li>
              <li><span className="en">Diabetic Ulcer / Foot Infection</span><span className="te">డయాబెటిక్ అల్సర్</span></li>
            </ul>
          </div>

          {/* Emergency / General Problems */}
          <div className="service-card emergency" style={{ gridColumn: 'span 2 / auto' }}>
            <div className="svc-icon">🚨</div>
            <h3>Emergency & General Problems</h3>
            <div className="tel">అత్యవసర కేసులు 24×7 అందుబాటులో ఉన్నాయి · సాధారణ సమస్యలు</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
              <ul className="svc-list">
                <li><span className="en">Pain Abdomen</span><span className="te">కడుపు నొప్పి</span></li>
                <li><span className="en">Headache · Leg Pain · Vomiting</span><span className="te">తలనొప్పి, కాళ్ళ నొప్పి, వాంతులు</span></li>
              </ul>
              <ul className="svc-list">
                <li><span className="en">Fever · Dengue · Malaria · Platelet Cases</span><span className="te">జ్వరం, డెంగ్యూ, మలేరియా, ప్లేట్లెట్</span></li>
                <li><span className="en">All Minor Procedures</span><span className="te">అన్ని రకాల శస్త్రచికిత్సలు</span></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
