import React, { useState, useEffect, useRef } from 'react';
import './Certifications.css';

const Certifications = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  const certifications = [
    {
      title: 'Machine Learning Course',
      issuer: 'Udacity',
      date: '2023',
      description: 'Fundamentals of ML algorithms and applications including supervised learning, unsupervised learning, and neural networks.',
      icon: 'fas fa-brain',
      color: '#8b5cf6'
    },
    {
      title: 'Introducing Generative AI with AWS',
      issuer: 'Udacity',
      date: '2024',
      description: 'Verified Certificate Of Course Completion covering generative AI concepts, AWS services and deployment patterns.',
      icon: 'fas fa-cloud',
      color: '#7c3aed'
    },
    {
      title: 'Prompt Engineering',
      issuer: 'Professional Certificate',
      date: '2024',
      description: 'Advanced AI prompt engineering techniques for working with large language models and generative AI applications.',
      icon: 'fas fa-robot',
      color: '#10b981'
    },
    {
      title: 'IAYP Certificate',
      issuer: 'International Award for Young People',
      date: '2023',
      description: 'Leadership and community service recognition for outstanding contributions and personal development achievements.',
      icon: 'fas fa-award',
      color: '#f59e0b'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            certifications.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...new Set([...prev, index])]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="certifications" className="certifications" aria-labelledby="certifications-heading" ref={sectionRef}>
      <div className="container">
        <h2 id="certifications-heading" className="section-title">Certifications</h2>
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className={`certification-card ${visibleCards.includes(index) ? 'animate-scale-in visible' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="cert-icon" style={{ background: `linear-gradient(135deg, ${cert.color} 0%, #8b5cf6 100%)` }}>
                <i className={cert.icon}></i>
              </div>
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">
                  <i className="fas fa-building"></i> {cert.issuer}
                </p>
                <p className="cert-date">
                  <i className="fas fa-calendar"></i> {cert.date}
                </p>
                <p className="cert-description">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
