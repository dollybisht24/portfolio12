import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-brand">Dolly Bisht</h3>
            <p className="footer-tagline">Frontend Developer | BCA Student</p>
            <p className="footer-description">
              Crafting responsive and user-friendly web experiences with modern technologies.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-socials">
              <a href="https://github.com/dollybisht24" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/dollybisht" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="mailto:dollybisht408@gmail.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
            <p className="footer-location">
              <i className="fas fa-map-marker-alt"></i> Himachal Pradesh, India
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Dolly Bisht. Designed & Built with <span className="heart">❤</span> by Dolly Bisht</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
