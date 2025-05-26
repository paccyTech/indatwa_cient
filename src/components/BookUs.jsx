import React, { useState } from 'react';
import axios from 'axios';
import '../styles/BookUs.css';

const BookUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    date: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/bookings', formData);
      setMessage(res.data.message || 'Booking successful!');
      setFormData({ name: '', email: '', service: '', date: '' });
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Booking failed. Please try again.';
      setMessage(errorMsg);
    }
  };

  return (
    <div className="booking-form">
      {/* Left Side: Image */}
      <div className="booking-image" />

      {/* Right Side: Form */}
      <form onSubmit={handleSubmit}>
        <h2>Book Our Protocol Service</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="service"
          placeholder="Service Type"
          value={formData.service}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        {/* Message inside form */}
        {message && (
          <p className={`form-message ${message.includes('failed') || message.includes('already') ? 'error' : 'success'}`}>
            {message}
          </p>
        )}

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookUs;
