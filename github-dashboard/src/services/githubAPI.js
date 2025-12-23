import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const username = import.meta.env.VITE_GITHUB_USERNAME || 'dollybisht';
const token = import.meta.env.VITE_GITHUB_TOKEN;

// Configure axios with auth if token exists
const api = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: token ? { Authorization: `token ${token}` } : {}
});

/**
 * Fetch user profile information
 */
export const fetchUserProfile = async () => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Fetch all user repositories
 */
export const fetchUserRepos = async () => {
  try {
    const repos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await api.get(`/users/${username}/repos`, {
        params: {
          per_page: 100,
          page,
          sort: 'updated',
          direction: 'desc'
        }
      });
      
      repos.push(...response.data);
      hasMore = response.data.length === 100;
      page++;
    }

    return repos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

/**
 * Fetch commit activity for a repository
 */
export const fetchRepoCommits = async (repoName) => {
  try {
    const response = await api.get(`/repos/${username}/${repoName}/commits`, {
      params: { per_page: 100 }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching commits for ${repoName}:`, error);
    return [];
  }
};

/**
 * Fetch user events (commits, PRs, issues, etc.)
 */
export const fetchUserEvents = async () => {
  try {
    const events = [];
    let page = 1;
    const maxPages = 10; // Last ~300 events

    while (page <= maxPages) {
      const response = await api.get(`/users/${username}/events`, {
        params: { per_page: 100, page }
      });
      
      if (response.data.length === 0) break;
      events.push(...response.data);
      page++;
    }

    return events;
  } catch (error) {
    console.error('Error fetching user events:', error);
    throw error;
  }
};

/**
 * Calculate comprehensive GitHub statistics
 */
export const calculateStats = async () => {
  try {
    const [profile, repos, events] = await Promise.all([
      fetchUserProfile(),
      fetchUserRepos(),
      fetchUserEvents()
    ]);

    // Calculate total stars
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    // Calculate total forks
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    // Count commits from events
    const commitEvents = events.filter(e => e.type === 'PushEvent');
    const totalCommits = commitEvents.reduce((sum, event) => {
      return sum + (event.payload.commits?.length || 0);
    }, 0);

    // Count PRs and Issues
    const totalPRs = events.filter(e => e.type === 'PullRequestEvent').length;
    const totalIssues = events.filter(e => e.type === 'IssuesEvent').length;

    // Language breakdown
    const languages = {};
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    // Calculate contribution streak
    const streak = calculateStreak(events);

    // Get contribution calendar data
    const contributionCalendar = generateContributionCalendar(events);

    return {
      profile: {
        name: profile.name,
        login: profile.login,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        followers: profile.followers,
        following: profile.following,
        public_repos: profile.public_repos,
        created_at: profile.created_at
      },
      stats: {
        totalRepos: repos.length,
        totalStars,
        totalForks,
        totalCommits,
        totalPRs,
        totalIssues,
        currentStreak: streak.current,
        longestStreak: streak.longest
      },
      languages,
      contributionCalendar,
      recentRepos: repos.slice(0, 6),
      recentActivity: events.slice(0, 10)
    };
  } catch (error) {
    console.error('Error calculating stats:', error);
    throw error;
  }
};

/**
 * Calculate contribution streaks
 */
const calculateStreak = (events) => {
  if (!events.length) return { current: 0, longest: 0 };

  const dates = new Set();
  events.forEach(event => {
    const date = new Date(event.created_at).toDateString();
    dates.add(date);
  });

  const sortedDates = Array.from(dates)
    .map(d => new Date(d))
    .sort((a, b) => b - a);

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check current streak
  if (sortedDates.length > 0) {
    const lastContribution = new Date(sortedDates[0]);
    lastContribution.setHours(0, 0, 0, 0);
    const daysDiff = Math.floor((today - lastContribution) / (1000 * 60 * 60 * 24));

    if (daysDiff <= 1) {
      currentStreak = 1;
      
      for (let i = 1; i < sortedDates.length; i++) {
        const diff = Math.floor(
          (sortedDates[i - 1] - sortedDates[i]) / (1000 * 60 * 60 * 24)
        );
        if (diff === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
  }

  // Calculate longest streak
  for (let i = 1; i < sortedDates.length; i++) {
    const diff = Math.floor(
      (sortedDates[i - 1] - sortedDates[i]) / (1000 * 60 * 60 * 24)
    );
    
    if (diff === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, currentStreak);

  return { current: currentStreak, longest: longestStreak };
};

/**
 * Generate contribution calendar heatmap data
 */
const generateContributionCalendar = (events) => {
  const calendar = {};
  const today = new Date();
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

  // Initialize all dates with 0
  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    calendar[dateStr] = 0;
  }

  // Count contributions per day
  events.forEach(event => {
    const date = new Date(event.created_at).toISOString().split('T')[0];
    if (calendar.hasOwnProperty(date)) {
      calendar[date]++;
    }
  });

  return calendar;
};

/**
 * Get monthly contribution trends
 */
export const getMonthlyTrends = (events) => {
  const months = {};
  const currentYear = new Date().getFullYear();

  // Initialize last 12 months
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    months[key] = 0;
  }

  // Count contributions per month
  events.forEach(event => {
    const date = new Date(event.created_at);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (months.hasOwnProperty(key)) {
      months[key]++;
    }
  });

  return Object.entries(months).map(([month, count]) => ({
    month,
    contributions: count
  }));
};

export default {
  fetchUserProfile,
  fetchUserRepos,
  fetchUserEvents,
  calculateStats,
  getMonthlyTrends
};
