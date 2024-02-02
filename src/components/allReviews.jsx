import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Menu from './Menu';
import Up from './header';
import Footer from './footer';

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [filterEventName, setFilterEventName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [reviewsResponse, eventsResponse] = await Promise.all([
                    axios.get('http://localhost:5000/reviews/getAllReviews'),
                    axios.get('http://localhost:5000/events/getAllEvents')
                ]);

                const reviewsData = reviewsResponse.data.reviews;
                const eventsData = eventsResponse.data.events;
                                const updatedReviews = reviewsData.map((review) => {
                    const matchingEvents = eventsData.filter((event) => event._id === review.event);
                    
                    const matchingEvent = matchingEvents.length > 0 ? matchingEvents[0] : null;
                    return {
                        ...review,
                        eventName: matchingEvent ? matchingEvent.name : 'Event Not Found',
                        eventCity: matchingEvent ? matchingEvent.city : 'City Not Found',
                        eventLocation: matchingEvent ? matchingEvent.location : 'Location Not Found',
                    };
                });                const filteredReviews = updatedReviews.filter((review) =>
                    review.eventName.toLowerCase().includes(filterEventName.toLowerCase())
                );

                setReviews(filteredReviews);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [filterEventName]);

    return (
        <div className='home-content'>
            <Menu color="purple"/>
      <div className="content">
            <Up color="blue"/>
                <h1 className="mt-4">All Reviews</h1>
                <div className="filter">
                    <input
                        type="text"
                        placeholder="Filter by Event Name"
                        value={filterEventName}
                        onChange={(e) => setFilterEventName(e.target.value)}
                        className="form-control mb-3 mt-3"
                    />
                </div>
                <div className="review-cards">
                    {reviews.map((review) => (
                        <Card key={review._id} className="review-card">
                            <Card.Body>
                                <Card.Title className="username">{review.username}</Card.Title>
                                <Card.Text>
                                    <strong>Event Name:</strong> {review.eventName}
                                    <br />
                                    <strong>Event City:</strong> {review.eventCity}
                                    <br />
                                    <strong>Event Location:</strong> {review.eventLocation}
                                    <br />
                                    <strong>Rating:</strong> {review.rating}
                                    <br />
                                    <strong>Review:</strong> {review.review}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
       <Footer />
         </div>
    );
};

export default AllReviews;