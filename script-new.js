/*=================================
  PROFESSIONAL PORTFOLIO JAVASCRIPT
  Modern, Clean, Performance-Optimized
  =================================*/

// ========== UTILITY FUNCTIONS ==========
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ========== NAVIGATION ==========
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.setupHamburger();
        this.setupScrollEffect();
        this.setupActiveLinks();
        this.setupSmoothScroll();
    }

    setupHamburger() {
        this.hamburger?.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            const expanded = this.hamburger.getAttribute('aria-expanded') === 'true' || false;
            this.hamburger.setAttribute('aria-expanded', !expanded);
        });

        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
                this.hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
                this.hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    setupScrollEffect() {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', debounce(handleScroll, 10));
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        
        const highlightNav = () => {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink?.classList.add('active');
                } else {
                    navLink?.classList.remove('active');
                }
            });
        };

        window.addEventListener('scroll', debounce(highlightNav, 10));
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ========== ANIMATIONS ==========
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.animateSkillBars();
        this.animateStats();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe elements
        const elementsToAnimate = document.querySelectorAll(`
            .section-header,
            .about-text,
            .about-stats,
            .skill-category,
            .project-card,
            .cert-card,
            .contact-card,
            .stat-card,
            .highlight-item
        `);

        elementsToAnimate.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
            observer.observe(el);
        });
    }

    animateSkillBars() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillFills = entry.target.querySelectorAll('.skill-fill');
                    skillFills.forEach(fill => {
                        const skillValue = fill.getAttribute('data-skill');
                        setTimeout(() => {
                            fill.style.width = skillValue + '%';
                        }, 200);
                    });
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }
    }

    animateStats() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
                    statNumbers.forEach(stat => {
                        this.animateCounter(stat);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const aboutStats = document.querySelector('.about-stats');
        if (aboutStats) {
            statsObserver.observe(aboutStats);
        }
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    }
}

// ========== CONTACT FORM ==========
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Add input validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateInput(input));
        });
    }

    validateInput(input) {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = 'var(--error)';
            return false;
        }

        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.style.borderColor = 'var(--error)';
                return false;
            }
        }

        input.style.borderColor = 'var(--success)';
        return true;
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validate all inputs
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.form.reset();

        // Reset input styles
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }

    showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' 
                ? 'linear-gradient(135deg, var(--success) 0%, #059669 100%)'
                : 'linear-gradient(135deg, var(--error) 0%, #dc2626 100%)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.95rem',
            fontWeight: '600',
            animation: 'slideInRight 0.5s ease',
            maxWidth: '400px'
        });

        document.body.appendChild(notification);

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }
}

// ========== THEME & EFFECTS ==========
class VisualEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyframeAnimations();
        this.setupParallax();
        this.setupCardTilt();
    }

    addKeyframeAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            .visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupParallax() {
        const techBadges = document.querySelectorAll('.tech-badge');
        
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            
            techBadges.forEach((badge, index) => {
                const speed = 0.05 + (index * 0.01);
                const yPos = scrolled * speed;
                badge.style.transform = `translateY(${yPos}px)`;
            });
        }, 10));
    }

    setupCardTilt() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cards = document.querySelectorAll('.project-card, .cert-card, .stat-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

// ========== PERFORMANCE ==========
class Performance {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalAssets();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalAssets() {
        // Preload critical fonts
        const fontUrls = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
            'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap'
        ];

        fontUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            document.head.appendChild(link);
        });
    }
}

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new ScrollAnimations();
    new ContactForm();
    new VisualEffects();
    new Performance();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize GitHub stats
    console.log('Checking for GitHub stats section...');
    if (document.getElementById('github-stats')) {
        console.log('GitHub stats section found, loading data...');
        fetchGitHubStats();
        // Refresh every 5 minutes
        setInterval(fetchGitHubStats, 300000);
    } else {
        console.warn('GitHub stats section not found');
    }

    // Console easter egg
    console.log('%c👋 Hi there!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
    console.log('%c💼 Interested in working together?', 'color: #8b5cf6; font-size: 16px;');
    console.log('%c📧 Reach out: dollybisht408@gmail.com', 'color: #ec4899; font-size: 14px;');
    console.log('%c✨ This portfolio was built with modern web technologies', 'color: #10b981; font-size: 12px;');
});

