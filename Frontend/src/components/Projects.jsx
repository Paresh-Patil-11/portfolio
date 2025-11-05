import React, { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import DocSewaImg from '../assets/DocSewa.jpg';
import ZerodhaImg from '../assets/Zerodha.jpg';
import gemini from '../assets/google-gemini.webp';

const projects = [
  {
    title: 'DocSahayak Application',
    desc: 'A comprehensive full-stack document management solution built with React and Express. Features secure authentication and intuitive user interface for seamless document handling.',
    img: DocSewaImg,
    tech: ['React', 'Express', 'PostgreSQL'],
    code: 'https://github.com/Paresh-Patil-11/DocSahayak',
    demo: 'https://doc-sahayak-enduser.vercel.app/',
    featured: true
  },
  {
    title: 'Zerodha Clone Platform',
    desc: 'A sophisticated trading platform clone with real-time market data, interactive charts, and responsive design. Built with modern React patterns and Material-UI for optimal user experience.',
    img: ZerodhaImg,
    tech: ['React.js', 'Material-UI', 'Vercel'],
    code: 'https://github.com/Paresh-Patil-11/ZerodhaClone',
    demo: 'https://zerodha-clone-rose.vercel.app/',
    featured: true
  },
  {
    title: 'TalkConnect AI Chat',
    desc: 'An intelligent chat interface powered by Google\'s Gemini AI. Features real-time conversations, context awareness, and beautiful UI with smooth animations for enhanced user interaction.',
    img: gemini,
    tech: ['React.js', 'Gemini AI', 'CSS3'],
    code: 'https://github.com/Paresh-Patil-11/TalkConnect',
    demo: 'https://talk-connect.vercel.app/',
    featured: true
  },
];

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animateElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    animateElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="project-section section" id="projects" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="animate-on-scroll">
            <h2 className="section-title" style={{ fontFamily: "Georgia" }}>Projects</h2>
            <p className="section-subtitle">
              A showcase of my recent work and technical expertise in full-stack development
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="animate-on-scroll project-item" 
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="text-center mt-5">
          <div className="animate-on-scroll" style={{ animationDelay: '0.8s' }}>
            <a 
              href="https://github.com/Paresh-Patil-11" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-lg"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </div>
      
      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .project-item {
          display: flex;
          flex-direction: column;
        }
        
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 400px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;