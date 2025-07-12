import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = token ? { 'x-auth-token': token } : {};
        const res = await axios.get('http://10.4.1.43:5000/api/users', { headers });
        if (res.data && Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          setUsers([]);
          console.warn('API response is not an array:', res.data);
        }
      } catch (err) {
        console.error('Error fetching users:', err.response?.data || err.message);
        setError('Failed to load users. Check your connection or token.');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
        }
      }
    };
    fetchUsers();
  }, [token]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');
  const handleSwapRequest = () => navigate('/swap-request');
  const handleProfile = () => navigate('/profile');

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '15px', minHeight: '100vh', color: '#333333' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px', borderBottom: '2px solid #0073B1' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#0073B1', width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}></div> {/* Logo Placeholder */}
          <h1 style={{ color: '#0073B1', fontSize: '24px', fontWeight: '700', margin: 0 }}>Skill Swap Pro</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by name or skill"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              border: '1px solid #D1D5DB',
              backgroundColor: '#F9FAFB',
              color: '#333333',
              padding: '10px',
              borderRadius: '8px',
              width: '250px',
              fontSize: '14px',
              marginRight: '10px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#0073B1')}
            onBlur={(e) => (e.target.style.borderColor = '#D1D5DB')}
          />
          {token ? (
            <div
              onClick={handleProfile}
              style={{
                backgroundColor: '#D1D5DB',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                marginRight: '10px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            ></div> // Profile Icon Placeholder
          ) : (
            <>
              <button
                onClick={handleLogin}
                style={{
                  backgroundColor: '#0073B1',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 15px',
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
              >
                Login
              </button>
              <button
                onClick={handleSignup}
                style={{
                  backgroundColor: '#0073B1',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 15px',
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
                Signup
              </button>
            </>
          )}
        </div>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredUsers.map(user => (
          <div
            key={user._id}
            style={{
              border: '1px solid #D1D5DB',
              borderRadius: '10px',
              padding: '15px',
              backgroundColor: '#E0E7FF',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
            onClick={() => navigate(`/detailed-profile/${user._id}`)}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ backgroundColor: '#D1D5DB', width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}></div>
              <div>
                <h3 style={{ color: '#0073B1', fontSize: '18px', margin: 0, fontWeight: '600' }}>{user.name}</h3>
                <p style={{ color: '#333333', fontSize: '14px', margin: '2px 0' }}>Skills: {user.skillsOffered.join(', ')}</p>
              </div>
            </div>
            <p style={{ color: '#666666', fontSize: '14px', margin: '5px 0' }}>Location: {user.location || 'Not specified'}</p>
            <button
              style={{
                backgroundColor: '#0073B1',
                color: '#FFFFFF',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
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
              Connect
            </button>
          </div>
        ))}
        {filteredUsers.length === 0 && (
          <p style={{ color: '#666666', textAlign: 'center', fontSize: '16px', padding: '20px' }}>
            {error || 'No users found.'}
          </p>
        )}
      </div>
      {token && (
        <button
          onClick={handleSwapRequest}
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
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
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
          Swap Request
        </button>
      )}
    </div>
  );
};

export default HomePage;