import React from 'react';
import Menu from './Menu';
import Up from './header'
import Footer from './footer';
import './home.css';

const Home = () => {
  return (
    <div className="home-content">
            <Menu color="brown"/>
            <div className="content">
            <Up color="green"/>
            <h1 className="mt-4" >Welcome to Culture Guide Generated application</h1>
            <p>Discover and enjoy a variety of cultural events near you.</p>
            <p>My Cultural Events is dedicated to promoting and celebrating cultural diversity through a variety of events.</p>
            <p>We aim to provide a platform for artists and cultural enthusiasts to come together and share their passion.</p>
        <div className="mt-4">
          <h2>Upcoming Events</h2>
          <ul className="list-group">
            <li className="list-group-item">Cultural Festival in the Park - Saturday, 15th March</li>
            <li className="list-group-item">Art Exhibition Opening - Friday, 20th March</li>
            <li className="list-group-item">Traditional Music Concert - Sunday, 25th March</li>
          </ul>
        </div>
      </div>
            <Footer />
    </div>
  );
};

export default Home;