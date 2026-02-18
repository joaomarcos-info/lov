document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // CONFIGURAÇÕES PERSONALIZÁVEIS
    // ==========================================

    const NOMES_DO_CASAL = "João Marcos e Emylle";

    // TEXTO PERSONALIZÁVEL DO JOGO (Mensagem final)
    const MENSAGEM_FINAL_JOGO = `
        <h3>Parabéns, meu amor!</h3>
        <p>Você capturou muitos corações, mas o meu você já tem por inteiro. 
        Cada clique aqui representa um motivo a mais para eu te amar todos os dias!</p>
    `;

    // TEXTO PERSONALIZÁVEL DA CARTA
    const TEXTO_CARTA = `Querida Emylle,

Escrevo esta carta para dizer o quanto você é especial na minha vida. Desde o momento em que nos conhecemos, cada dia tem sido uma aventura maravilhosa ao seu lado.

Seu sorriso ilumina meus dias mais sombrios e sua presença traz uma paz que eu nunca imaginei encontrar. Obrigado por ser minha parceira, minha melhor amiga e o grande amor da minha vida.

Espero que este pequeno site possa expressar pelo menos um pouquinho do carinho imenso que sinto por você.

Com todo o meu amor,
João.`;

    // EVENTOS DA LINHA DO TEMPO (eventosDoCasal)
    const eventosDoCasal = [
        {
            data: "11 de Janeiro de 2026",
            titulo: "O Primeiro Encontro",
            descricao: "Aquele encontro onde conversamos por horas e o tempo pareceu parar."
        },
        {
            data: "01 de Fevereiro de 2026",
            titulo: "O pedido em Namoro",
            descricao: "O pedido aconteceu! O pedido em namoro veio para confirmar algo que eu ja sabia, que queria te ter pra sempre na minha vida."
        },
        {
            data: "01 de Fevereiro de 2026",
            titulo: "Nossa Primeira Viagem",
            descricao: "Foi uma viagem simples, para Cristino Castro, mas muito especial por ser a primeira viagem juntos, logo no primeiro dia de namoro."
        }
        
    ];

    // DATA DE INÍCIO DO RELACIONAMENTO (Formato: AAAA-MM-DDTHH:MM:SS)
    const DATA_INICIO_RELACIONAMENTO = "2026-01-11T19:30:00";


        // GALERIA DO CASAL (galeriaDoCasal)
    // Dica: Substitua as URLs pelas fotos reais do casal
    const galeriaDoCasal = [
        { url: "01.jpeg", legenda: "Nosso primeiro jantar romântico" },
        { url: "02.jpeg", legenda: "Passeio inesquecível no parque" },
        { url: "03.jpeg", legenda: "Celebrando pequenas vitórias" },
        { url: "04.jpeg", legenda: "Sempre juntos, em qualquer lugar" }
    ];

    // ==========================================
    // LÓGICA DO SITE 
    // ==========================================

    // Inicializar Nomes
    document.getElementById('casal-names').innerText = NOMES_DO_CASAL;
    function updateCounter() {
        const start = new Date(DATA_INICIO_RELACIONAMENTO);
        const now = new Date();
        const diff = now - start;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        document.getElementById('days').innerText = d;
        document.getElementById('hours').innerText = h;
        document.getElementById('minutes').innerText = m;
        document.getElementById('seconds').innerText = s;
    }
    setInterval(updateCounter, 1000);
    updateCounter();

    // --- JOGO: CAPTURE OS CORAÇÕES ---
    const gameArea = document.getElementById('game-area');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const startBtn = document.getElementById('start-game-btn');
    const gameMessage = document.getElementById('game-message');

    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let heartInterval;

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        const size = 40;
        const x = Math.random() * (gameArea.clientWidth - size);
        const y = Math.random() * (gameArea.clientHeight - size);
        
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        
        heart.addEventListener('click', () => {
            score++;
            scoreElement.innerText = score;
            heart.remove();
        });
        
        gameArea.appendChild(heart);
        
        // Remove o coração após 1.5 segundos se não for clicado
        setTimeout(() => {
            if (heart.parentElement) heart.remove();
        }, 1500);
    }

    function startGame() {
        score = 0;
        timeLeft = 30;
        scoreElement.innerText = score;
        timerElement.innerText = timeLeft;
        startBtn.classList.add('hidden');
        gameMessage.classList.add('hidden');
        
        gameInterval = setInterval(() => {
            timeLeft--;
            timerElement.innerText = timeLeft;
            if (timeLeft <= 0) endGame();
        }, 1000);
        
        heartInterval = setInterval(createHeart, 800);
    }

    function endGame() {
        clearInterval(gameInterval);
        clearInterval(heartInterval);
        gameArea.innerHTML = '<button id="restart-btn" class="btn">Jogar Novamente</button>';
        document.getElementById('restart-btn').addEventListener('click', () => {
            gameArea.innerHTML = '';
            startGame();
        });
        
        gameMessage.innerHTML = MENSAGEM_FINAL_JOGO;
        gameMessage.classList.remove('hidden');
    }

    startBtn.addEventListener('click', startGame);

    // --- CARTA: EFEITO TYPEWRITER ---
    const letterElement = document.getElementById('letter-content');
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < TEXTO_CARTA.length) {
            letterElement.textContent += TEXTO_CARTA.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }

    // Iniciar efeito da carta quando a seção estiver visível
    const observerOptions = { threshold: 0.5 };
    const letterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && charIndex === 0) {
                typeWriter();
            }
        });
    }, observerOptions);

    letterObserver.observe(document.getElementById('carta'));

    // --- LINHA DO TEMPO: GERAÇÃO DINÂMICA ---
  const tlCont = document.getElementById('timeline-container');
    eventosDoCasal.forEach((ev, i) => {
        const div = document.createElement('div');
        div.className = `timeline-item ${i % 2 === 0 ? 'left' : 'right'}`;
        div.innerHTML = `<div class="timeline-content"><span>${ev.data}</span><h3>${ev.titulo}</h3><p>${ev.descricao}</p></div>`;
        tlCont.appendChild(div);
    });
    const tlObs = new IntersectionObserver((entries) => {
        entries.forEach(en => { if(en.isIntersecting) en.target.classList.add('visible'); });
    }, { threshold: 0.2 });
    document.querySelectorAll('.timeline-item').forEach(it => tlObs.observe(it));

    //GALERIA: CARROSSEL E MODAL
    const track = document.getElementById('carousel-track');
    galeriaDoCasal.forEach((img, i) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${img.url}" alt="${img.legenda}"><div class="carousel-caption">${img.legenda}</div>`;
        slide.onclick = () => openModal(img.url, img.legenda);
        track.appendChild(slide);
    });

    let currSlide = 0;
    const updateCarousel = () => track.style.transform = `translateX(-${currSlide * 100}%)`;
    document.getElementById('nextBtn').onclick = () => { currSlide = (currSlide + 1) % galeriaDoCasal.length; updateCarousel(); };
    document.getElementById('prevBtn').onclick = () => { currSlide = (currSlide - 1 + galeriaDoCasal.length) % galeriaDoCasal.length; updateCarousel(); };

    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCap = document.getElementById('modal-caption');
    function openModal(url, cap) {
        modal.style.display = "flex";
        modalImg.src = url;
        modalCap.innerText = cap;
    }
    document.querySelector('.close-modal').onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; };

});
