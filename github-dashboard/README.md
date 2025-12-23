# 🚀 GitHub Activity & Progress Dashboard

A professional, real-time GitHub activity dashboard that beautifully visualizes your development journey, contributions, skills, and achievements.

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384?logo=chart.js)
![Recharts](https://img.shields.io/badge/Recharts-2.10-8884d8)

## ✨ Features

### 📊 Real-Time Statistics
- **Live GitHub Data**: Fetches data directly from GitHub API
- **Comprehensive Stats**: Repos, commits, PRs, issues, stars, forks
- **Contribution Streaks**: Current and longest streak tracking
- **Animated Counters**: Smooth number animations on load

### 🔥 Contribution Heatmap
- **365-Day Activity Calendar**: Full year contribution visualization
- **Color-Coded Intensity**: 5 levels of contribution activity
- **Interactive Cells**: Hover to see detailed contribution counts
- **Streak Tracking**: Visual representation of coding consistency

### 💻 Skill Distribution
- **Language Breakdown**: Visual pie chart of programming languages
- **Repository Count**: Languages sorted by repository usage
- **Percentage Display**: Clear percentage breakdown
- **Progress Bars**: Animated skill level indicators

### 🏆 Achievement System
- **Dynamic Badges**: Unlocked based on actual GitHub activity
- **Multiple Tiers**: Legendary, Gold, Silver, Bronze levels
- **Categories**: Commits, Streaks, Repos, Stars, PRs
- **Animated Reveals**: Smooth badge unlock animations

### 📈 Progress Charts
- **Monthly Trends**: 12-month contribution line chart
- **Weekly Activity**: 12-week activity bar chart
- **Comparison Stats**: Average, best month, current month
- **Interactive Tooltips**: Detailed data on hover

### 🎨 Professional Design
- **Modern UI**: Glass-morphism effects and gradients
- **Dark Theme**: Eye-friendly dark color scheme
- **Smooth Animations**: 60fps animations throughout
- **Responsive**: Mobile, tablet, and desktop optimized
- **Accessibility**: ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: React 18.2 with Hooks
- **Build Tool**: Vite 5.0 for lightning-fast development
- **Charts**: 
  - Chart.js 4.4 (Doughnut charts)
  - Recharts 2.10 (Line & Bar charts)
- **HTTP Client**: Axios 1.6
- **Icons**: Lucide React
- **Styling**: Modern CSS with animations
- **API**: GitHub REST API v3

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- GitHub account
- (Optional) GitHub Personal Access Token for higher API rate limits

### Quick Start

1. **Clone or Download**
   ```bash
   cd github-dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file**
   ```env
   # Optional: Increases API rate limit from 60 to 5000 requests/hour
   VITE_GITHUB_TOKEN=your_github_token_here
   
   # Required: Your GitHub username
   VITE_GITHUB_USERNAME=dollybisht
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   ```

7. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🔑 GitHub Token Setup (Optional but Recommended)

### Why Use a Token?
- **Higher Rate Limits**: 5,000 requests/hour vs 60 without token
- **Faster Loading**: More API calls available
- **No Authentication Issues**: Consistent access

### How to Create Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name: "GitHub Dashboard"
4. Select scopes:
   - `public_repo` (read-only access to public repositories)
5. Generate token and copy it
6. Add to `.env` file:
   ```env
   VITE_GITHUB_TOKEN=ghp_your_token_here
   ```

⚠️ **Security Note**: Never commit `.env` file to version control!

## 🎯 Project Structure

```
github-dashboard/
├── src/
│   ├── components/
│   │   ├── StatsCards.jsx          # GitHub statistics cards
│   │   ├── ContributionGraph.jsx   # Activity heatmap
│   │   ├── SkillBreakdown.jsx      # Language pie chart
│   │   ├── AchievementBadges.jsx   # Achievement system
│   │   └── ProgressCharts.jsx      # Trend charts
│   ├── services/
│   │   └── githubAPI.js            # GitHub API integration
│   ├── styles/
│   │   ├── GitHubDashboard.css     # Main dashboard styles
│   │   ├── StatsCards.css          # Stats card styles
│   │   ├── ContributionGraph.css   # Heatmap styles
│   │   ├── SkillBreakdown.css      # Skill chart styles
│   │   ├── AchievementBadges.css   # Badge styles
│   │   ├── ProgressCharts.css      # Chart styles
│   │   └── index.css               # Global styles
│   ├── GitHubDashboard.jsx         # Main dashboard component
│   ├── App.jsx                     # App wrapper
│   └── main.jsx                    # Entry point
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── .env.example                    # Environment variables template
└── README.md                       # This file
```

## 🔧 Customization

### Change GitHub Username
Edit `.env`:
```env
VITE_GITHUB_USERNAME=your_username
```

### Customize Colors
Edit `src/styles/GitHubDashboard.css`:
```css
/* Primary gradient */
background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);

