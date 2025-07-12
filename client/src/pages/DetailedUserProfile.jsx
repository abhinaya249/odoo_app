import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DetailedUserProfile = () => {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleHome = () => {
    navigate('/');
  };

  const handleSwapRequest = () => {
    alert('Swap request page to be added soon!');
    // Placeholder for future navigation to /swap-request
  };

  const handleRatingFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  const handleFeedbackSubmit = () => {
    alert(`Feedback submitted: ${feedback}, Rating: ${rating}/5`);
    setShowFeedback(false);
    setFeedback('');
    setRating(0);
  };

  const handleRequest = () => {
    navigate('/request'); // Placeholder for future request page
  };

  return (
    <div style={{ background: '#000000', padding: '20px', border: '2px solid #FFFFFF', borderRadius: '10px', color: '#FFFFFF', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Skill Swap Platform</h2>
        <div>
          <button style={{ color: '#FFFFFF', border: 'none', background: 'none', cursor: 'pointer', marginRight: '10px' }} onClick={handleSwapRequest}>Swap request</button>
          <button style={{ color: '#FFFFFF', border: 'none', background: 'none', cursor: 'pointer' }} onClick={handleHome}>Home</button>
          <div style={{ display: 'inline-block', background: '#800080', width: '40px', height: '40px', borderRadius: '50%', marginLeft: '10px' }}></div>
        </div>
      </div>
      <h3>Marc Demo</h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ background: '#CCCCCC', width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }}></div>
      </div>
      <p>Skills Offered</p>
      <p>Skills wanted</p>
      <p onClick={handleRatingFeedback} style={{ cursor: 'pointer' }}>Rating and Feedback</p>
      {showFeedback && (
        <div style={{ marginTop: '20px' }}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback"
            style={{ width: '100%', height: '100px', background: '#000000', color: '#FFFFFF', border: '2px solid #FFFFFF', borderRadius: '5px' }}
          />
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Math.min(5, Math.max(0, e.target.value)))}
            min="0"
            max="5"
            style={{ marginTop: '10px', background: '#000000', color: '#FFFFFF', border: '2px solid #FFFFFF', borderRadius: '5px' }}
          /> / 5
          <button
            onClick={handleFeedbackSubmit}
            style={{ marginTop: '10px', background: '#008080', color: '#FFFFFF', border: '2px solid #FFFFFF', padding: '5px 15px', borderRadius: '5px' }}
          >
            Submit
          </button>
        </div>
      )}
      <button
        onClick={handleRequest}
        style={{ background: '#008080', color: '#FFFFFF', border: '2px solid #FFFFFF', padding: '5px 15px', borderRadius: '5px', marginTop: '20px' }}
      >
        Request
      </button>
    </div>
  );
};

export default DetailedUserProfile;