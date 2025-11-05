import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['top', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a className="navbar-brand" href="#top" onClick={(e) => { e.preventDefault(); scrollToSection('top'); }}>
          Paresh Patil
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          aria-controls="navbarNav"
          aria-expanded={menuOpen} 
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="navbarNav">
          <div className="navbar-nav ms-auto">
            {[
              { id: 'top', label: 'Home' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'education', label: 'Education' },
              { id: 'contact', label: 'Contact' }
            ].map(({ id, label }) => (
              <a
                key={id}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;