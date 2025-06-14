import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleScroll = () => {
    const nextSection = document.getElementById('about-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleUserInteraction = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const clientImages = [
    { image: '/clients/client1.jpg', caption: 'Kelly & Junior wedding.', alt: 'Kelly and Junior at their wedding event' },
    { image: '/clients/client2.jpg', caption: 'Corporate event success!', alt: 'Corporate event setup with happy clients' },
    { image: '/clients/client3.jpg', caption: 'We make sure our clients enjoy their event.', alt: 'Clients enjoying their event with smiles' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === clientImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [clientImages.length]);

  useEffect(() => {
    window.addEventListener('touchstart', handleUserInteraction, { once: true });
    return () => window.removeEventListener('touchstart', handleUserInteraction);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        closeImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const openImage = (image) => setSelectedImage(image);
  const closeImage = () => setSelectedImage(null);

  return (
    <>
      <Helmet>
        <title>Indatwa Events - Crafting Unforgettable Events</title>
        <meta name="description" content="Indatwa Events Protocol specializes in weddings, corporate galas, and cultural events with elegance and precision." />
        <meta name="keywords" content="events, weddings, corporate events, event planning, Rwanda, Indatwa Events" />
        <meta name="author" content="Indatwa Events" />
        <meta property="og:title" content="Indatwa Events - Crafting Unforgettable Events" />
        <meta property="og:description" content="We specialize in organizing high-end weddings and corporate galas with elegance and precision." />
        <meta property="og:url" content="https://www.indatwaevents.com/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="home-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="background-video"
        >
          <source src="/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="home-overlay">
          <h1>Welcome to Indatwa Events</h1>
          <p>Crafting unforgettable events with elegance and precision.</p>
          <Link to="/book" className="book-us-button">
            Book Now
          </Link>
        </div>

        <button className="scroll-down" onClick={handleScroll} aria-label="Scroll to About section">
          ↓
        </button>

        <button className="audio-toggle-button" onClick={toggleAudio} aria-pressed={!isMuted}>
          {isMuted ? '🔈 Unmute' : '🔇 Mute'}
        </button>
      </div>

      {/* About Section */}
      <section id="about-section" className="about-section">
        <h2>What We Do</h2>
        <p>
          At Indatwa Events Protocol, we specialize in organizing high-end events,
          from weddings to corporate galas. We bring vision to life with attention
          to detail, precision, and cultural sophistication.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us-section">
        <h2>Why Choose Us</h2>
        <div className="why-us-cards">
          <div className="card">
            <h3>Elegance</h3>
            <p>We ensure every event shines with class and grace, customized to your style.</p>
          </div>
          <div className="card">
            <h3>Professionalism</h3>
            <p>Our experienced team handles your event with care, creativity, and professionalism.</p>
          </div>
          <div className="card">
            <h3>Timeliness</h3>
            <p>We value your time and guarantee prompt execution of every event detail.</p>
          </div>
        </div>
      </section>

      {/* Client Picture Slider Section */}
      <section className="testimonial-section" aria-label="Client moments slider">
        <h2>Moments With Our Clients</h2>
        <div className="testimonial-slider">
          {clientImages.map((item, index) => (
            <div
              className="testimonial-item landscape"
              key={index}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onClick={() => openImage(item.image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openImage(item.image);
                }
              }}
              aria-label={`Open image: ${item.caption}`}
            >
              <img src={item.image} alt={item.alt || `Client ${index + 1}`} />
              <p>{item.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Fullscreen Image */}
      {selectedImage && (
        <div
          className="image-modal"
          onClick={closeImage}
          role="dialog"
          aria-modal="true"
          aria-label="Full screen client image"
          tabIndex={-1}
        >
          <img src={selectedImage} alt="Full view of client event" />
        </div>
      )}

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Create Your Dream Event?</h2>
        <Link to="/services" className="cta-button" onClick={() => window.scrollTo(0, 0)}>
          Explore More
        </Link>
      </section>
    </>
  );
}

export default Home;
