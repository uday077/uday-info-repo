// Premium Interactive Effects & Animations

// 1. Custom Cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    window.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card, .theme-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}

// 2. Scroll Progress Bar
function initScrollProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);

    window.addEventListener('scroll', () => {
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 3. Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }));
}

// 4. Smooth scrolling for navigation links
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

// 5. Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
});

// 6. Typing animation for hero subtitle
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = [
            'DevOps Engineer', 
            'Cloud Infrastructure Specialist', 
            'CI/CD Automation Expert',
            'AWS Certified Solutions Architect',
            'Kubernetes & Docker Pro'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentText = texts[textIndex];
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before start
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }
}

// 7. Staggered Reveal Animations
function initRevealAnimations() {
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat-card, .tech-card, .education-card, .certifications-card');
    revealElements.forEach((el, index) => {
        el.classList.add('reveal-item');
        revealObserver.observe(el);
    });
}

// 8. Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            if (target === 100) {
                element.textContent = Math.floor(start) + '%';
            } else if (target === 2) {
                element.textContent = Math.floor(start * 10) / 10 + '+';
            } else {
                element.textContent = Math.floor(start) + '+';
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (target === 100) {
                element.textContent = '100%';
            } else if (target === 2) {
                element.textContent = '2+';
            } else {
                element.textContent = target + '+';
            }
        }
    }
    
    updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('2+')) {
                    animateCounter(stat, 2);
                } else if (text.includes('15+')) {
                    animateCounter(stat, 15);
                } else if (text.includes('5+')) {
                    animateCounter(stat, 5);
                } else if (text.includes('90%')) {
                    animateCounter(stat, 90);
                } else if (text.includes('99.9%')) {
                    animateCounter(stat, 99.9);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// 9. Parallax Effect for Shapes
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape, .tech-shape, .about-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.05);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// 10. Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(`${currentTheme}-theme`);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light' : 'dark';
        
        body.classList.remove('dark-theme', 'light-theme');
        body.classList.add(`${newTheme}-theme`);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initScrollProgress();
    initTypingAnimation();
    initRevealAnimations();
    initParallax();
    initThemeToggle();
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);
    
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) statsObserver.observe(aboutStats);
    
    // Loaded State
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});