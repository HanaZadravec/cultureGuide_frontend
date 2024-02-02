import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './Menu';
import Up from './header';
import Footer from './footer';
import './about.css';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [myReviews, setMyReviews] = useState([]);
    const [events, setEvents] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDetailsResponse = await axios.get('http://localhost:5000/users/userDetails', {
                    headers: { token: localStorage.getItem('token') }
                });
                setUser(userDetailsResponse.data.user);

                if (userDetailsResponse.data.user) {
                    await fetchReviews(userDetailsResponse.data.user.id);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchReviews = async (userId) => {
            try {
                const userReviewsResponse = await axios.get(`http://localhost:5000/reviews/user/reviews`, {
                    headers: { token: localStorage.getItem('token') },
                    params: { userId }
                });
                setMyReviews(userReviewsResponse.data.reviews);
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            }
        };

        const fetchAllEvents = async () => {
            try {
                const eventsResponse = await axios.get('http://localhost:5000/events/getAllEvents');
                const allEvents = eventsResponse.data.events;
                const userRegisteredEvents = user ? allEvents.filter(event => event.registeredUsers.includes(user.id)) : [];

                setEvents(allEvents);
                setRegisteredEvents(userRegisteredEvents);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchData();
        fetchAllEvents();
    }, [user]); 

    
    const findEventNameById = (eventId) => {
        const event = events.find((event) => event._id === eventId);
        return event ? event.name : 'Event not found';
    }

    return (
        <div className="home-content">
            <Menu color="purple"/>
            <div className="content">
            <Up color="blue"/>
                {user ? (
                    <div>
                        <h2 className="mt-4">{user.username}'s Profile</h2>
                        <Card style={{ width: '18rem' }}>
                            <ListGroup variant="flush">
                                <ListGroupItem><strong>First Name:</strong> {user.firstname}</ListGroupItem>
                                <ListGroupItem><strong>Last Name:</strong> {user.lastname}</ListGroupItem>
                                <ListGroupItem><strong>Username:</strong> {user.username}</ListGroupItem>
                                <ListGroupItem><strong>Email:</strong> {user.email}</ListGroupItem>
                            </ListGroup>
                        </Card>
                                                <h3 className="mt-4">My Reviews</h3>
                        {myReviews.length === 0 ? (
                            <p>No reviews</p>
                        ) : (
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {myReviews.map((review) => (
                                    <li key={review._id}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title><strong>Event:</strong> {findEventNameById(review.event)}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted"><strong>Rating:</strong> {review.rating}</Card.Subtitle>
                                                <Card.Text>
                                                    <strong>Review:</strong> {review.review}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <h3 className="mt-4">Registered Events</h3>
                        {registeredEvents.length === 0 ? (
                            <p>No registered events</p>
                        ) : (
                            <ul>
                                {registeredEvents.map((event) => (
                                    <Card key={event._id} className="mb-3">
                                        <Card.Body>
                                            <Card.Title><strong>Event:</strong> {event.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted"><strong>City:</strong> {event.city}</Card.Subtitle>
                                            <Card.Text>
                                                <strong>Description:</strong> {event.description}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </ul>
                        )}

                    </div>                ) : (
                    <p>Loading...</p>
                )}
            </div>
         <Footer />
        </div>
    );
}

export default Profile;