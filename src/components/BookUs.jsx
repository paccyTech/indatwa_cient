import React, { useState } from 'react';
import axios from 'axios';
import '../styles/BookUs.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const questions = [
  { label: 'Full Name', name: 'name', type: 'text', placeholder: 'e.g., Indatwa Events' },
  { label: 'Email Address', name: 'email', type: 'email', placeholder: 'e.g., indatwaexample@gmail.com' },
  { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: 'e.g., +250 123 456 789' },
  { label: 'Service Type', name: 'service', type: 'select', options: ['Protocol Management', 'Guest Handling', 'Event Planning', 'Sound Systems', 'Other'] },
  { label: 'Event Type', name: 'eventType', type: 'select', options: ['Wedding', 'Corporate', 'Birthday', 'Concert', 'Conference', 'Other'] },
  { label: 'Event Date', name: 'date', type: 'date' },
  { label: 'Event Time', name: 'time', type: 'time' },
  { label: 'Event Location', name: 'location', type: 'text', placeholder: 'e.g., Kigali Convention Centre' },
  { label: 'Number of Guests', name: 'guests', type: 'select', options: ['Less than 50', '50 - 100', '100 - 300', '300+'] },
  { label: 'Duration', name: 'duration', type: 'select', options: ['1 hour', '2 hours', 'Half Day', 'Full Day'] },
  { label: 'Special Requests / Notes', name: 'notes', type: 'textarea', placeholder: 'Any additional instructions or details?' }
];

const BookUs = () => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData[questions[currentStep].name]) {
      toast.warn('Please fill out this field.');
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://indatwa-server.onrender.com/api/bookings', formData);
      toast.success(res.data.message || 'Booking successful!');
      setFormData({});
      setCurrentStep(0);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Booking failed. Please try again.';
      toast.error(errorMsg);
    }
  };

  const currentField = questions[currentStep];

  return (
    <div className="booking-form">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="booking-image" />
      <form onSubmit={handleSubmit}>
        <h2>Book Indatwa Events Services</h2>

        <label>{currentField.label}</label>
        {currentField.type === 'select' ? (
          <select
            name={currentField.name}
            value={formData[currentField.name] || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {currentField.options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        ) : currentField.type === 'textarea' ? (
          <textarea
            name={currentField.name}
            value={formData[currentField.name] || ''}
            placeholder={currentField.placeholder || ''}
            onChange={handleChange}
            rows={4}
            required
          />
        ) : (
          <input
            type={currentField.type}
            name={currentField.name}
            value={formData[currentField.name] || ''}
            placeholder={currentField.placeholder || ''}
            onChange={handleChange}
            required
          />
        )}

        <div className="form-navigation-buttons">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="nav-btn"
          >
            Previous
          </button>

          {currentStep < questions.length - 1 ? (
            <button type="button" onClick={handleNext} className="nav-btn">
              Next
            </button>
          ) : (
            <button type="submit" className="submit-btn">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookUs;