// ========== THEME TOGGLE ==========
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Add rotation animation
        themeToggle.style.transition = 'transform 0.5s ease';
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 500);
        
        console.log(`Theme switched to: ${theme} mode`);
    });
    
    console.log('Theme toggle initialized successfully');
}

// ========== GITHUB REAL-TIME STATS ==========
async function fetchGitHubStats() {
    const username = 'dollybisht24';
    
    console.log(`[GitHub Stats] Starting fetch for ${username}...`);
    
    const loadingElement = document.querySelector('.stats-loading');
    const contentElement = document.querySelector('.stats-content');
    
    if (!loadingElement || !contentElement) {
        console.error('[GitHub Stats] Required elements not found in DOM');
        return;
    }
    
    try {
        console.log('[GitHub Stats] Fetching user data...');
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        
        if (!userResponse.ok) {
            throw new Error(`GitHub API error: ${userResponse.status}`);
        }
        
        const userData = await userResponse.json();
        console.log('[GitHub Stats] User data received:', userData.login);
        
        console.log('[GitHub Stats] Fetching repositories...');
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        
        if (!reposResponse.ok) {
            throw new Error(`GitHub API error: ${reposResponse.status}`);
        }
        
        const reposData = await reposResponse.json();
        console.log(`[GitHub Stats] Found ${reposData.length} repositories`);
        
        // Calculate stats
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);
        
        console.log('[GitHub Stats] Updating UI elements...');
        
        // Update UI with null checks
        const elements = {
            totalRepos: document.getElementById('totalRepos'),
            totalStars: document.getElementById('totalStars'),
            totalForks: document.getElementById('totalForks'),
            followers: document.getElementById('followers')
        };
        
        if (elements.totalRepos) elements.totalRepos.textContent = userData.public_repos;
        if (elements.totalStars) elements.totalStars.textContent = totalStars;
        if (elements.totalForks) elements.totalForks.textContent = totalForks;
        if (elements.followers) elements.followers.textContent = userData.followers;
        
        // Hide loading, show content
        loadingElement.style.display = 'none';
        contentElement.style.display = 'grid';
        
        console.log('[GitHub Stats] Stats cards updated');
        
        // Fetch and display languages
        await fetchTopLanguages(reposData);
        
        // Fetch and display recent activity
        await fetchRecentActivity(username);
        
        // Calculate contributions
        await calculateContributions(username);
        
        // Update last update time
        updateLastUpdateTime();
        
        console.log('[GitHub Stats] ✅ All data loaded successfully');
    } catch (error) {
        console.error('[GitHub Stats] ❌ Error:', error);
        loadingElement.innerHTML = `
            <div style="color: #ef4444; text-align: center; padding: 2rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p style="margin: 0;">Failed to load GitHub stats</p>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; opacity: 0.8;">Please try refreshing the page</p>
            </div>
        `;
    }
}

async function fetchTopLanguages(repos) {
    const languages = {};
    
    // Count languages from repos
    repos.forEach(repo => {
        if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
    });
    
    // Sort and get top 5
    const sortedLanguages = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const total = sortedLanguages.reduce((acc, [, count]) => acc + count, 0);
    
    // Draw pie chart
    drawLanguagesPieChart(sortedLanguages, total);
    
    // Create language bars
    const languagesContainer = document.getElementById('topLanguages');
    languagesContainer.innerHTML = sortedLanguages.map(([lang, count]) => {
        const percentage = ((count / total) * 100).toFixed(1);
        const color = getLanguageColor(lang);
        return `
            <div class="language-item">
                <span class="language-name">${lang}</span>
                <div class="language-bar">
                    <div class="language-bar-fill" style="width: ${percentage}%; background: ${color};"></div>
                </div>
                <span class="language-percentage">${percentage}%</span>
            </div>
        `;
    }).join('');
    
    // Hide loading, show content
    document.querySelector('.languages-loading').style.display = 'none';
    document.getElementById('languagesChartContainer').style.display = 'flex';
    languagesContainer.style.display = 'flex';
}

