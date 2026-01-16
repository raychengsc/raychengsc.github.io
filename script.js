// ===========================
// Smooth Scrolling & Navigation
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Prevent browser from restoring previous scroll position on reload
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    // Ensure we start at the top when the page loads
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        });
    });
    
    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===========================
    // Mobile Menu Toggle
    // ===========================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    function toggleMobileMenu() {
        navLinksContainer.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // ===========================
    // Intersection Observer for Animations
    // ===========================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const observeElements = document.querySelectorAll(
        '.about-content, .timeline-item, .skill-category, ' +
        '.highlight-card, .cert-card, .contact-form'
    );
    
    observeElements.forEach(el => {
        observer.observe(el);
    });
    
    // ===========================
    // Skill Bars Animation
    // ===========================
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
    
    // ===========================
    // Animated Counter for Stats
    // ===========================
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                stats.forEach(stat => {
                    animateCounter(stat);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    function animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = current.toFixed(target.includes('.') ? 2 : 0);
            if (isPercentage) displayValue += '%';
            if (isPlus) displayValue += '+';
            
            element.textContent = displayValue;
        }, stepTime);
    }
    
    // ===========================
    // Hero title — preserve original HTML (avoid fragile typing effect)
    // ===========================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Use the existing HTML in the markup as the canonical title
        const originalHTML = heroTitle.innerHTML;
        heroTitle.style.opacity = '1';
        heroTitle.innerHTML = originalHTML;
    }
    
    // ===========================
    // Parallax Effect
    // ===========================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ===========================
    // Dynamic Background Particles
    // ===========================
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 500);
    
    // ===========================
    // Tech Stack Tags Animation
    // ===========================
    const techTags = document.querySelectorAll('.tag');
    
    techTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // ===========================
    // Contact Form Handling
    // ===========================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Simulate form submission
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.classList.add('success');
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                }, 2000);
            }, 1500);
        });
    }
    
    // ===========================
    // Schedule Meeting Button
    // ===========================
    const scheduleBtn = document.getElementById('schedule-btn');
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = 'https://calendly.com/raycheng-rcsc';
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
            if (newWindow) newWindow.opener = null;
        });
    }

    // ===========================
    // Certification Card 3D Effect
    // ===========================
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // ===========================
    // Copy Email to Clipboard
    // ===========================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.getAttribute('href').replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!');
                });
            }
        });
    });
    
    // ===========================
    // Notification Toast
    // ===========================
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ===========================
    // Theme Toggle (Optional Enhancement)
    // ===========================
    function createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = '🌙';
        toggle.setAttribute('aria-label', 'Toggle theme');
        
        document.body.appendChild(toggle);
        
        toggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            this.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
        });
    }
    
    // Uncomment to enable theme toggle
    // createThemeToggle();
    
    // ===========================
    // Performance Optimization
    // ===========================
    // Lazy load images
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
    
    // ===========================
    // Console Easter Egg
    // ===========================
    console.log('%cHey there! 👋', 'color: #0066ff; font-size: 20px; font-weight: bold;');
    console.log('%cLooks like you\'re checking out the code. Nice!', 'color: #00d4ff; font-size: 14px;');
    console.log('%cFeel free to reach out if you\'d like to collaborate!', 'color: #a0a0a0; font-size: 12px;');
    
});

    // ===========================
    // Dynamic timeline durations (LinkedIn-like month calculation)
    // ===========================
    function monthsBetween(startDate, endDate) {
        const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let total = years * 12 + months;
        // Subtract one month if end day is before start day (not a full month yet)
        if (end.getDate() < start.getDate()) total -= 1;
        return Math.max(0, total);
    }

    function formatMonths(totalMonths) {
        if (totalMonths === 0) return 'Less than a month';
        if (totalMonths === 1) return '1 month';
        if (totalMonths < 12) return `${totalMonths} months`;
        const yrs = Math.floor(totalMonths / 12);
        const rem = totalMonths % 12;
        if (rem === 0) return `${yrs} ${yrs === 1 ? 'year' : 'years'}`;
        return `${yrs} ${yrs === 1 ? 'year' : 'years'} ${rem} ${rem === 1 ? 'month' : 'months'}`;
    }

    // Find timeline items with a data-start attribute and update their .duration span
    const timelineItems = document.querySelectorAll('.timeline-item[data-start]');
    timelineItems.forEach(item => {
        try {
            const startAttr = item.getAttribute('data-start');
            if (!startAttr) return;
            const startDate = new Date(startAttr);
            const dateEl = item.querySelector('.timeline-date');
            const durationEl = dateEl ? dateEl.querySelector('.duration') : null;
            if (!durationEl) return;

            // Determine end: if the text contains 'Present' use today, otherwise try to parse an end date from the text
            const dateText = dateEl.textContent || '';
            let endDate = new Date();
            if (!/present/i.test(dateText)) {
                // Attempt to extract an end month and year from the text (e.g., "Dec 2023")
                const m = dateText.match(/-\s*([A-Za-z]+)\s+(\d{4})/);
                if (m) {
                    const parsed = new Date(`${m[1]} 1, ${m[2]}`);
                    if (!isNaN(parsed)) endDate = parsed;
                }
            }

            const months = monthsBetween(startDate, endDate);
            durationEl.textContent = formatMonths(months);
        } catch (err) {
            // Fail silently; do not disrupt other scripts
            console.warn('Failed to compute timeline duration', err);
        }
    });

// ===========================
// Utility Functions
// ===========================

// Auto-update timeline durations for current jobs (elements with `data-start`)
// Behavior: count elapsed months and round up any partial month so e.g.,
// start in June and current date in December shows 7 months.
document.addEventListener('DOMContentLoaded', function() {
    function pluralize(n, word) {
        return `${n} ${word}${n === 1 ? '' : 's'}`;
    }

    function computeTotalMonths(startDate, endDate) {
        const s = new Date(startDate);
        const e = new Date(endDate);
        let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());

        // If current day-of-month is >= start day-of-month, count as an additional (partial) month
        if (e.getDate() >= s.getDate()) {
            months += 1;
        }

        return Math.max(0, months);
    }

    function formatMonths(totalMonths) {
        if (totalMonths < 12) {
            return pluralize(totalMonths, 'month');
        }

        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        if (months === 0) return pluralize(years, 'year');
        return `${pluralize(years, 'year')} ${pluralize(months, 'month')}`;
    }

    const items = document.querySelectorAll('.timeline-item[data-start]');
    items.forEach(item => {
        const dateEl = item.querySelector('.timeline-date');
        if (!dateEl) return;

        const dataStart = item.getAttribute('data-start');
        if (!dataStart) return;

        const text = dateEl.textContent || '';
        if (!/present/i.test(text)) return; // only update ongoing roles

        const totalMonths = computeTotalMonths(dataStart, new Date());
        const duration = formatMonths(totalMonths);

        const startLabel = new Date(dataStart).toLocaleString(undefined, { month: 'long', year: 'numeric' });

        // Preserve trailing info after '|' if present
        const parts = text.split('|');
        const right = parts[1] ? ` | ${parts[1].trim()}` : '';

        dateEl.textContent = `${startLabel} - Present · ${duration}${right}`;
    });
});

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
