import React from 'react';
import { FaPhoneAlt, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import '../styles/Support.css';

const Support = () => {
  const phoneNumber = '+250788465959';
  const whatsappMessage = 'Hello, I need support.';
  const instagramURL = 'https://www.instagram.com/indatwa__events/'; // Replace with your actual profile

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/250788465959?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handleInstagramClick = () => {
    window.open(instagramURL, '_blank');
  };

  return (
    <div className="support-container">
      <h2>Contact Support</h2>
      <div className="support-buttons">
        <a
          href={`tel:${phoneNumber}`}
          className="support-btn call"
          aria-label="Call Support"
        >
          <FaPhoneAlt style={{ marginRight: '6px' }} />
          Call Us
        </a>

        <button
          onClick={handleWhatsAppClick}
          className="support-btn whatsapp"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp style={{ marginRight: '6px' }} />
          WhatsApp
        </button>

        <button
          onClick={handleInstagramClick}
          className="support-btn instagram"
          aria-label="Visit Instagram"
        >
          <FaInstagram style={{ marginRight: '6px' }} />
          Instagram
        </button>
      </div>
    </div>
  );
};

export default Support;
