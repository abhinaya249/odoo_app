import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SwapRequestDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/swap-requests', {
        headers: { 'x-auth-token': token },
        params: { status: statusFilter !== 'All' ? statusFilter : undefined }
      });
      setRequests(res.data);
      setFilteredRequests(res.data);
    };
    fetchRequests();
  }, [statusFilter]);

  useEffect(() => {
    filterRequests();
  }, [searchTerm, requests]);

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
    if (searchTerm) {
      filtered = filtered.filter(req => req.requester.name.toLowerCase().includes(searchTerm.toLowerCase()) || req.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredRequests(filtered);
  };

  const handleAccept = async (id) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/swap-requests/${id}`, { status: 'Accepted' }, {
      headers: { 'x-auth-token': token }
    });
    setRequests(requests.map(req => req._id === id ? { ...req, status: 'Accepted' } : req));
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/swap-requests/${id}`, { status: 'Rejected' }, {
      headers: { 'x-auth-token': token }
    });
    setRequests(requests.map(req => req._id === id ? { ...req, status: 'Rejected' } : req));
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
        <div key={req._id} style={{ border: '2px solid #FFFFFF', padding: '10px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ background: '#CCCCCC', width: '80px', height: '80px', borderRadius: '50%', marginRight: '20px' }}></div>
            <div>
              <h4 style={{ margin: '0 0 10px' }}>{req.requester.name}</h4>
              <p style={{ color: '#00FF00', margin: '0' }}>Skills Offered: {req.skillOffered}</p>
              <p style={{ color: '#0000FF', margin: '5px 0' }}>Skill Wanted: {req.skillWanted}</p>
              <p style={{ margin: '5px 0' }}>rating {req.requester.rating || 0}/5</p>
            </div>
          </div>
          <div>
            <p style={{ color: req.status === 'Rejected' ? '#FF0000' : '#FFFFFF', margin: '0' }}>Status: {req.status}</p>
            {req.status === 'Pending' && (
              <div>
                <button
                  style={{ background: '#00FF00', color: '#FFFFFF', border: '2px solid #FFFFFF', padding: '5px 15px', borderRadius: '5px', marginRight: '10px' }}
                  onClick={() => handleAccept(req._id)}
                >
                  Accept
                </button>
                <button
                  style={{ background: '#FF0000', color: '#FFFFFF', border: '2px solid #FFFFFF', padding: '5px 15px', borderRadius: '5px' }}
                  onClick={() => handleReject(req._id)}
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