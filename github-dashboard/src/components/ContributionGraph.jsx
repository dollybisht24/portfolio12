import React, { useMemo } from 'react';
import { Flame, Award } from 'lucide-react';
import '../styles/ContributionGraph.css';

const ContributionGraph = ({ contributionCalendar, isLoading }) => {
  const { weeks, maxContributions } = useMemo(() => {
    if (!contributionCalendar || Object.keys(contributionCalendar).length === 0) {
      return { weeks: [], maxContributions: 0 };
    }

    const dates = Object.entries(contributionCalendar).sort(([a], [b]) => 
      new Date(a) - new Date(b)
    );

    const max = Math.max(...Object.values(contributionCalendar));
    const weeksArray = [];
    let currentWeek = [];

    dates.forEach(([date, count], index) => {
      const dateObj = new Date(date);
      const dayOfWeek = dateObj.getDay();

      if (index === 0 && dayOfWeek !== 0) {
        // Fill empty cells at the start
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: null, count: 0, isEmpty: true });
        }
      }

      currentWeek.push({ date, count, isEmpty: false });

      if (dayOfWeek === 6 || index === dates.length - 1) {
        // Complete the week if necessary
        while (currentWeek.length < 7) {
          currentWeek.push({ date: null, count: 0, isEmpty: true });
        }
        weeksArray.push([...currentWeek]);
        currentWeek = [];
      }
    });

    return { weeks: weeksArray, maxContributions: max };
  }, [contributionCalendar]);

  const getContributionLevel = (count) => {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 6) return 3;
    return 4;
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="contribution-graph-container">
      <div className="contribution-header">
        <h3>
          <Flame className="flame-icon" />
          Contribution Activity
        </h3>
        <div className="contribution-legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`legend-block level-${level}`}
              title={`Level ${level}`}
            ></div>
          ))}
          <span>More</span>
        </div>
      </div>

      {isLoading ? (
        <div className="contribution-skeleton">
          <div className="skeleton-graph"></div>
        </div>
      ) : (
        <div className="contribution-graph">
          <div className="day-labels">
            {days.map((day, i) => (
              i % 2 === 1 && <span key={day} className="day-label">{day}</span>
            ))}
          </div>
          
          <div className="graph-container">
            <div className="weeks-container">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="week-column">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`contribution-cell level-${getContributionLevel(day.count)} ${
                        day.isEmpty ? 'empty' : ''
                      }`}
                      data-date={day.date}
                      data-count={day.count}
                      title={
                        day.date
                          ? `${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`
                          : ''
                      }
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="contribution-summary">
        <div className="summary-item">
          <Award className="summary-icon" />
          <span>Total Contributions: <strong>{Object.values(contributionCalendar || {}).reduce((a, b) => a + b, 0)}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;
