document.addEventListener('DOMContentLoaded', function () {

    // ===================================================================
    // EFEITO DE DIGITAÇÃO NA SEÇÃO HERO (TYPED.JS)
    // ===================================================================
    const typedOptions = {
        strings: ['Desenvolvedor Fullstack', 'Apaixonado por C#', 'Entusiasta de Tecnologia'],
        typeSpeed: 50,      // Velocidade de digitação em milissegundos
        backSpeed: 25,      // Velocidade para apagar o texto
        backDelay: 2000,    // Tempo de espera antes de começar a apagar
        loop: true,         // Repetir a animação
        showCursor: true,
        cursorChar: '|',
    };

    // Inicializa a animação no elemento que tem o ID 'typed-text'
    const typed = new Typed('#typed-text', typedOptions);


    // ===================================================================
    // ANIMAÇÃO DE ELEMENTOS AO ROLAR A PÁGINA (SCROLLREVEAL.JS)
    // ===================================================================
    const sr = ScrollReveal({
        distance: '60px',       // Distância que o elemento se move na animação
        duration: 2000,       // Duração da animação em milissegundos
        easing: 'cubic-bezier(0.5, 0, 0, 1)', // Curva de animação para um efeito suave
        reset: false          // A animação acontece apenas uma vez
    });

    // Aplica a animação para as seções de conteúdo de forma geral
    // A origem 'bottom' faz o elemento surgir de baixo para cima
    sr.reveal('.content-section', { origin: 'bottom' });

    // Aplica um efeito escalonado para itens de lista e projetos
    // 'interval' cria um pequeno atraso entre a animação de cada elemento
    sr.reveal('.skills-list li', { origin: 'left', interval: 100 });
    sr.reveal('.project-card', { origin: 'bottom', interval: 200 });

    // Anima os itens de contato individualmente
    sr.reveal('.contact-item', { origin: 'left', interval: 150 });

    // Anima o botão de download com um pequeno atraso
    sr.reveal('.download-cv', { origin: 'bottom', delay: 400 });

});