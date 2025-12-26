import React from 'react';
import './Skills.css';

export default function Skills() {
  return (
    <section id="skills" className="skills section" aria-label="Skills and technologies">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What I Bring</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        <div className="skills-container">
          <div className="skill-category">
            <h3 className="category-title"><i className="fas fa-code"/> Technical Skills</h3>
            <div className="tech-skills-grid">
              <div className="tech-skill-box"><div className="tech-skill-icon">HTML</div><span>HTML5</span></div>
              <div className="tech-skill-box"><div className="tech-skill-icon">CSS</div><span>CSS3</span></div>
              <div className="tech-skill-box"><div className="tech-skill-icon">JS</div><span>JavaScript</span></div>
              <div className="tech-skill-box"><div className="tech-skill-icon">React</div><span>React.js</span></div>
              <div className="tech-skill-box"><div className="tech-skill-icon">Py</div><span>Python</span></div>
            </div>
          </div>

          <div className="skill-category">
            <h3 className="category-title"><i className="fas fa-tools"/> Tools & Platforms</h3>
            <div className="tools-grid">
              <div className="tool-badge">Netlify</div>
              <div className="tool-badge">Vercel</div>
              <div className="tool-badge">VS Code</div>
            </div>
          </div>

          <div className="skill-category">
            <h3 className="category-title"><i className="fas fa-users"/> Soft Skills</h3>
            <div className="soft-skills">
              <div className="soft-skill"><i className="fas fa-comments"/> Communication</div>
              <div className="soft-skill"><i className="fas fa-handshake"/> Collaboration</div>
              <div className="soft-skill"><i className="fas fa-sync-alt"/> Adaptability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import './Skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const skillsData = {
    designing: [
      { name: 'Figma', icon: 'fab fa-figma', color: '#F24E1E', category: 'UI/UX Design' },
      { name: 'figJam', icon: 'fab fa-figma', color: '#F24E1E', category: 'designing' },
      { name: 'Adobe AI', icon: 'fab fa-adobe', color: '#FF9A00', category: 'Illustration' },
      { name: 'Adobe ps', icon: 'fab fa-adobe', color: '#31A8FF', category: 'visual Design' },
      { name: 'Adobe xd', icon: 'fab fa-adobe', color: '#FF61F6', category: 'Illustration' },
      { name: 'framer', icon: 'fas fa-pencil-ruler', color: '#0055FF', category: 'Interactive design' },
      { name: 'Canva', icon: 'fas fa-palette', color: '#00C4CC', category: 'Quick design' },
    ],
    development: [
      { name: 'HTML', icon: 'fab fa-html5', color: '#E34F26', category: 'Markup language' },
      { name: 'Css', icon: 'fab fa-css3-alt', color: '#1572B6', category: 'Styling' },
      { name: 'Javascript', icon: 'fab fa-js', color: '#F7DF1E', category: 'Programming' },
      { name: 'Angular', icon: 'fab fa-angular', color: '#DD0031', category: 'Frame work' },
      { name: 'React', icon: 'fab fa-react', color: '#61DAFB', category: 'UI libres' },
    ],
    frameworks: [
      { name: 'Primeng', icon: 'fas fa-shield-alt', color: '#DD0031', category: 'UI liberes' },
      { name: 'Primereact', icon: 'fab fa-react', color: '#61DAFB', category: 'UI liberes' },
      { name: 'tailwind', icon: 'fas fa-wind', color: '#06B6D4', category: 'Css Framwork' },
      { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#7952B3', category: 'Css Framwork' },
      { name: 'MaterialUI', icon: 'fas fa-cube', color: '#007FFF', category: 'Css Framwork' },
    ],
    projectManagement: [
      { name: 'jira', icon: 'fab fa-jira', color: '#0052CC', category: 'Sprint planning' },
      { name: 'Notion', icon: 'fas fa-book', color: '#000000', category: 'Task management' },
      { name: 'Slack', icon: 'fab fa-slack', color: '#4A154B', category: 'UI/UX Design' },
    ],
    userResearch: [
      { name: 'Optimal W.', icon: 'fas fa-chart-line', color: '#000000', category: 'User research' },
      { name: 'Maza', icon: 'fas fa-mountain', color: '#000000', category: 'Usability testing' },
      { name: 'Analytics', icon: 'fas fa-chart-bar', color: '#FFA500', category: 'Metric reporting' },
    ],
    mobilePlatforms: [
      { name: 'Material', icon: 'fab fa-android', color: '#3DDC84', category: 'Android Guidline' },
      { name: 'iOS(HIG)', icon: 'fab fa-apple', color: '#000000', category: 'Apple Guidline' },
    ],
  };

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
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-container">
        <h2 className="skills-title">My Stacks & design strengths</h2>
        
        {/* Designing Tools */}
        <div className="skills-category">
          <h3 className="category-title">Designing tool</h3>
          <div className={`skills-grid ${isVisible ? 'visible' : ''}`}>
            {skillsData.designing.map((skill, index) => (
              <div 
                key={index} 
                className="skill-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="skill-icon-wrapper">
                  <i className={skill.icon} style={{ color: skill.color }}></i>
                </div>
                <div className="skill-content">
                  <h4 className="skill-name">{skill.name}</h4>
                  <p className="skill-category">{skill.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Design System */}
        <div className="skills-category">
          <h3 className="category-title">Mobile Design system</h3>
          <div className={`skills-grid ${isVisible ? 'visible' : ''}`}>
            {skillsData.mobilePlatforms.map((skill, index) => (
              <div 
                key={index} 
                className="skill-card"
                style={{ animationDelay: `${(index + 7) * 0.1}s` }}
              >
                <div className="skill-icon-wrapper">
                  <i className={skill.icon} style={{ color: skill.color }}></i>
                </div>
                <h4 className="skill-name">{skill.name}</h4>
                <p className="skill-category">{skill.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Development Tools */}
        <div className="skills-category">
          <h3 className="category-title">Development tool</h3>
          <div className={`skills-grid ${isVisible ? 'visible' : ''}`}>
            {skillsData.development.map((skill, index) => (
              <div 
                key={index} 
                className="skill-card"
                style={{ animationDelay: `${(index + 9) * 0.1}s` }}
              >
                <div className="skill-icon-wrapper">
                  <i className={skill.icon} style={{ color: skill.color }}></i>
                </div>
                <h4 className="skill-name">{skill.name}</h4>
                <p className="skill-category">{skill.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Development Frameworks */}
        <div className="skills-category">
          <h3 className="category-title">Development Libraries & framework</h3>
          <div className={`skills-grid ${isVisible ? 'visible' : ''}`}>
            {skillsData.frameworks.map((skill, index) => (
              <div 
                key={index} 
                className="skill-card"
                style={{ animationDelay: `${(index + 14) * 0.1}s` }}
              >
                <div className="skill-icon-wrapper">
                  <i className={skill.icon} style={{ color: skill.color }}></i>
                </div>
                <h4 className="skill-name">{skill.name}</h4>
                <p className="skill-category">{skill.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sprint & Project Management */}
        <div className="skills-category">
          <h3 className="category-title">Sprint & Project Management</h3>
          <div className={`skills-grid ${isVisible ? 'visible' : ''}`}>
            {skillsData.projectManagement.map((skill, index) => (
              <div 
                key={index} 
                className="skill-card"
                style={{ animationDelay: `${(index + 19) * 0.1}s` }}
              >
                <div className="skill-icon-wrapper">
                  <i className={skill.icon} style={{ color: skill.color }}></i>
                </div>
                <h4 className="skill-name">{skill.name}</h4>
                <p className="skill-category">{skill.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User Research */}
        <div className="skills-category">
          <h3 className="category-title">User Research</h3>
          <div className={`skills-grid ${isVisible ? 'visible' : ''}`}>
            {skillsData.userResearch.map((skill, index) => (
              <div 
                key={index} 
                className="skill-card"
                style={{ animationDelay: `${(index + 22) * 0.1}s` }}
              >
                <div className="skill-icon-wrapper">
                  <i className={skill.icon} style={{ color: skill.color }}></i>
                </div>
                <h4 className="skill-name">{skill.name}</h4>
                <p className="skill-category">{skill.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

