/**
 * script.js - Clean, Modern Editorial Romance Engine
 * Curated for Maniska
 */

// Application State
const appState = {
    currentSlide: 0,
    totalSlides: 0,
    isPlaying: false,
    dodgeCount: 0
};

// Data Structures
let slidesData = [];
let audioEl = null;

// DOM Cache
let el = {};

// ========================================================
// 1. INITIALIZATION & CACHE
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
    cacheDom();
    initAudio();
    initSlides();
    bindEvents();
});

function cacheDom() {
    el = {
        body: document.body,
        contentCard: document.getElementById("Content"),
        welcomeScreen: document.querySelector(".welcome-screen"),
        slidesWrapper: document.querySelector(".slides-wrapper"),
        slidesContainer: document.querySelector(".slides-container"),
        progressFill: document.getElementById("progress-fill"),
        stepBadge: document.getElementById("step-badge"),
        prevBtn: document.getElementById("prev-slide-btn"),
        nextBtn: document.getElementById("next-slide-btn"),
        hintGeser: document.getElementById("ketgeser"),
        bq: document.getElementById("bq"),
        kalimat: document.getElementById("kalimat"),
        pesanAkhir: document.getElementById("pesanAkhir"),
        btnStart: document.getElementById("btn-start"),
        btnYes: document.getElementById("btn-yes"),
        btnNo: document.getElementById("btn-no"),
        choiceContainer: document.getElementById("choice-container"),
        audioToggleBtn: document.getElementById("audio-toggle-btn"),
        ticketModal: document.getElementById("ticket-modal"),
        closeTicketBtn: document.getElementById("close-ticket-btn"),
        btnCloseTicket: document.getElementById("btn-close-ticket"),
        btnShareWa: document.getElementById("btn-share-wa")
    };
}

// ========================================================
// 2. AUDIO MANAGEMENT (1.mp3 Local Engine)
// ========================================================
function initAudio() {
    audioEl = document.getElementById("linkmp3");
    if (!audioEl) return;

    audioEl.addEventListener("play", () => {
        appState.isPlaying = true;
        if (el.audioToggleBtn) el.audioToggleBtn.classList.add("playing");
        const statusText = document.querySelector(".music-status");
        if (statusText) statusText.innerText = "Sedang diputar";
    });

    audioEl.addEventListener("pause", () => {
        appState.isPlaying = false;
        if (el.audioToggleBtn) el.audioToggleBtn.classList.remove("playing");
        const statusText = document.querySelector(".music-status");
        if (statusText) statusText.innerText = "Klik untuk memutar";
    });
}

function playTrack() {
    if (audioEl) {
        audioEl.play().catch(() => {
            console.log("Audio playback prevented by browser autoplay policy.");
        });
    }
}

function pauseTrack() {
    if (audioEl) {
        audioEl.pause();
    }
}

