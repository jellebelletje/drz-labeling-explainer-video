const audioBase = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const timeDisplay = document.getElementById('time-display');
const textContainer = document.getElementById('text-container');
const labelsContainer = document.getElementById('labels-container');

// Complete Timing Array mapping perfectly mapping the voiceover
// Start and End times in seconds. Tweak these slightly if needed manually.
const timingData = [
    { start: 0, end: 10.5, text: "Onder het motto <span class='bold-blue'>“Makkelijker kunnen we het niet maken, wel leuker”</span> gaan we bij DRZ van start met onze nieuwe informatie-classificatie.", type: "standard" },
    { start: 11, end: 13.5, text: "Oftewel:<br><span class='highlight' style='font-size: 8vw;'>Het Nieuwe Labelen.</span>", type: "intro" },
    { start: 14, end: 18.5, text: "Maar wat is dat eigenlijk, <span class='bold-blue'>informatie-classificatie</span>?", type: "standard" },
    { start: 19, end: 24.5, text: "Je kunt het zien als het plakken van een <span class='bold-orange'>digitale sticker</span> op je document of e-mail.", type: "standard" },
    { start: 25, end: 35.5, text: "Met dat label vertel je aan collega's, maar ook aan de computersystemen, hoe voorzichtig we met die informatie moeten omgaan en wie het mag zien.", type: "standard" },
    { start: 36, end: 40.5, text: "Zoals bijna iedereen wel weet, waren er in de oude situatie al wel labels.", type: "standard" },
    { start: 41, end: 43.5, text: "Maar werden deze niet echt gebruikt.", type: "standard" },
    { start: 44, end: 49.5, text: "Bijna alles bleef standaard op 'Algemeen' staan, wat niet goed was voor onze <span class='bold-orange'>veiligheid</span>.", type: "standard" },
    { start: 50, end: 51.5, text: "Dat gaat nu veranderen.", type: "standard" },
    { start: 52, end: 58.5, text: "We gaan nu <span class='bold-blue'>bewust de juiste labels kiezen</span> om onze organisatie beter te beveiligen.", type: "standard" },
    { start: 59, end: 64.5, text: "Zo zorgen we er bijvoorbeeld voor dat gevoelige informatie die niet voor iedereen bestemd is,", type: "standard" },
    { start: 65, end: 68.5, text: "ook voor AI-hulpjes zoals Copilot wordt afgeschermd.", type: "standard" },
    { start: 69, end: 75.5, text: "Hierdoor krijgt niemand toegang tot data waar hij geen toegang toe mag hebben.", type: "standard" },

    { start: 76, end: 78.5, text: "Laten we eerlijk zijn over wat dit voor jou betekent:", type: "standard" },
    { start: 79, end: 82.5, text: "de beveiliging staat voortaan <span class='bold-orange'>strakker afgesteld</span>.", type: "standard" },
    { start: 83, end: 88.5, text: "Dat wil zeggen dat je in sommige gevallen misschien niet meer alles met een document kunt doen wat je", type: "standard" },
    { start: 89, end: 92.5, text: "eerst wel kon, zoals het zomaar doorsturen of uitprinten.", type: "standard" },
    { start: 93, end: 97.5, text: "Dat vraagt om een aanpassing in hoe we met onze informatie omgaan.", type: "standard" },
    { start: 98, end: 103.5, text: "Het belangrijkste is om daar niet gefrustreerd over te raken, maar te begrijpen waarom deze", type: "standard" },
    { start: 104, end: 105.5, text: "regels er zijn.", type: "standard" },

    // Krantentest sequence
    { start: 106, end: 109.5, text: "Om je daarbij te helpen, gebruiken we de <span class='highlight' style='font-size: 7vw;'>'krantentest'</span>.", type: "standard" },
    { start: 110, end: 111.5, text: "Stel jezelf bij elk document de volgende vraag:", type: "krantentest-intro" },
    { start: 112, end: 118.5, text: "“Zou er schade ontstaan voor de organisatie, voor anderen of voor mijzelf,", type: "krantentest-quote" },
    { start: 119, end: 125.5, text: "als deze informatie morgen op de voorpagina van de krant staat?”", type: "krantentest-quote" },
    { start: 126, end: 130.5, text: "Hier zijn de <span class='bold-blue'>vijf labels</span> en wat ze betekenen:", type: "standard-clear-bg" },

    // Label Sequence
    { start: 131, end: 132.5, text: "Algemeen:", type: "label-trigger", labelTarget: "algemeen" },
    { start: 133, end: 138.5, text: "Dit is informatie die iedereen mag zien, zoals een nieuwsbericht of een tekst voor een website.", type: "label-content", labelTarget: "algemeen" },
    { start: 139, end: 140.5, text: "Als dit in de krant komt, is dat prima.", type: "label-content", labelTarget: "algemeen" },
    { start: 141, end: 147.5, text: "Bij dit label wordt de beveiliging er juist afgehaald zodat iedereen het makkelijk kan lezen.", type: "label-content", labelTarget: "algemeen" },

    { start: 148, end: 148.9, text: "2. Intern:", type: "label-trigger", labelTarget: "none" },
    { start: 149, end: 155.5, text: "Dit is ons nieuwe standaardlabel voor zaken als teamafspraken of handleidingen.", type: "label-trigger", labelTarget: "intern" },
    { start: 156, end: 163.5, text: "Deze informatie is alleen voor ons binnen de organisatie bedoeld en wordt beveiligd met versleuteling.", type: "label-content", labelTarget: "intern" },

    { start: 164, end: 164.9, text: "3. Vertrouwelijk:", type: "label-trigger", labelTarget: "none" },
    { start: 165, end: 171.5, text: "Dit gaat om gevoelige zaken die je alleen met een kleine groep mensen deelt.", type: "label-trigger", labelTarget: "vertrouwelijk" },
    { start: 172, end: 178.5, text: "AI-tools zoals Copilot mogen deze bestanden niet gebruiken om antwoorden te geven.", type: "label-content", labelTarget: "vertrouwelijk" },

    { start: 179, end: 183.5, text: "4. Departementaal Vertrouwelijk (Dep.V.):", type: "label-trigger", labelTarget: "depv" },
    { start: 184, end: 189.5, text: "Dit is informatie die schade kan aanrichten bij een ministerie als het op straat komt te liggen.", type: "label-content", labelTarget: "depv" },
    { start: 190, end: 194.5, text: "Hier gelden extra strenge regels voor, zoals vaker moeten inloggen.", type: "label-content", labelTarget: "depv" },

    { start: 195, end: 196.5, text: "5. Staatsgeheim:", type: "label-trigger", labelTarget: "staatsgeheim" },
    { start: 197, end: 203.5, text: "Dit is onze meest gevoelige informatie, waarbij een lek de veiligheid van het land in gevaar brengt.", type: "label-content", labelTarget: "staatsgeheim" },
    { start: 204, end: 206.5, text: "Bijna niemand heeft hier toegang toe.", type: "label-content", labelTarget: "staatsgeheim" },

    { start: 207, end: 216.5, text: "Het is belangrijk dat je je bij elk stukje informatie afvraagt wat voor type informatie het is en dat je het op de juiste manier labelt.", type: "standard-clear-bg" },

    // Vangnet sequence
    { start: 217, end: 220.5, text: "Om ons daarbij te helpen, hebben we een <span class='bold-blue'>digitaal vangnet</span> ingebouwd.", type: "standard" },
    { start: 221, end: 229.5, text: "<div class='vangnet-wrap'>Het systeem herkent het vaak zelf als er gegevens in een bestand staan zoals een <span class='redacted' id='redact-1'>BSN</span>, <span class='redacted' id='redact-2'>paspoortnummer</span> of een <span class='redacted' id='redact-3'>bankrekeningnummer</span>.<div class='scan-line' id='vangnet-scanner'></div></div>", type: "vangnet" },

    { start: 230, end: 234.5, text: "Zie het als een extra hulpje dat voorkomt dat we per ongeluk fouten maken.", type: "standard" },
    { start: 235, end: 236.5, text: "Maar let op:", type: "standard" },
    { start: 237, end: 239.5, text: "dit systeem is <span class='bold-orange'>niet 100% waterdicht</span>.", type: "standard" },
    { start: 240, end: 244.5, text: "Je blijft altijd zelf verantwoordelijk voor wat je deelt met andere mensen of met machines.", type: "standard" },
    { start: 245, end: 248.5, text: "Blijf dus altijd zelf goed nadenken bij elk label dat je kiest.", type: "standard" },

    { start: 249, end: 250.5, text: "Zoals gezegd: we kunnen het wel leuker maken.", type: "standard" },
    { start: 251, end: 253.5, text: "Daarom hebben we een paar games ontwikkeld.", type: "standard" },
    { start: 254, end: 261.5, text: "De eerste leert je hoe je labels moet toepassen, en de tweede leert je wat de consequenties zijn van het toepassen van die labels.", type: "standard" },

    { start: 262, end: 264.5, text: "Veel plezier met Het Nieuwe Labelen.", type: "standard" },

    { start: 265, end: 266.5, text: "Nog een kleine tip.", type: "standard" },
    { start: 267, end: 272.5, text: "Als je twijfelt tussen intern en vertrouwelijk,", type: "standard" },
    { start: 273, end: 278, text: "zet hem dan op <span class='bold-orange'>vertrouwelijk</span>. Dan zit je altijd goed.", type: "tip" }
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
    // Sequence 1: 0 - 45s (Floating Stickers)
    mainTimeline.to(bgState, { seq1Alpha: 1, duration: 5 }, 0);
    mainTimeline.to(bgState, { seq1Alpha: 0, duration: 5 }, 40);

    // Sequence 2: 45 - 90s (Shield Grid)
    mainTimeline.to(bgState, { seq2Alpha: 1, duration: 5 }, 45);
    // "Copilot" mentioned ~65s
    mainTimeline.to(bgState, { seq2ShieldThick: 1, duration: 2, ease: "power2.out" }, 65);
    mainTimeline.to(bgState, { seq2ShieldThick: 0, duration: 2 }, 69);
    mainTimeline.to(bgState, { seq2Alpha: 0, duration: 5 }, 85);

    // Sequence 3: 90 - 120s (Editorial Grid)
    mainTimeline.to(bgState, { seq3Alpha: 1, duration: 5 }, 90);
    mainTimeline.to(bgState, { seq3ScrollY: 100, duration: 30, ease: "none" }, 90);
    mainTimeline.to(bgState, { seq3Alpha: 0, duration: 5 }, 115);

    // Sequence 4: 120 - 210s (Label Geometries)
    // Algemeen (131 - 148)
    mainTimeline.to(bgState, { seq4AlgemeenAlpha: 1, duration: 2 }, 131);
    mainTimeline.to(bgState, { seq4Pulsar: 1, duration: 2, repeat: 8, yoyo: true, ease: "sine.inOut" }, 131);
    mainTimeline.to(bgState, { seq4AlgemeenAlpha: 0, duration: 2 }, 146);

    // Intern / Vertrouwelijk (149 - 179)
    mainTimeline.to(bgState, { seq4InternAlpha: 1, duration: 2 }, 149);
    mainTimeline.to(bgState, { seq4Pulsar: Math.PI * 2, duration: 30, ease: "none" }, 149);
    mainTimeline.to(bgState, { seq4InternAlpha: 0, duration: 2 }, 177);

    // Staatsgeheim (195 - 208)
    mainTimeline.to(bgState, { seq4StaatsAlpha: 1, duration: 3, ease: "steps(3)" }, 195);
    mainTimeline.to(bgState, { seq4StaatsAlpha: 0, duration: 2 }, 208);

    // Sequence 5: 210 - 250s (The Net)
    mainTimeline.to(bgState, { seq5Alpha: 1, duration: 5 }, 210);
    mainTimeline.to(bgState, { seq5WaveOff: Math.PI * 10, duration: 40, ease: "none" }, 210);
    mainTimeline.to(bgState, { seq5Alpha: 0, duration: 5 }, 245);

    // Sequence 6: 250s - End (Bouncing Circles)
    mainTimeline.to(bgState, { seq6Alpha: 1, duration: 5 }, 250);
    // Add some elastic scale bounces for the circles using dummy property
    mainTimeline.to(bgState, { seq6Time: 1, duration: 2, ease: "elastic.out(1, 0.3)", repeat: 10 }, 250);
    mainTimeline.to(bgState, { seq6Alpha: 0, duration: 5 }, 274);


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
            // Redactions mapped to scan progress approx.
            mainTimeline.to('#redact-1', { className: 'redacted active', duration: 0.1 }, inTime + 1.2);
            mainTimeline.to('#redact-2', { className: 'redacted active', duration: 0.1 }, inTime + 1.8);
            mainTimeline.to('#redact-3', { className: 'redacted active', duration: 0.1 }, inTime + 2.4);
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

    // Make timeline match exact audio duration (approx 4:39 = 279s)
    mainTimeline.duration(279);
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
    timeDisplay.innerText = `${mins}:${secs.toString().padStart(2, '0')} / 4:39`;
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

    // SEQUENCE 1: Floating Stickers (0-45s)
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

    // SEQUENCE 2: Shield / Dot Grid (45-90s)
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

    // SEQUENCE 3: Editorial Grid (90-120s)
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

    // SEQUENCE 4: Label Geometry (120-210s)
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

    // SEQUENCE 5: The Net (210-250s)
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

    // SEQUENCE 6: Bouncing Circles (250s-end)
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
