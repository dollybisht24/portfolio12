import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { getMonthlyTrends } from '../services/githubAPI';
import '../styles/ProgressCharts.css';

const ProgressCharts = ({ events, isLoading }) => {
  const monthlyData = React.useMemo(() => {
    if (!events || events.length === 0) return [];
    return getMonthlyTrends(events);
  }, [events]);

  const formattedMonthlyData = React.useMemo(() => {
    return monthlyData.map(item => ({
      month: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      contributions: item.contributions
    }));
  }, [monthlyData]);

  const weeklyData = React.useMemo(() => {
    if (!events || events.length === 0) return [];

    const weeks = {};
    const now = new Date();
    
    // Get last 12 weeks
    for (let i = 11; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - (i * 7));
      const weekKey = `Week ${12 - i}`;
      weeks[weekKey] = 0;
    }

    // Count contributions per week
    events.forEach(event => {
      const eventDate = new Date(event.created_at);
      const weeksAgo = Math.floor((now - eventDate) / (7 * 24 * 60 * 60 * 1000));
      
      if (weeksAgo >= 0 && weeksAgo < 12) {
        const weekKey = `Week ${12 - weeksAgo}`;
        if (weeks[weekKey] !== undefined) {
          weeks[weekKey]++;
        }
      }
    });

    return Object.entries(weeks).map(([week, count]) => ({
      week,
      contributions: count
    }));
  }, [events]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            {payload[0].value} contributions
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="progress-charts-container">
      {/* Monthly Trends */}
      <div className="chart-section">
        <div className="chart-header">
          <h3>
            <TrendingUp className="chart-icon" />
            Monthly Progress (Last 12 Months)
          </h3>
        </div>

        {isLoading ? (
          <div className="chart-skeleton">
            <div className="skeleton-chart-area"></div>
          </div>
        ) : formattedMonthlyData.length > 0 ? (
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={formattedMonthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="contributions" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', r: 5 }}
                  activeDot={{ r: 8 }}
                  fill="url(#colorContributions)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="no-chart-data">
            <TrendingUp size={48} />
            <p>No data available</p>
          </div>
        )}
      </div>

      {/* Weekly Trends */}
      <div className="chart-section">
        <div className="chart-header">
          <h3>
            <BarChart3 className="chart-icon" />
            Weekly Activity (Last 12 Weeks)
          </h3>
        </div>

        {isLoading ? (
          <div className="chart-skeleton">
            <div className="skeleton-chart-area"></div>
          </div>
        ) : weeklyData.length > 0 ? (
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis 
                  dataKey="week" 
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="contributions" 
                  fill="url(#colorBar)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="no-chart-data">
            <BarChart3 size={48} />
            <p>No data available</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="chart-summary">
        <div className="summary-card">
          <div className="summary-icon">📈</div>
          <div className="summary-content">
            <span className="summary-label">Average/Month</span>
            <span className="summary-value">
              {formattedMonthlyData.length > 0
                ? Math.round(
                    formattedMonthlyData.reduce((sum, item) => sum + item.contributions, 0) /
                    formattedMonthlyData.length
                  )
                : 0}
            </span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">🔥</div>
          <div className="summary-content">
            <span className="summary-label">Best Month</span>
            <span className="summary-value">
              {formattedMonthlyData.length > 0
                ? Math.max(...formattedMonthlyData.map(item => item.contributions))
                : 0}
            </span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">📊</div>
          <div className="summary-content">
            <span className="summary-label">This Month</span>
            <span className="summary-value">
              {formattedMonthlyData.length > 0
                ? formattedMonthlyData[formattedMonthlyData.length - 1].contributions
                : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts;
