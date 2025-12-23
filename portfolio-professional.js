/**
 * Professional Portfolio JavaScript
 * Handles navigation, form validation, and EmailJS integration
 */

// ===== Initialize EmailJS =====
(function() {
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Replace with your EmailJS public key
})();

// ===== Navigation Functionality =====
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Scroll effect for navbar
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
                this.setActiveLink(link);
            });
        });
        
        // Set active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    }
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
    
    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }
    
    setActiveLink(clickedLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===== Contact Form Handler =====
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.formMessage = document.getElementById('formMessage');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.originalButtonText = this.submitButton.textContent;
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!this.validateForm()) {
            return;
        }
        
        // Get form data
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_email: 'dollybisht408@gmail.com' // Your email
        };
        
        // Show loading state
        this.setLoading(true);
        
        try {
            // Send email using EmailJS
            await this.sendEmail(formData);
            this.showMessage('Message sent successfully! I will get back to you soon.', 'success');
            this.form.reset();
        } catch (error) {
            console.error('Error sending email:', error);
            this.showMessage('Failed to send message. Please try again or email me directly at dollybisht408@gmail.com', 'error');
        } finally {
            this.setLoading(false);
        }
    }
    
    validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            this.showMessage('Please fill in all fields.', 'error');
            return false;
        }
        
        if (!this.validateEmail(email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return false;
        }
        
        return true;
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    async sendEmail(formData) {
        // EmailJS service configuration
        const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
        const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
        
        return emailjs.send(serviceID, templateID, formData);
    }
    
    setLoading(loading) {
        if (loading) {
            this.submitButton.textContent = 'Sending...';
            this.submitButton.disabled = true;
        } else {
            this.submitButton.textContent = this.originalButtonText;
            this.submitButton.disabled = false;
        }
    }
    
    showMessage(message, type) {
        this.formMessage.textContent = message;
        this.formMessage.className = `form-message ${type}`;
        
        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.formMessage.className = 'form-message';
            }, 5000);
        }
    }
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Form Input Animations =====
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus class to parent
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus class from parent
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add filled class if input has value
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// ===== Lazy Loading for Images =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    new Navigation();
    
    // Initialize contact form
    new ContactForm();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize form animations
    initFormAnimations();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize stats counter
    initStatsCounter();
    
    // Initialize progress bars
    initProgressBars();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
});

// ===== Stats Counter Animation =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const animateStats = () => {
        if (animated) return;
        
        const statsSection = document.querySelector('.stats-section');
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
            animated = true;
            
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCount = () => {
                    current += step;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCount();
            });
        }
    };
    
    window.addEventListener('scroll', animateStats);
    animateStats();
}

// ===== Progress Bars Animation =====
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    let animated = false;
    
    const animateProgress = () => {
        if (animated) return;
        
        const skillsSection = document.querySelector('.skills');
        const rect = skillsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.7;
        
        if (isVisible) {
            animated = true;
            
            progressBars.forEach((bar, index) => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, index * 100);
            });
        }
    };
    
    window.addEventListener('scroll', animateProgress);
    animateProgress();
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.knowledge-card, .cert-card, .timeline-item, .blog-card, .project-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Add animation class
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// ===== EmailJS Setup Instructions =====
/**
 * TO SET UP EMAILJS:
 * 
 * 1. Go to https://www.emailjs.com/
 * 2. Sign up for a free account
 * 3. Add an email service (Gmail, Outlook, etc.)
 * 4. Create an email template with the following variables:
 *    - {{from_name}}
 *    - {{from_email}}
 *    - {{subject}}
 *    - {{message}}
 *    - {{to_email}}
 * 
 * 5. Get your credentials:
 *    - Public Key (from Account > General)
 *    - Service ID (from Email Services)
 *    - Template ID (from Email Templates)
 * 
 * 6. Replace in this file:
 *    - Line 10: YOUR_PUBLIC_KEY_HERE
 *    - Line 100: YOUR_SERVICE_ID
 *    - Line 101: YOUR_TEMPLATE_ID
 * 
 * Example EmailJS Template:
 * 
 * Subject: New Contact from {{from_name}}
 * 
 * Body:
 * You have received a new message from your portfolio:
 * 
 * Name: {{from_name}}
 * Email: {{from_email}}
 * Subject: {{subject}}
 * 
 * Message:
 * {{message}}
 * 
 * ---
 * This email was sent from your portfolio contact form.
 */
