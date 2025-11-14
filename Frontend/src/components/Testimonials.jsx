import React, { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Venkatesh Aastro",
    company: "Venkatesh Aastro",
    position: "Founder",
    project: "Venkatesh Aastro",
    video: "/video/Nisha.mp4",
    thumbnail: "/images/client1.png",
    text: "Paresh developed a powerful astrology website with a complete consultant booking system. The design is intuitive, user-friendly, and perfectly aligned with our vision.",
    rating: 5,
  },
  {
    name: "Dr. Meera Patel",
    company: "Medicare System",
    position: "Chief Doctor",
    project: "Shashwati Healthcare",
    video: "/video/medicare.mp4",
    thumbnail: "/images/client10.png",
    text: "Paresh created a seamless doctor appointment system for our clinic. The interface is clean and the backend is highly efficient, making patient scheduling smooth and automated.",
    rating: 5,
  },
  {
    name: "Rohit Graphics",
    company: "Print & Design Studio",
    position: "Owner",
    project: "printbazzar",
    video: "/video/printing.mp4",
    thumbnail: "/images/printing.jpg",
    text: "Paresh built a complete shop management system for our printing and design business. From order tracking to custom print previews, the platform has improved our workflow.",
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});

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

  const handlePlayVideo = (idx) => {
    // Pause all videos first
    Object.values(videoRefs.current).forEach((video) => {
      if (video) video.pause();
    });

    setActiveVideo(idx);

    // Play selected video
    if (videoRefs.current[idx]) {
      videoRefs.current[idx].play();
    }
  };

  const handlePauseVideo = (idx) => {
    if (videoRefs.current[idx]) {
      videoRefs.current[idx].pause();
    }
    setActiveVideo(null);
  };

  return (
    <section
      className="testimonials-section section"
      id="testimonials"
      ref={sectionRef}
    >
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="animate-on-scroll">
            <h2 className="section-title" style={{ fontFamily: "Georgia" }}>
              Client Testimonials
            </h2>
            <p className="section-subtitle">
              Hear what my clients have to say about working with me
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="animate-on-scroll testimonial-item"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <div className="testimonial-card">
                {/* Video Section */}
                <div className="testimonial-video-wrapper">
                  <video
                    ref={(el) => (videoRefs.current[idx] = el)}
                    className="testimonial-video"
                    poster={testimonial.thumbnail}
                    controls={activeVideo === idx}
                    onEnded={() => setActiveVideo(null)}
                  >
                    <source src={testimonial.video} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>

                  {activeVideo !== idx && (
                    <div
                      className="video-overlay"
                      onClick={() => handlePlayVideo(idx)}
                    >
                      <button className="play-button" aria-label="Play video">
                        <svg
                          width="60"
                          height="60"
                          viewBox="0 0 60 60"
                          fill="white"
                        >
                          <circle cx="30" cy="30" r="30" opacity="0.9" />
                          <path d="M23 18 L23 42 L40 30 Z" fill="#000" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Testimonial Content */}
                <div className="testimonial-content">
                  {/* Rating */}
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        width="20"
                        height="20"
                        fill="#fbbf24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Text */}
                  <p
                    className="testimonial-text"
                    style={{ textAlign: "justify" }}
                  >
                    "{testimonial.text}"
                  </p>

                  {/* Project Tag */}
                  <div className="testimonial-project">
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
                    </svg>
                    Project: {testimonial.project}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
      </div>

      <style>{`
        .testimonials-section {
          background: var(--bg-primary);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .testimonial-card {
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          overflow: hidden;
          border: 1px solid var(--border-light);
          transition: all var(--transition-normal);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--border-color);
        }

        .testimonial-video-wrapper {
          position: relative;
          width: 100%;
          /* 16:9 Aspect Ratio container */
          padding-top: 56.25%; 
          background: var(--bg-secondary);
          overflow: hidden;
        }

        .testimonial-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          /* *** KEY CHANGE: object-fit is set to 'contain' ***
             This ensures the entire video/poster is visible, adding black bars if necessary.
          */
          object-fit: contain; 
          object-position: center; 
        }

        /* Ensure poster image behaves correctly with object-fit: contain */
        .testimonial-video[poster] {
            background-size: contain;
            background-position: center;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-normal);
          z-index: 2; 
        }

        .video-overlay:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        .play-button {
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all var(--transition-normal);
          padding: 0;
        }

        .play-button:hover {
          transform: scale(1.1);
        }

        .play-button svg {
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }

        .testimonial-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .testimonial-rating {
          display: flex;
          gap: 0.25rem;
        }

        .testimonial-text {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.7;
          font-style: italic;
          margin: 0;
          flex-grow: 1;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 0.25rem 0;
        }

        .author-position {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 0;
        }

        .testimonial-project {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--accent);
          font-weight: 500;
          padding: 0.75rem 1rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
        }

        .testimonial-project svg {
          flex-shrink: 0;
        }

        .testimonials-note {
          display: inline-flex;
          align-items: center;
          color: var(--text-muted);
          font-size: 0.9rem;
          background: var(--bg-secondary);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .testimonial-content {
            padding: 1.5rem;
          }

          .play-button svg {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .testimonial-content {
            padding: 1.25rem;
          }

          .testimonial-text {
            font-size: 0.95rem;
          }

          .author-name {
            font-size: 1rem;
          }

          .play-button svg {
            width: 45px;
            height: 45px;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
