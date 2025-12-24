import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ['Frontend Developer', 'UI/UX Enthusiast', 'React Developer', 'Web Designer'];
  
  useEffect(() => {
    let currentText = '';
    let charIndex = 0;
    let isDeleting = false;
    
    const typeEffect = setInterval(() => {
      const fullText = roles[currentRole];
      
      if (!isDeleting) {
        currentText = fullText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === fullText.length) {
          isDeleting = true;
          setTimeout(() => {}, 2000);
        }
      } else {
        currentText = fullText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
      
      setDisplayText(currentText);
    }, isDeleting ? 50 : 100);
    
    return () => clearInterval(typeEffect);
  }, [currentRole]);

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text animate-fade-in">
            <p className="hero-greeting">Hi there, I'm</p>
            <h1 className="hero-title">Dolly Bisht</h1>
            <h2 className="hero-subtitle">
              <span className="typing-text">{displayText}</span>
              <span className="cursor">|</span>
            </h2>
            <p className="hero-description">
              Crafting responsive and user-friendly web experiences with modern technologies. 
              Passionate about clean code, continuous learning, and solving real-world problems through development.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                <span>View Projects</span>
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </a>
              <a href="/Dolly_Bisht_Resume.pdf" className="btn btn-resume" download="Dolly_Bisht_Resume.pdf">
                <span>Download CV</span>
                <i className="fas fa-download" aria-hidden="true"></i>
              </a>
            </div>
            <div className="social-links">
              <a href="https://github.com/dollybisht24" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/dolly-bisht" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="mailto:dollybisht408@gmail.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="hero-image animate-slide-in">
            <div className="image-wrapper">
              <div className="gradient-border"></div>
              <img src="/images/profile.jpg" alt="" loading="lazy" />
              <div className="image-glow"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <a href="#about">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
