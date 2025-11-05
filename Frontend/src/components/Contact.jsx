import React, { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "https://portfolio-backend-bvnu.onrender.com";

const Contact = () => {
  const sectionRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current
      ?.querySelectorAll(".animate-on-scroll")
      ?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 🕒 Keep success card visible for 5 s only after it appears
  useEffect(() => {
    if (submitStatus?.success) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus?.success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (submitStatus?.success === false) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitStatus({ success: true, message: data.message });
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setSubmitStatus({
        success: false,
        message:
          "Unable to send message. Please try again later or contact me directly via email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section section" ref={sectionRef}>
      <div className="container">
        <div className="text-center mb-5 animate-on-scroll">
          <h2 className="section-title" style={{ fontFamily: "Georgia" }}>
            Get in Touch
          </h2>
          <p className="section-subtitle">
            I'd love to hear about your project. Let's create something amazing
            together!
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form-wrapper">
              {/* ❌ Error alert */}
              {submitStatus?.success === false && (
                <div
                  style={{
                    padding: "1rem",
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                    background: "#fee2e2",
                    color: "#991b1b",
                    border: "1px solid #fca5a5",
                  }}
                >
                  {submitStatus.message}
                </div>
              )}

              {/* ✅ Success Overlay + Card */}
              {submitStatus?.success && (
                <>
                  <div className="success-overlay"></div>
                  <div className="success-card">
                    <div className="success-icon">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3>Message Sent Successfully!</h3>
                    <p>{submitStatus.message}</p>
                    <button
                      className="close-btn"
                      onClick={() => setSubmitStatus(null)}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="contact-form animate-on-scroll">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Tell me about your project or just say hello..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-submit mt-4"
                  disabled={isSubmitting}
                  style={{
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span> Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        style={{ marginRight: "8px" }}
                      >
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block; margin-right: 8px;
        }

        .success-overlay {
          position: fixed; top:0;left:0;right:0;bottom:0;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(3px);
          z-index: 999; animation: fadeIn 0.3s ease;
        }
        .success-card {
          position: fixed; top:50%; left:50%;
          transform: translate(-50%,-50%);
          background:#fff; border-radius:16px;
          box-shadow:0 8px 30px rgba(0,0,0,0.15);
          text-align:center; padding:2rem 2.5rem;
          z-index:1000; max-width:400px; width:90%;
          animation: popIn 0.4s ease;
        }
        .success-icon {
          background:#22c55e1a;
          border-radius:50%;
          width:80px;height:80px;
          margin:0 auto 1rem;
          display:flex;align-items:center;justify-content:center;
        }
        .success-card h3 { color:#065f46;font-weight:700;margin-bottom:0.5rem; }
        .success-card p { color:#374151;font-size:0.95rem;margin-bottom:1.5rem; }
        .close-btn {
          background:#22c55e;color:#fff;border:none;border-radius:8px;
          padding:0.6rem 1.2rem;font-weight:500;cursor:pointer;
          transition:all 0.3s ease;
        }
        .close-btn:hover { background:#16a34a; transform:translateY(-2px); }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        @keyframes popIn {
          from {opacity:0;transform:translate(-50%,-55%) scale(0.95);}
          to {opacity:1;transform:translate(-50%,-50%) scale(1);}
        }
      `}</style>
    </section>
  );
};

export default Contact;
