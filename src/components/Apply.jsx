// src/pages/Apply.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Apply.css';

const MAX_FILE_SIZE_MB = 5;

const Apply = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    motivation: '',
    documents: null,
  });

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(true);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const status = localStorage.getItem('isApplicationOpen');
    if (status !== null) {
      setIsApplicationOpen(status === 'true');
    }
  }, []);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^[0-9+\-()\s]{7,15}$/.test(phone); // Accepts +2507..., numbers, dashes

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'documents') {
      const file = files[0];
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
      ];

      if (!file) return;

      if (!allowedTypes.includes(file.type)) {
        setError('Only PDF, DOC, DOCX, JPG, or PNG files are allowed.');
        return;
      }

      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        setError('File size must be under 5MB.');
        return;
      }

      setFormData({ ...formData, documents: file });
      setFileName(file.name);
      setError('');
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, motivation, documents } = formData;

    // Validation
    if (!name || !phone || !email || !motivation || !documents) {
      setError('Please fill in all fields and upload your document.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number.');
      return;
    }

    // Simulate backend upload
    console.log('Submitted:', formData);

    setSubmitted(true);
    setError('');

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      motivation: '',
      documents: null,
    });
    setFileName('');
  };

  if (!isApplicationOpen) {
    return (
      <div className="apply-container">
        <h2 style={{ textAlign: 'center' }}>🚫 Applications are currently closed</h2>
      </div>
    );
  }

  return (
    <div className="apply-container">
      <h1>Apply to Be an Usher</h1>
      <form className="apply-form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {submitted && <p className="success">✅ Application submitted successfully!</p>}

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="e.g. Irakoze Pacifique"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="e.g. +2507..."
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="e.g. your@email.com"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Why do you want to be an usher?</label>
        <textarea
          name="motivation"
          placeholder="Write your motivation here..."
          value={formData.motivation}
          onChange={handleChange}
        />

        <label>Upload Required Document (CV, ID, or Photo)</label>
        <input
          type="file"
          name="documents"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleChange}
        />
        {fileName && <p className="file-preview">📎 {fileName}</p>}

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default Apply;
