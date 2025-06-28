// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Initialize icon
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add a smooth transition effect
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
});

// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current navigation item
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
});

// Typing animation for hero title
function typeWriter(text, element, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(originalText, heroTitle, 50);
    }
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .about-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Skills progress animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'fadeInUp 0.6s ease forwards';
    });
}

// Trigger skills animation when skills section is visible
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.textContent = footerText.textContent.replace('2025', currentYear);
}

// Artistic Loading Screen Management
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.querySelector('.loading-text');
    
    const loadingMessages = [
        'Loading Data Science Portfolio...',
        'Initializing Neural Networks...',
        'Preparing Visualizations...',
        'Compiling Algorithms...',
        'Ready to Explore!'
    ];
    
    let messageIndex = 0;
    
    // Change loading messages
    const messageInterval = setInterval(() => {
        messageIndex++;
        if (messageIndex < loadingMessages.length) {
            loadingText.textContent = loadingMessages[messageIndex];
        } else {
            clearInterval(messageInterval);
        }
    }, 600);
    
    // Hide loading screen after all content is loaded
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Start main animations after loading screen fades
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
            
            // Initialize all interactive features
            setTimeout(() => {
                createArtisticBackground();
                createCursorTrail();
                createTextRevealEffect();
                enhanceSkillItems();
                enhanceProjectCards();
                enhanceMethodologySteps();
                createParallaxEffect();
                enhanceContactForm();
            }, 200);
            
        }, 1000);
    }, 3000);
});

// Enhanced Interactive Artwork Features

// Create dynamic background particles
function createArtisticBackground() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Skip sections that already have particles
        if (section.id === 'home') return;
        
        // Create floating elements for each section
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-element';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: linear-gradient(45deg, rgba(102, 126, 234, 0.6), rgba(118, 75, 162, 0.6));
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatingParticles ${Math.random() * 8 + 4}s infinite linear;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
                z-index: 0;
            `;
            section.style.position = 'relative';
            section.appendChild(particle);
        }
    });
}

// Interactive cursor trail effect
function createCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.6), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Change cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card, .methodology-step');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.background = 'radial-gradient(circle, rgba(240, 147, 251, 0.8), transparent)';
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.background = 'radial-gradient(circle, rgba(102, 126, 234, 0.6), transparent)';
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Interactive text reveal animation
function createTextRevealEffect() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target;
                const textContent = text.textContent;
                text.textContent = '';
                
                // Create spans for each character
                textContent.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.cssText = `
                        opacity: 0;
                        transform: translateY(20px);
                        display: inline-block;
                        transition: all 0.6s ease;
                        transition-delay: ${index * 0.03}s;
                    `;
                    text.appendChild(span);
                    
                    // Trigger animation
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, 100);
                });
                
                textObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to specific text elements
    document.querySelectorAll('.section-title, .about-text p').forEach(el => {
        textObserver.observe(el);
    });
}

// Interactive skill items with data visualization
function enhanceSkillItems() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        // Add proficiency bar on hover
        item.addEventListener('mouseenter', () => {
            if (!item.querySelector('.skill-proficiency')) {
                const proficiency = document.createElement('div');
                proficiency.className = 'skill-proficiency';
                const randomProficiency = Math.random() * 30 + 70; // 70-100%
                
                proficiency.style.cssText = `
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    height: 3px;
                    width: 0%;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    border-radius: 2px;
                    transition: width 0.8s ease;
                `;
                
                item.style.position = 'relative';
                item.appendChild(proficiency);
                
                // Animate the bar
                setTimeout(() => {
                    proficiency.style.width = randomProficiency + '%';
                }, 100);
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const proficiency = item.querySelector('.skill-proficiency');
            if (proficiency) {
                proficiency.style.width = '0%';
                setTimeout(() => {
                    proficiency.remove();
                }, 800);
            }
        });
    });
}

// Interactive project cards with tilt effect
function enhanceProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// Interactive methodology steps with data flow
function enhanceMethodologySteps() {
    const steps = document.querySelectorAll('.methodology-step');
    
    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            // Add data flow effect
            const dataFlow = document.createElement('div');
            dataFlow.style.cssText = `
                position: absolute;
                top: 50%;
                left: -10px;
                width: calc(100% + 20px);
                height: 2px;
                background: linear-gradient(90deg, transparent, #667eea, #764ba2, transparent);
                transform: translateY(-50%);
                animation: dataFlow 1s ease-out;
                z-index: 10;
            `;
            
            step.style.position = 'relative';
            step.appendChild(dataFlow);
            
            setTimeout(() => {
                dataFlow.remove();
            }, 1000);
            
            // Highlight connected steps
            steps.forEach((otherStep, otherIndex) => {
                if (Math.abs(otherIndex - index) === 1) {
                    otherStep.style.borderColor = '#667eea';
                    setTimeout(() => {
                        otherStep.style.borderColor = 'transparent';
                    }, 1000);
                }
            });
        });
    });
}

// Parallax scrolling effect
function createParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.data-particle, .floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index % 3 + 1) * 0.1;
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    });
}

// Interactive contact form enhancements
function enhanceContactForm() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        // Add focus glow effect
        input.addEventListener('focus', () => {
            const glow = document.createElement('div');
            glow.style.cssText = `
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
                border-radius: 12px;
                z-index: -1;
                animation: glowPulse 2s infinite;
            `;
            
            input.parentElement.style.position = 'relative';
            input.parentElement.appendChild(glow);
        });
        
        input.addEventListener('blur', () => {
            const glow = input.parentElement.querySelector('div[style*="glowPulse"]');
            if (glow) {
                glow.remove();
            }
        });
    });
}

// Initialize all artistic interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add delay to ensure all content is loaded
    setTimeout(() => {
        createArtisticBackground();
        createCursorTrail();
        createTextRevealEffect();
        enhanceSkillItems();
        enhanceProjectCards();
        enhanceMethodologySteps();
        createParallaxEffect();
        enhanceContactForm();
    }, 500);
});

// Add ripple effect to buttons
function addRippleEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Apply ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', addRippleEffect);
    });
});
