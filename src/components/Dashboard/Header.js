import React from 'react';

import Logout from '../Logout';

const Header = ({ setIsAdding, setIsActiveMQ, handleMessages, setIsAuthenticated }) => {

  return (
    <header>
      <h1>User Management App</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Add User</button>
        <button onClick={() => handleMessages()}  style={{ marginLeft: '12px' }}>MQ Messages</button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
