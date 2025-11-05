import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";

import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import FreelanceProjects from "./components/FreelanceProjects";
import Testimonials from "./components/Testimonials";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StickyNavbar from "./components/StickyNavbar";

import "./theme.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className={`loading-overlay ${!loading ? "fade-out" : ""}`}>
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <h2 className="loading-text">Paresh Patil</h2>
        <p className="loading-subtitle">Full-Stack Web Developer</p>
      </div>
    </div>
  );

  return (
    <div className="App">
      {loading && <LoadingScreen />}

      <div className={`main-content ${loading ? "hidden" : "visible"}`}>
        <Navbar />
        <main>
          <Intro />
          <Skills />
          <Projects />
          <FreelanceProjects />
          <Testimonials />
          <Education />
          <Contact />
          <StickyNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
        </main>
        <Footer />
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      <style>{`
        .loading-overlay {
          transition: opacity 0.5s ease-out;
        }
        
        .loading-overlay.fade-out {
          opacity: 0;
          pointer-events: none;
        }
        
        .main-content {
          transition: opacity 0.5s ease-out;
        }
        
        .main-content.hidden {
          opacity: 0;
        }
        
        .main-content.visible {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

// Scroll to Top Button Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default App;