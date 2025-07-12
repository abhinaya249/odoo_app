import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SwapRequestForm = ({ onClose, targetUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skillOffered: '',
    skillWanted: '',
    message: ''
  });
  const [userSkills, setUserSkills] = useState([]);
  const [targetWantedSkills, setTargetWantedSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const token = localStorage.getItem('token');
      const userRes = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { 'x-auth-token': token }
      });
      setUserSkills(userRes.data.skillsOffered || []);
      setTargetWantedSkills(targetUser.skillsWanted || []);
    };
    fetchSkills();
  }, [targetUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/swap-requests', {
      ...formData,
      recipientId: targetUser._id
    }, { headers: { 'x-auth-token': token } });
    alert('Request submitted!');
    onClose();
    navigate('/swap-request');
  };

  return (
    <div style={{ background: '#000000', padding: '20px', border: '2px solid #FFFFFF', borderRadius: '10px', color: '#FFFFFF', textAlign: 'center', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
      <h3>Swap Request Form</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ marginBottom: '10px' }}>Choose one of your offered skills</label>
        <select
          name="skillOffered"
          value={formData.skillOffered}
          onChange={handleChange}
          style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', width: '250px', height: '30px', marginBottom: '20px' }}
          required
        >
          <option value="">Select a skill</option>
          {userSkills.map((skill, index) => (
            <option key={index} value={skill}>{skill}</option>
          ))}
        </select>
        <label style={{ marginBottom: '10px' }}>Choose one of their wanted skills</label>
        <select
          name="skillWanted"
          value={formData.skillWanted}
          onChange={handleChange}
          style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', width: '250px', height: '30px', marginBottom: '20px' }}
          required
        >
          <option value="">Select a skill</option>
          {targetWantedSkills.map((skill, index) => (
            <option key={index} value={skill}>{skill}</option>
          ))}
        </select>
        <label style={{ marginBottom: '10px' }}>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Add a message"
          style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', width: '250px', height: '100px', marginBottom: '20px' }}
        />
        <button
          type="submit"
          style={{ background: '#008080', color: '#FFFFFF', border: '2px solid #FFFFFF', padding: '5px 15px', borderRadius: '5px' }}
        >
          Submit
        </button>
      </form>
      <button
        onClick={onClose}
        style={{ marginTop: '10px', background: '#FF0000', color: '#FFFFFF', border: '2px solid #FFFFFF', padding: '5px 15px', borderRadius: '5px' }}
      >
        Close
      </button>
    </div>
  );
};

export default SwapRequestForm;