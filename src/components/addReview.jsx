import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './about.css';
import Menu from './Menu';
import Up from './header';
import Footer from './footer';
const CreateReview = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        event: '',
        rating: 0,
        review: '',
    });
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetailsResponse = await axios.get('http://localhost:5000/users/userDetails', {
                    headers: { token: localStorage.getItem('token') }
                });
                setUser(userDetailsResponse.data.user);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserDetails();

        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/events/getAllEvents');
                setEvents(response.data.events);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEvents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewData = {
                ...formData,
                user: user ? user.id : null, 
                username: user ? user.username : null, 
            };

            await axios.post('http://localhost:5000/reviews/createReview', reviewData);
            alert('Review created successfully');
            setFormData({
                event: '',
                rating: 0,
                review: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='home-content'>
            <Menu color="purple"/>
      <div className="content">
            <Up color="blue"/>
                <h1 className="mt-4"> Create Review</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="event">Event:</label>
                        <select
                            name="event"
                            id="event"
                            value={formData.event}
                            onChange={handleInputChange}
                            required
                            className="form-control" 
                        >
                            <option value="">Pick event</option>
                            {events.map((event) => (
                                <option key={event._id} value={event._id}>
                                    {event.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            id="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            required
                            min="1"
                            max="5"
                            className="form-control" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="review">Review:</label>
                        <textarea
                            name="review"
                            id="review"
                            value={formData.review}
                            onChange={handleInputChange}
                            required
                            className="form-control" 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 ">Create Review</button> 
                    </form>
            </div>
       <Footer />
         </div>
    );
};

export default CreateReview;