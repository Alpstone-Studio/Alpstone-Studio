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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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
// PARALLAX SCROLLING FOR HERO GLASS CONTAINER
// ==========================================

window.addEventListener('scroll', () => {
    const heroGlassContainer = document.getElementById('heroGlassContainer');
    const heroSection = document.querySelector('.hero');

    if (heroGlassContainer && heroSection) {
        const scrollY = window.pageYOffset || window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        // Parallax effect: container moves slower (0.5x speed)
        const parallaxSpeed = 0.5;
        const translateY = scrollY * parallaxSpeed;

        // Calculate opacity based on scroll position
        // Fade out as it reaches the bottom of the hero section
        const fadeStart = heroHeight * 0.6;
        const fadeEnd = heroHeight;
        let opacity = 1;

        if (scrollY > fadeStart) {
            opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
            opacity = Math.max(0, Math.min(1, opacity));
        }

        // Apply transform and opacity
        heroGlassContainer.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
        heroGlassContainer.style.opacity = opacity;

        // Hide completely when scrolled past hero section
        if (scrollY > heroHeight) {
            heroGlassContainer.style.display = 'none';
        } else {
            heroGlassContainer.style.display = 'block';
        }
    }
});

// ==========================================
// PARALLAX SCROLLING FOR FLOATING ELEMENTS
// ==========================================

window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax-float');

    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
        const rect = element.getBoundingClientRect();
        const scrollY = window.pageYOffset || window.scrollY;

        // Only apply parallax if element is in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        }
    });
});
