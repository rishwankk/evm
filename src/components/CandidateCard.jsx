import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import firoz from '../assets/firoz.jpeg'; 
import shahina from '../assets/shahina.png'
import safeer from '../assets/safeer.png';

const CandidateCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { candidate, section } = location.state || {};

  useEffect(() => {
    // SECURITY: If user tries to open this page directly, send them Home
    if (!candidate) {
      navigate('/', { replace: true });
    }
  }, [candidate, navigate]);

  if (!candidate) return null;

  // Map levels to photos (ward -> firoz, block -> safeer, district -> shahina)
  const photos = {
    ward: firoz,
    block: safeer,
    district: shahina,
  };

  // pick photo: explicit candidate.photo > level mapping > name heuristic > default (firoz)
  const candidatePhoto =
    candidate.photo ||
    photos[(candidate.level || '').toLowerCase()] ||
    (candidate.name && candidate.name.toLowerCase().includes('ഫിറോസ് ഖാൻ കരിമ്പിൽ') ? firoz :
     candidate.name && candidate.name.toLowerCase().includes('സഫീർ') ? safeer :
     candidate.name && candidate.name.toLowerCase().includes('ഷാഹിന') ? shahina :
     firoz);

  // use provided symbol else nothing (adjust if you have a default symbol asset)
  const symbolSrc = candidate.symbol || null;

  // Malayalam ordinal helper
  const malayalamOrdinal = (n) => {
    const num = Number(n) || 0;
    switch (num) {
      case 1: return 'ഒന്നാമത്';
      case 2: return 'രണ്ടാമത്';
      case 3: return 'മൂന്നാമത്';
      case 4: return 'നാലാമത്';
      case 5: return 'അഞ്ചാമത്';
      case 6: return 'ആറാമത്';
      case 7: return 'ഏഴാമത്';
      case 8: return 'എട്ടാമത്';
      case 9: return 'ഒമ്പതാമത്';
      case 10: return 'പത്താമത്';
      default: return num > 0 ? `${num}-ആം` : '---';
    }
  };

  const ordinalText = malayalamOrdinal(candidate.id || candidate.rank || 0);

  return (
    <div className="container profile-wrapper">
      <div className="slogan">
        വോട്ടിംഗ് മെഷീനിൽ {ordinalText},<br/>
        ജനമനസ്സുകളിൽ {ordinalText}
      </div>

      <div className="card">
        {/* Photo */}
        <div className="card-header-image">
             <img src={candidatePhoto} alt={candidate.name || "Candidate"} className="candidate-photo" />
        </div>

        {/* Badge */}
        <div className="voted-badge">
          <span>Voted {section}</span> <Check size={16} />
        </div>

        {/* Text */}
        <div className="card-body">
          <h2 className="result-name">{candidate.name}</h2>
          <p className="result-sub">{candidate.sub || "WARD 9"}</p>

          {symbolSrc && (
            <img 
              src={symbolSrc} 
              alt="Symbol" 
              className="big-symbol" 
            />
          )}
        </div>
      </div>

      <button className="ribbon-btn" onClick={() => navigate('/')}>
        Vote Again
      </button>
    </div>
  );
};

export default CandidateCard;