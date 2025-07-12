import React from 'react';
import { useNavigate } from 'react-router-dom';

const SwapRequestDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '15px', color: '#333333', fontFamily: 'Roboto, Open Sans, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px', borderBottom: '2px solid #0073B1' }}>
        <h2 style={{ color: '#0073B1', fontSize: '24px', fontWeight: '700', margin: 0 }}>Swap Requests</h2>
        <button
          onClick={() => navigate('/')}
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
        >
          Back to Home
        </button>
      </header>
      <p style={{ fontSize: '16px' }}>Swap request functionality to be implemented.</p>
    </div>
  );
};

export default SwapRequestDashboard;