function toggleAudio() {
    if (appState.isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

// ========================================================
// 3. SLIDES STORY ENGINE
// ========================================================
function initSlides() {
    const rawNodes = document.querySelectorAll("#pergeseran > div");
    slidesData = [];

    rawNodes.forEach((node) => {
        const stickerId = node.getAttribute("data-sticker") || "fotostiker";
        const stickerEl = document.getElementById(stickerId) || document.getElementById("fotostiker");
        const heading = node.querySelector(".slide-heading") ? node.querySelector(".slide-heading").innerHTML : "";
        const body = node.querySelector(".slide-body") ? node.querySelector(".slide-body").innerHTML : "";

        slidesData.push({
            stickerSrc: stickerEl ? stickerEl.src : "https://feeldreams.github.io/bunga.gif",
            heading: heading,
            body: body
        });
    });

    appState.totalSlides = slidesData.length;
}

function updateProgress(index) {
    const progress = ((index + 1) / appState.totalSlides) * 100;
    if (el.progressFill) el.progressFill.style.width = `${progress}%`;
    if (el.stepBadge) el.stepBadge.innerText = `0${index + 1} / 0${appState.totalSlides}`;

    if (el.prevBtn) el.prevBtn.disabled = index === 0;
    if (el.nextBtn) {
        el.nextBtn.innerHTML = index === appState.totalSlides - 1
            ? '<i class="fa-solid fa-envelope-open-text"></i>'
            : '<i class="fa-solid fa-chevron-right"></i>';
    }

    if (el.hintGeser) {
        el.hintGeser.innerHTML = index === appState.totalSlides - 1
            ? '<span>Baca Pesan Terakhir</span> <i class="fa-solid fa-arrow-right"></i>'
            : '<span>Lanjut</span> <i class="fa-solid fa-chevron-right"></i>';
    }
}

function renderSlide(index) {
    if (index < 0 || index >= appState.totalSlides) return;
    appState.currentSlide = index;
    updateProgress(index);

    const data = slidesData[index];
    el.slidesContainer.innerHTML = "";

    const slideWrap = document.createElement("div");
    slideWrap.className = "slide-item-wrap";

    slideWrap.innerHTML = `
        <img src="${data.stickerSrc}" class="slide-sticker-media" alt="Illustration" />
        <h3 class="slide-heading">${data.heading}</h3>
        ${data.body ? `<p class="slide-body">${data.body}</p>` : ''}
    `;

    el.slidesContainer.appendChild(slideWrap);

    slideWrap.style.opacity = "0";
    slideWrap.style.transform = "translateY(8px)";
    setTimeout(() => {
        slideWrap.style.opacity = "1";
        slideWrap.style.transform = "translateY(0)";
    }, 30);
}

function nextSlide() {
    if (appState.currentSlide < appState.totalSlides - 1) {
        renderSlide(appState.currentSlide + 1);
    } else {
        startFinalSequence();
    }
}

function prevSlide() {
    if (appState.currentSlide > 0) {
        renderSlide(appState.currentSlide - 1);
    }
}

// ========================================================
// 4. TRANSITIONS & FINAL INVITATION
// ========================================================
function startExperience() {
    playTrack();

    el.welcomeScreen.style.opacity = "0";
    el.welcomeScreen.style.transform = "translateY(-6px)";

    setTimeout(() => {
        el.welcomeScreen.style.display = "none";
        el.slidesWrapper.style.display = "flex";
        renderSlide(0);
    }, 280);
}

const finalSweetNote = `Maniska, makasih banyak yaa udah hadir dan bikin hari-hariku jadi jauh lebih berwarna.\n\nAku gamau kita cuma sekadar temenan doang... Aku pengen jadi orang spesial yang selalu ada buat kamu.`;
const finalQuestionText = "Maniska, kamu mau nggak jadi pacar aku? ❤️";

function startFinalSequence() {
    el.slidesWrapper.style.opacity = "0";

    setTimeout(() => {
        el.slidesWrapper.style.display = "none";
        el.bq.style.display = "flex";
        el.bq.style.opacity = "1";

        typewriterLoveMessage();
    }, 280);
}

function typewriterLoveMessage() {
    el.kalimat.innerHTML = "";
    el.pesanAkhir.classList.remove("show");

    let charIdx = 0;
    const formatted = finalSweetNote.replace(/\r\n/g, "\n");

    const timer = setInterval(() => {
        if (charIdx < formatted.length) {
            const char = formatted.charAt(charIdx);
            if (char === "\n") {
                el.kalimat.innerHTML += "<br>";
            } else {
                el.kalimat.innerHTML += char;
            }
            charIdx++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                el.pesanAkhir.innerText = finalQuestionText;
                el.pesanAkhir.classList.add("show");
            }, 350);
        }
    }, 25);
}

// ========================================================
// 5. PLAYFUL INTERACTIVE BUTTON DODGE
// ========================================================
const dodgeMessages = [
    "Ih yakin nih gamau? 🥺",
    "Pencet yang kiri dong pliss 💕",
    "Jangan ditolak dong Maniskaa 😭",
    "Pikir-pikir lagi yuk sayang 🥰",
    "Tombol ini rusak wkwk 😜",
    "Hatiku cuma buat kamu lho! ❤️",
    "Nggak boleh nolak pokoknya hehe 😚",
    "Ayo dong bilang mau ✨"
];

