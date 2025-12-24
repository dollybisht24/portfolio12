import React, { useState, useEffect } from 'react';
import './GitHubStats.css';

const GitHubStats = () => {
  const username = 'dollybisht24';
  const [timestamp, setTimestamp] = useState(Date.now());
  const [stats, setStats] = useState({
    repos: '...',
    followers: '...',
    following: '...',
    totalStars: '...'
  });
  const [loading, setLoading] = useState(true);

  // Fetch live GitHub data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        
        // Fetch repositories to calculate total stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await reposResponse.json();
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        
        setStats({
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          totalStars: totalStars
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setLoading(false);
      }
    };

    fetchGitHubData();
    // Refresh every 10 minutes
    const interval = setInterval(fetchGitHubData, 600000);
    return () => clearInterval(interval);
  }, []);

  // Refresh graph timestamps every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="github-stats" className="github-stats" aria-labelledby="github-heading">
      <div className="container">
        <h2 id="github-heading" className="section-title">GitHub Statistics & Activity</h2>
        
        {/* Live Stats Cards */}
        <div className="live-stats-grid">
          <div className="live-stat-card">
            <i className="fas fa-code-branch"></i>
            <div className="stat-info">
              <div className="stat-value">{loading ? '...' : stats.repos}</div>
              <div className="stat-label">Public Repositories</div>
            </div>
          </div>
          <div className="live-stat-card">
            <i className="fas fa-users"></i>
            <div className="stat-info">
              <div className="stat-value">{loading ? '...' : stats.followers}</div>
              <div className="stat-label">Followers</div>
            </div>
          </div>
          <div className="live-stat-card">
            <i className="fas fa-user-friends"></i>
            <div className="stat-info">
              <div className="stat-value">{loading ? '...' : stats.following}</div>
              <div className="stat-label">Following</div>
            </div>
          </div>
          <div className="live-stat-card">
            <i className="fas fa-star"></i>
            <div className="stat-info">
              <div className="stat-value">{loading ? '...' : stats.totalStars}</div>
              <div className="stat-label">Total Stars</div>
            </div>
          </div>
        </div>

        <div className="github-content">
          {/* GitHub Stats Cards */}
          <div className="github-stats-grid">
            <div className="github-stat-card">
              <img 
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&bg_color=1f2937&title_color=8b5cf6&icon_color=8b5cf6&text_color=e5e7eb&cache_seconds=1800&t=${timestamp}`}
                alt="GitHub Stats"
                loading="lazy"
              />
            </div>
            <div className="github-stat-card">
              <img 
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true&background=1f2937&ring=8b5cf6&fire=f97316&currStreakLabel=8b5cf6&stroke=6b7280&sideLabels=e5e7eb&dates=9ca3af&date_format=M%20j%5B%2C%20Y%5D&t=${timestamp}`}
                alt="GitHub Streak Stats"
                loading="lazy"
              />
            </div>
          </div>

          {/* GitHub Contribution Graph */}
          <div className="contribution-graph-section">
            <h3 className="graph-title">
              <i className="fas fa-chart-area"></i>
              Contribution Activity
            </h3>
            <div className="contribution-graph-wrapper">
              <img 
                src={`https://ghchart.rshah.org/8b5cf6/${username}?t=${timestamp}`}
                alt="GitHub Contribution Graph"
                loading="lazy"
                className="contribution-graph"
              />
            </div>
            <p className="graph-caption">
              Consistent learning and daily contributions through hands-on development and problem solving.
            </p>
          </div>

          {/* Activity Graph */}
          <div className="activity-graph-section">
            <h3 className="graph-title">
              <i className="fas fa-chart-line"></i>
              Contribution Statistics
            </h3>
            <div className="activity-graph-wrapper">
              <img 
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-dark&bg_color=1f2937&color=8b5cf6&line=8b5cf6&point=e5e7eb&area=true&hide_border=true&t=${timestamp}`}
                alt="GitHub Activity Graph"
                loading="lazy"
                className="activity-graph"
              />
            </div>
          </div>

          {/* Top Languages */}
          <div className="languages-section">
            <h3 className="graph-title">
              <i className="fas fa-code"></i>
              Most Used Languages
            </h3>
            <div className="languages-card">
              <img 
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true&bg_color=1f2937&title_color=8b5cf6&text_color=e5e7eb&cache_seconds=1800&t=${timestamp}`}
                alt="Top Languages"
                loading="lazy"
              />
            </div>
          </div>

          {/* GitHub Profile Button */}
          <div className="github-profile-btn-wrapper">
            <a 
              href={`https://github.com/${username}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-github"
            >
              <i className="fab fa-github"></i>
              <span>View GitHub Profile</span>
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>

          {/* Additional Stats Grid */}
          <div className="additional-stats">
            <div className="stat-item">
              <i className="fas fa-code-branch"></i>
              <div className="stat-content">
                <span className="stat-label">Active Contributor</span>
                <span className="stat-desc">Regular commits & updates</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="fas fa-project-diagram"></i>
              <div className="stat-content">
                <span className="stat-label">Open Source</span>
                <span className="stat-desc">Public repositories</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="fas fa-fire"></i>
              <div className="stat-content">
                <span className="stat-label">Daily Practice</span>
                <span className="stat-desc">Consistent development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
