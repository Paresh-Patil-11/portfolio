import React from 'react';

const Hero = () => (
  <section className="hero-section text-center d-flex flex-column justify-content-center align-items-center py-5" id="top" style={{ minHeight: '60vh' }}>
    <div className="container py-5">
      <h1 className="display-2 fw-bold mb-3" style={{ color: '#2563eb', fontFamily: 'Montserrat, sans-serif', letterSpacing: '-1px' }}>I'm Paresh</h1>
      <h2 className="tagline mb-4" style={{ color: '#f59e42', fontWeight: 600, fontSize: '2rem', fontFamily: 'Montserrat, sans-serif' }}>A Fullstack Web Developer</h2>
    
    </div>
  </section>
);

export default Hero; 