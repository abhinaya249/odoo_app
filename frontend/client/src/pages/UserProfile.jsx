import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    location: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: [],
    isPublic: true,
  });
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get('http://10.4.1.43:5000/api/users/profile', {
          headers: { 'x-auth-token': token }
        });
        if (res.data) {
          setProfile(res.data);
          setEditedProfile({
            name: res.data.name || '',
            location: res.data.location || '',
            skillsOffered: res.data.skillsOffered || [],
            skillsWanted: res.data.skillsWanted || [],
            availability: res.data.availability || [],
            isPublic: res.data.isPublic !== undefined ? res.data.isPublic : true,
          });
          setPhotoUrl(res.data.profilePhoto || '');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.response?.data?.msg || 'Failed to fetch profile');
        if (err.response?.status === 401) navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const handleChange = (e) => {
    setEditedProfile(prev => prev ? { ...prev, [e.target.name]: e.target.value } : editedProfile);
  };

  const handleSkillChange = (field, value) => {
    setEditedProfile(prev => prev ? { ...prev, [field]: value.split(',').map(s => s.trim()) } : editedProfile);
  };

  const handleAvailabilityChange = (e) => {
    const { value, checked } = e.target;
    setEditedProfile(prev => prev ? {
      ...prev,
      availability: checked
        ? [...(prev.availability || []), value]
        : (prev.availability || []).filter(a => a !== value)
    } : editedProfile);
  };

  const handlePhotoAction = (action) => {
    if (action === 'add') setPhotoUrl(prompt('Enter photo URL') || '');
    if (action === 'remove') setPhotoUrl('');
  };

  const handleSave = async () => {
    if (!editedProfile) return alert('No profile to save');
    try {
      const res = await axios.put('http://10.4.1.43:5000/api/users/profile', { ...editedProfile, profilePhoto: photoUrl }, {
        headers: { 'x-auth-token': token }
      });
      setProfile(res.data);
      alert('Profile saved!');
      const updatedUsers = await axios.get('http://10.4.1.43:5000/api/users', { headers: { 'x-auth-token': token } });
      localStorage.setItem('users', JSON.stringify(updatedUsers.data));
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Error saving profile');
    }
  };

  const handleDiscard = () => {
    setEditedProfile(profile ? { ...profile } : {
      name: '',
      location: '',
      skillsOffered: [],
      skillsWanted: [],
      availability: [],
      isPublic: true,
    });
    setPhotoUrl(profile?.profilePhoto || '');
    alert('Changes discarded!');
  };

  const handleSwapRequest = () => {
    navigate('/detailed-profile');
  };

  const handleHome = () => {
    navigate('/');
  };

  if (loading) return <div style={{ backgroundColor: '#FFFFFF', color: '#0073B1', padding: '20px', textAlign: 'center', fontSize: '16px' }}>Loading...</div>;
  if (error) return <div style={{ backgroundColor: '#FFFFFF', color: '#0073B1', padding: '20px', textAlign: 'center', fontSize: '16px' }}>{error}</div>;

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '15px', color: '#333333', fontFamily: 'Roboto, Open Sans, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px', borderBottom: '2px solid #0073B1' }}>
        <h2 style={{ color: '#0073B1', fontSize: '24px', fontWeight: '700', margin: 0 }}>Edit Profile</h2>
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
            onClick={handleSave}
          >
            Save
          </button>
          <button
            style={{
              backgroundColor: '#FFFFFF',
              color: '#0073B1',
              border: '1px solid #D1D5DB',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background-color 0.3s, transform 0.2s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#E0E7FF';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#FFFFFF';
              e.target.style.transform = 'scale(1)';
            }}
            onClick={handleDiscard}
          >
            Discard
          </button>
        </div>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ backgroundColor: photoUrl ? '#D1D5DB' : '#F9FAFB', width: '120px', height: '120px', borderRadius: '10px', border: '2px solid #D1D5DB' }}>
              {photoUrl && <img src={photoUrl} alt="Profile" style={{ width: '120px', height: '120px', borderRadius: '10px' }} />}
            </div>
            <div style={{ marginTop: '10px', color: '#0073B1', fontSize: '14px' }}>
              <button onClick={() => handlePhotoAction('add')} style={{ border: 'none', background: 'none', color: '#0073B1', cursor: 'pointer', marginRight: '10px' }}>Add Photo</button>
              <button onClick={() => handlePhotoAction('remove')} style={{ border: 'none', background: 'none', color: '#0073B1', cursor: 'pointer' }}>Remove</button>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <input
              name="name"
              value={editedProfile.name || ''}
              onChange={handleChange}
              placeholder="Full Name"
              style={{ border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', width: '100%', fontSize: '16px' }}
            />
            <input
              name="location"
              value={editedProfile.location || ''}
              onChange={handleChange}
              placeholder="Location"
              style={{ border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', width: '100%', marginTop: '15px', fontSize: '16px' }}
            />
          </div>
        </div>
        <div>
          <label style={{ fontSize: '16px', color: '#333333', fontWeight: '500' }}>Skills Offered</label>
          <input
            value={(editedProfile.skillsOffered || []).join(', ') || ''}
            onChange={(e) => handleSkillChange('skillsOffered', e.target.value)}
            placeholder="e.g., Graphic Design, Photoshop"
            style={{ border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', width: '100%', marginTop: '10px', fontSize: '16px' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '16px', color: '#333333', fontWeight: '500' }}>Skills Wanted</label>
          <input
            value={(editedProfile.skillsWanted || []).join(', ') || ''}
            onChange={(e) => handleSkillChange('skillsWanted', e.target.value)}
            placeholder="e.g., Python, JavaScript"
            style={{ border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', width: '100%', marginTop: '10px', fontSize: '16px' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '16px', color: '#333333', fontWeight: '500' }}>Availability</label>
          <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['weekends', 'weekdays', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <label key={day} style={{ fontSize: '14px', color: '#333333' }}>
                <input
                  type="checkbox"
                  value={day}
                  checked={(editedProfile.availability || []).includes(day)}
                  onChange={handleAvailabilityChange}
                  style={{ marginRight: '5px' }}
                /> {day}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label style={{ fontSize: '16px', color: '#333333', fontWeight: '500' }}>Profile Visibility</label>
          <select
            name="isPublic"
            value={editedProfile.isPublic || true}
            onChange={handleChange}
            style={{ border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#333333', padding: '12px', borderRadius: '8px', width: '100%', marginTop: '10px', fontSize: '16px' }}
          >
            <option value={true}>Public</option>
            <option value={false}>Private</option>
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
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
              padding: '12px 25px',
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
            onClick={handleHome}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;