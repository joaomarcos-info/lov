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


    // TEXTO PERSONALIZÁVEL DO JOGO DA MEMÓRIA
    const MENSAGEM_FINAL_MEMORIA = (tentativas, tempo) => `
        <h3>Parabéns, meu amor!</h3>
        <p>Você completou o jogo em <strong>${tentativas}</strong> tentativas e <strong>${tempo}</strong> segundos.</p>
        <p>Nossa sintonia é perfeita, assim como esses pares!</p>
    `;

    // TEXTO PERSONALIZÁVEL DO MONTE A FRASE
    const FRASE_CORRETA = "Eu te amo mais do que tudo no mundo";
    const MENSAGEM_FINAL_FRASE = `
        <h3>Frase Perfeita!</h3>
        <p>Você montou a frase corretamente. E ela é a mais pura verdade!</p>
    `;

    // TEXTO PERSONALIZÁVEL DO MEDIDOR DO AMOR
    const MENSAGEM_FINAL_MEDIDOR = `
        <h3>Amor Infinito!</h3>
        <p>O medidor explodiu de tanto amor! Não há limites para o que sinto por você.</p>
    `;



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
        { url: "01.jpeg", legenda: "" },
        { url: "02.jpeg", legenda: "" },
        { url: "03.jpeg", legenda: "" },
        { url: "04.jpeg", legenda: "" },
        { url: "05.jpeg", legenda: "" }
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


    // 4. Jogo da Memória
    const memGrid = document.getElementById('memory-grid'), memTries = document.getElementById('mem-tries'), memTimer = document.getElementById('mem-timer'), memMsg = document.getElementById('mem-message');
    let cards = [], flipped = [], matched = 0, tries = 0, sec = 0, memInt;
    const items = ['❤', '❤', '☀', '☀', '⭐', '⭐', '☁', '☁', '🌸', '🌸', '🎁', '🎁', '💍', '💍', '🍷', '🍷'];
    document.getElementById('start-mem-btn').onclick = (e) => {
        e.target.classList.add('hidden'); tries = 0; sec = 0; matched = 0; memGrid.innerHTML = '';
        items.sort(() => Math.random() - 0.5).forEach((val, i) => {
            const c = document.createElement('div'); c.className = 'memory-card'; c.dataset.val = val;
            c.innerHTML = `<div class="back">?</div><div class="front">${val}</div>`;
            c.onclick = () => {
                if (flipped.length < 2 && !c.classList.contains('flipped')) {
                    c.classList.add('flipped'); flipped.push(c);
                    if (flipped.length === 2) {
                        tries++; memTries.innerText = tries;
                        if (flipped[0].dataset.val === flipped[1].dataset.val) { matched++; flipped = []; if(matched === 8) { clearInterval(memInt); memMsg.innerHTML = MENSAGEM_FINAL_MEMORIA(tries, sec); memMsg.classList.remove('hidden'); } }
                        else { setTimeout(() => { flipped.forEach(x => x.classList.remove('flipped')); flipped = []; }, 1000); }
                    }
                }
            };
            memGrid.appendChild(c);
        });
        memInt = setInterval(() => { sec++; memTimer.innerText = sec; }, 1000);
    };


    
    // 5. Monte a Frase
    const wordsCont = document.getElementById('words-container'), sentDisp = document.getElementById('sentence-display'), phraseMsg = document.getElementById('phrase-message');
    let currentPhrase = [];
    function initPhrase() {
        wordsCont.innerHTML = ''; sentDisp.innerText = ''; currentPhrase = [];
        FRASE_CORRETA.split(' ').sort(() => Math.random() - 0.5).forEach(w => {
            const t = document.createElement('span'); t.className = 'word-tag'; t.innerText = w;
            t.onclick = () => { t.classList.add('used'); currentPhrase.push(w); sentDisp.innerText = currentPhrase.join(' '); };
            wordsCont.appendChild(t);
        });
    }
    initPhrase();
    document.getElementById('check-phrase-btn').onclick = () => {
        if (sentDisp.innerText === FRASE_CORRETA) { phraseMsg.innerHTML = MENSAGEM_FINAL_FRASE; phraseMsg.classList.remove('hidden'); }
        else { alert("Tente novamente!"); initPhrase(); }
    };
    document.getElementById('reset-phrase-btn').onclick = initPhrase;

    // 6. Medidor do Amor
    const loveBar = document.getElementById('love-bar'), medMsg = document.getElementById('medidor-message');
    let lovePct = 0;
    document.getElementById('click-heart').onclick = () => {
        if (lovePct < 100) {
            lovePct += 5; loveBar.style.width = lovePct + '%'; loveBar.innerText = lovePct + '%';
            if (lovePct >= 100) {
                medMsg.innerHTML = MENSAGEM_FINAL_MEDIDOR; medMsg.classList.remove('hidden');
                for(let i=0; i<50; i++) {
                    const c = document.createElement('div'); c.className = 'confetti'; c.style.left = Math.random()*100+'vw'; c.style.animationDuration = (Math.random()*3+2)+'s'; c.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`; document.body.appendChild(c);
                    setTimeout(() => c.remove(), 5000);
                }
            }
        }
    };



    // TEXTO PERSONALIZÁVEL DO COMBINE DATA E EVENTO
    const COMBINACOES_DO_CASAL = [
        { data: "11/01/2026", evento: "Primeiro Beijo" },
        { data: "01/02/2026", evento: "Pedido em Namoro" },
        { data: "31/01/2026", evento: "Primeira vez da Emylle comendo sushi" },
        { data: "01/01/2025", evento: "Ano Novo" }
    ];
    
    // 8. Combine Data e Evento
    const dateCol = document.getElementById('dates-column'), eventCol = document.getElementById('events-column'), matchMsg = document.getElementById('match-message');
    let selDate = null, selEvent = null, matchCount = 0;
    function initMatch() {
        dateCol.innerHTML = ''; eventCol.innerHTML = '';
        COMBINACOES_DO_CASAL.forEach(c => {
            const d = document.createElement('div'); d.className = 'match-item'; d.innerText = c.data; d.onclick = () => { if(d.classList.contains('matched')) return; document.querySelectorAll('#dates-column .match-item').forEach(x=>x.classList.remove('selected')); d.classList.add('selected'); selDate = c; checkMatch(); }; dateCol.appendChild(d);
            const e = document.createElement('div'); e.className = 'match-item'; e.innerText = c.evento; e.onclick = () => { if(e.classList.contains('matched')) return; document.querySelectorAll('#events-column .match-item').forEach(x=>x.classList.remove('selected')); e.classList.add('selected'); selEvent = c; checkMatch(); }; eventCol.appendChild(e);
        });
    }
    function checkMatch() {
        if (selDate && selEvent) {
            if (selDate.data === selEvent.data) {
                document.querySelector(`.match-item.selected[onclick*="dates"]`)?.classList.add('matched'); // Simplified selector
                // Direct approach for matched items
                Array.from(document.querySelectorAll('.match-item.selected')).forEach(el => { el.classList.remove('selected'); el.classList.add('matched'); });
                matchCount++; if(matchCount === COMBINACOES_DO_CASAL.length) { matchMsg.innerHTML = "<h3>Perfeito!</h3><p>Você conhece bem nossa história!</p>"; matchMsg.classList.remove('hidden'); }
            } else { setTimeout(() => document.querySelectorAll('.match-item').forEach(x=>x.classList.remove('selected')), 500); }
            selDate = null; selEvent = null;
        }
    }
    initMatch();


    // =============================================
    // MODO EMYLLE — SEGUNDA TELA SECRETA
    // =============================================

    // --------------------------------------------------
    // TEXTOS PERSONALIZÁVEIS DO MODO EMYLLE
    // --------------------------------------------------

    // MENSAGEM PRINCIPAL DE AMOR PARA A EMYLLE
    const CARTA_EMYLLE = `Emylle,

Você não sabe, mas desde que você chegou, eu aprendi o que é acordar com um sol afundado no peito. Não o sol que aquece a pele — o outro, aquele que aquece por dentro, que chega antes do corpo em todos os lugares e diz ao mundo que algo bonito está acontecendo aqui.

Esse algo bonito é você.

Eu poderia listar tudo: o jeito que você ri, a forma como você olha para mim quando acha que eu não estou vendo, a leveza que você carrega mesmo sem perceber. Mas nenhuma lista seria suficiente. Você é daquelas pessoas que não cabem em palavras — e eu, que vivo de palavras, fico sem nenhuma toda vez que você sorri.

Obrigado por ser exatamente quem você é. Por não precisar ser diferente. Por fazer com que cada segundo ao seu lado pareça um presente que eu não mereci, mas que pretendo guardar com todo o cuidado do mundo.

Eu te amo, Emylle. Do jeito mais bonito e mais real que eu sei.

Sempre seu,
João Marcos`;

    // VERSOS DO POEMA (um por clique)
    const VERSOS_DO_POEMA = [
        "Antes de você, eu sabia o que era o tempo —",
        "contava os dias pelo que faltava, nunca pelo que havia.",
        "Depois de você, aprendi que o presente",
        "é o único lugar onde vale a pena morar.",
        "Você não me completou — eu já era inteiro.",
        "Mas você me mostrou que inteiro pode ser ainda mais.",
        "E agora eu não sei mais contar o tempo",
        "sem começar pelo instante em que você chegou."
    ];

    // RAZÕES PARA AMAR (ícone + texto)
    const RAZOES_PARA_AMAR = [
        { icone: "🌙", texto: "Pelo jeito que você dorme" },
        { icone: "😄", texto: "Pelo seu riso que não avisa quando vem" },
        { icone: "🤝", texto: "Por segurar minha mão sem eu pedir" },
        { icone: "✨", texto: "Por ser bonita sem saber que é" },
        { icone: "💬", texto: "Pelas conversas que não têm hora pra acabar" },
        { icone: "🌸", texto: "Por tornar o comum extraordinário" },
        { icone: "🎵", texto: "Por cantar baixinho quando acha que ninguém ouve" },
        { icone: "❤️", texto: "Por existir exatamente assim" }
    ];

    // PROMESSA
    const PROMESSA_EMYLLE = `Eu prometo estar aqui.
Nos dias fáceis e nos dias que pesam.
Nos momentos em que você brilha
e naqueles em que você só precisa de silêncio.

Prometo olhar para você
da mesma forma que olho agora —
como se você fosse a coisa mais bonita
que o mundo decidiu me mostrar.

E prometo nunca deixar você esquecer
do quanto você é amada.

Isso não tem prazo de validade.
Isso é para sempre.`;

    // --------------------------------------------------
    // LÓGICA DO MODO EMYLLE (não modificar abaixo)
    // --------------------------------------------------

    const emylleMode   = document.getElementById('emylle-mode');
    const secretBtn    = document.getElementById('secret-btn');
    const closeEmylle  = document.getElementById('close-emylle');
    let emylleActive   = false;
    let emylleInited   = false;

    // Ativar / desativar modo
    secretBtn.addEventListener('click', () => toggleEmylle(true));
    closeEmylle.addEventListener('click', () => toggleEmylle(false));

    function toggleEmylle(open) {
        emylleActive = open;
        if (open) {
            emylleMode.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            emylleMode.scrollTop = 0;
            if (!emylleInited) { initEmylle(); emylleInited = true; }
        } else {
            emylleMode.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    function initEmylle() {
        // Estrelas
        const starsCont = document.getElementById('stars-container');
        for (let i = 0; i < 150; i++) {
            const s = document.createElement('div');
            s.className = 'star';
            const size = Math.random() * 3 + 1;
            s.style.cssText = `width:${size}px;height:${size}px;top:${Math.random()*100}%;left:${Math.random()*100}%;animation-duration:${Math.random()*4+2}s;animation-delay:${Math.random()*5}s`;
            starsCont.appendChild(s);
        }

        // Pétalas
        const petalsCont = document.getElementById('petals-container');
        const petalSymbols = ['🌸', '🌹', '💕', '✨', '🌺'];
        for (let i = 0; i < 18; i++) {
            const p = document.createElement('div');
            p.className = 'petal';
            p.innerText = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
            p.style.left = Math.random() * 100 + 'vw';
            p.style.animationDuration = (Math.random() * 8 + 6) + 's';
            p.style.animationDelay = (Math.random() * 10) + 's';
            p.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
            petalsCont.appendChild(p);
        }

        // Carta com typewriter
        const cartaEl = document.getElementById('emylle-letter-text');
        let ci = 0;
        function typeEmylle() {
            if (ci < CARTA_EMYLLE.length) {
                cartaEl.textContent += CARTA_EMYLLE[ci++];
                setTimeout(typeEmylle, 30);
            }
        }
        setTimeout(typeEmylle, 600);

        // Poema interativo
        const poemDisplay = document.getElementById('poem-display');
        const poemBtn     = document.getElementById('poem-next-btn');
        let versoIdx = 0;
        function showVerso() {
            if (versoIdx < VERSOS_DO_POEMA.length) {
                const v = document.createElement('p');
                v.className = 'poem-verse';
                v.innerText = VERSOS_DO_POEMA[versoIdx++];
                poemDisplay.appendChild(v);
                if (versoIdx >= VERSOS_DO_POEMA.length) poemBtn.innerText = 'Fim do poema ❤';
            }
        }
        showVerso();
        poemBtn.addEventListener('click', showVerso);

        // Razões para amar
        const reasonsCont = document.getElementById('reasons-container');
        RAZOES_PARA_AMAR.forEach((r, i) => {
            const card = document.createElement('div');
            card.className = 'reason-card';
            card.innerHTML = `<span class="reason-num">${r.icone}</span>${r.texto}`;
            reasonsCont.appendChild(card);
            setTimeout(() => card.classList.add('visible'), 200 + i * 150);
        });

        // Promessa
        const promiseBox  = document.getElementById('promise-box');
        const promiseText = document.getElementById('promise-text');
        promiseBox.addEventListener('click', () => {
            promiseBox.classList.add('hidden');
            promiseText.innerText = PROMESSA_EMYLLE;
            promiseText.classList.remove('hidden');
        });
    }

});
