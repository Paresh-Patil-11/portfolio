import React, { useState, useEffect } from 'react';

// Use a consistent session key name
const SESSION_KEY = 'portfolio_viewed'; 
// The API URL will automatically use the environment variable on deployment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Footer = () => {
  const [viewCount, setViewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Function to fetch the current view count
  const fetchAndSetViewCount = async () => {
    try {
      const response = await fetch(`${API_URL}/api/views`);
      const data = await response.json();
      
      if (data.success) {
        // Always display the count from the server
        setViewCount(data.views);
        return data.views; // Return the count for use in the next step
      } else {
        console.error('Failed to fetch view count:', data.message);
        setViewCount('--'); 
      }
    } catch (error) {
      console.error('Error fetching view count:', error);
      setViewCount('--'); 
    }
    return 0; // Return 0 or any fallback on failure
  };

  // Function to conditionally increment the view count
  const attemptIncrementView = async () => {
    // Check if user has already been counted in this session
    const hasViewed = sessionStorage.getItem(SESSION_KEY);
    
    if (!hasViewed) {
      try {
        const response = await fetch(`${API_URL}/api/views/increment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        
        if (data.success) {
          // If increment succeeds, update the count state and session storage
          setViewCount(data.views);
          sessionStorage.setItem(SESSION_KEY, 'true');
        } else {
          console.error('Failed to increment view count:', data.message);
        }
      } catch (error) {
        console.error('Error incrementing view count:', error);
      }
    }
  };

  useEffect(() => {
    const initializeViews = async () => {
      // 1. Fetch the current view count immediately to show a count while the user is viewing
      await fetchAndSetViewCount();
      
      // 2. Only if not viewed in this session, attempt to increment
      await attemptIncrementView();

      // 3. Stop loading once both operations are done
      setLoading(false);
    };

    initializeViews();
    // Empty dependency array ensures this runs only ONCE after the initial render
  }, []);

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          {/* View Counter */}
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

        .footer-content {
          padding: 2rem 0;
        }

        .view-counter:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid var(--border-light);
        }

        .copyright {
          color: var(--text-muted);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
        }

        @media (min-width: 768px) {
          .copyright {
            justify-content: flex-start;
          }
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .social-links {
            justify-content: flex-end;
          }
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          border-radius: 50%;
          text-decoration: none;
          transition: all var(--transition-normal);
          border: 1px solid var(--border-color);
        }

        .social-links a:hover {
          background: var(--primary);
          color: var(--text-white);
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary);
        }

        .social-links i {
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .view-counter {
            font-size: 1rem !important;
            padding: 1.25rem !important;
            margin-bottom: 2rem !important;
          }

          .footer-bottom {
            text-align: center;
          }

          .copyright {
            font-size: 0.85rem;
          }

          .social-links a {
            width: 36px;
            height: 36px;
          }

          .social-links i {
            font-size: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;