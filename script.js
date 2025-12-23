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

    // Console easter egg
    console.log('%c👋 Hi there!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
    console.log('%c💼 Interested in working together?', 'color: #8b5cf6; font-size: 16px;');
    console.log('%c📧 Reach out: dollybisht408@gmail.com', 'color: #ec4899; font-size: 14px;');
    console.log('%c✨ This portfolio was built with modern web technologies', 'color: #10b981; font-size: 12px;');
});

// ========== THEME TOGGLE ==========
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle theme on button click
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Add animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 500);
    });
}

// ========== PAGE VISIBILITY ==========
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Come back! - Dolly Bisht';
    } else {
        document.title = 'Dolly Bisht - Frontend Developer | Portfolio';
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

// ===== PROFESSIONAL ENHANCEMENTS =====

// Personalized Contact Form Success Message
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const formElement = e.target;
    
    // Simulate form submission
    setTimeout(() => {
        // Clear form
        formElement.reset();
        
        // Show personalized success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you, <strong>${name}</strong>! 🎉</p>
            <p>Your message has been received successfully. I'll get back to you within 24 hours!</p>
        `;
        
        formElement.appendChild(successDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successDiv.style.opacity = '0';
            setTimeout(() => successDiv.remove(), 300);
        }, 5000);
    }, 500);
});

// Smooth Scroll for All Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .cert-card, .cv-highlights').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Progress Bar Animation on Scroll
const skillBars = document.querySelectorAll('.skill-fill');
let barsAnimated = false;

window.addEventListener('scroll', () => {
    if (!barsAnimated) {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const rect = skillsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75) {
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const skillLevel = bar.getAttribute('data-skill');
                        bar.style.width = skillLevel + '%';
                    }, index * 100);
                });
                barsAnimated = true;
            }
        }
    }
});

// Download Resume Button Tracking (Analytics)
document.querySelectorAll('.btn-resume, .download-resume').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Resume downloaded at:', new Date().toISOString());
        // You can add Google Analytics or other tracking here
    });
});

// Add typing effect to hero tagline (optional enhancement)
const tagline = document.querySelector('.hero-tagline strong');
if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing after page load
    setTimeout(typeWriter, 1000);
}

// Mobile Menu Enhancement
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Testimonials Carousel (optional - auto-rotate)
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function rotateTestimonials() {
    if (testimonialCards.length > 0 && window.innerWidth < 768) {
        testimonialCards.forEach((card, index) => {
            card.style.display = index === currentTestimonial ? 'block' : 'none';
        });
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }
}

// Auto-rotate every 5 seconds on mobile
if (window.innerWidth < 768) {
    setInterval(rotateTestimonials, 5000);
}

console.log('🚀 Portfolio loaded successfully!');
console.log('💼 Dolly Bisht - Frontend Developer');
console.log('📧 Contact: dollybisht408@gmail.com');

// === EMAIL JS INTEGRATION ===

(function() {
    emailjs.init("YOUR_PUBLIC_KEY");
})();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnIcon = document.getElementById('btnIcon');
        const formMessage = document.getElementById('formMessage');
        
        function showMessage(msg, type) {
            formMessage.textContent = msg;
            formMessage.className = 'form-message ' + type;
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        }
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        submitBtn.classList.add('loading');
        btnText.textContent = 'Sending...';
        btnIcon.className = 'fas fa-spinner';
        
        const serviceID = 'YOUR_SERVICE_ID';
        const templateID = 'YOUR_TEMPLATE_ID';
        
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_name: 'Dolly Bisht'
        };
        
        console.log('Sending email with params:', templateParams);
        
        emailjs.send(serviceID, templateID, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showMessage('✅ Message sent successfully! I will get back to you soon.', 'success');
                form.reset();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                showMessage('❌ Failed to send: ' + (error.text || error.message || 'Please check EmailJS configuration'), 'error');
            })
            .finally(function() {
                submitBtn.classList.remove('loading');
                btnText.textContent = 'Send Message';
                btnIcon.className = 'fas fa-paper-plane';
            });
    });
});
