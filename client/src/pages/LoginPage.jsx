import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Placeholder for login logic
    alert('Login functionality to be implemented!');
    navigate('/');
  };

  return (
    <div style={{ background: '#000000', padding: '20px', border: '2px solid #FFFFFF', borderRadius: '10px', color: '#FFFFFF', textAlign: 'center' }}>
      <h1>Login Page</h1>
      <button
        style={{ border: '2px solid #FFFFFF', background: '#FFFFFF', color: '#000000', padding: '10px 20px', borderRadius: '15px', marginTop: '20px' }}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;