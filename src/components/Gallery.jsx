import React, { useState, useEffect } from 'react';
import img1 from '../assets/unnamed (1).jpg';
import img3 from '../assets/unnamed (3).jpg';
import img4 from '../assets/unnamed (4).jpg';
import surgical from '../assets/surgical.png';
import doctor from '../assets/doctor.png';

const Gallery = ({ isOpen, onClose }) => {
  const [lightboxImg, setLightboxImg] = useState(null);

  // Close gallery on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxImg) {
          setLightboxImg(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxImg, onClose]);

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen || lightboxImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, lightboxImg]);

  const galleryItems = [
    { src: img1, alt: "Hospital Front View" },
    { src: img3, alt: "SGL Hospital Building" },
    { src: img4, alt: "Hospital Side View" },
    { src: surgical, alt: "Surgical Technology" },
    { src: doctor, alt: "Dr. B. Sandeep" },
    { src: img1, alt: "Laparoscopic Centre" }
  ];

  return (
    <>
      <section className={`gallery ${isOpen ? 'active' : ''}`} id="gallery">
        <div className="gallery-close" onClick={onClose}>×</div>
        <div className="section-inner">
          <div className="section-head">
            <div className="section-tag">Hospital Tour</div>
            <h2 className="section-title">Our <span>Facility Gallery</span></h2>
            <div className="divider"></div>
            <p className="section-desc">Take a look inside SGL Hospital. Our modern facility is designed for patient comfort, surgical precision, and efficient care delivery.</p>
          </div>
          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <div key={index} className="gallery-item" onClick={() => setLightboxImg(item.src)}>
                <img src={item.src} alt={item.alt} />
                <div className="gallery-overlay"><span className="gallery-zoom-icon">🔍</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Element */}
      <div className={`lightbox ${lightboxImg ? 'active' : ''}`} id="lightbox" onClick={() => setLightboxImg(null)}>
        <span className="lightbox-close">×</span>
        {lightboxImg && (
          <img src={lightboxImg} className="lightbox-content" id="lightboxImg" alt="Enlarged" onClick={(e) => e.stopPropagation()} />
        )}
      </div>
    </>
  );
};

export default Gallery;
