import React, { useEffect, useRef } from 'react';

const educationData = [
  {
    level: 'Bachelor of Technology',
    field: 'Computer Science Engineering',
    place: 'R. C. Patel Institute of Technology, Shirpur',
    years: '2021 - 2025',
    grade: 'CGPA: 6.2/10',
    description: 'Specialized in software engineering, data structures and full-stack development.',
    achievements: [
      'Dean\'s List for Academic Excellence',
      'Led multiple technical projects',
      'Active member of coding club'
    ]
  },
  {
    level: 'Higher Secondary Certificate',
    place: 'R. C. Patel Arts, Commerce & Science College, Shirpur',
    years: '2019 - 2021',
    grade: '81.83%',
    description: 'Focused on Mathematics, Physics, and Chemistry with strong analytical foundation.',
    achievements: [
      'Mathematics Olympiad Participant',
      'Science Exhibition Winner',
      'Academic Excellence Award'
    ]
  },
  {
    level: 'Secondary School Certificate',
    place: 'R. C. Patel Main Building Secondary School, Shirpur',
    years: '2014 - 2019',
    grade: '88.00%',
    description: 'Strong foundation in core subjects with emphasis on mathematics and science.',
    achievements: [
      'School Topper in Mathematics',
      'Student Council Member',
      'Inter-school Competition Winner'
    ]
  },
];

const Education = () => {
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
    <section id="education" className="education-section section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="animate-on-scroll">
            <h2 className="section-title" style={{ fontFamily: "Georgia" }}>Academic Journey</h2>
            <p className="section-subtitle">
              My academic path and achievements that shaped my technical expertise
            </p>
          </div>
        </div>
        
        {/* Education Timeline */}
        <div className="education-timeline">
          {educationData.map((edu, idx) => (
            <div key={idx} className="education-item">
              <div className="education-card animate-on-scroll" style={{ animationDelay: `${idx * 0.2}s` }}>
                {/* Timeline Indicator */}
                <div className="timeline-indicator">
                  <div className="timeline-dot"></div>
                  {idx < educationData.length - 1 && <div className="timeline-line"></div>}
                </div>
                
                <div className="education-content">
                  <div className="education-header">
                    <h3 className="education-level">{edu.level}</h3>
                    {edu.field && (
                      <p className="education-field">{edu.field}</p>
                    )}
                    <div className="education-meta">
                      <span className="education-years">{edu.years}</span>
                      <span className="education-grade">{edu.grade}</span>
                    </div>
                  </div>
                  
                  <div className="education-details">
                    <p className="education-place">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="me-2">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {edu.place}
                    </p>
                  </div>
                  
                  <p className="education-description">{edu.description}</p>
                  
                  {edu.achievements && (
                    <div className="education-achievements">
                      <h5 className="achievements-title">Key Achievements:</h5>
                      <ul className="achievements-list">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="achievement-item">
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" className="me-2">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .education-timeline {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }
        
        .education-item {
          margin-bottom: 2rem;
          position: relative;
        }
        
        .timeline-indicator {
          position: absolute;
          left: -25px;
          top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
        }
        
        .timeline-dot {
          width: 12px;
          height: 12px;
          background: var(--primary);
          border-radius: 50%;
          border: 3px solid var(--bg-primary);
          box-shadow: 0 0 0 3px var(--primary);
        }
        
        .timeline-line {
          width: 2px;
          height: 80px;
          background: linear-gradient(180deg, var(--primary), var(--border-color));
          margin-top: 8px;
        }
        
        .education-content {
          position: relative;
          z-index: 1;
        }
        
        .education-header {
          margin-bottom: 1rem;
        }
        
        .education-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        
        .education-years {
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .education-grade {
          display: inline-block;
          background: var(--bg-secondary);
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
        }
        
        .education-place {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        
        .education-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        .achievements-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        
        .achievements-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .achievement-item {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }
        
        .achievement-item svg {
          color: var(--accent);
          flex-shrink: 0;
        }
        
        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .certification-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          transition: all var(--transition-normal);
        }
        
        .certification-item:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--border-color);
        }
        
        .cert-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          background: var(--bg-secondary);
          border-radius: 50%;
          color: var(--primary);
          flex-shrink: 0;
        }
        
        .cert-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.3;
        }
        
        .cert-provider {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .timeline-indicator {
            display: none;
          }
          
          .education-timeline {
            padding-left: 0;
          }
          
          .certifications-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Education;