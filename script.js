const audioBase = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const skipBack = document.getElementById('skip-back');
const skipFwd = document.getElementById('skip-fwd');
const timeDisplay = document.getElementById('time-display');
const textContainer = document.getElementById('text-container');
const labelsContainer = document.getElementById('labels-container');

// Complete Timing Array mapping perfectly mapping the voiceover
// Start and End times in seconds. Tweak these slightly if needed manually.
const timingData = [
    // Intro (1.9-31.5s) - Stickers sequence
    { start: 1.9, end: 10.5, text: "Onder het motto <span class='bold-blue'>\u201CMakkelijker kunnen we het niet maken, wel leuker\u201D</span>, gaan we bij DRZ vanaf nu aan de slag met informatielabels.", type: "standard" },
    { start: 11.7, end: 13.5, text: "Maar wat doen die eigenlijk?", type: "standard" },
    { start: 14.4, end: 18, text: "Labels zijn er voor het <span class='bold-blue'>classificeren</span> van onze informatie.", type: "standard" },
    { start: 18.9, end: 23.5, text: "Je kunt het zien als het plakken van een <span class='bold-orange'>digitale sticker</span> op je document of e-mail.", type: "standard" },
    { start: 24.3, end: 31.5, text: "Met dat label vertel je aan collega\u2019s, maar ook aan het computersysteem, hoe voorzichtig we met die informatie moeten omgaan.", type: "standard" },

    // Why labels help you (32-59s) - Shield sequence
    { start: 32.1, end: 34.5, text: "Nu denk je misschien: <span class='bold-orange'>\u201CN\u00F3g een taak erbij?\u201D</span>", type: "standard" },
    { start: 35.3, end: 37.5, text: "Maar deze labels zijn er juist <span class='bold-blue'>voor jou</span>.", type: "standard" },
    { start: 37.8, end: 43.5, text: "Het geeft je de zekerheid dat je altijd volgens de regels werkt zonder dat je er lang over na hoeft te denken.", type: "standard" },
    { start: 44.5, end: 51, text: "Het voorkomt die vervelende <span class='bold-orange'>\u201Coeps-momenten\u201D</span> waarbij gevoelige informatie per ongeluk op de verkeerde plek belandt.", type: "standard" },
    { start: 51.9, end: 57.1, text: "Met <span class='bold-blue'>\u00E9\u00E9n klik</span> bescherm je jouw werk, je collega\u2019s en de reputatie van DRZ.", type: "standard" },
    { start: 57.1, end: 59.3, text: "Dat werkt wel zo rustig.", type: "standard" },

    // Smart setup / docs vs email (59.8-93s)
    { start: 59.8, end: 66.5, text: "Om te zorgen dat die beveiliging je niet in de weg zit bij je dagelijkse werk, hebben we het systeem <span class='bold-blue'>slim ingericht</span>.", type: "standard" },
    { start: 67.1, end: 71.2, text: "Daarbij is er een belangrijk verschil tussen je <span class='bold-blue'>e-mail</span> en je <span class='bold-orange'>documenten</span>:", type: "standard" },
    { start: 71.9, end: 76, text: "bij documenten is het standaard label voortaan <span class='highlight' style='font-size: 7vw;'>\u2018Intern\u2019</span>.", type: "standard" },
    { start: 76.4, end: 80.5, text: "Dat is veilig, want zo blijven ze binnen de muren van onze organisatie.", type: "standard" },
    { start: 81.5, end: 83.3, text: "Voor e-mail is dat anders.", type: "standard" },
    { start: 83.7, end: 89, text: "Omdat we vaak met de buitenwereld moeten mailen, staat het standaard label daar op <span class='highlight' style='font-size: 7vw;'>\u2018Algemeen\u2019</span>.", type: "standard" },
    { start: 89.5, end: 93.2, text: "Zo kun je gewoon je werk doen zonder dat techniek je in de weg zit.", type: "standard" },

    // Krantentest (94-110.5s) - Editorial grid sequence
    { start: 94.1, end: 99, text: "Om te helpen bij het kiezen van het juiste label, gebruiken we de <span class='highlight' style='font-size: 7vw;'>krantentest</span>.", type: "standard" },
    { start: 99.8, end: 102.5, text: "Stel jezelf bij elk document de vraag:", type: "krantentest-intro" },
    { start: 103, end: 110.5, text: "\u201CZou er schade ontstaan voor de organisatie of voor anderen als deze informatie morgen op de voorpagina van de krant staat?\u201D", type: "krantentest-quote" },

    // Concrete examples (111-142.5s)
    { start: 111.2, end: 114, text: "Laten we dat concreet maken met een paar voorbeelden:", type: "standard-clear-bg" },
    { start: 114.8, end: 121, text: "Een nieuwsbericht voor het intranet? Dat mag in de krant; dat is dus <span class='bold-blue'>Algemeen</span>.", type: "standard" },
    { start: 122.4, end: 125.5, text: "Een interne notitie over een teamoverleg?", type: "standard" },
    { start: 126.2, end: 131.5, text: "Niet voor de krant, maar ook niet geheim; dat labelen we als <span class='bold-blue'>Intern</span>.", type: "standard" },
    { start: 132.5, end: 137, text: "Werk je aan een beoordelingsverslag of een dossier met persoonsgegevens?", type: "standard" },
    { start: 137.8, end: 140.5, text: "Als dat in de krant komt, is de schade groot.", type: "standard" },
    { start: 140.9, end: 142.5, text: "Dat is <span class='bold-orange'>Vertrouwelijk</span>.", type: "standard" },

    // Label overview (142.7-198.5s) - Label geometries + cards
    { start: 142.7, end: 146.5, text: "Hier is een overzicht van wat de verschillende labels betekenen:", type: "standard-clear-bg" },

    // Algemeen
    { start: 146.7, end: 148.5, text: "1. Algemeen:", type: "label-trigger", labelTarget: "algemeen" },
    { start: 149.5, end: 154.5, text: "Informatie die iedereen mag zien. Makkelijk te delen met de buitenwereld.", type: "label-content", labelTarget: "algemeen" },

    // Intern
    { start: 154.9, end: 157, text: "2. Intern:", type: "label-trigger", labelTarget: "intern" },
    { start: 157.8, end: 167, text: "De standaard voor onze documenten. Dit is alleen voor gebruik binnen de organisatie. Je kunt dit dus niet delen met iemand buiten DRZ.", type: "label-content", labelTarget: "intern" },

    // Vertrouwelijk
    { start: 167.5, end: 169.8, text: "3. Vertrouwelijk:", type: "label-trigger", labelTarget: "vertrouwelijk" },
    { start: 170.1, end: 184, text: "Voor gevoelige zaken die je deelt met een specifieke groep personen. Dit kunnen collega\u2019s zijn, maar dit label gebruik je dus ook als je veilig wilt delen met geselecteerde mensen buiten de organisatie.", type: "label-content", labelTarget: "vertrouwelijk" },

    // Dep.V
    { start: 184.1, end: 186.5, text: "4. Dep. V:", type: "label-trigger", labelTarget: "depv" },
    { start: 186.8, end: 198.5, text: "Oftewel Departementaal Vertrouwelijk: Voor informatie die schade kan aanrichten bij het gehele ministerie. Hier gelden extra strenge beveiligingsregels voor.", type: "label-content", labelTarget: "depv" },

    // AI & Security (199.5-220.8s)
    { start: 199.5, end: 204, text: "Door te labelen, houd je ook de <span class='bold-blue'>regie over AI</span>.", type: "standard-clear-bg" },
    { start: 204.7, end: 210.8, text: "Gevoelige informatie wordt zo automatisch afgeschermd voor AI-hulpjes zoals <span class='bold-orange'>Copilot</span>.", type: "standard" },
    { start: 211.7, end: 218, text: "De beveiliging staat dus soms wat strakker; zo kun je bepaalde documenten niet meer zomaar doorsturen of printen.", type: "standard" },
    { start: 218.9, end: 220.8, text: "Dat hoort bij veilig werken.", type: "standard" },

    // Vangnet (221.8-244s) - Net sequence
    { start: 221.8, end: 229, text: "<div class='vangnet-wrap'>We hebben een digitaal vangnet ingebouwd dat gegevens zoals een <span class='redacted' id='redact-1'>BSN</span> of <span class='redacted' id='redact-2'>bankrekeningnummer</span> herkent.<div class='scan-line' id='vangnet-scanner'></div></div>", type: "vangnet" },
    { start: 229.6, end: 232.5, text: "Dit is een automatische extra controle,", type: "standard" },
    { start: 232.5, end: 235, text: "maar <span class='bold-orange'>geen garantie</span>.", type: "standard" },
    { start: 235.2, end: 240, text: "Je blijft altijd zelf verantwoordelijk voor wat je deelt met mensen of machines.", type: "standard" },
    { start: 240.5, end: 244, text: "Blijf dus zelf nadenken bij elk label dat je kiest.", type: "standard" },

    // Games & Outro (244.4-262.5s) - Circles sequence
    { start: 244.4, end: 247.2, text: "Wil je weten of je het labelen al in de vingers hebt?", type: "standard" },
    { start: 247.9, end: 255.5, text: "We hebben twee games ontwikkeld waarin je direct kunt testen hoe je de labels toepast en wat de gevolgen zijn in de praktijk.", type: "standard" },
    { start: 255.9, end: 258.3, text: "We zeiden toch dat we het <span class='bold-blue'>leuk</span> zouden maken?", type: "standard" },
    { start: 259, end: 262.5, text: "Veel succes met het veilig houden van onze informatie!", type: "standard" }
];

