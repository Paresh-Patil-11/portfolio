import React, { useEffect, useRef } from "react";

const Intro = () => {
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
    <section className="intro-section" id="top" ref={sectionRef}>
      <div className="container">
        <div className="row align-items-center justify-content-center min-vh-100">
          {/* Left: Text Content */}
          <div className="col-lg-7 intro-content">
            <div className="animate-on-scroll">
              <h1 className="intro-title" style={{ fontFamily: "Georgia" }}>
                Hi, I'm <span className="text-gradient">Paresh</span>
                <span className="wave" role="img" aria-label="wave">
                  👋
                </span>
              </h1>
            </div>

            <div
              className="animate-on-scroll"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="intro-subtitle" style={{ fontFamily: "Georgia" }}>
                Full-Stack Web Developer
              </h2>
            </div>

            <div
              className="animate-on-scroll"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="intro-description"  style={{ textAlign: 'justify' }}>
                I craft modern, scalable and user-friendly web applications
                that make a difference. Passionate about creating innovative
                solutions that positively impact people's lives.
              </p>
            </div>

            <div
              className="animate-on-scroll"
              style={{ animationDelay: "0.6s" }}
            >
              <p className="intro-description"  style={{ textAlign: 'justify' }}>
                As a dedicated Computer Science student and self-taught
                developer, I'm committed to excellence and staying updated with
                the latest technologies. I specialize in full-stack development
                and have a strong foundation in data structures and algorithms.
              </p>
            </div>

            <div
              className="animate-on-scroll"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start">
                <a
                  href="#projects"
                  className="btn btn-primary btn-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0l-4-4m4 4l-4 4"/>
                  </svg>
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="btn btn-outline-light btn-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  Get In Touch
                </a>
              </div>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="col-lg-5 text-center mb-5 mb-lg-0">
            <div
              className="intro-image-wrapper animate-on-scroll"
              style={{ animationDelay: "1s" }}
            >
              <div className="position-relative d-inline-block">
                <img
                  src="/images/photo.png"
                  alt="Paresh Patil"
                  className="intro-image img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;