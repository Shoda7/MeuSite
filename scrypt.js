document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
    });

    console.log("Currículo carregado com animações e estilo profissional.");
});
