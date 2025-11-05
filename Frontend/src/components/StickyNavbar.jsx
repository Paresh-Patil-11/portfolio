import React, { useState, useEffect } from 'react';

const StickyNavbar = ({ darkMode, setDarkMode }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const styles = {
    navbar: {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: darkMode 
        ? 'rgba(30, 30, 30, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)',
      display: 'flex',
      alignItems: 'center',
      padding: '0.25rem 0.5rem', // Reduced from 0.4rem 0.8rem
      borderRadius: '24px', // Reduced from 30px
      boxShadow: darkMode
        ? '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        : '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
      backdropFilter: 'blur(10px)',
      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
      gap: '0.2rem', // Reduced from 0.3rem
      zIndex: 1000,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    iconContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.3rem', // Reduced from 0.4rem
      borderRadius: '8px', // Reduced from 10px
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      overflow: 'hidden',
    },
    button: {
      background: 'transparent',
      border: 'none',
      fontSize: '0.875rem', // Reduced from 1rem
      cursor: 'pointer',
      color: darkMode ? '#e0e0e0' : '#555',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      zIndex: 2,
    },
    divider: {
      width: '1px',
      height: '18px', // Reduced from 24px
      background: darkMode 
        ? 'linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)' 
        : 'linear-gradient(180deg, transparent, rgba(0,0,0,0.1), transparent)',
      margin: '0 0.3rem', // Reduced from 0.5rem
    },
    ripple: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
      transform: 'scale(0)',
      animation: 'ripple 0.6s linear',
      pointerEvents: 'none',
    }
  };

  const getHoverStyles = (iconName) => {
    const isHovered = hoveredIcon === iconName;
    const baseHoverStyle = {
      background: isHovered 
        ? (darkMode 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
          : 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)')
        : 'transparent',
      transform: isHovered ? 'translateY(-1.5px) scale(1.05)' : 'translateY(0) scale(1)', // Reduced translateY
      boxShadow: isHovered 
        ? (darkMode 
          ? '0 3px 16px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)' // Reduced shadow
          : '0 3px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)')
        : '0 0 0 rgba(0,0,0,0)',
    };

    // Icon-specific colors
    const iconColors = {
      home: isHovered ? '#3b82f6' : (darkMode ? '#e0e0e0' : '#555'),
      projects: isHovered ? '#10b981' : (darkMode ? '#e0e0e0' : '#555'),
      github: isHovered ? '#6b7280' : (darkMode ? '#e0e0e0' : '#555'),
      linkedin: isHovered ? '#0ea5e9' : (darkMode ? '#e0e0e0' : '#555'),
      theme: isHovered ? '#f59e0b' : (darkMode ? '#e0e0e0' : '#555'),
    };

    return {
      container: baseHoverStyle,
      button: { color: iconColors[iconName] }
    };
  };

  const handleIconHover = (iconName, isEntering) => {
    setHoveredIcon(isEntering ? iconName : null);
  };

  return (
    <>
      <style>
        {`
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
          
          .icon-glow {
            filter: drop-shadow(0 0 6px currentColor); /* Reduced glow */
          }
        `}
      </style>
      <div style={styles.navbar}>
        <div 
          style={{ ...styles.iconContainer, ...getHoverStyles('home').container }}
          onMouseEnter={() => handleIconHover('home', true)}
          onMouseLeave={() => handleIconHover('home', false)}
        >
          <a 
            href="#home" 
            title="Home" 
            style={{ ...styles.button, ...getHoverStyles('home').button }}
            className={hoveredIcon === 'home' ? 'icon-glow' : ''}
          >
            <i className="fa-regular fa-house"></i>
          </a>
        </div>

        <div 
          style={{ ...styles.iconContainer, ...getHoverStyles('projects').container }}
          onMouseEnter={() => handleIconHover('projects', true)}
          onMouseLeave={() => handleIconHover('projects', false)}
        >
          <a 
            href="#projects" 
            title="Projects" 
            style={{ ...styles.button, ...getHoverStyles('projects').button }}
            className={hoveredIcon === 'projects' ? 'icon-glow' : ''}
          >
            <i className="fa-solid fa-code"></i>
          </a>
        </div>

        <div 
          style={{ ...styles.iconContainer, ...getHoverStyles('github').container }}
          onMouseEnter={() => handleIconHover('github', true)}
          onMouseLeave={() => handleIconHover('github', false)}
        >
          <a
            href="https://github.com/Paresh-Patil-11"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            style={{ ...styles.button, ...getHoverStyles('github').button }}
            className={hoveredIcon === 'github' ? 'icon-glow' : ''}
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>

        <div 
          style={{ ...styles.iconContainer, ...getHoverStyles('linkedin').container }}
          onMouseEnter={() => handleIconHover('linkedin', true)}
          onMouseLeave={() => handleIconHover('linkedin', false)}
        >
          <a
            href="https://www.linkedin.com/in/pareshpatil11/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            style={{ ...styles.button, ...getHoverStyles('linkedin').button }}
            className={hoveredIcon === 'linkedin' ? 'icon-glow' : ''}
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>

        <div style={styles.divider} />

        <div 
          style={{ ...styles.iconContainer, ...getHoverStyles('theme').container }}
          onMouseEnter={() => handleIconHover('theme', true)}
          onMouseLeave={() => handleIconHover('theme', false)}
        >
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Theme"
            style={{ ...styles.button, ...getHoverStyles('theme').button }}
            className={hoveredIcon === 'theme' ? 'icon-glow' : ''}
          >
            <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default StickyNavbar;