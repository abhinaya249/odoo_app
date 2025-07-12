import React from 'react';

const Header = () => {
  return (
    <div style={{ border: '2px solid #FFFFFF', padding: '10px', borderRadius: '10px', background: '#000000' }}>
      <h1 style={{ color: '#FFFFFF', textAlign: 'center', fontSize: '24px', margin: '0' }}>Skill Swap Platform</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <select style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', padding: '5px', marginRight: '10px' }}>
            <option>Availability</option>
          </select>
          <input type="text" placeholder="search" style={{ border: '2px solid #FFFFFF', background: '#000000', color: '#FFFFFF', padding: '5px' }} />
        </div>
        <button style={{ border: '2px solid #FFFFFF', background: '#FFFFFF', color: '#000000', padding: '5px 15px', borderRadius: '15px' }}>Login</button>
      </div>
    </div>
  );
};

export default Header;