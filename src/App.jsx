import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Appointment from './components/Appointment';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import StickyEmergency from './components/StickyEmergency';
import Admin from './components/Admin';

function App() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const pathname = window.location.pathname;

  if (pathname === '/admin') {
    return <Admin />;
  }

  // Smooth nav highlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-links a');
      let current = '';
      
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) {
          current = s.id;
        }
      });
      
      navLinks.forEach(a => {
        if (a.getAttribute('href') === '#' + current) {
          a.style.color = 'var(--gold-light)';
        } else {
          a.style.color = '';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <StickyEmergency />
      <Navbar onOpenGallery={() => setIsGalleryOpen(true)} />
      <Hero />
      <About />
      <Services />
      <Gallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
      <Appointment />
      <Reviews />
      <FAQ />
      <MapSection />
      <Footer onOpenGallery={() => setIsGalleryOpen(true)} />
    </>
  );
}

export default App;