let mainTimeline;

function init() {
    // Generate DOM
    timingData.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = `phrase type-${item.type} phrase-${index}`;

        // apply special classes
        if (item.type === 'krantentest-quote') el.classList.add('serif');
        if (item.type === 'tip') el.classList.add('tip');

        el.innerHTML = item.text;
        textContainer.appendChild(el);
        item.el = el;
    });

    // Create main timeline synced with audio (paused initially)
    mainTimeline = gsap.timeline({ paused: true });

    // --- CANVAS ORCHESTRATION ---
    // Sequence 1: 0 - 32s (Floating Stickers)
    mainTimeline.to(bgState, { seq1Alpha: 1, duration: 5 }, 0);
    mainTimeline.to(bgState, { seq1Alpha: 0, duration: 5 }, 28);

    // Sequence 2: 32 - 60s (Shield Grid)
    mainTimeline.to(bgState, { seq2Alpha: 1, duration: 5 }, 32);
    // "één klik bescherm je" mentioned ~51.9s
    mainTimeline.to(bgState, { seq2ShieldThick: 1, duration: 2, ease: "power2.out" }, 52);
    mainTimeline.to(bgState, { seq2ShieldThick: 0, duration: 2 }, 56);
    mainTimeline.to(bgState, { seq2Alpha: 0, duration: 5 }, 57);

    // Sequence 3: 90 - 143s (Editorial Grid - krantentest & examples)
    mainTimeline.to(bgState, { seq3Alpha: 1, duration: 5 }, 90);
    mainTimeline.to(bgState, { seq3ScrollY: 100, duration: 53, ease: "none" }, 90);
    mainTimeline.to(bgState, { seq3Alpha: 0, duration: 5 }, 140);

    // Sequence 4: 146.7 - 199s (Label Geometries)
    // Algemeen (146.7 - 154.5)
    mainTimeline.to(bgState, { seq4AlgemeenAlpha: 1, duration: 2 }, 146.7);
    mainTimeline.to(bgState, { seq4Pulsar: 1, duration: 2, repeat: 4, yoyo: true, ease: "sine.inOut" }, 146.7);
    mainTimeline.to(bgState, { seq4AlgemeenAlpha: 0, duration: 2 }, 153);

    // Intern / Vertrouwelijk (154.9 - 184)
    mainTimeline.to(bgState, { seq4InternAlpha: 1, duration: 2 }, 154.9);
    mainTimeline.to(bgState, { seq4Pulsar: Math.PI * 2, duration: 29, ease: "none" }, 154.9);
    mainTimeline.to(bgState, { seq4InternAlpha: 0, duration: 2 }, 182);

    // Dep.V (184.1 - 198.5)
    mainTimeline.to(bgState, { seq4StaatsAlpha: 1, duration: 3, ease: "steps(3)" }, 184.1);
    mainTimeline.to(bgState, { seq4StaatsAlpha: 0, duration: 2 }, 197);

    // Sequence 5: 219 - 244s (The Net / Vangnet)
    mainTimeline.to(bgState, { seq5Alpha: 1, duration: 5 }, 219);
    mainTimeline.to(bgState, { seq5WaveOff: Math.PI * 10, duration: 25, ease: "none" }, 219);
    mainTimeline.to(bgState, { seq5Alpha: 0, duration: 5 }, 242);

    // Sequence 6: 248s - End (Bouncing Circles)
    mainTimeline.to(bgState, { seq6Alpha: 1, duration: 3 }, 248);
    mainTimeline.to(bgState, { seq6Time: 1, duration: 2, ease: "elastic.out(1, 0.3)", repeat: 7 }, 248);
    mainTimeline.to(bgState, { seq6Alpha: 0, duration: 3 }, 259);


    // Populate timeline commands
    timingData.forEach((item) => {
        const inTime = item.start;
        const outTime = item.end;
        const overlap = 0.5; // slight overlap out duration

        // --- BACKGROUND / SCENE TRANSITIONS based on IN TIME ---
        if (item.type === 'krantentest-intro') {
            mainTimeline.to(document.body, { backgroundColor: '#111', color: '#FFF', duration: 1 }, inTime);
        }

        if (item.type === 'standard-clear-bg') {
            mainTimeline.to(document.body, { backgroundColor: '#FFFFFF', color: '#1A1A1A', duration: 1 }, inTime);
            mainTimeline.to(labelsContainer, { autoAlpha: 0, duration: 0.5 }, inTime);
            mainTimeline.to('.label-card', { className: 'label-card', duration: 0.1 }, inTime);
        }

        // --- ELEMENT ANIMATIONS ---
        if (item.type.startsWith('label')) {
            if (item.type === 'label-trigger' && item.labelTarget !== "none") {
                mainTimeline.to(labelsContainer, { autoAlpha: 1, duration: 0.5 }, inTime);
                mainTimeline.to('.label-card', { className: 'label-card', duration: 0.1 }, inTime);
                mainTimeline.to(`#label-${item.labelTarget}`, { className: 'label-card active', duration: 0.5 }, inTime);
            } else if (item.type === 'label-trigger' && item.labelTarget === "none") {
                mainTimeline.to(labelsContainer, { autoAlpha: 1, duration: 0.5 }, inTime);
                mainTimeline.to('.label-card', { className: 'label-card', duration: 0.1 }, inTime);
            }

            // Text animations below grid
            mainTimeline.fromTo(item.el,
                { autoAlpha: 0, y: 30, scale: 0.95 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
                inTime
            );
            mainTimeline.to(item.el, { autoAlpha: 0, y: -20, scale: 0.9, duration: 0.4 }, outTime);
        }
        else if (item.type === 'vangnet') {
            // Main text fade in
            mainTimeline.fromTo(item.el,
                { autoAlpha: 0, y: 50 },
                { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
                inTime
            );

            // Scanline
            mainTimeline.to('#vangnet-scanner', { opacity: 1, duration: 0.2 }, inTime + 0.5);
            mainTimeline.to('#vangnet-scanner', { top: '100%', duration: 3, ease: "linear" }, inTime + 0.5);
            // Redactions mapped to scan progress
            mainTimeline.to('#redact-1', { className: 'redacted active', duration: 0.1 }, inTime + 1.2);
            mainTimeline.to('#redact-2', { className: 'redacted active', duration: 0.1 }, inTime + 2.0);
            mainTimeline.to('#vangnet-scanner', { opacity: 0, duration: 0.2 }, outTime - 0.5);

            mainTimeline.to(item.el, { autoAlpha: 0, scale: 0.9, duration: 0.5 }, outTime);
        } else {
            // Default Standard phrase animation
            mainTimeline.fromTo(item.el,
                { autoAlpha: 0, y: 50, scale: 0.95 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
                inTime
            );
            mainTimeline.to(item.el, { autoAlpha: 0, scale: 0.85, duration: 0.6 }, outTime);
        }
    });

    // Make timeline match exact audio duration (approx 4:22 = 262s)
    mainTimeline.duration(262);
}

// Controls logic to Sync Audio and GSAP Time perfectly
let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        audioBase.play();
        // Hook the GSAP timeline time directly to Audio current time on every ticker update
        // This ensures buttery smooth visual updates that never drift from audio
        gsap.ticker.add(updateTimeline);
        playBtn.innerText = "Pause";
    } else {
        audioBase.pause();
        mainTimeline.pause();
        gsap.ticker.remove(updateTimeline);
        playBtn.innerText = "Play";
    }
    isPlaying = !isPlaying;
});