function drawLanguagesPieChart(languages, total) {
    const canvas = document.getElementById('languagesChart');
    if (!canvas || !canvas.getContext) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let currentAngle = -Math.PI / 2; // Start from top
    
    languages.forEach(([lang, count], index) => {
        const percentage = count / total;
        const sliceAngle = percentage * 2 * Math.PI;
        const color = getLanguageColor(lang);
        
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        
        // Fill with gradient
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, adjustColorBrightness(color, -20));
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add border
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 25);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 25);
        
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(lang, labelX, labelY);
        
        // Draw percentage
        ctx.font = '10px Inter, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`${(percentage * 100).toFixed(1)}%`, labelX, labelY + 12);
        
        currentAngle += sliceAngle;
    });
    
    // Draw center circle for donut effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    
    // Add center text
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Languages', centerX, centerY);
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f7df1e',
        'Python': '#3776ab',
        'Java': '#007396',
        'TypeScript': '#3178c6',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'C++': '#00599c',
        'C': '#555555',
        'PHP': '#777bb4',
        'Ruby': '#cc342d',
        'Go': '#00add8',
        'Rust': '#dea584',
        'Swift': '#ffac45',
        'Kotlin': '#7f52ff',
        'Dart': '#00b4ab',
        'Shell': '#89e051',
        'Vue': '#42b883',
        'React': '#61dafb'
    };
    return colors[language] || '#6366f1';
}

function adjustColorBrightness(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
}

