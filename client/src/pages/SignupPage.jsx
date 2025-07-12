import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Signup successful! (Backend to be added)');
    navigate('/');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div style={{ background: '#000000', padding: '20px', border: '2px solid #FFFFFF', borderRadius: '10px', color: '#FFFFFF', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: '0' }}>Skill Swap Platform</h1>
        <button
          style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', padding: '5px 15px', borderRadius: '15px' }}
          onClick={handleHomeClick}
        >
          Home
        </button>
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', padding: '5px', margin: '10px 0', display: 'block', width: '200px', marginLeft: 'auto', marginRight: 'auto' }}
        />
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', padding: '5px', margin: '10px 0', display: 'block', width: '200px', marginLeft: 'auto', marginRight: 'auto' }}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', padding: '5px', margin: '10px 0', display: 'block', width: '200px', marginLeft: 'auto', marginRight: 'auto' }}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', padding: '5px', margin: '10px 0', display: 'block', width: '200px', marginLeft: 'auto', marginRight: 'auto' }}
        />
        <button
          style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', padding: '5px 15px', borderRadius: '15px', margin: '10px' }}
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default SignupPage;