import React, { useState } from 'react';
import './Menu.css';

const Sidebar = ({ color }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${color} ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleSidebar} className="toggle-button">
        ☰
      </button>
      {isOpen && (
        <div className="links">
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/allEvents">AllEvents</a>
          <a href="/discover">Discover</a>
          <a href="/allReviews">AllReviews</a>
          <a href="/addReview">AddReview</a>
          <a href="/addEvent">AddEvent</a>
        </div>
      )}
    </div>
  );
};

export default Sidebar;