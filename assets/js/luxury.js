/* ================================
   LUXURY PORTFOLIO - JAVASCRIPT
   Hermès-inspired Interactions
================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all modules
    Loader.init();
    CustomCursor.init();
    Navigation.init();
    ScrollEffects.init();
    SkillBars.init();
    SmoothScroll.init();
    Forms.init();
});

/* ================================
   LOADER
================================ */
const Loader = {
    init: function() {
        const loader = document.getElementById('loader');
        if (!loader) return;
        
        // Hide loader after content loads
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 1500);
        });
        
        // Fallback - hide after 3 seconds
        setTimeout(function() {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 3000);
    }
};

/* ================================
   CUSTOM CURSOR
================================ */
const CustomCursor = {
    cursor: null,
    follower: null,
    
    init: function() {
        this.cursor = document.getElementById('cursor');
        this.follower = document.getElementById('cursor-follower');
        
        if (!this.cursor || !this.follower) return;
        if (window.innerWidth < 1024) return;
        
        this.bindEvents();
    },
    
    bindEvents: function() {
        const self = this;
        
        // Mouse move
        document.addEventListener('mousemove', function(e) {
            self.cursor.style.left = e.clientX + 'px';
            self.cursor.style.top = e.clientY + 'px';
            
            // Follower with slight delay
            setTimeout(function() {
                self.follower.style.left = e.clientX + 'px';
                self.follower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .portfolio-link');
        
        interactiveElements.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                self.cursor.classList.add('active');
                self.follower.classList.add('active');
            });
            
            el.addEventListener('mouseleave', function() {
                self.cursor.classList.remove('active');
                self.follower.classList.remove('active');
            });
        });
    }
};

/* ================================
   NAVIGATION
================================ */
const Navigation = {
    nav: null,
    toggle: null,
    menu: null,
    links: null,
    
    init: function() {
        this.nav = document.getElementById('nav');
        this.toggle = document.getElementById('nav-toggle');
        this.menu = document.getElementById('nav-menu');
        this.links = document.querySelectorAll('.nav-link');
        
        if (!this.nav) return;
        
        this.bindEvents();
        this.handleScroll();
    },
    
    bindEvents: function() {
        const self = this;
        
        // Scroll effect
        window.addEventListener('scroll', function() {
            self.handleScroll();
        });
        
        // Mobile toggle
        if (this.toggle) {
            this.toggle.addEventListener('click', function() {
                self.toggleMenu();
            });
        }
        
        // Close menu on link click
        this.links.forEach(function(link) {
            link.addEventListener('click', function() {
                self.closeMenu();
                self.setActiveLink(this);
            });
        });
    },
    
    handleScroll: function() {
        if (window.scrollY > 100) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
        
        // Update active link based on scroll position
        this.updateActiveOnScroll();
    },
    
    toggleMenu: function() {
        this.toggle.classList.toggle('active');
        this.menu.classList.toggle('active');
        document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
    },
    
    closeMenu: function() {
        if (this.toggle) this.toggle.classList.remove('active');
        if (this.menu) this.menu.classList.remove('active');
        document.body.style.overflow = '';
    },
    
    setActiveLink: function(activeLink) {
        this.links.forEach(function(link) {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    },
    
    updateActiveOnScroll: function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(function(section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

/* ================================
   SCROLL EFFECTS
================================ */
const ScrollEffects = {
    init: function() {
        this.revealOnScroll();
        
        // Re-check on scroll
        window.addEventListener('scroll', this.revealOnScroll.bind(this));
    },
    
    revealOnScroll: function() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        
        reveals.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
};

/* ================================
   SKILL BARS ANIMATION
================================ */
const SkillBars = {
    animated: false,
    
    init: function() {
        const self = this;
        
        window.addEventListener('scroll', function() {
            self.animateOnView();
        });
        
        // Check on load
        this.animateOnView();
    },
    
    animateOnView: function() {
        if (this.animated) return;
        
        const skillsSection = document.querySelector('.skills-showcase');
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            this.animate();
            this.animated = true;
        }
    },
    
    animate: function() {
        const progressBars = document.querySelectorAll('.skill-progress');
        
        progressBars.forEach(function(bar) {
            const progress = bar.getAttribute('data-progress');
            setTimeout(function() {
                bar.style.width = progress + '%';
            }, 200);
        });
    }
};

/* ================================
   SMOOTH SCROLL
================================ */
const SmoothScroll = {
    init: function() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

/* ================================
   FORMS
================================ */
const Forms = {
    init: function() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const data = {};
                formData.forEach(function(value, key) {
                    data[key] = value;
                });
                
                // Simple validation
                if (!data.name || !data.email || !data.message) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                // Simulate form submission
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                
                btn.innerHTML = '<span class="btn-text">Sending...</span>';
                btn.disabled = true;
                
                setTimeout(function() {
                    btn.innerHTML = '<span class="btn-text">Message Sent!</span><span class="btn-icon"><i class="fas fa-check"></i></span>';
                    
                    // Reset form
                    contactForm.reset();
                    
                    setTimeout(function() {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }, 2000);
                }, 1500);
            });
        }
    }
};

/* ================================
   VIDEO FALLBACK
================================ */
window.addEventListener('load', function() {
    const video = document.getElementById('hero-video');
    
    if (video) {
        // Check if video can play
        video.addEventListener('error', function() {
            // Hide video and show fallback
            const container = document.querySelector('.hero-video-container');
            if (container) {
                container.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)';
            }
        });
        
        // Try to play video
        video.play().catch(function() {
            // Autoplay was prevented, that's okay
            console.log('Video autoplay was prevented');
        });
    }
});

/* ================================
   PARALLAX EFFECT (subtle)
================================ */
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});
