document.addEventListener('DOMContentLoaded', () => {

    // Back to Alpstone Button (Same implementation)
    const backBtn = document.createElement('a');
    backBtn.href = '../../index.html#portfolio';
    backBtn.className = 'alpstone-back-btn';
    backBtn.innerHTML = `
        <img src="../../Logos/Alpstone-studio-vertical/White-vertical.png" alt="AS" class="alpstone-btn-logo" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=\'font-size:20px;\'>🔙</span>' + this.parentElement.innerHTML.split('</span>')[1]">
        <span class="alpstone-btn-text">Retour à Alpstone</span>
    `;
    document.body.appendChild(backBtn);

    // Auto Collapse Logic
    const collapseBtn = () => {
        backBtn.classList.add('collapsed');
    };

    let idleTimer = setTimeout(collapseBtn, 3000);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            collapseBtn();
        }
    });

    backBtn.addEventListener('mouseenter', () => {
        clearTimeout(idleTimer);
        backBtn.classList.remove('collapsed');
    });

    backBtn.addEventListener('mouseleave', () => {
        idleTimer = setTimeout(collapseBtn, 2000);
    });

    // Simple scroll reveal
    const cards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease';
        observer.observe(card);
    });

});
