import React from 'react';
import { GitFork, Star, GitCommit, GitPullRequest, AlertCircle, Users, TrendingUp, Calendar } from 'lucide-react';
import '../styles/StatsCards.css';

const StatsCards = ({ stats, isLoading }) => {
  const statsData = [
    {
      icon: <GitCommit />,
      label: 'Total Commits',
      value: stats?.totalCommits || 0,
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: <Star />,
      label: 'Total Repositories',
      value: stats?.totalRepos || 0,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: <GitPullRequest />,
      label: 'Pull Requests',
      value: stats?.totalPRs || 0,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: <AlertCircle />,
      label: 'Issues',
      value: stats?.totalIssues || 0,
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: <Star />,
      label: 'Total Stars',
      value: stats?.totalStars || 0,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)'
    },
    {
      icon: <GitFork />,
      label: 'Total Forks',
      value: stats?.totalForks || 0,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      icon: <TrendingUp />,
      label: 'Current Streak',
      value: `${stats?.currentStreak || 0} days`,
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    },
    {
      icon: <Calendar />,
      label: 'Longest Streak',
      value: `${stats?.longestStreak || 0} days`,
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
    }
  ];

  return (
    <div className="stats-container">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className={`stat-card ${isLoading ? 'loading' : ''}`}
          style={{ '--card-gradient': stat.gradient }}
        >
          <div className="stat-icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <div className="stat-value">
              {isLoading ? (
                <div className="skeleton-text"></div>
              ) : (
                <span className="counter" data-target={typeof stat.value === 'number' ? stat.value : 0}>
                  {stat.value}
                </span>
              )}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
          <div className="stat-background"></div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
