import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      // Fetch updated user list to reflect new user
      const updatedUsers = await axios.get('http://10.4.1.43:5000/api/users', {
        headers: { 'x-auth-token': res.data.token }
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers.data)); // Optional: Cache for immediate display
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.msg || 'Something went wrong'));
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', fontFamily: 'Roboto, Open Sans, sans-serif' }}>
      <div style={{ border: '1px solid #D1D5DB', borderRadius: '10px', padding: '25px', width: '320px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#0073B1', fontSize: '28px', textAlign: 'center', marginBottom: '20px', fontWeight: '700' }}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            style={{ border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', fontSize: '16px' }}
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            style={{ border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', fontSize: '16px' }}
            required
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={{ border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', fontSize: '16px' }}
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
            Sign Up
          </button>
        </form>
        {message && <p style={{ color: message.includes('successfully') ? '#008000' : '#FF0000', textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>{message}</p>}
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#666666' }}>
          Already have an account? <button onClick={() => navigate('/login')} style={{ color: '#0073B1', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '500' }}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;