async function fetchRecentActivity(username) {
    try {
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
        const events = await eventsResponse.json();
        
        // Draw contribution graph
        drawContributionGraph(events);
        
        const activityContainer = document.getElementById('recentActivity');
        
        activityContainer.innerHTML = events.slice(0, 5).map(event => {
            const icon = getActivityIcon(event.type);
            const description = getActivityDescription(event);
            const time = getRelativeTime(event.created_at);
            
            return `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="activity-details">
                        <div class="activity-type">${event.type.replace('Event', '')}</div>
                        <div class="activity-description">${description}</div>
                        <div class="activity-repo">
                            <i class="fab fa-github"></i> ${event.repo.name}
                        </div>
                        <div class="activity-time">${time}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Hide loading, show content
        document.querySelector('.activity-loading').style.display = 'none';
        document.getElementById('contributionGraphContainer').style.display = 'block';
        activityContainer.style.display = 'flex';
    } catch (error) {
        console.error('Error fetching activity:', error);
    }
}

function drawContributionGraph(events) {
    const canvas = document.getElementById('contributionGraph');
    if (!canvas || !canvas.getContext) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Group events by date (last 30 days)
    const today = new Date();
    const contributions = {};
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        contributions[dateKey] = 0;
    }
    
    // Count contributions per day
    events.forEach(event => {
        const eventDate = new Date(event.created_at).toISOString().split('T')[0];
        if (contributions.hasOwnProperty(eventDate)) {
            contributions[eventDate]++;
        }
    });
    
    const dates = Object.keys(contributions);
    const values = Object.values(contributions);
    const maxValue = Math.max(...values, 1);
    
    // Draw graph
    const barWidth = width / dates.length;
    const padding = 40;
    const graphHeight = height - padding;
    
    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.02)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw bars
    values.forEach((value, index) => {
        const barHeight = (value / maxValue) * (graphHeight - 20);
        const x = index * barWidth;
        const y = graphHeight - barHeight;
        
        // Create gradient for bar
        const barGradient = ctx.createLinearGradient(0, y, 0, graphHeight);
        barGradient.addColorStop(0, '#6366f1');
        barGradient.addColorStop(1, '#8b5cf6');
        
        ctx.fillStyle = barGradient;
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
        
        // Add glow effect on hover areas
        if (value > 0) {
            ctx.shadowColor = 'rgba(99, 102, 241, 0.5)';
            ctx.shadowBlur = 10;
            ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
            ctx.shadowBlur = 0;
        }
    });
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, graphHeight);
    ctx.lineTo(width, graphHeight);
    ctx.stroke();
    
    // Draw labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    
    // Show every 5th date
    dates.forEach((date, index) => {
        if (index % 5 === 0) {
            const day = new Date(date).getDate();
            const x = index * barWidth + barWidth / 2;
            ctx.fillText(day, x, height - 5);
        }
    });
    
    // Draw max value label
    ctx.textAlign = 'right';
    ctx.fillText(maxValue, width - 5, 15);
    ctx.fillText('0', width - 5, graphHeight - 5);
    
    // Add title
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Last 30 Days Activity', 10, 15);
}

function getActivityIcon(type) {
    const icons = {
        'PushEvent': 'fas fa-code-branch',
        'CreateEvent': 'fas fa-plus-circle',
        'WatchEvent': 'fas fa-star',
        'ForkEvent': 'fas fa-code-fork',
        'IssuesEvent': 'fas fa-exclamation-circle',
        'PullRequestEvent': 'fas fa-code-pull-request',
        'default': 'fas fa-circle'
    };
    return icons[type] || icons['default'];
}

function getActivityDescription(event) {
    switch(event.type) {
        case 'PushEvent':
            return `Pushed ${event.payload.commits?.length || 0} commit(s)`;
        case 'CreateEvent':
            return `Created ${event.payload.ref_type}: ${event.payload.ref || event.repo.name}`;
        case 'WatchEvent':
            return `Starred a repository`;
        case 'ForkEvent':
            return `Forked a repository`;
        case 'IssuesEvent':
            return `${event.payload.action} an issue`;
        case 'PullRequestEvent':
            return `${event.payload.action} a pull request`;
        default:
            return event.type.replace('Event', '');
    }
}

function getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
}

async function calculateContributions(username) {
    try {
        // Fetch contribution data and draw heatmap
        await drawContributionHeatmap(username);
        
        // Fetch events from the last year
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
        const events = await eventsResponse.json();
        
        // Calculate contribution stats
        const pushEvents = events.filter(e => e.type === 'PushEvent');
        const totalCommits = pushEvents.reduce((acc, event) => acc + (event.payload.commits?.length || 0), 0);
        const prEvents = events.filter(e => e.type === 'PullRequestEvent');
        const issueEvents = events.filter(e => e.type === 'IssuesEvent');
        
        // Get unique days with activity
        const activeDays = new Set(events.map(e => new Date(e.created_at).toDateString())).size;
        
        const statsContainer = document.getElementById('contributionStats');
        statsContainer.innerHTML = `
            <div class="contribution-item">
                <div class="contribution-value">${totalCommits}</div>
                <div class="contribution-label">Commits</div>
            </div>
            <div class="contribution-item">
                <div class="contribution-value">${prEvents.length}</div>
                <div class="contribution-label">Pull Requests</div>
            </div>
            <div class="contribution-item">
                <div class="contribution-value">${issueEvents.length}</div>
                <div class="contribution-label">Issues</div>
            </div>
            <div class="contribution-item">
                <div class="contribution-value">${activeDays}</div>
                <div class="contribution-label">Active Days</div>
            </div>
        `;
    } catch (error) {
        console.error('Error calculating contributions:', error);
    }
}

async function drawContributionHeatmap(username) {
    try {
        // Fetch events for the last year
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
        const events = await eventsResponse.json();
        
        // Create contribution map for last 365 days
        const contributions = {};
        const today = new Date();
        
        // Initialize all days in the last year
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateKey = date.toISOString().split('T')[0];
            contributions[dateKey] = {
                count: 0,
                date: new Date(date)
            };
        }
        
        // Count contributions from events
        events.forEach(event => {
            const eventDate = new Date(event.created_at).toISOString().split('T')[0];
            if (contributions[eventDate]) {
                contributions[eventDate].count++;
            }
        });
        
        // Calculate max contributions for scaling
        const counts = Object.values(contributions).map(c => c.count);
        const maxCount = Math.max(...counts, 1);
        
        // Draw the heatmap
        const heatmapGrid = document.getElementById('heatmapGrid');
        const heatmapMonths = document.getElementById('heatmapMonths');
        
        // Clear existing content
        heatmapGrid.innerHTML = '';
        heatmapMonths.innerHTML = '';
        
        // Group by weeks
        const weeks = [];
        let currentWeek = [];
        const sortedDates = Object.keys(contributions).sort();
        
        sortedDates.forEach(dateKey => {
            const contrib = contributions[dateKey];
            const dayOfWeek = contrib.date.getDay();
            
            if (dayOfWeek === 0 && currentWeek.length > 0) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
            currentWeek.push({ dateKey, ...contrib });
        });
        if (currentWeek.length > 0) weeks.push(currentWeek);
        
        // Track months for header
        const monthsMap = new Map();
        let currentMonth = null;
        
        weeks.forEach((week, weekIndex) => {
            week.forEach(day => {
                const month = day.date.toLocaleDateString('en-US', { month: 'short' });
                if (month !== currentMonth) {
                    monthsMap.set(weekIndex, month);
                    currentMonth = month;
                }
                
                const level = getContributionLevel(day.count, maxCount);
                const square = document.createElement('div');
                square.className = `contribution-day level-${level}`;
                square.title = `${day.date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                })}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`;
                
                // Add hover effect with tooltip
                square.addEventListener('mouseenter', (e) => {
                    showTooltip(e, square.title);
                });
                square.addEventListener('mouseleave', hideTooltip);
                
                heatmapGrid.appendChild(square);
            });
        });
        
        // Add month labels
        monthsMap.forEach((month, weekIndex) => {
            const monthLabel = document.createElement('span');
            monthLabel.className = 'heatmap-month';
            monthLabel.textContent = month;
            monthLabel.style.gridColumn = `${weekIndex + 1}`;
            heatmapMonths.appendChild(monthLabel);
        });
        
        // Show heatmap, hide loading
        document.querySelector('.heatmap-loading').style.display = 'none';
        document.getElementById('contributionHeatmap').style.display = 'block';
        
        console.log('Contribution heatmap loaded successfully');
    } catch (error) {
        console.error('Error drawing contribution heatmap:', error);
        document.querySelector('.heatmap-loading').innerHTML = 
            '<p style="color: var(--error);">Failed to load contribution graph. Please refresh.</p>';
    }
}

function getContributionLevel(count, maxCount) {
    if (count === 0) return 0;
    const percentage = (count / maxCount) * 100;
    if (percentage <= 25) return 1;
    if (percentage <= 50) return 2;
    if (percentage <= 75) return 3;
    return 4;
}

let tooltipElement = null;

function showTooltip(event, text) {
    if (!tooltipElement) {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'contribution-tooltip';
        document.body.appendChild(tooltipElement);
    }
    
    tooltipElement.textContent = text;
    tooltipElement.style.display = 'block';
    tooltipElement.style.left = (event.pageX + 10) + 'px';
    tooltipElement.style.top = (event.pageY - 30) + 'px';
}

function hideTooltip() {
    if (tooltipElement) {
        tooltipElement.style.display = 'none';
    }
}

function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('lastUpdate').textContent = timeString;
}

// ========== PAGE VISIBILITY ==========
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Come back! - Dolly Bisht';
    } else {
        document.title = 'Dolly Bisht - Frontend Developer | Portfolio';
    }
});

// ========== ENHANCED SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Stagger animations for child elements
            const children = entry.target.querySelectorAll('.stagger-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate-in');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .cert-card, .tech-skill-card').forEach(el => {
    observer.observe(el);
});

// ========== TYPING EFFECT FOR HERO ==========
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Add typing effect to hero title
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        typeWriter(heroTitle, titleText, 80);
    }
});

// ========== EXPORT FOR POTENTIAL TESTING ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        ScrollAnimations,
        ContactForm,
        VisualEffects,
        Performance
    };
}
