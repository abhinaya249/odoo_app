import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SwapRequestForm from './SwapRequestForm';

const DetailedUserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get(`http://10.4.1.43:5000/api/users/${id}`, {
          headers: { 'x-auth-token': token }
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        if (err.response?.status === 401) navigate('/login');
        else if (err.response?.status === 404) alert('User not found or profile is private');
      }
    };
    fetchUser();
  }, [id, token, navigate]);

  const handleHome = () => {
    navigate('/');
  };

  const handleSwapRequest = () => {
    navigate('/swap-request');
  };

  const handleRatingFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  const handleFeedbackSubmit = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await axios.post(`http://10.4.1.43:5000/api/users/${id}/feedback`, { feedback, rating }, {
        headers: { 'x-auth-token': token }
      });
      alert('Feedback submitted!');
      setShowFeedback(false);
      setFeedback('');
      setRating(0);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('Error submitting feedback');
    }
  };

  const handleRequest = () => {
    setShowRequestForm(true);
  };

  const closeRequestForm = () => {
    setShowRequestForm(false);
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '15px', color: '#333333', fontFamily: 'Roboto, Open Sans, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px', borderBottom: '2px solid #0073B1' }}>
        <h2 style={{ color: '#0073B1', fontSize: '24px', fontWeight: '700', margin: 0 }}>User Profile</h2>
        <div>
          <button
            style={{
              backgroundColor: '#0073B1',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              marginRight: '10px',
              transition: 'background-color 0.3s, transform 0.2s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#005F99';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#0073B1';
              e.target.style.transform = 'scale(1)';
            }}
            onClick={handleSwapRequest}
          >
            Swap Request
          </button>
          <button
            style={{
              backgroundColor: '#0073B1',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background-color 0.3s, transform 0.2s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#005F99';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#0073B1';
              e.target.style.transform = 'scale(1)';
            }}
            onClick={handleHome}
          >
            Home
          </button>
        </div>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <div style={{ backgroundColor: '#D1D5DB', width: '150px', height: '150px', borderRadius: '10px', marginBottom: '20px', border: '2px solid #D1D5DB' }}></div>
        <h3 style={{ color: '#0073B1', fontSize: '24px', margin: '10px 0', fontWeight: '700' }}>{user.name}</h3>
        <p style={{ color: '#666666', fontSize: '16px', margin: '5px 0' }}>Location: {user.location || 'Not specified'}</p>
        <p style={{ color: '#666666', fontSize: '16px', margin: '5px 0' }}>Skills Offered: {user.skillsOffered?.join(', ') || 'N/A'}</p>
        <p style={{ color: '#666666', fontSize: '16px', margin: '5px 0' }}>Skills Wanted: {user.skillsWanted?.join(', ') || 'N/A'}</p>
        <button
          style={{
            backgroundColor: '#0073B1',
            color: '#FFFFFF',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            marginTop: '20px',
            transition: 'background-color 0.3s, transform 0.2s',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#005F99';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#0073B1';
            e.target.style.transform = 'scale(1)';
          }}
          onClick={handleRatingFeedback}
        >
          Add Feedback
        </button>
        {showFeedback && (
          <div style={{ marginTop: '20px', width: '100%', maxWidth: '400px', backgroundColor: '#F9FAFB', padding: '20px', borderRadius: '10px', border: '1px solid #D1D5DB' }}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback"
              style={{ width: '100%', height: '100px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }}
            />
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Math.min(5, Math.max(0, e.target.value)))}
              min="0"
              max="5"
              placeholder="Rating (0-5)"
              style={{ marginTop: '15px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', width: '100%', fontSize: '14px' }}
            />
            <button
              onClick={handleFeedbackSubmit}
              style={{
                backgroundColor: '#0073B1',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                marginTop: '15px',
                transition: 'background-color 0.3s, transform 0.2s',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#005F99';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#0073B1';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Submit Feedback
            </button>
          </div>
        )}
        <button
          onClick={handleRequest}
          style={{
            backgroundColor: '#0073B1',
            color: '#FFFFFF',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            marginTop: '20px',
            transition: 'background-color 0.3s, transform 0.2s',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#005F99';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#0073B1';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Send Swap Request
        </button>
        {showRequestForm && <SwapRequestForm onClose={closeRequestForm} targetUser={user} />}
      </div>
    </div>
  );
};

export default DetailedUserProfile;