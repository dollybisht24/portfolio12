import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import GitHubStats from './components/GitHubStats';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <GitHubStats />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
