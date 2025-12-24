# 🌟 Professional Portfolio Website

A modern, interactive, and recruiter-ready portfolio website built with React, showcasing skills, projects, and GitHub activity.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-19.2.3-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3.0-646CFF?logo=vite)

## ✨ Features

### 🎨 Modern Design
- **Dark Theme**: Professional dark gray (#1f2937) with purple accents (#8b5cf6)
- **Smooth Animations**: Typing effects, scroll-triggered animations, shimmer effects
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation support

### 🚀 Interactive Components

#### Hero Section
- Dynamic typing animation cycling through roles
- Gradient border profile image with glow effect
- Scroll indicator with bounce animation
- Quick access buttons (View Projects, Download CV)
- Social media links (GitHub, LinkedIn, Email)

#### Skills Section
- Professional icon wrappers with brand-accurate gradient backgrounds
- Animated progress bars with shimmer and pulse effects
- Percentage counter animation from 0 to target
- Categorized by Frontend, Backend, and Tools
- Hover effects with scale and rotation

#### Projects Section
- **Interactive Filters**: Filter by All, React, JavaScript, or HTML-CSS
- **Tech Stack Badges**: Colored icons for each technology
- **Hover Overlays**: Quick links to live demo and source code
- **Feature Lists**: Detailed problem-solution descriptions

#### GitHub Statistics
- **Live API Integration**: Real-time data from GitHub API
  - Public repositories count
  - Followers and following counts
  - Total stars across all repos
- **Visual Statistics**:
  - Contribution heatmap
  - Streak statistics
  - Activity graph
  - Top languages chart
- **Auto-refresh**: Updates every 10 minutes

#### Contact Form
- **Full Validation**: Real-time validation with error messages
- **Field Validation**:
  - Name: Min 2 characters
  - Email: Valid email format
  - Subject: Min 3 characters
  - Message: Min 10 characters
- **Status Indicators**: Success, error, and loading states
- **EmailJS Integration**: Form submissions (demo mode)

### 🎯 UX Enhancements
- **Scroll Progress Bar**: Visual indicator at top of page
- **Back to Top Button**: Appears after scrolling 500px
- **Smooth Scrolling**: Native smooth scroll behavior
- **Page Load Animation**: Fade-in effect on initial load
- **Performance Optimizations**: 
  - Lazy loading for images
  - Will-change for animated elements
  - Optimized re-renders

## 🛠️ Technologies Used

### Core
- **React 19.2.3** - UI library
- **Vite 7.3.0** - Build tool and dev server

### Styling
- **CSS3** - Custom styles with CSS variables
- **Font Awesome 6.4.0** - Icon library
- **Google Fonts** - Inter & Space Grotesk

### APIs & Services
- **GitHub API** - Live repository data
- **GitHub Readme Stats** - Contribution statistics
- **GitHub Streak Stats** - Streak visualization
- **EmailJS** - Contact form handling

## 📁 Project Structure

```
react-portfolio/
├── public/
│   ├── images/
│   │   └── profile.jpg
│   └── Dolly_Bisht_Resume.pdf
├── src/
│   ├── components/
│   │   ├── Navigation.jsx          # Sticky navigation with mobile menu
│   │   ├── Hero.jsx                # Hero section with typing animation
│   │   ├── About.jsx               # About section with highlights
│   │   ├── Skills.jsx              # Skills with animated progress bars
│   │   ├── Projects.jsx            # Projects with filters
│   │   ├── GitHubStats.jsx         # Live GitHub statistics
│   │   ├── Contact.jsx             # Contact form with validation
│   │   ├── ScrollProgress.jsx      # Scroll progress indicator
│   │   ├── BackToTop.jsx           # Back to top button
│   │   └── *.css                   # Component-specific styles
│   ├── App.jsx                     # Main app component
│   ├── index.css                   # Global styles and variables
│   └── main.jsx                    # React entry point
├── index.html                      # HTML template with meta tags
├── package.json                    # Dependencies
└── vite.config.js                  # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:3000` (or next available port)

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎨 Customization

### Update Personal Information

1. **GitHub Username**: Edit `src/components/GitHubStats.jsx`
   ```javascript
   const username = 'your-github-username';
   ```

2. **Personal Details**: Edit `src/components/Hero.jsx`
   ```javascript
   roles: ['Your Role 1', 'Your Role 2', ...]
   ```

3. **Skills**: Edit `src/components/Skills.jsx`
   ```javascript
   const skills = [
     { name: 'Your Skill', level: 90, icon: 'fab fa-icon' }
   ];
   ```

4. **Projects**: Edit `src/components/Projects.jsx`
   ```javascript
   const projects = [
     {
       title: 'Your Project',
       category: 'React', // or 'JavaScript', 'HTML-CSS'
       // ... other details
     }
   ];
   ```

5. **Contact Info**: Edit `src/components/Contact.jsx` and `Hero.jsx`
   - Email addresses
   - Social media links

### Color Theme

Colors are defined in `src/index.css`:
```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  /* Modify these variables to change the theme */
}
```

### Add New Projects

In `src/components/Projects.jsx`:
```javascript
{
  title: 'Project Name',
  category: 'React', // 'JavaScript' or 'HTML-CSS'
  description: 'Description',
  icon: 'fas fa-icon-name',
  problem: 'Problem statement',
  features: ['Feature 1', 'Feature 2'],
  tags: ['React', 'JavaScript', 'CSS'],
  liveLink: 'https://...',
  githubLink: 'https://github.com/...'
}
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Optimizations Applied
- Lazy loading images
- Code splitting (via Vite)
- CSS animations with `will-change`
- Debounced scroll events
- Efficient re-renders with React hooks

## 🔒 Security

- All external links open with `rel="noopener noreferrer"`
- Form validation to prevent malicious input
- No sensitive data in client-side code
- HTTPS recommended for production

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Dolly Bisht**
- GitHub: [@dollybisht24](https://github.com/dollybisht24)
- LinkedIn: [Dolly Bisht](https://linkedin.com/in/dolly-bisht)
- Email: dollybisht408@gmail.com

## 🙏 Acknowledgments

- Font Awesome for icons
- GitHub for API and stats services
- React community for excellent documentation
- Vite team for blazing-fast build tool

## 📸 Screenshots

### Desktop View
- Clean, professional layout
- Smooth animations
- Interactive elements

### Mobile View
- Fully responsive
- Touch-optimized
- Hamburger menu

---

**Built with ❤️ using React and Vite**
