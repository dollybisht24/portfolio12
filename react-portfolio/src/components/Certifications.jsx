import React, { useState, useEffect, useRef } from 'react';
import { Link } from '../Router';
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
      image: '/images/certificates/ml-course.svg',
      icon: 'fas fa-brain',
      color: '#8b5cf6'
    },
    {
      title: 'Introducing Generative AI with AWS',
      issuer: 'Udacity',
      date: '2024',
      description: 'Verified Certificate Of Course Completion covering generative AI concepts, AWS services and deployment patterns.',
      image: '/images/certificates/genai-aws.svg',
      icon: 'fas fa-cloud',
      color: '#7c3aed'
    },
    {
      title: 'Prompt Engineering',
      issuer: 'Professional Certificate',
      date: '2024',
      description: 'Advanced AI prompt engineering techniques for working with large language models and generative AI applications.',
      image: '/images/certificates/prompt-engineering.svg',
      icon: 'fas fa-robot',
      color: '#10b981'
    },
    {
      title: 'IAYP Certificate',
      issuer: 'International Award for Young People',
      date: '2023',
      description: 'Leadership and community service recognition for outstanding contributions and personal development achievements.',
      image: '/images/certificates/iayp.svg',
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

  // Note: modal removed — View Certificate opens dedicated page

  return (
    <section id="certifications" className="certifications" aria-labelledby="certifications-heading" ref={sectionRef}>
      <div className="container">
        <h2 id="certifications-heading" className="section-title">Certifications</h2>
        <div className="certifications-grid">
          {certifications.map((cert, index) => {
            const linkUrl = `/certificate?img=${encodeURIComponent(cert.image)}&title=${encodeURIComponent(cert.title)}`;
            return (
              <Link
                to={linkUrl}
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
                  {cert.image && (
                    <div className="cert-actions">
                      <Link to={linkUrl} className="btn-view" onClick={(e) => e.stopPropagation()}>View Certificate</Link>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {modalImg && (
        <div className="cert-modal" role="dialog" aria-modal="true" aria-label={modalTitle} onClick={closeModal}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={closeModal} aria-label="Close">×</button>
            <h3 className="section-title" style={{ marginBottom: 12 }}>{modalTitle}</h3>
            <img src={modalImg} alt={modalTitle} style={{ maxWidth: '100%', borderRadius: 8 }} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
