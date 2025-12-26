import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef(null);

  const projects = [
    {
      title: 'Simple Blog Feed',
      description: 'A clean and modern blog feed application featuring article listings, responsive design, and smooth user experience.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'JavaScript',
      liveLink: 'https://blog21313.netlify.app/',
      githubLink: 'https://github.com/dollybisht24',
      image: '/images/projects/blog.svg'
    },
    {
      title: 'Nykaa Clone',
      description: 'A fully responsive e-commerce website clone featuring product listings, shopping cart, and modern UI/UX design.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'JavaScript',
      liveLink: 'https://quiz12as.netlify.app/',
      githubLink: 'https://github.com/dollybisht24/makup-F',
      image: '/images/projects/quiz.svg'
    },
    {
      title: 'Food Ordering Website',
      description: 'An interactive food ordering platform with user-friendly interface, menu browsing, and order management features.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'HTML-CSS',
      liveLink: 'https://recat23.netlify.app/',
      githubLink: 'https://github.com/dollybisht24/food-f',
      image: '/images/projects/react.svg'
    }
  ];

  const filters = ['All', 'React', 'JavaScript', 'HTML-CSS'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            filteredProjects.forEach((_, index) => {
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
  }, [activeFilter]);

  const getTechIcon = (tech) => {
    const icons = {
      'React': { icon: 'fab fa-react', color: '#61dafb' },
      'JavaScript': { icon: 'fab fa-js', color: '#f7df1e' },
      'HTML': { icon: 'fab fa-html5', color: '#e34c26' },
      'CSS': { icon: 'fab fa-css3-alt', color: '#1572b6' },
      'API': { icon: 'fas fa-plug', color: '#8b5cf6' }
    };
    return icons[tech] || { icon: 'fas fa-code', color: '#6366f1' };
  };

  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading" ref={sectionRef}>
      <div className="container">
        <h2 id="projects-heading" className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Explore my recent work showcasing modern web development</p>
        
        {/* Filter Buttons */}
        <div className="project-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(filter);
                setVisibleCards([]);
              }}
              aria-label={`Filter projects by ${filter}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <article 
              key={index} 
              className={`project-card ${visibleCards.includes(index) ? 'visible' : ''}`}
            >
              {/* Project Image */}
              <div className="project-image-wrapper">
                <img 
                  src={project.image} 
                  alt={`${project.title} preview`}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-overlay">
                  <div className="overlay-buttons">
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="overlay-btn"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="overlay-btn"
                        aria-label={`View ${project.title} source code`}
                      >
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                {/* Tech Stack */}
                <div className="project-tech">
                  {project.tags.map((tag, tagIndex) => {
                    const { icon, color } = getTechIcon(tag);
                    return (
                      <span key={tagIndex} className="tech-tag" style={{ borderColor: color }}>
                        <i className={icon} style={{ color }}></i>
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="project-actions">
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-project btn-live"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <i className="fas fa-globe"></i>
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-project btn-github"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <i className="fab fa-github"></i>
                      <span>GitHub Code</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
