import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [editedProfile, setEditedProfile] = useState({});
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { 'x-auth-token': token }
      });
      setProfile(res.data);
      setEditedProfile(res.data);
      setPhotoUrl(res.data.profilePhoto || '');
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value.split(',').map(s => s.trim()) });
  };

  const handleAvailabilityChange = (e) => {
    const { value, checked } = e.target;
    setEditedProfile({
      ...editedProfile,
      availability: checked
        ? [...editedProfile.availability, value]
        : editedProfile.availability.filter(a => a !== value)
    });
  };

  const handlePhotoAction = (action) => {
    if (action === 'add') setPhotoUrl(prompt('Enter photo URL') || '');
    if (action === 'remove') setPhotoUrl('');
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    await axios.put('http://localhost:5000/api/users/profile', editedProfile, {
      headers: { 'x-auth-token': token }
    });
    setProfile(editedProfile);
    alert('Profile saved!');
  };

  const handleDiscard = () => {
    setEditedProfile({ ...profile });
    alert('Changes discarded!');
  };

  const handleSwapRequest = () => {
    navigate('/detailed-profile');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div style={{ background: '#000000', padding: '20px', border: '2px solid #FFFFFF', borderRadius: '10px', color: '#FFFFFF' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <button style={{ color: '#00FF00', border: 'none', background: 'none', cursor: 'pointer' }} onClick={handleSave}>Save</button>
          <button style={{ color: '#FF0000', border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px' }} onClick={handleDiscard}>Discard</button>
        </div>
        <div>
          <button style={{ color: '#FFFFFF', border: 'none', background: 'none', cursor: 'pointer', marginRight: '10px' }} onClick={handleSwapRequest}>Swap request</button>
          <button style={{ color: '#FFFFFF', border: 'none', background: 'none', cursor: 'pointer' }} onClick={handleHome}>Home</button>
          <div style={{ display: 'inline-block', background: '#800080', width: '40px', height: '40px', borderRadius: '50%', marginLeft: '10px' }}></div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '20px' }}>
            <label>Name</label>
            <input name="name" value={editedProfile.name || ''} onChange={handleChange} style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', width: '200px', marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Location</label>
            <input name="location" value={editedProfile.location || ''} onChange={handleChange} style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', width: '200px', marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Skills Offered</label>
            {(editedProfile.skillsOffered || []).map((skill, index) => (
              <span key={index} style={{ border: '2px solid #FFFFFF', borderRadius: '15px', padding: '5px 10px', margin: '0 5px', background: '#000000', color: '#00FF00' }}>
                {skill}
              </span>
            ))}
            <input
              value={(editedProfile.skillsOffered || []).join(', ') || ''}
              onChange={(e) => handleSkillChange('skillsOffered', e.target.value)}
              style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', width: '200px', marginLeft: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Skills Wanted</label>
            {(editedProfile.skillsWanted || []).map((skill, index) => (
              <span key={index} style={{ border: '2px solid #FFFFFF', borderRadius: '15px', padding: '5px 10px', margin: '0 5px', background: '#000000', color: '#0000FF' }}>
                {skill}
              </span>
            ))}
            <input
              value={(editedProfile.skillsWanted || []).join(', ') || ''}
              onChange={(e) => handleSkillChange('skillsWanted', e.target.value)}
              style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', width: '200px', marginLeft: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Availability</label>
            {['weekends', 'weekdays', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <label key={day} style={{ marginLeft: '10px' }}>
                <input
                  type="checkbox"
                  value={day}
                  checked={(editedProfile.availability || []).includes(day)}
                  onChange={handleAvailabilityChange}
                /> {day}
              </label>
            ))}
          </div>
          <div>
            <label>Profile</label>
            <select name="isPublic" value={editedProfile.isPublic || true} onChange={handleChange} style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', marginLeft: '10px' }}>
              <option value={true}>Public</option>
              <option value={false}>Private</option>
            </select>
          </div>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <div style={{ background: photoUrl ? '#CCCCCC' : '#000000', width: '100px', height: '100px', borderRadius: '50%', border: '2px solid #FFFFFF', position: 'relative' }}>
            {photoUrl && <img src={photoUrl} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
          </div>
          <div style={{ color: '#FF0000', marginTop: '10px' }}>
            <button onClick={() => handlePhotoAction('add')} style={{ border: 'none', background: 'none', color: '#FF0000', cursor: 'pointer' }}>Add</button>
            <button onClick={() => handlePhotoAction('edit')} style={{ border: 'none', background: 'none', color: '#FF0000', cursor: 'pointer', marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handlePhotoAction('remove')} style={{ border: 'none', background: 'none', color: '#FF0000', cursor: 'pointer', marginLeft: '10px' }}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;