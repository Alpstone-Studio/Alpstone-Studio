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

const hero = document.getElementById('hero');
const heroVideo = document.querySelector('.hero-video');
const heroPlaque = document.getElementById('heroPlaque');
let videoDuration = 0;
let ticking = false;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const updateHeroScrollEffects = () => {
    if (!hero) {
        ticking = false;
        return;
    }

    const heroTop = hero.offsetTop;
    const heroHeight = hero.offsetHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const progress = clamp((scrollY - heroTop) / heroHeight, 0, 1);

    if (heroVideo && videoDuration) {
        heroVideo.currentTime = progress * videoDuration;
    }

    if (heroPlaque) {
        const plaqueHeight = heroPlaque.offsetHeight;
        const maxTranslate = Math.max(heroHeight - plaqueHeight - 60, 0);
        const translateY = clamp(progress * heroHeight * 0.4, 0, maxTranslate);
        heroPlaque.style.transform = `translateY(${translateY}px)`;
    }

    ticking = false;
};

const onScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(updateHeroScrollEffects);
        ticking = true;
    }
};

if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.setAttribute('playsinline', '');
    heroVideo.pause();
    heroVideo.currentTime = 0;
    heroVideo.addEventListener('loadedmetadata', () => {
        videoDuration = heroVideo.duration || 0;
        updateHeroScrollEffects();
    });
    heroVideo.addEventListener('loadeddata', () => {
        if (!videoDuration) {
            videoDuration = heroVideo.duration || 0;
        }
        updateHeroScrollEffects();
    });
}

window.addEventListener('scroll', onScroll);
window.addEventListener('resize', onScroll);
