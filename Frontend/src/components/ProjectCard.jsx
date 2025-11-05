import React from "react";

const ProjectCard = ({
  img,
  title,
  desc,
  tech,
  code,
  demo,
  featured = false,
}) => {
  return (
    <div className="project-card">
      {/* Project Image */}
      <div className="project-image-container">
        <img
          src={img}
          alt={title}
          className="project-card-img"
          loading="lazy"
        />
        <div className="project-overlay">
          <div className="project-links-overlay">
            <a
              href={code}
              target="_blank"
              rel="noopener noreferrer"
              className="project-overlay-link"
              aria-label={`View ${title} source code`}
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-overlay-link"
              aria-label={`View ${title} live demo`}
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="project-card-body">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-desc" style={{ textAlign: "justify" }}>
          {desc}
        </p>

        {/* Technology Tags */}
        <div className="project-card-tags">
          {tech.map((t, i) => (
            <span className="project-card-tag" key={i}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .project-image-container {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          background: var(--bg-secondary);
        }
        
        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-normal);
        }
        
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        
        .project-links-overlay {
          display: flex;
          gap: 1rem;
        }
        
        .project-overlay-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: white;
          text-decoration: none;
          transition: all var(--transition-normal);
          backdrop-filter: blur(10px);
        }
        
        .project-overlay-link:hover {
          background: var(--primary);
          transform: scale(1.1);
          color: white;
        }
        
        .project-card-link--primary {
          background: var(--primary);
          color: var(--text-white);
          border-color: var(--primary);
        }
        
        .project-card-link--primary:hover {
          background: var(--primary-light);
          color: var(--text-white);
          border-color: var(--primary-light);
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;
