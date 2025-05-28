import React, { useState } from 'react';
import axios from 'axios';
import '../styles/BookUs.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    eventType: '',
    date: '',
    time: '',
    location: '',
    guests: '',
    duration: '',
    notes: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/bookings', formData);
      toast.success(res.data.message || 'Booking successful!');
      setFormData({
        name: '', email: '', phone: '', service: '', eventType: '',
        date: '', time: '', location: '', guests: '',
        duration: '', notes: ''
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Booking failed. Please try again.';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="booking-form">
      <ToastContainer position="top-center" autoClose={3000} />
      
      {/* Left Side: Image */}
      <div className="booking-image" />

      {/* Right Side: Form */}
      <form onSubmit={handleSubmit}>
        <h2>Book Indatwa Events Services</h2>

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="e.g., Indatwa Events"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="e.g., indatwaexample@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="e.g., +250 123 456 789"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Service Type</label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Select Service</option>
          <option value="Protocol Management">Protocol Management</option>
          <option value="Guest Handling">Guest Handling</option>
          <option value="Event Planning">Event Planning</option>
          <option value="Sound Systems">Sound Systems</option>
          <option value="Other">Other</option>
        </select>

        <label>Event Type</label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          required
        >
          <option value="">Select Event Type</option>
          <option value="Wedding">Wedding</option>
          <option value="Corporate">Corporate</option>
          <option value="Birthday">Birthday</option>
          <option value="Concert">Concert</option>
          <option value="Conference">Conference</option>
          <option value="Other">Other</option>
        </select>

        <label>Event Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Event Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <label>Event Location</label>
        <input
          type="text"
          name="location"
          placeholder="e.g., Kigali Convention Centre"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Number of Guests</label>
        <select
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Less than 50">Less than 50</option>
          <option value="50 - 100">50 - 100</option>
          <option value="100 - 300">100 - 300</option>
          <option value="300+">300+</option>
        </select>

        <label>Duration</label>
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        >
          <option value="">Select Duration</option>
          <option value="1 hour">1 Hour</option>
          <option value="2 hours">2 Hours</option>
          <option value="Half Day">Half Day</option>
          <option value="Full Day">Full Day</option>
        </select>

        <label>Special Requests / Notes</label>
        <textarea
          name="notes"
          placeholder="Any additional instructions or details?"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookUs;
