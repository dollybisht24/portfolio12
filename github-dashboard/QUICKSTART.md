# 🚀 Quick Start Guide

## Fastest Way to Get Started

### 1. Install Dependencies
```bash
cd github-dashboard
npm install
```

### 2. Configure Username
The `.env` file is already set with your username: `dollybisht`

### 3. Run the Dashboard
```bash
npm run dev
```

The dashboard will open at: **http://localhost:3000**

## ✅ What You'll See

1. **Profile Section**: Your GitHub avatar, name, and bio
2. **Stats Cards**: 8 animated cards showing your GitHub activity
3. **Contribution Heatmap**: 365-day activity calendar
4. **Skill Breakdown**: Pie chart of your programming languages
5. **Achievement Badges**: Unlocked badges based on your activity
6. **Progress Charts**: Monthly and weekly contribution trends

## 🔑 Optional: Add GitHub Token (Recommended)

### Why?
- Increases API rate limit from **60 to 5,000 requests/hour**
- Prevents rate limiting issues
- Faster, more reliable data fetching

### How?
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "GitHub Dashboard"
4. Select: `public_repo` scope
5. Generate and copy the token
6. Add to `.env` file:
   ```
   VITE_GITHUB_TOKEN=ghp_your_token_here
   ```
7. Restart the dev server

## 📦 Build for Production

```bash
npm run build
```

This creates a `dist/` folder ready for deployment.

## 🌐 Deploy

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Build: `npm run build`
2. Upload `dist/` folder to netlify.com

### GitHub Pages
1. Build: `npm run build`
2. Deploy `dist/` contents to gh-pages branch

## 🎨 Customize

### Change Username
Edit `.env`:
```
VITE_GITHUB_USERNAME=your_username
```

### Change Colors
Edit `src/styles/GitHubDashboard.css` - look for gradient colors

## ❓ Troubleshooting

### No Data Showing?
- Check internet connection
- Verify username in `.env` is correct
- Check browser console for errors

### API Rate Limit?
- Add GitHub token to `.env`
- Wait 1 hour for rate limit reset

### Build Errors?
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📊 What Data is Collected?

All data is fetched **read-only** from GitHub's public API:
- User profile information
- Public repositories
- Commit history
- Pull requests
- Issues
- Programming languages used

**No private data is accessed or stored.**

## 🎯 Next Steps

1. ✅ Run the dashboard locally
2. ✅ Add GitHub token for better performance
3. ✅ Customize colors and styles
4. ✅ Build and deploy to your portfolio
5. ✅ Share your amazing GitHub journey!

---

**Need Help?**
- Check README.md for full documentation
- Open an issue on GitHub
- Email: dollybisht408@gmail.com

**Enjoy your new GitHub Dashboard! 🎉**
