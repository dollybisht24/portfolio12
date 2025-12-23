import React, { useState, useEffect } from 'react';
import { Github, RefreshCw, Loader } from 'lucide-react';
import StatsCards from './components/StatsCards';
import ContributionGraph from './components/ContributionGraph';
import SkillBreakdown from './components/SkillBreakdown';
import AchievementBadges from './components/AchievementBadges';
import ProgressCharts from './components/ProgressCharts';
import { calculateStats } from './services/githubAPI';
import './styles/GitHubDashboard.css';

const GitHubDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await calculateStats();
      setDashboardData(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load GitHub data. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    fetchDashboardData();
  };

  return (
    <div className="github-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <Github className="header-icon" />
            <div className="header-text">
              <h1>GitHub Activity Dashboard</h1>
              <p>Real-time insights into my development journey</p>
            </div>
          </div>
          <div className="header-right">
            {lastUpdated && (
              <span className="last-updated">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button 
              className={`refresh-btn ${isLoading ? 'loading' : ''}`}
              onClick={handleRefresh}
              disabled={isLoading}
              aria-label="Refresh data"
            >
              <RefreshCw className="refresh-icon" />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Error State */}
      {error && (
        <div className="error-banner">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button onClick={handleRefresh} className="retry-btn">
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !dashboardData && (
        <div className="loading-container">
          <Loader className="loader-icon" />
          <p>Loading GitHub data...</p>
        </div>
      )}

      {/* Dashboard Content */}
      {dashboardData && (
        <div className="dashboard-content">
          {/* Profile Section */}
          {dashboardData.profile && (
            <div className="profile-section">
              <img 
                src={dashboardData.profile.avatar_url} 
                alt={dashboardData.profile.name}
                className="profile-avatar"
              />
              <div className="profile-info">
                <h2>{dashboardData.profile.name}</h2>
                <p className="profile-username">@{dashboardData.profile.login}</p>
                {dashboardData.profile.bio && (
                  <p className="profile-bio">{dashboardData.profile.bio}</p>
                )}
                <div className="profile-stats">
                  <span>{dashboardData.profile.followers} followers</span>
                  <span>·</span>
                  <span>{dashboardData.profile.following} following</span>
                  <span>·</span>
                  <span>Joined {new Date(dashboardData.profile.created_at).getFullYear()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          <section className="dashboard-section">
            <StatsCards stats={dashboardData.stats} isLoading={isLoading} />
          </section>

          {/* Contribution Graph */}
          <section className="dashboard-section">
            <ContributionGraph 
              contributionCalendar={dashboardData.contributionCalendar}
              isLoading={isLoading}
            />
          </section>

          {/* Two Column Layout */}
          <div className="two-column-layout">
            {/* Skill Breakdown */}
            <section className="dashboard-section">
              <SkillBreakdown 
                languages={dashboardData.languages}
                isLoading={isLoading}
              />
            </section>

            {/* Achievement Badges */}
            <section className="dashboard-section">
              <AchievementBadges 
                stats={dashboardData.stats}
                isLoading={isLoading}
              />
            </section>
          </div>

          {/* Progress Charts */}
          <section className="dashboard-section full-width">
            <ProgressCharts 
              events={dashboardData.recentActivity}
              isLoading={isLoading}
            />
          </section>
        </div>
      )}

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Data fetched from GitHub API in real-time</p>
        <p>Built with React, Chart.js & Recharts</p>
      </footer>
    </div>
  );
};

export default GitHubDashboard;
