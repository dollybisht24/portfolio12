import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Code2 } from 'lucide-react';
import '../styles/SkillBreakdown.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const SkillBreakdown = ({ languages, isLoading }) => {
  // Language color mapping
  const languageColors = {
    JavaScript: '#f7df1e',
    Python: '#3776ab',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    React: '#61dafb',
    'Jupyter Notebook': '#DA5B0B',
    Java: '#b07219',
    C: '#555555',
    'C++': '#f34b7d',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Shell: '#89e051',
    Vue: '#41b883',
    Other: '#cccccc'
  };

  const topLanguages = React.useMemo(() => {
    if (!languages || Object.keys(languages).length === 0) {
      return [];
    }

    return Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([name, count]) => ({
        name,
        count,
        color: languageColors[name] || languageColors.Other
      }));
  }, [languages]);

  const chartData = {
    labels: topLanguages.map(lang => lang.name),
    datasets: [
      {
        data: topLanguages.map(lang => lang.count),
        backgroundColor: topLanguages.map(lang => lang.color),
        borderColor: '#1a1a2e',
        borderWidth: 3,
        hoverOffset: 15
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} repos (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
      easing: 'easeInOutQuart'
    }
  };

  const totalRepos = topLanguages.reduce((sum, lang) => sum + lang.count, 0);

  return (
    <div className="skill-breakdown-container">
      <div className="skill-header">
        <h3>
          <Code2 className="code-icon" />
          Language Distribution
        </h3>
      </div>

      {isLoading ? (
        <div className="skill-skeleton">
          <div className="skeleton-chart"></div>
        </div>
      ) : topLanguages.length > 0 ? (
        <div className="skill-content">
          <div className="chart-wrapper">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="chart-center-text">
              <div className="center-number">{totalRepos}</div>
              <div className="center-label">Repositories</div>
            </div>
          </div>

          <div className="language-list">
            {topLanguages.map((lang, index) => {
              const percentage = ((lang.count / totalRepos) * 100).toFixed(1);
              return (
                <div key={lang.name} className="language-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="language-info">
                    <span
                      className="language-dot"
                      style={{ backgroundColor: lang.color }}
                    ></span>
                    <span className="language-name">{lang.name}</span>
                  </div>
                  <div className="language-stats">
                    <span className="language-percentage">{percentage}%</span>
                    <span className="language-count">{lang.count} repos</span>
                  </div>
                  <div className="language-bar">
                    <div
                      className="language-bar-fill"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: lang.color
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="no-data">
          <Code2 size={48} />
          <p>No language data available</p>
        </div>
      )}
    </div>
  );
};

export default SkillBreakdown;
