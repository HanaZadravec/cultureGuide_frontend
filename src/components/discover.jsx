import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './about.css';
import { Card, Col, Row, Table, Form, Button } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Menu from './Menu';
import Up from './header';
import Footer from './footer';


const Discover = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events/getAllEvents');
        const eventsData = response.data.events;
        const updatedEvents = await updateEventStatus(eventsData);
        setEvents(updatedEvents);
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

    fetchEvents();
  }, []);


  const searchEvents = () => {
    const filteredEvents = events.filter((event) => {
    console.log(event);
      const nameMatch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
      const cityMatch = event.city.toLowerCase().includes(searchTerm.toLowerCase());

      return nameMatch || cityMatch;
    });

    setEvents(filteredEvents);
  };

  return (
    <div className="home-content">
            <Menu color="purple"/>
      <div className="content">
            <Up color="blue"/>
        <h1 className="mt-4">Discover</h1>

        <Form.Group controlId="searchName">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter event name or city"
          />
        </Form.Group>

        <Button className="mt-3 mb-3" variant="primary" onClick={searchEvents}>
          Search
        </Button>

        <Row>
          {events.map((event) => (
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
              </Card>
            </Col>
          ))}
        </Row>
      </div>
       <Footer />
     </div>
  );
};

export default Discover;