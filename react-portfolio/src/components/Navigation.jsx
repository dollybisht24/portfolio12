import React, { useState, useEffect } from 'react';
import { Link } from '../Router';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <a href="#home" className="logo" aria-label="Home">
          <span></span>
        </a>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a></li>
           <li><a href="#skills" className="nav-link" onClick={() => setIsMenuOpen(false)}>Skills</a></li>
          <li><Link to="/projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projects</Link></li>
          <li><Link to="/certifications" className="nav-link" onClick={() => setIsMenuOpen(false)}>Certifications</Link></li>
          <li><a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
        </ul>
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          aria-label="Toggle navigation menu" 
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
