import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <button className="btn" onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;