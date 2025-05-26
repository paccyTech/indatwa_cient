import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhoneAlt, FaWhatsapp, FaLinkedinIn, FaHeadset } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking a nav link
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-bg' : ''}`}>
        <div className="navbar-container">
          <div className="logo">
            <img src="/logo12.png" alt="Logo" className="logo-img" />
            Indatwa Events
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li>
              <Link to="/" className={isActive('/')} onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={isActive('/about')} onClick={handleLinkClick}>
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className={isActive('/services')} onClick={handleLinkClick}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/book" className={isActive('/book')} onClick={handleLinkClick}>
                Book Now
              </Link>
            </li>
            {/* Support Button with icon */}
            <li>
              <Link
                to="/support"
                className={isActive('/support') + ' support-btn'}
                onClick={handleLinkClick}
                aria-label="Support"
              >
                <FaHeadset style={{ marginRight: '6px' }} />
                Support
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Floating Contact Sidebar */}
      <div className="floating-sidebar">
        <a href="tel:+250788465959" className="sidebar-btn call" title="Call Us">
          <FaPhoneAlt />
        </a>
        <a
          href="https://wa.me/+250788465959"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-btn whatsapp"
          title="WhatsApp Us"
        >
          <FaWhatsapp />
        </a>
        <a
          href="https://www.linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-btn linkedin"
          title="LinkedIn Profile"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </>
  );
};

export default Navbar;
