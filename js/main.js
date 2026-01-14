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
// SIMPLE HARDWARE-ACCELERATED PARALLAX
// ==========================================

let lastKnownScrollY = 0;
let currentScrollY = 0;
let rafId = null;

function smoothParallax() {
    // Smooth interpolation
    currentScrollY += (lastKnownScrollY - currentScrollY) * 0.1;

    const heroGlassContainer = document.getElementById('heroGlassContainer');
    const heroSection = document.querySelector('.hero');

    if (heroGlassContainer && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const parallaxSpeed = 0.5;
        const translateY = currentScrollY * parallaxSpeed;

        // Calculate opacity
        const fadeStart = heroHeight * 0.6;
        const fadeEnd = heroHeight;
        let opacity = 1;

        if (currentScrollY > fadeStart) {
            opacity = 1 - (currentScrollY - fadeStart) / (fadeEnd - fadeStart);
            opacity = Math.max(0, Math.min(1, opacity));
        }

        // Use translate3d for hardware acceleration
        heroGlassContainer.style.transform = `translate3d(-50%, calc(-50% + ${translateY}px), 0)`;
        heroGlassContainer.style.opacity = opacity;

        if (currentScrollY > heroHeight) {
            heroGlassContainer.style.visibility = 'hidden';
        } else {
            heroGlassContainer.style.visibility = 'visible';
        }
    }

    // Update floating elements
    const parallaxElements = document.querySelectorAll('.parallax-float');
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
        const yPos = -(currentScrollY * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    // Continue animation loop
    if (Math.abs(lastKnownScrollY - currentScrollY) > 0.5) {
        rafId = requestAnimationFrame(smoothParallax);
    } else {
        rafId = null;
    }
}

window.addEventListener('scroll', () => {
    lastKnownScrollY = window.pageYOffset || window.scrollY;

    if (!rafId) {
        rafId = requestAnimationFrame(smoothParallax);
    }
}, { passive: true });

// ==========================================
// PORTFOLIO CARD STACK NAVIGATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const prevBtn = document.getElementById('portfolioPrev');
    const nextBtn = document.getElementById('portfolioNext');
    let currentIndex = 0;

    function updateCardPositions() {
        portfolioCards.forEach((card, index) => {
            const relativePosition = index - currentIndex;
            card.setAttribute('data-position', relativePosition);
        });
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