/* Change to your preferred colors */
background: linear-gradient(135deg, #your_color1 0%, #your_color2 100%);
```

### Modify Achievement Thresholds
Edit `src/components/AchievementBadges.jsx`:
```javascript
// Example: Change commit master threshold
if (stats.totalCommits >= 1000) {
  // Change to your desired value
  if (stats.totalCommits >= 500) {
```

### Add More Language Colors
Edit `src/components/SkillBreakdown.jsx`:
```javascript
const languageColors = {
  JavaScript: '#f7df1e',
  YourLanguage: '#hexcolor',
  // Add more languages
};
```

## 🌐 Integration into Existing Portfolio

### Option 1: Standalone Page
1. Build the dashboard: `npm run build`
2. Deploy `dist/` folder to your hosting
3. Link from your portfolio: `<a href="/dashboard">GitHub Activity</a>`

### Option 2: Embed as Component
1. Copy `src/` folder to your portfolio project
2. Install dependencies from `package.json`
3. Import and use:
   ```jsx
   import GitHubDashboard from './github-dashboard/GitHubDashboard';
   
   function App() {
     return (
       <div>
         <YourPortfolioContent />
         <GitHubDashboard />
       </div>
     );
   }
   ```

### Option 3: iFrame Embed
```html
<iframe 
  src="https://your-dashboard-url.com" 
  width="100%" 
  height="2000px"
  frameborder="0"
  title="GitHub Activity Dashboard"
></iframe>
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop 'dist' folder to netlify.com/drop
```

### GitHub Pages
```bash
npm run build
# Deploy 'dist' folder contents to gh-pages branch
```

### Environment Variables for Deployment
Don't forget to set environment variables in your hosting platform:
- `VITE_GITHUB_TOKEN` (optional)
- `VITE_GITHUB_USERNAME` (required)

## 📊 API Rate Limits

| Authentication | Rate Limit |
|----------------|------------|
| Without Token  | 60/hour    |
| With Token     | 5,000/hour |

**Recommendation**: Use a token for production deployments.

## ⚡ Performance Optimization

- ✅ Lazy loading for charts
- ✅ Debounced scroll listeners
- ✅ Memoized calculations
- ✅ Optimized re-renders
- ✅ GPU-accelerated animations
- ✅ Code splitting with Vite

## 🎨 Features Breakdown

### StatsCards Component
- 8 animated statistic cards
- Real-time data from GitHub API
- Gradient backgrounds
- Hover effects
- Loading skeletons

### ContributionGraph Component
- 365-day contribution calendar
- 5-level color intensity
- Interactive tooltips
- Streak calculation
- Responsive grid layout

### SkillBreakdown Component
- Doughnut chart visualization
- Top 8 programming languages
- Percentage calculations
- Animated progress bars
- Color-coded languages

### AchievementBadges Component
- Dynamic badge unlocking
- 4 achievement tiers
- 6 achievement categories
- Glow effects on hover
- Locked/unlocked states

### ProgressCharts Component
- Monthly line chart (12 months)
- Weekly bar chart (12 weeks)
- Summary statistics
- Interactive tooltips
- Gradient fills

## 🐛 Troubleshooting

### API Rate Limit Exceeded
- **Solution**: Add GitHub token to `.env` file
- **Alternative**: Wait for rate limit reset (1 hour)

### No Data Showing
- **Check**: GitHub username is correct in `.env`
- **Check**: Internet connection is active
- **Check**: GitHub API is accessible
- **Solution**: Open browser console for error details

### Charts Not Rendering
- **Check**: Dependencies installed: `npm install`
- **Check**: Browser supports modern JavaScript
- **Solution**: Clear browser cache and reload

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Future Enhancements

- [ ] GitHub Gists integration
- [ ] Organization repositories support
- [ ] Pull request analytics
- [ ] Code review statistics
- [ ] Issue tracker visualization
- [ ] Repository stars timeline
- [ ] Follower growth chart
- [ ] Export dashboard as PDF

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check existing documentation
- Review API rate limits

## 🌟 Show Your Support

If you like this project, please ⭐ star it on GitHub!

---

**Built with ❤️ using React, Chart.js, and GitHub API**

**Author**: Dolly Bisht  
**Email**: dollybisht408@gmail.com  
**GitHub**: [@dollybisht](https://github.com/dollybisht)
