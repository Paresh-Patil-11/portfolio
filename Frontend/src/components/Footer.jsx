import React, { useState, useEffect } from 'react';

// Session key to prevent double counting per browser session
const SESSION_KEY = 'portfolio_viewed';

// API URL from environment variables or fallback to your deployed backend
const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-bvnu.onrender.com';

const Footer = () => {
  const [viewCount, setViewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch current view count
  const fetchViewCount = async () => {
    try {
      const res = await fetch(`${API_URL}/api/views`);
      const data = await res.json();
      if (data.success) {
        setViewCount(data.views);
        return data.views;
      } else {
        console.error('Failed to fetch views:', data.message);
        setViewCount(0);
        return 0;
      }
    } catch (err) {
      console.error('Error fetching views:', err);
      setViewCount(0);
      return 0;
    }
  };

  // Increment view count if user hasn’t been counted in this session
  const incrementViewCount = async () => {
    const hasViewed = sessionStorage.getItem(SESSION_KEY);
    if (!hasViewed) {
      try {
        const res = await fetch(`${API_URL}/api/views/increment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (data.success) {
          setViewCount(data.views);
          sessionStorage.setItem(SESSION_KEY, 'true');
        } else {
          console.error('Failed to increment views:', data.message);
        }
      } catch (err) {
        console.error('Error incrementing views:', err);
      }
    }
  };

  useEffect(() => {
    const initializeViews = async () => {
      await fetchViewCount();
      await incrementViewCount();
      setLoading(false);
    };
    initializeViews();
  }, []);

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div
            className="view-counter"
            style={{
              fontFamily: "Georgia",
              padding: '1.5rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              borderRadius: '12px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-color)',
              maxWidth: '400px',
              margin: '0 auto 3rem',
              fontSize: '1.2rem',
              fontWeight: '500',
              transition: 'all var(--transition-normal)',
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span className="loading-spinner" style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid var(--border-color)',
                  borderTop: '2px solid var(--primary)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}></span>
                Loading views...
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <span>
                  <strong>{viewCount.toLocaleString()}</strong> {viewCount === 1 ? 'view' : 'views'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .footer-content { padding: 2rem 0; }
        .view-counter:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
      `}</style>
    </footer>
  );
};

export default Footer;
