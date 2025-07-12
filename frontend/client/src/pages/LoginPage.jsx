import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post('http://10.4.1.43:5000/api/auth/login', { email: formData.email, password: formData.password });
        localStorage.setItem('token', res.data.token);
        setMessage('Logged in successfully!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        const res = await axios.post('http://10.4.1.43:5000/api/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          location: '',
          skillsOffered: [],
          skillsWanted: [],
          availability: [],
          isPublic: true,
        });
        localStorage.setItem('token', res.data.token);
        setMessage('Signed up successfully!');
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.msg || 'Something went wrong'));
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', fontFamily: 'Roboto, Open Sans, sans-serif' }}>
      <div style={{ border: '1px solid #D1D5DB', borderRadius: '10px', padding: '25px', width: '320px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#0073B1', fontSize: '28px', textAlign: 'center', marginBottom: '20px', fontWeight: '700' }}>Skill Swap Pro</h2>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            backgroundColor: '#F9FAFB',
            color: '#0073B1',
            border: '1px solid #D1D5DB',
            padding: '10px',
            borderRadius: '8px',
            width: '100%',
            marginBottom: '15px',
            fontSize: '14px',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#E0E7FF')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#F9FAFB')}
        >
          Switch to {isLogin ? 'Sign Up' : 'Login'}
        </button>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {!isLogin && (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              style={{ border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', fontSize: '14px' }}
              required
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email or Phone"
            style={{ border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', fontSize: '14px' }}
            required
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={{ border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', fontSize: '14px' }}
            required
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#0073B1',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
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
            {isLogin ? 'Sign In' : 'Join Now'}
          </button>
        </form>
        {message && <p style={{ color: message.includes('successfully') ? '#008000' : '#FF0000', textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;