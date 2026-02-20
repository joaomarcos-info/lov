document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // CONFIGURAÇÕES PERSONALIZÁVEIS
    // ==========================================

    const NOMES_DO_CASAL = "João & Maria";
    const DATA_INICIO_RELACIONAMENTO = "2022-06-12T19:30:00";

    // TEXTO PERSONALIZÁVEL DO JOGO 1 (Corações)
    const MENSAGEM_FINAL_JOGO1 = (pontos) => `
        <h3>Incrível, meu amor!</h3>
        <p>Você capturou <strong>${pontos}</strong> corações!</p>
        <p>Mas saiba que o meu coração você já capturou faz tempo.</p>
    `;

    // TEXTO PERSONALIZÁVEL DO JOGO 2 (Mensagens)
    const MENSAGEM_FINAL_JOGO2 = (pontos) => `
        <h3>Você é demais!</h3>
        <p>Você conseguiu <strong>${pontos}</strong> pontos espalhando mensagens de amor!</p>
    `;

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

    // TEXTO PERSONALIZÁVEL DA HISTÓRIA INTERATIVA
    const HISTORIA_INTERATIVA = {
        inicio: {
            texto: "Era uma tarde ensolarada e decidimos fazer algo especial juntos. Para onde vamos?",
            escolhas: [
                { texto: "Piquenique no Parque", proximo: "parque" },
                { texto: "Cinema e Pipoca", proximo: "cinema" }
            ]
        },
        parque: {
            texto: "O piquenique estava delicioso! De repente, começa a chuviscar. O que fazemos?",
            escolhas: [
                { texto: "Dançar na Chuva", proximo: "chuva" },
                { texto: "Correr para o Carro", proximo: "carro" }
            ]
        },
        cinema: {
            texto: "O filme era romântico e seguramos as mãos o tempo todo. Na saída, o que comemos?",
            escolhas: [
                { texto: "Pizza Gigante", proximo: "pizza" },
                { texto: "Sorvete de Casquinha", proximo: "sorvete" }
            ]
        },
        chuva: { texto: "Dançar com você sob a chuva foi o momento mais mágico da minha vida. Eu te amo!", final: true },
        carro: { texto: "Protegidos no carro, rimos da situação e conversamos por horas. Momentos simples são os melhores.", final: true },
        pizza: { texto: "Dividir uma pizza e sonhos com você é meu passatempo favorito. Que venham mais jantares assim!", final: true },
        sorvete: { texto: "O sorvete estava doce, mas nada supera a doçura do seu beijo. Foi um dia perfeito.", final: true }
    };

    // TEXTO PERSONALIZÁVEL DO COMBINE DATA E EVENTO
    const COMBINACOES_DO_CASAL = [
        { data: "12/06/2022", evento: "Primeiro Encontro" },
        { data: "15/08/2022", evento: "Primeiro Beijo" },
        { data: "24/12/2023", evento: "Natal Juntos" },
        { data: "01/01/2025", evento: "Ano Novo" }
    ];

    // TEXTO PERSONALIZÁVEL DO QUIZ
    const PERGUNTAS_DO_QUIZ = [
        { pergunta: "Qual é a minha cor favorita?", opcoes: ["Azul", "Vermelho", "Rosa", "Verde"], correta: 2 },
        { pergunta: "Onde foi nossa primeira viagem?", opcoes: ["Praia", "Montanha", "Interior", "Exterior"], correta: 0 },
        { pergunta: "Qual comida eu mais gosto de dividir com você?", opcoes: ["Sushi", "Pizza", "Hambúrguer", "Massas"], correta: 1 }
    ];

    // TEXTO PERSONALIZÁVEL DA CARTA
    const TEXTO_CARTA = `Minha vida,

Escrevo esta carta para dizer o quanto cada segundo ao seu lado é valioso. Desde que começamos nossa jornada em ${DATA_INICIO_RELACIONAMENTO.split('T')[0]}, meu mundo ficou mais brilhante.

Obrigado por ser meu porto seguro e minha maior alegria.

Com todo o meu amor,
${NOMES_DO_CASAL.split('&')[0].trim()}`;

    // EVENTOS DA LINHA DO TEMPO
    const EVENTOS_DO_CASAL = [
        { data: "Junho 2022", titulo: "O Começo", descricao: "O dia em que tudo mudou." },
        { data: "Agosto 2022", titulo: "O Beijo", descricao: "Inesquecível e doce." },
        { data: "Dezembro 2023", titulo: "Primeiro Natal", descricao: "Muita alegria e presentes." },
        { data: "Janeiro 2025", titulo: "Planos", descricao: "Sonhando acordados." }
    ];

    // GALERIA
    const GALERIA_DO_CASAL = [
        { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800", legenda: "Nosso Amor" },
        { url: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=800", legenda: "Momentos" },
        { url: "https://images.unsplash.com/photo-1522673607200-164883214c98?q=80&w=800", legenda: "Sempre" },
        { url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=800", legenda: "Eternamente" }
    ];

    // ==========================================
    // LÓGICA DO SITE (NÃO MODIFICAR ABAIXO)
    // ==========================================

    // 1. Nomes e Contador
    document.getElementById('casal-names').innerText = NOMES_DO_CASAL;
    function updateCounter() {
        const diff = new Date() - new Date(DATA_INICIO_RELACIONAMENTO);
        document.getElementById('days').innerText = Math.floor(diff / 864e5);
        document.getElementById('hours').innerText = Math.floor((diff / 36e5) % 24);
        document.getElementById('minutes').innerText = Math.floor((diff / 6e4) % 60);
        document.getElementById('seconds').innerText = Math.floor((diff / 1e3) % 60);
    }
    setInterval(updateCounter, 1000); updateCounter();

    // 2. Jogo 1: Corações
    const area1 = document.getElementById('game-area1'), scoreEl1 = document.getElementById('score1'), timerEl1 = document.getElementById('timer1'), msg1 = document.getElementById('game1-message');
    let s1 = 0, t1 = 30, i1, h1;
    document.getElementById('start-game1-btn').onclick = (e) => {
        s1 = 0; t1 = 30; scoreEl1.innerText = 0; e.target.classList.add('hidden'); msg1.classList.add('hidden');
        i1 = setInterval(() => { t1--; timerEl1.innerText = t1; if(t1<=0) { clearInterval(i1); clearInterval(h1); area1.innerHTML = '<button class="btn" onclick="location.reload()">Reiniciar</button>'; msg1.innerHTML = MENSAGEM_FINAL_JOGO1(s1); msg1.classList.remove('hidden'); } }, 1000);
        h1 = setInterval(() => { const h = document.createElement('div'); h.className='heart'; h.style.left=Math.random()*90+'%'; h.style.top=Math.random()*90+'%'; h.onclick=()=>{s1++; scoreEl1.innerText=s1; h.remove();}; area1.appendChild(h); setTimeout(()=>h.remove(), 1000); }, 800);
    };

    // 3. Jogo 2: Mensagens
    const area2 = document.getElementById('game-area2'), scoreEl2 = document.getElementById('score2'), timerEl2 = document.getElementById('timer2'), msg2 = document.getElementById('game2-message');
    let s2 = 0, t2 = 30, i2, h2;
    document.getElementById('start-game2-btn').onclick = (e) => {
        s2 = 0; t2 = 30; scoreEl2.innerText = 0; e.target.classList.add('hidden'); msg2.classList.add('hidden');
        i2 = setInterval(() => { t2--; timerEl2.innerText = t2; if(t2<=0) { clearInterval(i2); clearInterval(h2); area2.innerHTML = '<button class="btn" onclick="location.reload()">Reiniciar</button>'; msg2.innerHTML = MENSAGEM_FINAL_JOGO2(s2); msg2.classList.remove('hidden'); } }, 1000);
        h2 = setInterval(() => { const b = document.createElement('div'); b.className='bubble'; b.innerText='Te amo!'; b.style.left=Math.random()*80+'%'; b.style.top=Math.random()*80+'%'; b.onclick=()=>{s2+=10; scoreEl2.innerText=s2; b.remove();}; area2.appendChild(b); setTimeout(()=>b.remove(), 1500); }, 900);
    };

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

    // 7. História Interativa
    const storyTxt = document.getElementById('story-text'), storyChoices = document.getElementById('story-choices'), storyMsg = document.getElementById('story-message'), resetStory = document.getElementById('reset-story-btn');
    function showStory(nodeKey) {
        const node = HISTORIA_INTERATIVA[nodeKey]; storyTxt.innerText = node.texto; storyChoices.innerHTML = '';
        if (node.final) { storyMsg.innerHTML = `<p>${node.texto}</p><h3>Final da História!</h3>`; storyMsg.classList.remove('hidden'); resetStory.classList.remove('hidden'); }
        else { node.escolhas.forEach(c => { const b = document.createElement('button'); b.className = 'btn'; b.innerText = c.texto; b.onclick = () => showStory(c.proximo); storyChoices.appendChild(b); }); }
    }
    showStory('inicio');
    resetStory.onclick = () => { storyMsg.classList.add('hidden'); resetStory.classList.add('hidden'); showStory('inicio'); };

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

    // 9. Quiz
    const qText = document.getElementById('question-text'), optCont = document.getElementById('options-container'), quizMsg = document.getElementById('quiz-message');
    let currQ = 0, qScore = 0;
    function showQ() {
        if (currQ >= PERGUNTAS_DO_QUIZ.length) { quizMsg.innerHTML = `<h3>Fim do Quiz!</h3><p>Você acertou ${qScore} de ${PERGUNTAS_DO_QUIZ.length}!</p>`; quizMsg.classList.remove('hidden'); return; }
        const q = PERGUNTAS_DO_QUIZ[currQ]; qText.innerText = q.pergunta; optCont.innerHTML = '';
        q.opcoes.forEach((o, i) => { const b = document.createElement('button'); b.className = 'option-btn'; b.innerText = o; b.onclick = () => { if(i === q.correta) qScore++; currQ++; showQ(); }; optCont.appendChild(b); });
    }
    showQ();

    // 10. Carta e Timeline
    const letterEl = document.getElementById('letter-content'); let charIdx = 0;
    function type() { if(charIdx < TEXTO_CARTA.length) { letterEl.textContent += TEXTO_CARTA[charIdx++]; setTimeout(type, 40); } }
    new IntersectionObserver((entries) => { if(entries[0].isIntersecting && charIdx === 0) type(); }, { threshold: 0.5 }).observe(document.getElementById('carta'));
    
    const tlCont = document.getElementById('timeline-container');
    EVENTOS_DO_CASAL.forEach((ev, i) => {
        const d = document.createElement('div'); d.className = `timeline-item ${i%2===0?'left':'right'}`;
        d.innerHTML = `<div class="timeline-content"><span>${ev.data}</span><h3>${ev.titulo}</h3><p>${ev.descricao}</p></div>`;
        tlCont.appendChild(d);
    });
    const tlObs = new IntersectionObserver((entries) => { entries.forEach(en => { if(en.isIntersecting) en.target.classList.add('visible'); }); }, { threshold: 0.2 });
    document.querySelectorAll('.timeline-item').forEach(it => tlObs.observe(it));

    // 11. Galeria
    const track = document.getElementById('carousel-track');
    GALERIA_DO_CASAL.forEach(img => {
        const s = document.createElement('div'); s.className = 'carousel-slide';
        s.innerHTML = `<img src="${img.url}" alt="${img.legenda}"><div class="carousel-caption">${img.legenda}</div>`;
        s.onclick = () => { const m = document.getElementById('image-modal'); m.style.display="flex"; document.getElementById('modal-img').src=img.url; document.getElementById('modal-caption').innerText=img.legenda; };
        track.appendChild(s);
    });
    let curS = 0;
    document.getElementById('nextBtn').onclick = () => { curS = (curS+1)%GALERIA_DO_CASAL.length; track.style.transform = `translateX(-${curS*100}%)`; };
    document.getElementById('prevBtn').onclick = () => { curS = (curS-1+GALERIA_DO_CASAL.length)%GALERIA_DO_CASAL.length; track.style.transform = `translateX(-${curS*100}%)`; };
    document.querySelector('.close-modal').onclick = () => document.getElementById('image-modal').style.display="none";
});
