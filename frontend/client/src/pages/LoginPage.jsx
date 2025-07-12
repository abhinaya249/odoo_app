import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      navigate('/profile');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div style={{ background: '#000000', color: '#FFFFFF', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input name="email" value={credentials.email} onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" value={credentials.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;