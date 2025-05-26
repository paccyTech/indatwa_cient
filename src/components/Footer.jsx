import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector('.footer');
      if (!footer) return;
      const rect = footer.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className={`footer ${isVisible ? 'fade-in' : ''}`}>
      <div className="footer-top">
        <h2 className="footer-brand">Indatwa Events</h2>
        <p className="footer-tagline">Elegance | Professionalism | Timeliness</p>
      </div>

      <div className="footer-main">
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/book">Contact</a>
        </div>

        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.instagram.com/indatwa__events?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="mailto:info@indatwaevents.com"><FaEnvelope /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Indatwa Events. All rights reserved.
        </p>
        <p className="powered-by">
          Designed by <a href="https://www.ragateck.com" target="_blank" rel="noopener noreferrer">RAGA TECH GROUP</a>
        </p>

        {/* Hidden Admin Button */}
        <div className="admin-access">
          <a href="/login" className="admin-btn">Admin</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
