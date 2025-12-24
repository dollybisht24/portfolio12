import React, { useState, useEffect } from 'react';

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
          <li><a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
          <li><a href="#certifications" className="nav-link" onClick={() => setIsMenuOpen(false)}>Certifications</a></li>
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
