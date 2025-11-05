import React, { useEffect, useRef } from "react";

const freelanceProjects = [
  {
    title: "E-Commerce Platform",
    client: "RetailCo",
    desc: "Built a complete online shopping platform with payment integration, inventory management, and order tracking. Improved client sales by 40% within first quarter.",
    tech: ["React", "Node.js", "MongoDB"],
    duration: "3 months",
    year: "2024",
    status: "Completed",
    achievement: "40% increase in sales",
  },
  {
    title: "Healthcare Management System",
    client: "MediCare Clinic",
    desc: "Developed a patient management system with appointment scheduling, medical records, and billing features. Streamlined clinic operations and reduced administrative work by 60%.",
    tech: ["React", "Express", "PostgreSQL"],
    duration: "4 months",
    year: "2024",
    status: "Completed",
    achievement: "60% reduction in admin work",
  },
  {
    title: "Real Estate Portal",
    client: "PropertyHub",
    desc: "Created a property listing platform with advanced search filters, virtual tours, and agent dashboard. Helped client connect with 200+ potential buyers.",
    tech: ["React", "Node.js", "MongoDB"],
    duration: "2.5 months",
    year: "2023",
    status: "Completed",
    achievement: "200+ buyer connections",
  },
];

const FreelanceProjects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
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
    <section
      className="freelance-section section"
      id="freelance"
      ref={sectionRef}
    >
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="animate-on-scroll">
            <h2 className="section-title" style={{ fontFamily: "Georgia" }}>
              Freelance Projects
            </h2>
            <p className="section-subtitle">
              Successful collaborations with clients worldwide, delivering
              quality solutions
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="freelance-stats mb-5 animate-on-scroll">
          <div className="stat-item">
            <div className="stat-number">4+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">11+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="freelance-grid">
          {freelanceProjects.map((project, idx) => (
            <div
              key={idx}
              className="animate-on-scroll freelance-item"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="freelance-card">
                <div className="freelance-header">
                  <h3 className="freelance-title">{project.title}</h3>
                  <p className="freelance-client">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    Client: {project.client}
                  </p>
                </div>

                <p className="freelance-desc" style={{ textAlign: "justify" }}>
                  {project.desc}
                </p>

                <div className="freelance-tags">
                  {project.tech.map((tech, i) => (
                    <span className="freelance-tag" key={i}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-5">
          <div className="animate-on-scroll">
            <p className="cta-text">Interested in working together?</p>
            <a
              href="#contact"
              className="btn btn-primary btn-lg"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Let's Discuss Your Project
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .freelance-section {
          background: var(--bg-secondary);
        }

        .freelance-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .stat-item {
          text-align: center;
          padding: 2rem;
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          transition: all var(--transition-normal);
        }

        .stat-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .freelance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .freelance-card {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          padding: 2rem;
          border: 1px solid var(--border-light);
          transition: all var(--transition-normal);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .freelance-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--border-color);
        }

        .freelance-header {
          margin-bottom: 1.5rem;
        }

        .freelance-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .freelance-year {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .freelance-status {
          display: inline-block;
          background: #10b981;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
        }

        .freelance-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .freelance-client {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 0;
        }

        .freelance-client svg {
          color: var(--primary);
        }

        .freelance-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .freelance-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .detail-item svg {
          color: var(--primary);
          flex-shrink: 0;
        }

        .detail-item.achievement {
          color: var(--accent);
          font-weight: 600;
        }

        .detail-item.achievement svg {
          color: var(--accent);
        }

        .freelance-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .freelance-tag {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
        }

        .freelance-tag:hover {
          background: var(--primary);
          color: var(--text-white);
          border-color: var(--primary);
        }

        .cta-text {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .freelance-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .freelance-stats {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .stat-item {
            padding: 1.5rem;
          }

          .stat-number {
            font-size: 2rem;
          }

          .freelance-card {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .freelance-card {
            padding: 1.25rem;
          }

          .freelance-title {
            font-size: 1.1rem;
          }

          .freelance-desc {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default FreelanceProjects;
