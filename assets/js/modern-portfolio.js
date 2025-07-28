// Modern Portfolio - Advanced JavaScript

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        animationDuration: 300,
        scrollOffset: 80,
        typewriterSpeed: 100,
        counterSpeed: 2000,
        skillAnimationDelay: 100
    };

    // State management
    const state = {
        isLoading: true,
        currentSection: 'hero',
        isMenuOpen: false,
        animatedElements: new Set(),
        typewriterIndex: 0,
        roles: ['Data Scientist', 'AI Engineer', 'Automation Expert', 'ML Specialist']
    };

    // Utility functions
    const utils = {
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        },

        lerp(start, end, factor) {
            return start + (end - start) * factor;
        },

        clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        },

        getElementOffset(element) {
            const rect = element.getBoundingClientRect();
            return {
                top: rect.top + window.pageYOffset,
                left: rect.left + window.pageXOffset
            };
        },

        isElementInViewport(element, offset = 0) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
                rect.bottom >= offset
            );
        }
    };

    // DOM Management
    const DOM = {
        loadingScreen: null,
        nav: null,
        navToggle: null,
        navMenu: null,
        navLinks: null,
        heroRole: null,
        heroStats: null,
        skillBars: null,
        contactForm: null,
        animateElements: null,

        init() {
            this.loadingScreen = document.getElementById('loading-screen');
            this.nav = document.getElementById('nav-bar');
            this.navToggle = document.querySelector('.nav-toggle');
            this.navMenu = document.querySelector('.nav-menu');
            this.navLinks = document.querySelectorAll('.nav-link');
            this.heroRole = document.querySelector('.role');
            this.heroStats = document.querySelectorAll('.stat-number');
            this.skillBars = document.querySelectorAll('.skill-progress');
            this.contactForm = document.getElementById('contact-form');
            this.animateElements = document.querySelectorAll('.animate-on-scroll');
        }
    };

    // Loading Screen
    const LoadingScreen = {
        init() {
            setTimeout(() => {
                this.hide();
            }, 2000);
        },

        hide() {
            if (DOM.loadingScreen) {
                DOM.loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    DOM.loadingScreen.style.display = 'none';
                    state.isLoading = false;
                    App.onLoadComplete();
                }, 500);
            }
        }
    };

    // Navigation
    const Navigation = {
        init() {
            this.bindEvents();
            this.updateActiveLink();
        },

        bindEvents() {
            // Mobile menu toggle
            if (DOM.navToggle) {
                DOM.navToggle.addEventListener('click', this.toggleMenu.bind(this));
            }

            // Navigation links
            DOM.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = link.getAttribute('href').substring(1);
                    this.scrollToSection(target);
                    this.closeMenu();
                });
            });

            // Scroll spy
            window.addEventListener('scroll', utils.throttle(this.updateActiveLink.bind(this), 100));

            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (state.isMenuOpen && !DOM.nav.contains(e.target)) {
                    this.closeMenu();
                }
            });
        },

        toggleMenu() {
            state.isMenuOpen = !state.isMenuOpen;
            DOM.navMenu.classList.toggle('active', state.isMenuOpen);
            this.animateToggle();
        },

        closeMenu() {
            state.isMenuOpen = false;
            DOM.navMenu.classList.remove('active');
            this.animateToggle();
        },

        animateToggle() {
            const spans = DOM.navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (state.isMenuOpen) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translateY(6px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        },

        scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                const offset = utils.getElementOffset(section).top - CONFIG.scrollOffset;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        },

        updateActiveLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.pageYOffset + CONFIG.scrollOffset + 100;

            sections.forEach(section => {
                const top = utils.getElementOffset(section).top;
                const bottom = top + section.offsetHeight;

                if (scrollPos >= top && scrollPos <= bottom) {
                    const sectionId = section.getAttribute('id');
                    this.setActiveLink(sectionId);
                    state.currentSection = sectionId;
                }
            });
        },

        setActiveLink(sectionId) {
            DOM.navLinks.forEach(link => {
                const href = link.getAttribute('href').substring(1);
                link.classList.toggle('active', href === sectionId);
            });
        }
    };

    // Typewriter Effect
    const Typewriter = {
        init() {
            if (!DOM.heroRole) return;
            this.startTypewriter();
        },

        startTypewriter() {
            this.typeRole(0);
        },

        typeRole(roleIndex) {
            const role = state.roles[roleIndex];
            let charIndex = 0;

            const typeInterval = setInterval(() => {
                DOM.heroRole.textContent = role.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === role.length) {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        this.eraseRole(() => {
                            const nextRole = (roleIndex + 1) % state.roles.length;
                            this.typeRole(nextRole);
                        });
                    }, 2000);
                }
            }, CONFIG.typewriterSpeed);
        },

        eraseRole(callback) {
            const currentText = DOM.heroRole.textContent;
            let charIndex = currentText.length;

            const eraseInterval = setInterval(() => {
                DOM.heroRole.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    clearInterval(eraseInterval);
                    callback();
                }
            }, CONFIG.typewriterSpeed / 2);
        }
    };

    // Animated Counters
    const Counters = {
        init() {
            this.observeCounters();
        },

        observeCounters() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                        this.animateCounter(entry.target);
                        entry.target.classList.add('counted');
                    }
                });
            }, { threshold: 0.5 });

            DOM.heroStats.forEach(stat => observer.observe(stat));
        },

        animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = CONFIG.counterSpeed;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const current = Math.floor(progress * target);
                element.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.textContent = target;
                }
            };

            requestAnimationFrame(animate);
        }
    };

    // Skill Bars Animation
    const SkillBars = {
        init() {
            this.observeSkills();
        },

        observeSkills() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                        this.animateSkillBar(entry.target);
                        entry.target.classList.add('animated');
                    }
                });
            }, { threshold: 0.3 });

            DOM.skillBars.forEach(skill => observer.observe(skill));
        },

        animateSkillBar(element) {
            const progress = element.getAttribute('data-progress');
            setTimeout(() => {
                element.style.width = progress + '%';
            }, CONFIG.skillAnimationDelay);
        }
    };

    // Scroll Animations
    const ScrollAnimations = {
        init() {
            this.observeElements();
        },

        observeElements() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !state.animatedElements.has(entry.target)) {
                        entry.target.classList.add('animated');
                        state.animatedElements.add(entry.target);
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            DOM.animateElements.forEach(element => observer.observe(element));
        }
    };

    // Contact Form
    const ContactForm = {
        init() {
            if (!DOM.contactForm) return;
            this.bindEvents();
        },

        bindEvents() {
            DOM.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
            
            // Floating labels
            const inputs = DOM.contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', this.handleInputBlur.bind(this));
                input.addEventListener('focus', this.handleInputFocus.bind(this));
            });
        },

        handleInputBlur(e) {
            const input = e.target;
            const label = input.nextElementSibling;
            
            if (input.value === '') {
                label.classList.remove('active');
            }
        },

        handleInputFocus(e) {
            const label = e.target.nextElementSibling;
            label.classList.add('active');
        },

        async handleSubmit(e) {
            e.preventDefault();
            
            const submitBtn = DOM.contactForm.querySelector('.submit-btn');
            const formData = new FormData(DOM.contactForm);
            
            // Show loading state
            submitBtn.classList.add('loading');
            
            try {
                // Simulate form submission
                await this.simulateSubmission(formData);
                
                // Show success message
                this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                DOM.contactForm.reset();
                
            } catch (error) {
                // Show error message
                this.showNotification('Something went wrong. Please try again.', 'error');
            } finally {
                // Hide loading state
                submitBtn.classList.remove('loading');
            }
        },

        simulateSubmission(formData) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Form data:', Object.fromEntries(formData));
                    resolve();
                }, 2000);
            });
        },

        showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                background: ${type === 'success' ? '#000000' : '#666666'};
                color: white;
                border-radius: 8px;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                max-width: 300px;
                font-weight: 500;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 4000);
        }
    };

    // Smooth Scroll Enhancement
    const SmoothScroll = {
        init() {
            this.bindEvents();
        },

        bindEvents() {
            // Handle scroll indicator
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.addEventListener('click', () => {
                    Navigation.scrollToSection('about');
                });
            }

            // Parallax effect for floating shapes
            window.addEventListener('scroll', utils.throttle(this.handleParallax.bind(this), 16));
        },

        handleParallax() {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        }
    };

    // Performance Monitor
    const Performance = {
        init() {
            this.measurePerformance();
        },

        measurePerformance() {
            // Monitor FPS
            let frames = 0;
            let lastTime = performance.now();
            
            const measureFPS = () => {
                frames++;
                const currentTime = performance.now();
                
                if (currentTime >= lastTime + 1000) {
                    const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                    console.log(`FPS: ${fps}`);
                    frames = 0;
                    lastTime = currentTime;
                }
                
                requestAnimationFrame(measureFPS);
            };
            
            if (process.env.NODE_ENV === 'development') {
                requestAnimationFrame(measureFPS);
            }
        }
    };

    // Main App
    const App = {
        init() {
            DOM.init();
            LoadingScreen.init();
        },

        onLoadComplete() {
            // Initialize all modules after loading
            Navigation.init();
            Typewriter.init();
            Counters.init();
            SkillBars.init();
            ScrollAnimations.init();
            ContactForm.init();
            SmoothScroll.init();
            Performance.init();

            // Add custom CSS animations
            this.addCustomStyles();
            
            console.log('🚀 Modern Portfolio Loaded Successfully!');
        },

        addCustomStyles() {
            const styles = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                
                .notification {
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', App.init.bind(App));
    } else {
        App.init();
    }

    // Expose API for debugging
    window.PortfolioApp = {
        state,
        utils,
        Navigation,
        Typewriter
    };

})();