// Skip controls
skipBack.addEventListener('click', () => {
    audioBase.currentTime = Math.max(0, audioBase.currentTime - 10);
    mainTimeline.time(audioBase.currentTime);
});

skipFwd.addEventListener('click', () => {
    audioBase.currentTime = Math.min(audioBase.duration, audioBase.currentTime + 10);
    mainTimeline.time(audioBase.currentTime);
});

// If the audio ends, reset
audioBase.addEventListener('ended', () => {
    isPlaying = false;
    playBtn.innerText = "Play";
    gsap.ticker.remove(updateTimeline);
    mainTimeline.pause();
});

function updateTimeline() {
    mainTimeline.time(audioBase.currentTime);

    // Update numerical time display
    const mins = Math.floor(audioBase.currentTime / 60);
    const secs = Math.floor(audioBase.currentTime % 60);
    timeDisplay.innerText = `${mins}:${secs.toString().padStart(2, '0')} / 4:22`;
}

// Initialize on DOM mapped
window.addEventListener('load', () => {
    init();
    initCanvas();
});

// --- CANVAS BACKGROUND ANIMATION LAYER ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let cw, ch;

// State object tweened by the main GSAP timeline
const bgState = {
    seq1Alpha: 0,
    seq2Alpha: 0,
    seq2ShieldThick: 0,
    seq3Alpha: 0,
    seq3ScrollY: 0,
    seq4AlgemeenAlpha: 0,
    seq4InternAlpha: 0,
    seq4StaatsAlpha: 0,
    seq4Pulsar: 0,
    seq5Alpha: 0,
    seq5WaveOff: 0,
    seq6Alpha: 0,
    seq6Time: 0
};

