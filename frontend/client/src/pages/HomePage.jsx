import React, { useState } from 'react';
import Header from '../components/Header';
import UserCard from '../components/UserCard';

const HomePage = () => {
  const [users, setUsers] = useState([
    { name: 'Marc Demo', skillsOffered: ['Java Script', 'Python'], skillsWanted: ['Photoshop', 'Graphic designer'], rating: 3.4 },
    { name: 'Mitchell', skillsOffered: ['Java Script', 'Python'], skillsWanted: ['Photoshop', 'Graphic designer'], rating: 2.5 },
    { name: 'Joe wills', skillsOffered: ['Java Script', 'Python'], skillsWanted: ['Photoshop', 'Graphic designer'], rating: 4.0 },
  ]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (searchTerm) => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleRequest = (name) => {
    alert(`Request sent to ${name}!`); // Placeholder for request logic
  };

  return (
    <div style={{ background: '#000000', padding: '20px', border: '2px solid #FFFFFF', borderRadius: '10px' }}>
      <Header onSearch={handleSearch} />
      {filteredUsers.map((user, index) => (
        <UserCard key={index} {...user} onRequest={handleRequest} />
      ))}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <span style={{ color: '#FFFFFF', fontSize: '14px' }}>1 2 3 4 5 6 7 </span>
      </div>
    </div>
  );
};

export default HomePage;