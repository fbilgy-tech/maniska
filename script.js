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

const finalSweetNote = `Terima kasih banyak ya Maniska sudah meluangkan waktu membaca catatan kecil ini sampai selesai.\n\nAku sangat senang bisa saling kenal dan bertukar kabar sama kamu.`;
const finalQuestionText = "Kalau nanti waktu cutiku sudah tiba, boleh ya kita jalan dan ngobrol santai bareng? 😊";

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
// 5. POLITE & SUBTLE BUTTON INTERACTION
// ========================================================
const dodgeMessages = [
    "Dipikir-pikir lagi ya...",
    "Beneran gak mau nih? 🙂",
    "Pencet yang sebelah kiri aja ya",
    "Yuk jalan bareng nanti",
    "Tombol ini pemalu..."
];

function dodgeButton(e) {
    if (e) e.preventDefault();
    appState.dodgeCount++;

    const btn = el.btnNo;
    const card = el.contentCard;
    if (!btn || !card) return;

    const cardRect = card.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxX = (cardRect.width - btnRect.width) * 0.45;
    const randomX = (Math.random() - 0.5) * maxX * 1.6;
    const randomY = (Math.random() - 0.5) * 80;

    btn.style.position = "relative";
    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    btn.style.transition = "all 0.22s ease";

    btn.innerText = dodgeMessages[appState.dodgeCount % dodgeMessages.length];
}

function handleYes() {
    if (el.ticketModal) {
        el.ticketModal.style.display = "flex";
    }
}

function shareViaWhatsApp() {
    const text = encodeURIComponent("Hai! Aku sudah baca catatannya. Boleh, nanti pas kamu cuti kita jalan dan ngobrol santai bareng ya! 😊");
    window.open(`https://wa.me/6283123826063?text=${text}`, "_blank");
}

// ========================================================
// 6. EVENT BINDINGS
// ========================================================
function bindEvents() {
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
}
