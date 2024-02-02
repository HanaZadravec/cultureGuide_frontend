import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './about.css';
import { Card, Col, Row, Table, Button, Form } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Menu from './Menu';
import Up from './header';

const AllEvents = () => {
  const [events, setEvents] = useState([]); 
  const [currentUserId, setCurrentUserId] = useState(null);
  const [filterCity, setFilterCity] = useState(''); 
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events/getAllEvents'); 
        const eventsData = response.data.events;
        const updatedEvents = await updateEventStatus(eventsData);
        setEvents(updatedEvents);
        setFilteredEvents(updatedEvents); 
      } catch (error) {
        console.log(error);
      }
    };

    const updateEventStatus = async (eventsData) => {
      const updatedEvents = [];

      for (const event of eventsData) {
        const eventStartDate = new Date(event.eventStartDate);
        const eventEndDate = new Date(event.eventEndDate);
        const currentDate = new Date();

        if (currentDate < eventStartDate) {
          event.eventStatus = 'Upcoming';
        } else if (currentDate >= eventStartDate && currentDate <= eventEndDate) {
          event.eventStatus = 'In Progress';
        } else {
          event.eventStatus = 'Completed';
        }

        updatedEvents.push(event);
      }

      return updatedEvents;
    };

    const token = localStorage.getItem('token');
    if (token) {
      getUserDetails(token);
    }

    fetchEvents();
  }, []);

  const getUserDetails = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/users/userDetails', {
        headers: {
          token: token,
        },
      });
      setCurrentUserId(response.data.user.id);
    } catch (error) {
      console.error('Failed to fetch user details', error);
    }
  };

  const isUserRegistered = (event) => {
    return event.registeredUsers.includes(currentUserId);
  };

  const handleRegisterClick = async (eventId) => {
    if (!isUserRegistered(events.find((event) => event._id === eventId))) {
      try {
        const response = await axios.post(`http://localhost:5000/events/event/${eventId}/register`, {
          userId: currentUserId,
        });

        if (response.status === 200) {
          const updatedEventList = [...events];
          const updatedEvent = updatedEventList.find((eventItem) => eventItem._id === eventId);

          if (updatedEvent && updatedEvent.eventCapacity > 0) {
            updatedEvent.registeredUsers.push(currentUserId);
            updatedEvent.eventCapacity--;

            setEvents(updatedEventList);
            alert('Successfully registered for the event.');
          }
        } else if (response.status === 400 && response.data.title === 'User already registered for this event') {
          alert('You are already registered for this event.');
        } else {
          alert('Registration failed.');
        }
      } catch (error) {
        console.error('Registration failed', error);
      }
    }
  };

  const applyFilters = () => {
    const filteredEvents = events.filter((event) => {
      const startDate = new Date(event.eventStartDate);
      const endDate = new Date(event.eventEndDate);
      const cityMatch = !filterCity || (event.city && event.city.toLowerCase().includes(filterCity.toLowerCase()));
      const startDateMatch = !filterStartDate || (startDate >= new Date(filterStartDate));
      console.log(startDateMatch)
      const endDateMatch = !filterEndDate || (endDate <= new Date(filterEndDate));
      return cityMatch && startDateMatch && endDateMatch;
    });

    setFilteredEvents(filteredEvents);
  };

  return (
    <div className="home-content">
            <Menu color="purple"/>
      <div className="content">
            <Up color="blue"/>
        <h1 className="mt-4">All Events</h1>
        <Form>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              placeholder="Enter city"
            />
          </Form.Group>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
              placeholder="Enter start date"
            />
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
              placeholder="Enter end date"
            />
          </Form.Group>
          <Button className="mt-3 mb-3" variant="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
        </Form>
        <Row>
          {filteredEvents.map((event) => (
            <Col key={event._id} md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Organizer: {event.organizer}</Card.Subtitle>
                  <Card.Text>
                    <strong>City:</strong> {event.city}
                    <br />
                    <strong>Location:</strong> {event.location}
                    <br />
                    <strong>Event Type:</strong> {event.eventType}
                    <br />
                    <strong>Event Start Date:</strong> {event.eventStartDate}
                    <br />
                    <strong>Event End Date:</strong> {event.eventEndDate}
                    <br />
                    <strong>Event Description:</strong> {event.description}
                    <br />
                    <strong>Event Capacity:</strong> {event.eventCapacity}
                    <br />
                    <strong>Contact Information:</strong> {event.contactInformation}
                    <br />
                    <strong>Rating:</strong> {event.rating}
                    <br />
                    <strong>Event Status:</strong> {event.eventStatus}
                    <br />
                  </Card.Text>
                  <strong>Tickets:</strong>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Ticket Type</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.tickets.map((ticket, index) => (
                        <tr key={index}>
                          <td>{ticket.ticketType}</td>
                          <td>{ticket.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <strong>Useful Links:</strong>
                  {event.usefulLinks.length > 0 ? (
                    <ul>
                      {event.usefulLinks.map((link, index) => (
                        <li key={index}>
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No useful links available</p>
                  )}
                  {event.images.length > 0 && (
                    <div>
                      <strong>Images:</strong>
                      {event.images.length > 1 ? (
                        <Carousel>
                          {event.images.map((image, index) => (
                            <div key={index}>
                              <img src={'http://localhost:5000/images/' + image} alt={`Slika ${index}`} />
                            </div>
                          ))}
                        </Carousel>
                      ) : (
                        event.images.map((image, index) => (
                          <Card.Img key={index} src={'http://localhost:5000/images/' + image} alt={`Slika ${index}`} />
                        ))
                      )}
                    </div>
                  )}
                </Card.Body>
                <Card.Footer>
                  <strong>Register for event</strong>
                  <br />
                  {isUserRegistered(event) ? (
                    <p>You are already registered for this event.</p>
                  ) : (
                    <Button
                      className="btn btn-primary mt-3"
                      onClick={() => handleRegisterClick(event._id)}
                      disabled={event.eventCapacity <= 0}
                    >
                      Register
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AllEvents;