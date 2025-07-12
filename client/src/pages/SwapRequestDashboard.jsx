import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SwapRequestDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([
    { id: 1, name: 'Marc Demo', skillsOffered: ['Java Script'], skillsWanted: ['Photoshop'], rating: 3.4, status: 'Pending' },
    { id: 2, name: 'John Doe', skillsOffered: ['Python'], skillsWanted: ['Graphic Design'], rating: 3.4, status: 'Rejected' },
  ]);
  const [filteredRequests, setFilteredRequests] = useState([...requests]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    filterRequests();
  }, [statusFilter, searchTerm, requests]);

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterRequests = () => {
    let filtered = [...requests];
    if (statusFilter !== 'All') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(req => req.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredRequests(filtered);
  };

  const handleAccept = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'Accepted' } : req));
  };

  const handleReject = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
  };

  return (
    <div style={{ background: '#000000', padding: '20px', border: '2px solid #FFFFFF', borderRadius: '10px', color: '#FFFFFF', textAlign: 'center' }}>
      <h3>Skill Swap Platform</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button style={{ color: '#FFFFFF', border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => navigate('/')}>Home</button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <select value={statusFilter} onChange={handleStatusFilter} style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', padding: '5px', marginRight: '10px' }}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={handleSearch}
            style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', padding: '5px' }}
          />
        </div>
        <div style={{ background: '#800080', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }} onClick={handleProfile}></div>
      </div>
      {filteredRequests.map((req) => (
        <div key={req.id} style={{ border: '2px solid #FFFFFF', padding: '10px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ background: '#CCCCCC', width: '80px', height: '80px', borderRadius: '50%', marginRight: '20px' }}></div>
            <div>
              <h4 style={{ margin: '0 0 10px' }}>{req.name}</h4>
              <p style={{ color: '#00FF00', margin: '0' }}>Skills Offered: {req.skillsOffered.join(', ')}</p>
              <p style={{ color: '#0000FF', margin: '5px 0' }}>Skill Wanted: {req.skillsWanted.join(', ')}</p>
              <p style={{ margin: '5px 0' }}>rating {req.rating}/5</p>
            </div>
          </div>
          <div>
            <p style={{ color: req.status === 'Rejected' ? '#FF0000' : '#FFFFFF', margin: '0' }}>Status: {req.status}</p>
            {req.status === 'Pending' && (
              <div>
                <button
                  style={{ background: '#00FF00', color: '#FFFFFF', border: '2px solid #FFFFFF', padding: '5px 15px', borderRadius: '5px', marginRight: '10px' }}
                  onClick={() => handleAccept(req.id)}
                >
                  Accept
                </button>
                <button
                  style={{ background: '#FF0000', color: '#FFFFFF', border: '2px solid #FFFFFF', padding: '5px 15px', borderRadius: '5px' }}
                  onClick={() => handleReject(req.id)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <span style={{ color: '#FFFFFF', fontSize: '14px' }}> 1 2 3 </span>
      </div>
    </div>
  );
};

export default SwapRequestDashboard;