import React from 'react';
import Header from '../components/Header';
import UserCard from '../components/UserCard';

const HomePage = () => {
  const users = [
    { name: 'Marc Demo', skillsOffered: ['Java Script', 'Python'], skillsWanted: ['Photoshop', 'Graphic designer'], rating: 3.4 },
    { name: 'Mitchell', skillsOffered: ['Java Script', 'Python'], skillsWanted: ['Photoshop', 'Graphic designer'], rating: 2.5 },
    { name: 'Joe wills', skillsOffered: ['Java Script', 'Python'], skillsWanted: ['Photoshop', 'Graphic designer'], rating: 4.0 },
  ];

  return (
    <div style={{ background: '#000000', padding: '20px', border: '2px solid #FFFFFF', borderRadius: '10px' }}>
      <Header />
      {users.map((user, index) => (
        <UserCard key={index} {...user} />
      ))}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <span style={{ color: '#FFFFFF', fontSize: '14px' }}>&lt; 1 2 3 4 5 6 7 &gt;</span>
      </div>
    </div>
  );
};

export default HomePage;