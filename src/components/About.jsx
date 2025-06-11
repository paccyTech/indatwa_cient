import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/About.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function About() {
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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

  const openModal = (img) => {
    setCurrentImg(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImg(null);
  };

  const images = [
    { src: "/home-section.jpeg", alt: "Event 1" },
    { src: "/slide2.jpeg", alt: "Event 2" },
    { src: "/event1.jpeg", alt: "Event 3" },
    { src: "/event2.jpeg", alt: "Event 4" },
    { src: "/event4.jpeg", alt: "Event 6" },
  ];

  // Show/hide state for team details
  const [showDetails, setShowDetails] = useState({
    obby: false,
    pacifique: false,
  });

  const toggleDetails = (member) => {
    setShowDetails(prev => ({ ...prev, [member]: !prev[member] }));
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero" data-aos="fade-down">
        <div className="about-overlay">
          <h1>About <span className="highlight">Indatwa Events</span></h1>
          <p>Where elegance meets excellence</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story" data-aos="fade-up">
        <div className="content-box">
          <h2>Our Story</h2>
          <p>
            Indatwa Events Protocol was born out of a passion for creating unforgettable experiences.
            With years of experience and a touch of Rwandan elegance, we transform your vision into a flawless reality.
          </p>
        </div>
      </section>

      {/* Visual Gallery Slider */}
      <section className="about-gallery" data-aos="zoom-in">
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

      {/* Management Team Section */}
      <section className="about-team" data-aos="fade-up">
        <h2>Meet Our Management Team</h2>
        <div className="team-members">
          {/* Gakuru Obby */}
          <div className="member-card" data-aos="flip-left">
            <img src="/about-founder.jpeg" alt="Gakuru Obby" />
            <h3>GAKURU Obby</h3>
            <p>Founder & CEO</p>
            <button className="detail-btn" onClick={() => toggleDetails('obby')}>
              {showDetails.obby ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails.obby && (
              <div className="member-details">
                <p>Gakuru Obby is the visionary behind Indatwa Events, known for his eye for elegance and dedication to excellence. With years of hands-on experience in the events industry, he ensures every detail is perfectly orchestrated.</p>
              </div>
            )}
          </div>

          <div className="member-card" data-aos="flip-left">
            <img src="/nelly.jpeg" alt="Usanase Nelly" />
            <h3>USANASE Nelly</h3>
            <p>Managing Director-Gisenyi</p>
            <button className="detail-btn" onClick={() => toggleDetails('nelly')}>
              {showDetails.obby ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails.obby && (
              <div className="member-details">
                <p>USANASE Nelly, Managing Director for Gisenyi at Indatwa Events, combines elegance and excellence with years of industry experience. She ensures every event in the region is flawlessly executed and uniquely memorable.</p>
              </div>
            )}
          </div>


          {/* Pacifique */}
          <div className="member-card" data-aos="flip-left" data-aos-delay="150">
            <img src="/about_it.png" alt="Pacifique IRAKOZE R" />
            <h3>Pacifique IRAKOZE R</h3>
            <p>IT Manager & Operations Lead</p>
            <button className="detail-btn" onClick={() => toggleDetails('pacifique')}>
              {showDetails.pacifique ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails.pacifique && (
              <div className="member-details">
                <p>Pacifique is the backbone of our technical and operational success. He manages IT systems and ensures that every event runs smoothly with the latest technology and precision logistics.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
