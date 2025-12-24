import React, { useState, useEffect, useRef } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
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
    <section id="about" className="about" aria-labelledby="about-heading" ref={sectionRef}>
      <div className="container">
        <h2 id="about-heading" className={`section-title ${isVisible ? 'animate-fade-in' : ''}`}>About Me</h2>
        <div className="about-content">
          <div className={`about-text ${isVisible ? 'animate-slide-up' : ''}`}>
            <p className="lead">
              I'm a passionate Frontend Developer and BCA student with a strong foundation in web development technologies.
            </p>
            <p>
              Currently pursuing my Bachelor's in Computer Applications, I specialize in creating responsive, 
              user-friendly web applications using modern frameworks and libraries. My journey in web development 
              has equipped me with strong problem-solving skills and a keen eye for detail.
            </p>
            <p>
              I'm constantly exploring new technologies and best practices to improve my craft. When I'm not coding, 
              you'll find me learning about the latest web development trends, contributing to open-source projects, 
              or working on personal projects that challenge my skills.
            </p>
            <div className="about-highlights">
              <div className={`highlight-item ${isVisible ? 'animate-scale-in visible' : ''}`} style={{ animationDelay: '0.1s' }}>
                <div className="highlight-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div>
                  <h3>Education</h3>
                  <p>BCA Student</p>
                </div>
              </div>
              <div className={`highlight-item ${isVisible ? 'animate-scale-in visible' : ''}`} style={{ animationDelay: '0.2s' }}>
                <div className="highlight-icon">
                  <i className="fas fa-code"></i>
                </div>
                <div>
                  <h3>Focus</h3>
                  <p>Frontend Development</p>
                </div>
              </div>
              <div className={`highlight-item ${isVisible ? 'animate-scale-in visible' : ''}`} style={{ animationDelay: '0.3s' }}>
                <div className="highlight-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <div>
                  <h3>Passion</h3>
                  <p>Web Technologies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
