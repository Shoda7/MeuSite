document.addEventListener('DOMContentLoaded', function () {

    /* === Animação de digitação === */
    new Typed('#typed-text', {
        strings: [
            'Tech Lead .NET',
            'Tuning de SQL Server',
            'Arquitetura &amp; Performance',
            'Liderança Técnica',
            'Entusiasta de Tecnologia'
        ],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    });

    /* === Reveal on scroll === */
    if (window.ScrollReveal) {
        const sr = ScrollReveal({
            distance: '40px',
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            reset: false,
        });

        sr.reveal('.section-title',    { origin: 'top',    delay: 80 });
        sr.reveal('.section-eyebrow',  { origin: 'top',    delay: 40 });
        sr.reveal('.about-content > p',{ origin: 'bottom', interval: 100, delay: 100 });
        sr.reveal('.stat-item',        { origin: 'bottom', interval: 100, delay: 200 });
        sr.reveal('.skills-intro',     { origin: 'bottom', delay: 100 });
        sr.reveal('.marquee',          { origin: 'bottom', interval: 200, delay: 200 });
        sr.reveal('.timeline-col',     { origin: 'bottom', interval: 150 });
        sr.reveal('.timeline-item',    { origin: 'left',   interval: 80, delay: 100 });
        sr.reveal('.project-card',     { origin: 'bottom', interval: 150 });
        sr.reveal('.contact-card',     { origin: 'bottom', interval: 100 });
        sr.reveal('.contact-subtitle', { origin: 'bottom', delay: 150 });
        sr.reveal('.cv-stage',         { origin: 'bottom', delay: 100, scale: 0.9 });
    }

    /* === Navbar com efeito de scroll === */
    const navbar = document.getElementById('navbar');
    const updateNavbar = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    /* === Link ativo === */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    sections.forEach(s => sectionObserver.observe(s));

    /* === Menu mobile === */
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('open'));
    });

    /* === Botão voltar ao topo === */
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* === Carrossel de tecnologias — pausa quando seção sai da tela === */
    const skillsSection = document.getElementById('skills');
    const tracks = document.querySelectorAll('.marquee-track');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            tracks.forEach(t => {
                t.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
            });
        });
    }, { threshold: 0.05 });

    if (skillsSection) skillsObserver.observe(skillsSection);

    /* === Velocidade do carrossel reativa ao scroll === */
    let lastY = window.scrollY;
    let scrollVelocity = 0;
    let velocityTimer;

    window.addEventListener('scroll', () => {
        scrollVelocity = Math.min(Math.abs(window.scrollY - lastY), 30);
        lastY = window.scrollY;
        clearTimeout(velocityTimer);

        tracks.forEach(t => {
            const baseDur = parseFloat(t.dataset.duration || '40');
            const newDur = Math.max(8, baseDur - scrollVelocity * 0.8);
            t.style.animationDuration = newDur + 's';
        });

        velocityTimer = setTimeout(() => {
            tracks.forEach(t => {
                const baseDur = parseFloat(t.dataset.duration || '40');
                t.style.animationDuration = baseDur + 's';
            });
        }, 400);
    });

    /* === DOWNLOAD CV — animação === */
    const cvButton = document.getElementById('cvButton');
    const cvParticles = document.getElementById('cvParticles');
    const cvProgress = document.getElementById('cvProgress');
    const cvFeedback = document.getElementById('cvFeedback');

    if (cvButton) {
        cvButton.addEventListener('click', (e) => {
            // Não bloqueia o download (link com download attr), só decora
            launchParticles();
            runProgress();
            showFeedback();
        });
    }

    function launchParticles() {
        if (!cvParticles) return;
        const colors = ['#38bdf8', '#818cf8', '#60a5fa', '#a5f3fc'];
        const count = 28;

        for (let i = 0; i < count; i++) {
            const p = document.createElement('span');
            p.className = 'cv-particle';
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
            const distance = 120 + Math.random() * 140;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance - 40; // leve viés pra cima
            const size = 4 + Math.random() * 8;
            const color = colors[Math.floor(Math.random() * colors.length)];

            p.style.setProperty('--dx', dx + 'px');
            p.style.setProperty('--dy', dy + 'px');
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.background = color;
            p.style.boxShadow = `0 0 12px ${color}`;
            p.style.animationDelay = (Math.random() * 0.15) + 's';

            cvParticles.appendChild(p);
            // força reflow e ativa animação
            requestAnimationFrame(() => p.classList.add('go'));
            setTimeout(() => p.remove(), 1800);
        }
    }

    function runProgress() {
        if (!cvProgress) return;
        cvProgress.classList.remove('run');
        cvProgress.classList.add('visible');
        // reflow para reiniciar transition
        void cvProgress.offsetWidth;
        cvProgress.classList.add('run');

        setTimeout(() => {
            cvProgress.classList.remove('visible', 'run');
        }, 2400);
    }

    function showFeedback() {
        if (!cvFeedback) return;
        cvFeedback.classList.add('show');
        setTimeout(() => cvFeedback.classList.remove('show'), 3200);
    }

    /* === Hero parallax sutil === */
    const heroContainer = document.querySelector('.hero-container');
    if (heroContainer) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y < window.innerHeight) {
                heroContainer.style.transform = `translateY(${y * 0.15}px)`;
                heroContainer.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.85));
            }
        });
    }
});
