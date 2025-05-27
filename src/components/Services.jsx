import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Services.css';

function Service() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const serviceDetails = [
    {
      title: 'Event Services',
      image: '/service.jpg',
      shortDesc: 'Flawless event execution with elegance.',
      details: 'We handle weddings, graduations, birthdays, corporate events and more. We take care of decoration, planning, coordination, and execution, making your dream event a reality.',
    },
    {
      title: 'Protocol Management',
      image: '/protocol.jpg',
      shortDesc: 'Professionalism and etiquette at the highest level.',
      details: 'Our team specializes in high-level protocol services including VIP reception, dignitary etiquette, seating arrangements, and formal ceremonial standards.',
    },
    {
      title: 'Event Coordination',
      image: '/event-cord.jpg',
      shortDesc: 'Professionalism and etiquette at the highest level.',
      details: 'Our team specializes in high-level protocol services including VIP reception, dignitary etiquette, seating arrangements, and formal ceremonial standards.',
    },
  ];

  return (
    <div className="service-page">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-overlay">
          <h1 data-aos="fade-up">What We Offer</h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Crafting elegance, delivering excellence.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="service-section">
        {serviceDetails.map((service, index) => (
          <div
            className="service-card"
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 200}
          >
            <img src={service.image} alt={service.title} />
            <h2>{service.title}</h2>
            <p>{service.shortDesc}</p>
            <button onClick={() => toggleAccordion(index)}>
              {openIndex === index ? 'Hide Details' : 'Show Details'}
            </button>
            {openIndex === index && (
              <div className="accordion-content" data-aos="fade-in">
                <p>{service.details}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Support Section */}
      <section className="support-section" data-aos="fade-up" data-aos-delay="300">
        <h2>Need Support?</h2>
        <p>If you have any questions or need assistance, we're here to help.</p>
        <a href="/support" className="support-button" role="button">
          Contact Support
        </a>
      </section>
    </div>
  );
}

export default Service;
