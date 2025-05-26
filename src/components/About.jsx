import React, { useState } from 'react';
import Slider from 'react-slick';
import '../styles/About.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function About() {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Show 3 images at a time on desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 }},
      { breakpoint: 768, settings: { slidesToShow: 1 }}
    ]
  };

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);

  // Images array for easy mapping
  const images = [
    { src: "/home-section.jpeg", alt: "Event 1" },
    { src: "/slide2.jpeg", alt: "Event 2" },
    { src: "/home-section.jpeg", alt: "Event 3" },
    { src: "/home-section.jpeg", alt: "Event 4" },
    { src: "/home-section.jpeg", alt: "Event 5" },
    { src: "/home-section.jpeg", alt: "Event 6" },
  ];

  // Open modal and show clicked image
  const openModal = (img) => {
    setCurrentImg(img);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentImg(null);
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-overlay">
          <h1>About <span className="highlight">Indatwa Events</span></h1>
          <p>Where elegance meets excellence</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="content-box">
          <h2>Our Story</h2>
          <p>
            Indatwa Events Protocol was born out of a passion for creating unforgettable experiences.
            With years of experience and a touch of Rwandan elegance, we transform your vision into a flawless reality.
          </p>
        </div>
      </section>

      {/* Visual Gallery Slider */}
      <section className="about-gallery">
        <h2>Meet the wide team</h2>
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div key={idx} className="slider-image-container">
              <img
                src={img.src}
                alt={img.alt}
                onClick={() => openModal(img)}
                className="clickable-image"
              />
            </div>
          ))}
        </Slider>
      </section>

      {/* Modal for viewing image */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <img src={currentImg.src} alt={currentImg.alt} className="modal-image" />
          </div>
        </div>
      )}

      {/* Meet the Team */}
      <section className="about-team">
        <h2>Meet Our Management Team</h2>
        <div className="team-members">
          <div className="member-card">
            <img src="/team.jpeg" alt="Gakuru Obby" />
            <h3>Gakuru Obby</h3>
            <p>Founder & Creative Director</p>
          </div>
          <div className="member-card">
            <img src="/team.jpeg" alt="Team member 2" />
            <h3>xxxxxx</h3>
            <p>Lead Planner</p>
          </div>
          <div className="member-card">
            <img src="/team.jpeg" alt="Team member 3" />
            <h3>xxxxxxxx</h3>
            <p>Protocol Coordinator</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
