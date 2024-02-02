import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './about.css';
import Menu from './Menu';
import Up from './header'; 
const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    location: '',
    city: '',
    organizer: '',
    eventType: '',
    eventStartDate: '',
    eventEndDate: '',
    description: '',
    contactInformation: '',
    eventCapacity: 0,
    eventStatus: 'Upcoming',
    images: [],
    usefulLinks: [],
    tickets: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'eventStartDate' || name === 'eventEndDate') {
      const startDate = name === 'eventStartDate' ? new Date(value) : new Date(eventData.eventStartDate);
      const endDate = name === 'eventEndDate' ? new Date(value) : new Date(eventData.eventEndDate);

      if (startDate > endDate) {
        alert('Event End Date cannot be earlier than Event Start Date. Please correct the date.');
      } else {
        const currentDate = moment();
        const eventStartDate = moment(startDate);
        const eventEndDate = moment(endDate);
        let status = 'Upcoming';

        if (currentDate.isBefore(eventStartDate)) {
          status = 'Upcoming';
        } else if (currentDate.isSameOrAfter(eventStartDate) && currentDate.isBefore(eventEndDate)) {
          status = 'In Progress';
        } else {
          status = 'Completed';
        }

        setEventData({
          ...eventData,
          [name]: value,
          eventStatus: status, 
        });
      }
    } else {
      setEventData({
        ...eventData,
        [name]: value,
      });
    }
  };

  const handleTicketChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTickets = [...eventData.tickets];
    updatedTickets[index] = { ...updatedTickets[index], [name]: value };
    setEventData({ ...eventData, tickets: updatedTickets });
  };

  const addTicket = () => {
    setEventData({
      ...eventData,
      tickets: [...eventData.tickets, { ticketType: '', price: 0 }],
    });
  };

  const removeTicket = (index) => {
    const updatedTickets = [...eventData.tickets];
    updatedTickets.splice(index, 1);
    setEventData({ ...eventData, tickets: updatedTickets });
  };

  const handleImageChange = (e) => {
    const newImages = [...eventData.images];
  
    for (let i = 0; i < e.target.files.length; i++) {
      newImages.push(e.target.files[i]);
    }
  
    setEventData({ ...eventData, images: newImages });
  };
  

  const handleLinkChange = (e) => {
    const newLinks = [...eventData.usefulLinks];
    newLinks.push(e.target.value);
    setEventData({ ...eventData, usefulLinks: newLinks });
  };

  const removeImage = (index) => {
    const updatedImages = [...eventData.images];
    updatedImages.splice(index, 1);
    setEventData({ ...eventData, images: updatedImages });
  };

  const removeLink = (index) => {
    const updatedLinks = [...eventData.usefulLinks];
    updatedLinks.splice(index, 1);
    setEventData({ ...eventData, usefulLinks: updatedLinks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('name', eventData.name);
      formData.append('location', eventData.location);
      formData.append('organizer', eventData.organizer);
      formData.append('city', eventData.city);
      formData.append('eventType', eventData.eventType);
      formData.append('eventStartDate', eventData.eventStartDate);
      formData.append('eventEndDate', eventData.eventEndDate);
      formData.append('description', eventData.description);
      formData.append('contactInformation', eventData.contactInformation);
      formData.append('eventCapacity', eventData.eventCapacity);
      formData.append('eventStatus', eventData.eventStatus);
      formData.append('usefulLinks', JSON.stringify(eventData.usefulLinks));
      formData.append('tickets', JSON.stringify(eventData.tickets));

      for (let i = 0; i < eventData.images.length; i++) {
        formData.append('images', eventData.images[i]);
    }
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      const response = await axios.post('http://localhost:5000/createEvent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    console.log(response);
      alert('Event created successfully!');
      setEventData({
        name: '',
        location: '',
        organizer: '',
        city: '',
        eventType: '',
        eventStartDate: '',
        eventEndDate: '',
        description: '',
        contactInformation: '',
        eventCapacity: 0,
        eventStatus: 'Upcoming',
        images: [],
        usefulLinks: [],
        tickets: [],
      });
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <div className='home-content'>
            <Menu color="brown"/>
            <div className="content">
            <Up color="blue"/>
            <h1 className="mt-4" >Add Event</h1>
            <form className="mt-4" onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={eventData.name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={eventData.city}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={eventData.location}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Organizer:</label>
                        <input
                            type="text"
                            name="organizer"
                            value={eventData.organizer}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Event Type:</label>
                        <select
                            name="eventType"
                            value={eventData.eventType}
                            onChange={handleChange}
                            className="form-control"
                           required
                        >
                            <option value="" disabled >Select Event Type</option>
                            <option value="Concert">Concert</option>
                            <option value="Exhibition">Exhibition</option>
                            <option value="Sports Event">Sports event</option>
                            <option value="Festival">Festival</option>
                            <option value="Cooking Class">Cooking class</option>
                            <option value="Theater Show">Theather show</option>
                            <option value="Conference">Conference</option>
                            <option value="Art Workshop">Art workshop</option>
                            <option value="Film Screening">Film screening</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Event Start Date:</label>
                        <input
                            type="date"
                            name="eventStartDate"
                            value={eventData.eventStartDate}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Event End Date:</label>
                        <input
                            type="date"
                            name="eventEndDate"
                            value={eventData.eventEndDate}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                            className="form-control"
                           required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contact Information:</label>
                        <input
                            type="text"
                            name="contactInformation"
                            value={eventData.contactInformation}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Event Capacity:</label>
                        <input
                            type="number"
                            name="eventCapacity"
                            value={eventData.eventCapacity}
                            onChange={handleChange}
                            className="form-control"
                            required
                            min = "0"
                        />
                    </div>
                    {eventData.tickets.map((ticket, index) => (
                        <div key={index}>
                            <div className="form-group">
                                <label>Ticket Type:</label>
                                <select
                                    name="ticketType"
                                    value={ticket.ticketType}
                                    onChange={(e) => handleTicketChange(e, index)}
                                    className="form-control"
                                    required
                                >
                                    <option value="" disabled>Select Ticket Type</option>
                                    <option value="Child">Child</option>
                                    <option value="Adult">Adult</option>
                                    <option value="Student">Student</option>
                                    <option value="Senior">Senior</option>
                                    <option value="Free Entry">Free Entrance</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Ticket Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={ticket.price}
                                    onChange={(e) => handleTicketChange(e, index)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            {eventData.tickets.length > 1 && (
                                <button type="button" className="btn btn-primary mt-3 mb-3" onClick={() => removeTicket(index)}>
                                    Remove Ticket
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" className='btn btn-primary mt-3 d-block' onClick={addTicket}>
                        Add Ticket
                    </button>
                    <div className="form-group">
                        <label>Images:</label>
                        <input
                            type="file"
                            accept='image/*'
                            name="images"
                            multiple
                            className="form-control"
                            onChange={handleImageChange}
                            
                        />
                        {eventData.images.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`Slika ${index}`} width="100" />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => removeImage(index)}
                                >
                                    Remove Image
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="form-group">
                        <label>Useful Links:</label>
                        <input
                            type="text"
                            name="usefulLink"
                            value=""
                            onChange={handleLinkChange}
                            className="form-control"
                        />
                        {eventData.usefulLinks.map((link, index) => (
                            <div key={index}>
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                    {link}
                                </a>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => removeLink(index)}
                                >
                                    Remove Link
                                </button>
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="btn btn-primary mt-3 d-block">Create Event</button>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;