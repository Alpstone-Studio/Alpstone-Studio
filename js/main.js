// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect - show on scroll and enhance when scrolled further
let hasScrolled = false;

window.addEventListener('scroll', () => {
    hasScrolled = true;

    // Show navbar as soon as user scrolls
    if (window.scrollY > 0) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }

    // Add scrolled effect for enhanced blur
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Show navbar after 10 seconds if user hasn't scrolled
setTimeout(() => {
    if (!hasScrolled) {
        navbar.classList.add('visible');
    }
}, 10000);

// ==========================================
// SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (name && email && subject && message) {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// ==========================================
// MODERN SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up animation
const animatedElements = document.querySelectorAll('.fade-in-up');
animatedElements.forEach(el => {
    observer.observe(el);
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
});

// ==========================================
// SCROLL TO TOP ON PAGE LOAD
// ==========================================

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

// Ensure hero background video does not loop and stays on last frame when finished
document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        try {
            heroVideo.loop = false;
        } catch (e) {}

        heroVideo.addEventListener('ended', () => {
            heroVideo.pause();
            try {
                heroVideo.currentTime = heroVideo.duration;
            } catch (err) {}
        });
    }
});

// ==========================================
// OPTIMIZED PARALLAX WITH CSS CUSTOM PROPERTIES
// ==========================================

const heroGlassContainer = document.getElementById('heroGlassContainer');
const heroSection = document.querySelector('.hero');

// Set CSS custom property for parallax
function updateParallax() {
    const scrollY = window.pageYOffset || window.scrollY;

    // Hero glass container parallax
    if (heroGlassContainer && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const parallaxSpeed = 0.5;
        const translateY = scrollY * parallaxSpeed;

        // Calculate opacity
        const fadeStart = heroHeight * 0.6;
        const fadeEnd = heroHeight;
        let opacity = 1;

        if (scrollY > fadeStart) {
            opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
            opacity = Math.max(0, Math.min(1, opacity));
        }

        // Use translate3d for GPU acceleration
        heroGlassContainer.style.transform = `translate3d(-50%, calc(-50% + ${translateY}px), 0)`;
        heroGlassContainer.style.opacity = opacity;

        if (scrollY > heroHeight) {
            heroGlassContainer.style.visibility = 'hidden';
        } else {
            heroGlassContainer.style.visibility = 'visible';
        }
    }

    // Update floating elements
    const parallaxElements = document.querySelectorAll('.parallax-float');
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
        const yPos = -(scrollY * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
}

// Use passive listener for better scroll performance
window.addEventListener('scroll', updateParallax, { passive: true });

// Initial call
updateParallax();

// ==========================================
// PORTFOLIO CARD STACK NAVIGATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const prevBtn = document.getElementById('portfolioPrev');
    const nextBtn = document.getElementById('portfolioNext');
    const cardInfo = document.getElementById('portfolioCardInfo');
    let currentIndex = 0;

    // Card data
    const cardData = [
        {
            title: 'E-Commerce Platform',
            category: 'Web Development',
            description: 'Modern online shopping experience with seamless checkout'
        },
        {
            title: 'Corporate Website',
            category: 'UI/UX Design',
            description: 'Professional presence with elegant design'
        },
        {
            title: 'Mobile App Landing',
            category: 'Responsive Design',
            description: 'Engaging landing page optimized for all devices'
        },
        {
            title: 'Portfolio Website',
            category: 'Full Stack',
            description: 'Custom portfolio showcasing creative work'
        }
    ];

    function updateCardInfo() {
        const data = cardData[currentIndex];
        cardInfo.innerHTML = `
            <h3 class="portfolio-info-title">${data.title}</h3>
            <p class="portfolio-info-description">${data.description}</p>
        `;
    }

    function updateCardPositions() {
        portfolioCards.forEach((card, index) => {
            const relativePosition = index - currentIndex;
            card.setAttribute('data-position', relativePosition);
        });
        updateCardInfo();
    }

    function nextCard() {
        currentIndex = (currentIndex + 1) % portfolioCards.length;
        updateCardPositions();
    }

    function prevCard() {
        currentIndex = (currentIndex - 1 + portfolioCards.length) % portfolioCards.length;
        updateCardPositions();
    }

    // Initialize positions
    updateCardPositions();

    // Event listeners
    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);

    // Click on top card to go to next
    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.getAttribute('data-position') === '0') {
                nextCard();
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevCard();
        } else if (e.key === 'ArrowRight') {
            nextCard();
        }
    });
});

// ==========================================
// PORTFOLIO VIEW TOGGLE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtns = document.querySelectorAll('.view-toggle-btn');
    const indicator = document.querySelector('.view-toggle-indicator');
    const stackWrapper = document.querySelector('.portfolio-stack-wrapper');
    const gridView = document.getElementById('portfolioGridView');
    const portfolioSection = document.querySelector('.portfolio');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');

            // Update active button
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle views with animation
            if (view === 'grid') {
                indicator.classList.add('grid-active');
                stackWrapper.classList.add('grid-active');
                portfolioSection.classList.add('grid-view-active');

                // Delay grid view appearance for smooth transition
                setTimeout(() => {
                    gridView.classList.add('active');
                }, 100);
            } else {
                indicator.classList.remove('grid-active');
                gridView.classList.remove('active');
                portfolioSection.classList.remove('grid-view-active');

                // Delay stack view appearance for smooth transition
                setTimeout(() => {
                    stackWrapper.classList.remove('grid-active');
                }, 100);
            }
        });
    });
});

// ==========================================
// SUBTLE SNAP SCROLL TO PORTFOLIO CENTER
// ==========================================

// The portfolio section now uses CSS scroll-snap-align: center
// No JavaScript needed for snap scroll - it's handled by CSS
