// Professional enhancements for Jamar's portfolio

(function($) {
    'use strict';

    // Enhanced smooth scrolling with offset for fixed header
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 50
                }, 1000, 'easeInOutExpo');
                return false;
            }
        }
    });

    // Professional typing animation for intro text
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        const timer = setInterval(function() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Initialize animations when page loads
    $(window).on('load', function() {
        // Add animation classes to elements as they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Observe feature cards
        document.querySelectorAll('.features section').forEach(card => {
            observer.observe(card);
        });
    });

    // Professional particle background for intro section
    function createParticles() {
        const intro = document.getElementById('intro');
        if (!intro) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            `;
            particlesContainer.appendChild(particle);
        }

        intro.appendChild(particlesContainer);
    }

    // Professional hover effects for feature cards
    $('.features section').hover(
        function() {
            $(this).find('.icon').addClass('bounce');
        },
        function() {
            $(this).find('.icon').removeClass('bounce');
        }
    );

    // Professional form validation and submission
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const message = $('#message').val().trim();
        
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        const notification = $(`
            <div class="notification ${type}" style="
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                background: ${type === 'success' ? '#000000' : '#666666'};
                color: white;
                border-radius: 5px;
                z-index: 1000;
                animation: slideInRight 0.3s ease;
            ">
                ${message}
            </div>
        `);
        
        $('body').append(notification);
        
        setTimeout(() => {
            notification.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }

    // Professional scroll progress indicator
    function createScrollProgress() {
        const progressBar = $(`
            <div id="scroll-progress" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #000000, #333333);
                z-index: 9999;
                transition: width 0.1s ease;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            "></div>
        `);
        
        $('body').prepend(progressBar);
        
        $(window).scroll(function() {
            const scrollTop = $(window).scrollTop();
            const docHeight = $(document).height();
            const winHeight = $(window).height();
            const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
            
            $('#scroll-progress').css('width', scrollPercent + '%');
        });
    }

    // Professional skill bars animation (if added later)
    function animateSkillBars() {
        $('.skill-bar').each(function() {
            const skillLevel = $(this).data('skill');
            $(this).animate({
                width: skillLevel + '%'
            }, 1500);
        });
    }

    // Initialize all professional features
    $(document).ready(function() {
        createParticles();
        createScrollProgress();
        
        // Add professional CSS classes
        $('body').addClass('professional-theme');
        
        // Enhanced button interactions
        $('.button').hover(
            function() {
                $(this).addClass('professional-hover');
            },
            function() {
                $(this).removeClass('professional-hover');
            }
        );
    });

    // Professional counter animation for stats (if added later)
    function animateCounters() {
        $('.counter').each(function() {
            const $this = $(this);
            const countTo = $this.attr('data-count');
            
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

})(jQuery);

// Add professional CSS animations
const professionalStyles = `
    <style>
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        .bounce {
            animation: bounce 0.6s ease-in-out;
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease-out;
        }
        
        .professional-hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
        }
        
        .notification {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', professionalStyles);
