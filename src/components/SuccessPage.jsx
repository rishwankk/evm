import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { candidate, section } = location.state || {};

  useEffect(() => {
    // 1. SECURITY: If no vote data, kick back to Home
    if (!candidate) {
      navigate('/', { replace: true });
      return;
    }

    // 2. TIMER: Wait 3 seconds, then go to Result Page
    const timer = setTimeout(() => {
      // 'replace: true' prevents user from going 'Back' to this animation
      navigate('/result', { 
        state: { candidate, section }, 
        replace: true 
      });
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate, candidate, section]);

  // Prevent flash if redirecting
  if (!candidate) return null;

  return (
    <div className="container">
      <div className="success-screen">
        <CheckCircle size={80} color="#28a745" className="spinner-check" />
        <h2 className="success-text">Vote Successfully Completed</h2>
        <p className="malayalam-sub">നിങ്ങളുടെ വോട്ട് വിജയകരമായി പൂർത്തിയായി</p>
      </div>
    </div>
  );
};

export default SuccessPage;