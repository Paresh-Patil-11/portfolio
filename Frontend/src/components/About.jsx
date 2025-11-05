import React from 'react';

const About = () => (
  <section id="about" className="about-section py-5" data-aos="fade-up">
    <div className="container text-center">
      <img
        className="profile-pic mb-4"
        src="/images/photo.png"
        alt="profile-pic"
        width="200"
        style={{ borderRadius: '50%' }}
        data-aos="zoom-in"
        data-aos-delay="100"
      />
      <h2 className="fw-bold mb-3">Hey! <span role="img" aria-label="wave">👋</span></h2>
      <p className="about-me mx-auto text-justify" style={{ maxWidth: '650px', textAlign: 'justify', color: '#1a202c', fontSize: '1.1rem', lineHeight: '1.7' }}>
        I'm a passionate and self-taught Computer Science student aspiring to become a full-stack developer. Dedicated to creating innovative solutions that positively impact people's lives. Skilled in web development, practicing Data Structures. Committed to excellence, staying updated with the latest technologies. Seeking opportunities to contribute and make a lasting impact in the field of software engineering.
      </p>
    </div>
  </section>
);

export default About; 