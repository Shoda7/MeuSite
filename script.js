document.addEventListener('DOMContentLoaded', function () {

    // Animação de digitação no hero
    new Typed('#typed-text', {
        strings: ['Desenvolvedor .NET', 'Tuning de SQL Server', 'Entusiasta de Tecnologia'],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    });

    // Animações ao rolar a página
    const sr = ScrollReveal({
        distance: '40px',
        duration: 700,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        reset: false,
    });

    sr.reveal('.section-title',   { origin: 'top',    delay: 100 });
    sr.reveal('.about-content',   { origin: 'bottom', delay: 200 });
    sr.reveal('.stat-item',       { origin: 'bottom', interval: 100 });
    sr.reveal('.skill-card',      { origin: 'bottom', interval: 70 });
    sr.reveal('.timeline-col',    { origin: 'bottom', interval: 150 });
    sr.reveal('.project-card',    { origin: 'bottom', interval: 150 });
    sr.reveal('.contact-card',    { origin: 'bottom', interval: 100 });
    sr.reveal('.contact-subtitle', { origin: 'bottom', delay: 150 });
    sr.reveal('.btn-large',       { origin: 'bottom', delay: 300 });

    // Link ativo na nav conforme a seção visível
    const sections = document.querySelectorAll('section[id]');
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

    // Menu hamburguer (mobile)
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('open'));
    });

    // Botão voltar ao topo
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
