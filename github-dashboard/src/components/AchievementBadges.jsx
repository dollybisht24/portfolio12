import React from 'react';
import { Award, Trophy, Zap, Target, Star, TrendingUp } from 'lucide-react';
import '../styles/AchievementBadges.css';

const AchievementBadges = ({ stats, isLoading }) => {
  const achievements = React.useMemo(() => {
    if (!stats) return [];

    const badges = [];

    // Commit achievements
    if (stats.totalCommits >= 1000) {
      badges.push({
        icon: <Zap />,
        title: 'Commit Master',
        description: '1000+ commits',
        level: 'legendary',
        unlocked: true
      });
    } else if (stats.totalCommits >= 500) {
      badges.push({
        icon: <Zap />,
        title: 'Prolific Coder',
        description: '500+ commits',
        level: 'gold',
        unlocked: true
      });
    } else if (stats.totalCommits >= 100) {
      badges.push({
        icon: <Zap />,
        title: 'Consistent Contributor',
        description: '100+ commits',
        level: 'silver',
        unlocked: true
      });
    }

    // Streak achievements
    if (stats.currentStreak >= 30) {
      badges.push({
        icon: <Trophy />,
        title: 'Dedication Champion',
        description: '30+ day streak',
        level: 'legendary',
        unlocked: true
      });
    } else if (stats.currentStreak >= 14) {
      badges.push({
        icon: <Trophy />,
        title: 'Two Week Warrior',
        description: '14+ day streak',
        level: 'gold',
        unlocked: true
      });
    } else if (stats.currentStreak >= 7) {
      badges.push({
        icon: <Trophy />,
        title: 'Week Streak',
        description: '7+ day streak',
        level: 'silver',
        unlocked: true
      });
    }

    // Repository achievements
    if (stats.totalRepos >= 50) {
      badges.push({
        icon: <Target />,
        title: 'Project Maven',
        description: '50+ repositories',
        level: 'legendary',
        unlocked: true
      });
    } else if (stats.totalRepos >= 20) {
      badges.push({
        icon: <Target />,
        title: 'Repository Builder',
        description: '20+ repositories',
        level: 'gold',
        unlocked: true
      });
    } else if (stats.totalRepos >= 10) {
      badges.push({
        icon: <Target />,
        title: 'Project Starter',
        description: '10+ repositories',
        level: 'silver',
        unlocked: true
      });
    }

    // Stars achievements
    if (stats.totalStars >= 100) {
      badges.push({
        icon: <Star />,
        title: 'Star Collector',
        description: '100+ stars received',
        level: 'legendary',
        unlocked: true
      });
    } else if (stats.totalStars >= 50) {
      badges.push({
        icon: <Star />,
        title: 'Popular Creator',
        description: '50+ stars received',
        level: 'gold',
        unlocked: true
      });
    } else if (stats.totalStars >= 10) {
      badges.push({
        icon: <Star />,
        title: 'Rising Star',
        description: '10+ stars received',
        level: 'silver',
        unlocked: true
      });
    }

    // PR achievements
    if (stats.totalPRs >= 50) {
      badges.push({
        icon: <TrendingUp />,
        title: 'Collaboration Expert',
        description: '50+ pull requests',
        level: 'legendary',
        unlocked: true
      });
    } else if (stats.totalPRs >= 20) {
      badges.push({
        icon: <TrendingUp />,
        title: 'Active Contributor',
        description: '20+ pull requests',
        level: 'gold',
        unlocked: true
      });
    } else if (stats.totalPRs >= 5) {
      badges.push({
        icon: <TrendingUp />,
        title: 'Team Player',
        description: '5+ pull requests',
        level: 'silver',
        unlocked: true
      });
    }

    // Special achievements
    if (stats.longestStreak >= 100) {
      badges.push({
        icon: <Award />,
        title: '100 Day Legend',
        description: 'Longest streak 100+ days',
        level: 'legendary',
        unlocked: true
      });
    }

    return badges;
  }, [stats]);

  const getLevelClass = (level) => {
    switch (level) {
      case 'legendary':
        return 'badge-legendary';
      case 'gold':
        return 'badge-gold';
      case 'silver':
        return 'badge-silver';
      default:
        return 'badge-bronze';
    }
  };

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <h3>
          <Award className="award-icon" />
          Achievement Badges
        </h3>
        <span className="badge-count">{achievements.length} Unlocked</span>
      </div>

      {isLoading ? (
        <div className="achievements-skeleton">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="skeleton-badge"></div>
          ))}
        </div>
      ) : achievements.length > 0 ? (
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`achievement-badge ${getLevelClass(achievement.level)} ${
                achievement.unlocked ? 'unlocked' : 'locked'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="badge-glow"></div>
              <div className="badge-icon">{achievement.icon}</div>
              <div className="badge-content">
                <h4 className="badge-title">{achievement.title}</h4>
                <p className="badge-description">{achievement.description}</p>
              </div>
              <div className="badge-level">{achievement.level}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-achievements">
          <Award size={48} />
          <p>Keep coding to unlock achievements!</p>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;
