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
      id: 'event-services',
      title: 'Event Services',
      image: '/service.jpg',
      alt: 'Elegant event setup with decoration',
      shortDesc: 'Flawless event execution with elegance.',
      details:
        'We handle weddings, graduations, birthdays, corporate events and more. We take care of decoration, planning, coordination, and execution, making your dream event a reality.',
    },
    {
      id: 'protocol-management',
      title: 'Protocol Management',
      image: '/protocol.jpg',
      alt: 'Protocol team guiding guests',
      shortDesc: 'Professionalism and etiquette at the highest level.',
      details:
        'Our team specializes in high-level protocol services including VIP reception, dignitary etiquette, seating arrangements, and formal ceremonial standards.',
    },
    {
      id: 'event-coordination',
      title: 'Event Coordination',
      image: '/event-cord.jpg',
      alt: 'Coordinator planning with clients',
      shortDesc: 'Precision event planning from start to finish.',
      details:
        'Flawless coordination is the foundation of every successful event. We handle every detail from the initial planning to the final execution with precision and care.',
    },
    {
      id: 'sound-systems',
      title: 'Sound Systems',
      image: '/indatwa-sounds.jpeg',
      alt: 'Professional speakers and audio equipment at an event',
      shortDesc: 'Crystal-clear audio delivery.',
      details:
        'We provide high-quality sound systems for all types of events with professional-grade speakers, microphones, mixers, and technical support.',
    },
  ];

  return (
    <main className="service-page">
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
      <h2 className="service-title" data-aos="fade-up">Our Services</h2>
        {serviceDetails.map((service, index) => (
          <article
            className="service-card"
            key={service.id}
            data-aos="zoom-in"
            data-aos-delay={index * 200}
          >
            <img src={service.image} alt={service.alt} loading="lazy" />
            <h3>{service.title}</h3>
            <p>{service.shortDesc}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleAccordion(index);
              }}
              aria-expanded={openIndex === index}
              aria-controls={`service-details-${index}`}
            >
              {openIndex === index ? 'Hide Details ▲' : 'Show Details ▼'}
            </button>
            {openIndex === index && (
              <div
                className="accordion-content"
                id={`service-details-${index}`}
                data-aos="fade-in"
              >
                <p>{service.details}</p>
              </div>
            )}
          </article>
        ))}
      </section>

      {/* Support Section */}
      <section
        className="support-section"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h2>Need Support?</h2>
        <p>If you have any questions or need assistance, we're here to help.</p>
        <a href="/contact" className="support-button" role="button">
          Contact Support
        </a>
      </section>
    </main>
  );
}

export default Service;
