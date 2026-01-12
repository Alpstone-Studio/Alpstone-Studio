const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.setAttribute('playsinline', '');
    heroVideo.addEventListener('ended', () => {
        heroVideo.pause();
    });
}
