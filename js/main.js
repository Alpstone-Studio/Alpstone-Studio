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
// SCROLL ANIMATIONS - FADE IN (FIXED)
// ==========================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

// Observe all service cards, portfolio items, etc.
const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ==========================================
// PARALLAX SCROLL EFFECTS (SUBTLE)
// ==========================================

let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;

    // Parallax for section headers - very subtle
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        const rect = header.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            const offset = (scrolled - header.offsetTop + window.innerHeight) * 0.015;
            header.style.transform = `translateY(${offset}px)`;
        }
    });

    // Parallax for about image
    const aboutImage = document.querySelector('.about-image-wrapper');
    if (aboutImage) {
        const rect = aboutImage.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            const offset = (scrolled - aboutImage.offsetTop + window.innerHeight) * 0.02;
            aboutImage.style.transform = `translateY(${offset}px)`;
        }
    }

    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Only enable parallax on desktop/tablet
if (window.innerWidth > 768) {
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
}

// Disable parallax on resize if mobile
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        window.removeEventListener('scroll', requestParallaxUpdate);
    } else {
        window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    }
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
// LOADING ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
});

// ==========================================
// PORTFOLIO ITEM INTERACTIONS
// ==========================================

const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        // You can add modal or detailed view functionality here
        console.log('Portfolio item clicked');
    });
});

// ==========================================
// SCROLL TO TOP ON PAGE LOAD
// ==========================================

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

// ==========================================
// HERO CONTENT SUBTLE ANIMATION
// ==========================================

const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        // Very subtle fade and move on scroll
        const opacity = 1 - (scrolled * 0.0015);
        const translateY = scrolled * 0.2;

        if (opacity > 0.3) {
            heroContent.style.opacity = opacity;
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
    }, { passive: true });
}