function dodgeButton(e) {
    if (e) e.preventDefault();
    appState.dodgeCount++;

    const btn = el.btnNo;
    const card = el.contentCard;
    if (!btn || !card) return;

    const cardRect = card.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxX = (cardRect.width - btnRect.width) * 0.42;
    const randomX = (Math.random() - 0.5) * maxX * 1.6;
    const randomY = (Math.random() - 0.5) * 80;

    btn.style.position = "relative";
    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    btn.style.transition = "all 0.22s ease";

    btn.innerText = dodgeMessages[appState.dodgeCount % dodgeMessages.length];

    // Every time she dodges, the 'Yes' button grows bigger and more enticing!
    if (el.btnYes) {
        const scale = 1 + Math.min(appState.dodgeCount * 0.07, 0.45);
        el.btnYes.style.transform = `scale(${scale})`;
    }
}

function handleYes() {
    triggerCelebration();
    if (el.ticketModal) {
        el.ticketModal.style.display = "flex";
    }
}

function shareViaWhatsApp() {
    const text = encodeURIComponent("Hai! Aku udah baca semuanya di website... Dan jawabanku: Mau kok jadi pacar kamu! Mulai sekarang kita resmi yaa! ❤️🥰");
    window.open(`https://wa.me/6283123826063?text=${text}`, "_blank");
}

// ========================================================
// 6. ROMANTIC CONFETTI & FLOATING HEARTS ENGINE
// ========================================================
function initFloatingHearts() {
    const container = document.getElementById("hearts-bg");
    if (!container) return;

    const heartSymbols = ["❤️", "💖", "💕", "✨", "🤍", "🌙", "⭐", "🌸"];

    setInterval(() => {
        if (document.hidden) return;
        const heart = document.createElement("span");
        heart.className = "floating-heart";
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        const leftPos = Math.random() * 100;
        const size = 14 + Math.random() * 18;
        const duration = 6 + Math.random() * 6;

        heart.style.left = `${leftPos}%`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }, 550);
}

function triggerCelebration() {
    const canvas = document.getElementById("celebration-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#ff2a6d", "#ff758f", "#c77dff", "#ffd166", "#00f5d4", "#ff99c8", "#ffffff", "#e02e6c"];

    for (let i = 0; i < 90; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 16,
            vy: (Math.random() - 0.7) * 18,
            size: 6 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            opacity: 1,
            isHeart: Math.random() > 0.4
        });
    }

    let animationFrame;
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35; // gravity
            p.vx *= 0.98;
            p.rotation += p.rotSpeed;
            p.opacity -= 0.009;

            if (p.opacity > 0) {
                alive = true;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = Math.max(0, p.opacity);

                if (p.isHeart) {
                    ctx.font = `${p.size * 2}px sans-serif`;
                    ctx.fillText("❤️", -p.size, p.size);
                } else {
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                }
                ctx.restore();
            }
        });

        if (alive) {
            animationFrame = requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    render();
}

// ========================================================
// 7. EVENT BINDINGS
// ========================================================
function bindEvents() {
    initFloatingHearts();

    if (el.btnStart) el.btnStart.addEventListener("click", startExperience);
    if (el.prevBtn) el.prevBtn.addEventListener("click", prevSlide);
    if (el.nextBtn) el.nextBtn.addEventListener("click", nextSlide);
    if (el.hintGeser) el.hintGeser.addEventListener("click", nextSlide);
    if (el.audioToggleBtn) el.audioToggleBtn.addEventListener("click", toggleAudio);

    if (el.btnYes) el.btnYes.addEventListener("click", handleYes);
    if (el.btnNo) {
        el.btnNo.addEventListener("mouseenter", dodgeButton);
        el.btnNo.addEventListener("touchstart", dodgeButton);
        el.btnNo.addEventListener("click", dodgeButton);
    }

    if (el.closeTicketBtn) el.closeTicketBtn.addEventListener("click", () => el.ticketModal.style.display = "none");
    if (el.btnCloseTicket) el.btnCloseTicket.addEventListener("click", () => el.ticketModal.style.display = "none");
    if (el.btnShareWa) el.btnShareWa.addEventListener("click", shareViaWhatsApp);

    document.addEventListener("keydown", (e) => {
        if (el.slidesWrapper && el.slidesWrapper.style.display === "flex") {
            if (e.key === "ArrowRight" || e.key === " ") nextSlide();
            else if (e.key === "ArrowLeft") prevSlide();
        }
    });

    window.addEventListener("resize", () => {
        const canvas = document.getElementById("celebration-canvas");
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
}
