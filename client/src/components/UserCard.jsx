import React from 'react';

const UserCard = ({ name, skillsOffered, skillsWanted, rating }) => {
  return (
    <div style={{ border: '2px solid #FFFFFF', padding: '10px', borderRadius: '10px', margin: '20px 0', background: '#000000', display: 'flex', alignItems: 'center' }}>
      <div style={{ background: '#CCCCCC', width: '80px', height: '80px', borderRadius: '50%', marginRight: '20px' }}></div>
      <div style={{ flexGrow: 1 }}>
        <h2 style={{ color: '#FFFFFF', fontSize: '18px', margin: '0 0 10px' }}>{name}</h2>
        <p style={{ color: '#00FF00', fontSize: '12px', margin: '0' }}>Skills Offered: {skillsOffered.join(', ')}</p>
        <p style={{ color: '#0000FF', fontSize: '12px', margin: '5px 0' }}>Skill Wanted: {skillsWanted.join(', ')}</p>
      </div>
      <button style={{ border: '2px solid #FFFFFF', background: '#008080', color: '#FFFFFF', padding: '5px 15px', borderRadius: '5px' }}>Request</button>
      <p style={{ color: '#FFFFFF', fontSize: '12px', marginLeft: '20px' }}>rating {rating}/5</p>
    </div>
  );
};

export default UserCard;