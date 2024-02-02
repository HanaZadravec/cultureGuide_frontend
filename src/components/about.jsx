import React from 'react';
import Menu from './Menu';
import Up from './header'
import Footer from './footer';

const About = () => {
    return (
        <div className='home-content'>
            <Menu color="purple"/>
            <div className="content">
            <Up color="blue"/>
            <h1 className="mt-4" >About Cultural Events</h1>
            <p>Welcome to our website dedicated to cultural events! We are passionate about promoting and sharing cultural events from around the world.</p>
            <p>Our mission is to provide a platform for artists, performers, and cultural organizations to showcase their work and connect with audiences.</p>
            <p>Whether you're interested in music, dance, theater, or visual arts, we have something for everyone. Browse our events calendar to find upcoming events in your area, or submit your own event to be featured on our website.</p>
            <p>Thank you for visiting, and we hope you enjoy exploring the rich and diverse world of cultural events!</p>
            </div>
            <Footer />
        </div>
    );
};

export default About;
