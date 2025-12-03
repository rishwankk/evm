import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, RotateCcw } from 'lucide-react'; 
import firoz from '../assets/firoz.jpeg'; 
import shahina from '../assets/shahina.png';
import safeer from '../assets/safeer.png';

const CandidateCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { candidate, section } = location.state || {};

  useEffect(() => {
    if (!candidate) {
      navigate('/', { replace: true });
    }
  }, [candidate, navigate]);

  if (!candidate) return null;

  // --- Image Logic ---
  const photos = {
    ward: firoz,
    block: safeer,
    district: shahina,
  };

  const candidatePhoto =
    candidate.photo ||
    photos[(candidate.level || '').toLowerCase()] ||
    (candidate.name && candidate.name.toLowerCase().includes('ഫിറോസ്') ? firoz :
     candidate.name && candidate.name.toLowerCase().includes('സഫീർ') ? safeer :
     candidate.name && candidate.name.toLowerCase().includes('ഷാഹിന') ? shahina :
     firoz);

  const symbolSrc = candidate.symbol || null;

  // --- Ordinal Logic ---
  const malayalamOrdinal = (n) => {
    const num = Number(n) || 0;
    const map = {
        1: 'ഒന്നാമത്', 2: 'രണ്ടാമത്', 3: 'മൂന്നാമത്', 4: 'നാലാമത്',
        5: 'അഞ്ചാമത്', 6: 'ആറാമത്', 7: 'ഏഴാമത്', 8: 'എട്ടാമത്', 9: 'ഒമ്പതാമത്', 10: 'പത്താമത്'
    };
    return map[num] || (num > 0 ? `${num}-ആം` : '---');
  };

  const ordinalText = malayalamOrdinal(candidate.id || candidate.rank || 0);

  return (
    <div className="main-container">
      
      <div className="poster-frame">
        {/* Green Curved Top */}
        <div className="poster-top-pattern"></div>

        <div className="poster-content">
          
          {/* Slogan */}
          <div className="slogan-box">
             <p className="slogan-sub">വോട്ടിംഗ് മെഷീനിൽ <span className="highlight-gold">{ordinalText}</span></p>
             <h1 className="slogan-main">ജനമനസ്സുകളിൽ ഒന്നാമത്</h1>
          </div>

          {/* Photo + Voted Badge */}
          <div className="photo-wrapper">
            <div className="photo-ring">
              <img src={candidatePhoto} alt={candidate.name} className="profile-pic" />
            </div>
            <div className="status-badge">
                <div className="check-circle">
                    <Check size={16} strokeWidth={4} />
                </div>
                <span>VOTED</span>
            </div>
          </div>

          {/* Details */}
          <div className="info-section">
            <h2 className="name-text">{candidate.name}</h2>
            
            <div className="divider-line">
                <span className="star-icon">★</span>
            </div>
            
            <div className="meta-tags">
                 <span className="sub-text">{candidate.sub || "WARD MEMBER"}</span>
                 {section && <span className="section-pill">{section}</span>}
            </div>
          </div>

          {/* Symbol */}
          {symbolSrc && (
            <div className="symbol-box">
                <img src={symbolSrc} alt="Election Symbol" className="symbol-img" />
            </div>
          )}
        </div>
        
        {/* Green Bottom Bar */}
        <div className="poster-bottom-bar"></div>
      </div>

      <button className="retry-btn" onClick={() => navigate('/')}>
        <RotateCcw size={18} />
        <span>Vote Another Person</span>
      </button>

    </div>
  );
};

export default CandidateCard;