// Colors
const accentBlue = '#01689B';
const baseDark = '#1A1A1A';

// Dynamic Entities
const stickers = Array.from({ length: 4 }).map(() => ({
    x: Math.random(), y: Math.random(),
    w: 0.15 + Math.random() * 0.1, h: 0.1 + Math.random() * 0.1,
    vx: (Math.random() - 0.5) * 0.001, vy: (Math.random() - 0.5) * 0.001,
    ang: Math.random() * Math.PI, vang: (Math.random() - 0.5) * 0.005
}));

const circles = Array.from({ length: 3 }).map(() => ({
    x: Math.random(), y: Math.random(), r: 0.05 + Math.random() * 0.05,
    vx: (Math.random() - 0.5) * 0.002, vy: (Math.random() - 0.5) * 0.002
}));

function resizeCanvas() {
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;
}

function initCanvas() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    gsap.ticker.add(renderCanvas);
}

function renderCanvas() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.lineJoin = 'round';

    // SEQUENCE 1: Floating Stickers (0-35s)
    if (bgState.seq1Alpha > 0) {
        ctx.save();
        ctx.globalAlpha = bgState.seq1Alpha * 0.2;
        ctx.strokeStyle = accentBlue;
        ctx.lineWidth = 2;
        stickers.forEach(s => {
            s.x += s.vx; s.y += s.vy; s.ang += s.vang;
            if (s.x < 0 || s.x > 1) s.vx *= -1;
            if (s.y < 0 || s.y > 1) s.vy *= -1;
            ctx.translate(s.x * cw, s.y * ch);
            ctx.rotate(s.ang);
            ctx.strokeRect(-s.w * cw / 2, -s.h * ch / 2, s.w * cw, s.h * ch);
            ctx.rotate(-s.ang);
            ctx.translate(-s.x * cw, -s.y * ch);
        });
        ctx.restore();
    }

    // SEQUENCE 2: Shield / Dot Grid (31-60s)
    if (bgState.seq2Alpha > 0) {
        ctx.save();
        ctx.globalAlpha = bgState.seq2Alpha * 0.2;
        ctx.fillStyle = baseDark;
        const steps = 10;
        for (let i = 0; i <= steps; i++) {
            for (let j = 0; j <= steps; j++) {
                ctx.beginPath();
                ctx.arc((cw / steps) * i, (ch / steps) * j, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        if (bgState.seq2ShieldThick > 0) {
            ctx.strokeStyle = accentBlue;
            ctx.lineWidth = bgState.seq2ShieldThick * ch * 0.2; // Massive stroke
            ctx.beginPath();
            ctx.moveTo(0, ch / 2);
            ctx.bezierCurveTo(cw * 0.3, ch * 0.2, cw * 0.7, ch * 0.8, cw, ch / 2);
            ctx.stroke();
        }
        ctx.restore();
    }

    // SEQUENCE 3: Editorial Grid (88-146s)
    if (bgState.seq3Alpha > 0) {
        ctx.save();
        ctx.globalAlpha = bgState.seq3Alpha * 0.2;
        ctx.strokeStyle = baseDark;
        ctx.lineWidth = 1;
        // Columns
        ctx.beginPath();
        ctx.moveTo(cw * 0.33, 0); ctx.lineTo(cw * 0.33, ch);
        ctx.moveTo(cw * 0.66, 0); ctx.lineTo(cw * 0.66, ch);
        ctx.stroke();

        // Scrolling rules
        const scrollFreq = (bgState.seq3ScrollY * 0.5) % 1.0;
        const lineSpacing = ch * 0.1;
        for (let i = -1; i < 15; i++) {
            ctx.beginPath();
            const y = (i * lineSpacing) - (scrollFreq * lineSpacing);
            ctx.moveTo(0, y); ctx.lineTo(cw, y);
            ctx.stroke();
        }
        ctx.restore();
    }

    // SEQUENCE 4: Label Geometry (146-200s)
    if (bgState.seq4AlgemeenAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = bgState.seq4AlgemeenAlpha * 0.12;
        ctx.strokeStyle = baseDark;
        ctx.lineWidth = 2;
        const rOff = bgState.seq4Pulsar * 20;
        ctx.beginPath(); ctx.arc(cw / 2, ch / 2, Math.max(0, cw * 0.1 + rOff), 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cw / 2, ch / 2, Math.max(0, cw * 0.2 + rOff), 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cw / 2, ch / 2, Math.max(0, cw * 0.3 + rOff), 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
    }

    if (bgState.seq4InternAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = bgState.seq4InternAlpha * 0.15;
        ctx.strokeStyle = accentBlue;
        ctx.lineWidth = 4;
        const sqSize = cw * 0.2;
        // Interlocking squares slowly rotating
        ctx.translate(cw / 2, ch / 2);
        ctx.rotate(bgState.seq4Pulsar * 0.2);
        ctx.strokeRect(-sqSize, -sqSize / 2, sqSize, sqSize);
        ctx.strokeRect(0, -sqSize / 2, sqSize, sqSize);
        ctx.restore();
    }

    if (bgState.seq4StaatsAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = bgState.seq4StaatsAlpha * 0.2;
        ctx.strokeStyle = baseDark;
        ctx.lineWidth = cw * 0.05; // Thick vault
        ctx.strokeRect(cw * 0.025, ch * 0.025, cw * 0.95, ch * 0.95);
        ctx.restore();
    }

    // SEQUENCE 5: The Net (218-248s)
    if (bgState.seq5Alpha > 0) {
        ctx.save();
        ctx.globalAlpha = bgState.seq5Alpha * 0.2;
        ctx.strokeStyle = accentBlue;
        ctx.lineWidth = 2;
        const count = 12;
        for (let i = 1; i < count; i++) {
            const x = (cw / count) * i;
            const wave = Math.sin(x * 0.01 + bgState.seq5WaveOff) * ch * 0.1;
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.bezierCurveTo(x + wave, ch * 0.3, x - wave, ch * 0.7, x, ch); ctx.stroke();
            const y = (ch / count) * i;
            const waveX = Math.cos(y * 0.01 + bgState.seq5WaveOff) * cw * 0.1;
            ctx.beginPath(); ctx.moveTo(0, y); ctx.bezierCurveTo(cw * 0.3, y + waveX, cw * 0.7, y - waveX, cw, y); ctx.stroke();
        }
        ctx.restore();
    }

    // SEQUENCE 6: Bouncing Circles (248s-end)
    if (bgState.seq6Alpha > 0) {
        ctx.save();
        ctx.globalAlpha = bgState.seq6Alpha * 0.15;
        ctx.fillStyle = accentBlue;
        circles.forEach(c => {
            // elastic logic handled by tweening, basic bounce here
            c.x += c.vx; c.y += c.vy;
            if (c.x < c.r || c.x > 1 - c.r) c.vx *= -1;
            if (c.y < c.r || c.y > 1 - c.r) c.vy *= -1;
            ctx.beginPath();
            ctx.arc(c.x * cw, c.y * ch, c.r * cw, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }
}
