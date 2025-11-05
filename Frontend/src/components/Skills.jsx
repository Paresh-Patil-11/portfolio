import React, { useEffect, useRef } from "react";

const skills = [
  {
    img: "/images/js.png",
    name: "JavaScript",
    desc: "Expert in modern JavaScript ES6+, creating dynamic and interactive web applications.",
    level: 95,
  },
  {
    img: "/images/python.png",
    name: "Python",
    desc: "Advanced proficiency in Python for data analysis and machine learning concepts",
    level: 90,
  },
  {
    img: "/images/react.png",
    name: "React",
    desc: "Building scalable, component-based user interfaces with React and modern hooks.",
    level: 90,
  },
  {
    img: "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg",
    name: "Bootstrap",
    desc: "Creating responsive, mobile-first websites with Bootstrap framework.",
    level: 90,
  },
  {
    img: "/images/nodejs.png",
    name: "Node.js",
    desc: "Developing high-performance server-side applications and RESTful APIs.",
    level: 85,
  },
  {
    img: "/images/express.png",
    name: "Express.js",
    desc: "Creating robust backend services and middleware with Express framework.",
    level: 85,
  },
  {
    img: "/images/MongoDB_Logomark_ForestGreen.png",
    name: "MongoDB",
    desc: "Designing and implementing scalable NoSQL database architectures.",
    level: 80,
  },
  {
    img: "https://www.mysql.com/common/logos/logo-mysql-170x115.png",
    name: "MySQL",
    desc: "Advanced SQL queries, database optimization, and relational database design.",
    level: 85,
  },
];

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");

            // Animate skill bars
            const skillBars = entry.target.querySelectorAll(
              ".skill-progress-bar"
            );
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                const level = skills[index % skills.length].level;
                bar.style.width = `${level}%`;
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const animateElements =
      sectionRef.current?.querySelectorAll(".animate-on-scroll");
    animateElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="animate-on-scroll">
            <h2 className="section-title" style={{ fontFamily: "Georgia" }}>
              Skills
            </h2>
            <p className="section-subtitle">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {skills.map((skill, idx) => (
            <div key={idx} className="skill-item">
              <div
                className="skill-card animate-on-scroll"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="skill-icon-wrapper mb-3">
                  <img
                    className="skill-icon"
                    src={skill.img}
                    alt={`${skill.name} icon`}
                    loading="lazy"
                  />
                </div>

                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-description">{skill.desc}</p>

                {/* Skill Level Progress Bar */}
                <div className="skill-progress mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="skill-level-text">Proficiency</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-progress-track">
                    <div
                      className="skill-progress-bar"
                      style={{
                        width: "0%",
                        height: "3px",
                        background: "var(--primary)",
                        borderRadius: "2px",
                        transition: "width 1s ease-out",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="text-center mt-5">
          <div className="animate-on-scroll">
            <h4
              className="mb-4"
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              Additional Technologies
            </h4>
            <div className="additional-skills">
              {[
                "Git & GitHub",
                "RESTful APIs",
                "Responsive Design",
                "Agile Development",
                "Problem Solving",
                "Data Structures",
                "UI/UX Design",
                "Version Control",
                "Deployment",
                "Performance Optimization",
              ].map((tech, idx) => (
                <span
                  key={idx}
                  className="skill-badge"
                  style={{
                    animationDelay: `${idx * 0.05}s`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .skill-item {
          display: flex;
          flex-direction: column;
        }
        
        .skill-progress-track {
          width: 100%;
          height: 3px;
          background: var(--border-light);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .skill-level-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        
        .skill-percentage {
          font-size: 0.8rem;
          color: var(--primary);
          font-weight: 600;
        }
        
        .additional-skills {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }
        
        .skill-badge {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          border-radius: var(--radius-full);
          font-weight: 500;
          border: 1px solid var(--border-color);
          transition: all var(--transition-normal);
          animation: fadeInUp 0.6s ease-out both;
        }
        
        .skill-badge:hover {
          background: var(--primary);
          color: var(--text-white);
          border-color: var(--primary);
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
