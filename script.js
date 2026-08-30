// script.js - Interactive Romance Web Application

// State variables
let currentSlide = 0;
const slides = [];
let audio = null;
let isPlaying = false;
let typingInterval = null;

// Select elements
let body;
let contentCard;
let welcomeScreen;
let slidesContainer;
let loveBtn;
let bq;
let kalimatElement;
let pesanAkhirElement;
let audioToggle;
let audioIcon;
let audioSrc;

// Texts
const teksAkhir = "Makasih ya Putri, udah mau ngobrol lagi.\nSenang rasanya bisa komunikasi lagi sama kamu.\nAda satu hal lagi yang mau aku bilang...";
const teksAkhirB = "Nanti pas aku cuti, kita main bareng ya? 😊";

let stickers = [];

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
    // Resolve DOM elements
    body = document.querySelector("body");
    contentCard = document.getElementById("Content");
    welcomeScreen = document.querySelector(".welcome-screen");
    slidesContainer = document.querySelector(".slides-container");
    loveBtn = document.querySelector(".lovein");
    bq = document.getElementById("bq");
    kalimatElement = document.getElementById("kalimat");
    pesanAkhirElement = document.getElementById("pesanAkhir");
    audioToggle = document.querySelector(".audio-toggle");
    audioIcon = document.querySelector(".audio-toggle i");
    audioSrc = document.getElementById("linkmp3").src;

    // Resolve stickers
    stickers = [
        document.getElementById("fotostiker"),  // bunga
        document.getElementById("fotostiker1"), // emawh
        document.getElementById("fotostiker2"), // pandakuning
        document.getElementById("fotostiker3"), // pusn
        document.getElementById("fotostikerA"), // gumush
        document.getElementById("fotostiker2"), // pandakuning (for IT pantun)
        document.getElementById("fotostiker")   // bunga (for final slide)
    ];

    // Initialize Audio
    audio = new Audio(audioSrc);
    audio.loop = true;

    // Load slides from the HTML markup
    const slideElements = document.querySelectorAll("#pergeseran p");
    slideElements.forEach((el, index) => {
        slides.push({
            text: el.querySelector("span").innerHTML,
            sticker: stickers[index] || stickers[0]
        });
    });

    // Set welcome screen opacity & entry animations
    welcomeScreen.style.display = "flex";
    slidesContainer.style.display = "none";
    bq.style.display = "none";

    // Setup Event Listeners
    loveBtn.addEventListener("click", startExperience);
    audioToggle.addEventListener("click", toggleAudio);

    
    // Clicking the container progresses slides when active
    contentCard.addEventListener("click", (e) => {
        // Don't trigger slide click if interactive buttons or audio toggle were clicked
        if (e.target.closest('.interactive-container') || e.target.closest('.audio-toggle') || e.target.closest('.lovein') || e.target.closest('.swal2-popup')) {
            return;
        }
        if (slidesContainer.style.display === "flex") {
            nextSlide();
        }
    });
});

// Start the experience
function startExperience() {
    // Play music
    playAudio();

    // Sparkle explosion at button position
    const btnRect = loveBtn.getBoundingClientRect();
    const btnX = btnRect.left + btnRect.width / 2;
    const btnY = btnRect.top + btnRect.height / 2;
    for (let i = 0; i < 30; i++) {
        createSparkle(btnX + (Math.random() - 0.5) * 60, btnY + (Math.random() - 0.5) * 60);
    }

    // Transition Welcome Screen -> Slides
    welcomeScreen.style.opacity = "0";
    setTimeout(() => {
        welcomeScreen.style.display = "none";
        slidesContainer.style.display = "flex";
        showSlide(0);
        
        // Start falling hearts
        setInterval(createHeart, 300);
    }, 400);
}

// Audio management
function playAudio() {
    audio.play().then(() => {
        isPlaying = true;
        audioToggle.classList.add("playing");
    }).catch(err => {
        console.log("Audio play blocked by browser.");
    });
}

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        audioToggle.classList.remove("playing");
    } else {
        playAudio();
    }
}

// Slide Management
function showSlide(index) {
    if (index >= slides.length) {
        // Reached the end of slides, proceed to typewriter final message
        startFinalSequence();
        return;
    }

    currentSlide = index;

    // Clear previous slide view
    slidesContainer.innerHTML = "";

    // Create current slide elements dynamically for perfect transition
    const slideDiv = document.createElement("div");
    slideDiv.className = "slide active";

    const stickerImg = document.createElement("img");
    stickerImg.src = slides[index].sticker.src;
    stickerImg.className = "slide-stiker";
    
    const textP = document.createElement("p");
    textP.className = "pantun-text";
    textP.innerHTML = slides[index].text;

    slideDiv.appendChild(stickerImg);
    slideDiv.appendChild(textP);
    slidesContainer.appendChild(slideDiv);

    // Dynamic scale/fade entry
    slideDiv.style.opacity = "0";
    slideDiv.style.transform = "scale(0.9) translateY(10px)";
    setTimeout(() => {
        slideDiv.style.opacity = "1";
        slideDiv.style.transform = "scale(1) translateY(0)";
    }, 50);

    // Show slide count or progress indicator silently in hint text
    const hint = document.getElementById("ketgeser");
    if (index === slides.length - 1) {
        hint.innerHTML = "Klik terakhir kali! <i class='fa-solid fa-arrow-right'></i>";
    } else {
        hint.innerHTML = "Klik untuk Geser! <i class='fa-solid fa-arrow-right'></i>";
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Typewriter and Final Screen
function startFinalSequence() {
    // Hide slide UI components
    slidesContainer.style.display = "none";
    document.getElementById("ketgeser").style.display = "none";
    
    // Show final sequence card elements
    bq.style.display = "block";
    
    // Add active class or reset text
    kalimatElement.innerHTML = "";
    pesanAkhirElement.classList.remove("show");
    
    // Start typewriter effect
    let charIndex = 0;
    const formattedText = teksAkhir.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/<br>/g, "\n");
    
    typingInterval = setInterval(() => {
        if (charIndex < formattedText.length) {
            const char = formattedText.charAt(charIndex);
            if (char === "\n") {
                kalimatElement.innerHTML += "<br>";
            } else {
                kalimatElement.innerHTML += char;
            }
            charIndex++;
        } else {
            clearInterval(typingInterval);
            finishFinalSequence();
        }
    }, 45);
}

function finishFinalSequence() {
    // Show subtitle after delay
    setTimeout(() => {
        pesanAkhirElement.innerHTML = teksAkhirB;
        pesanAkhirElement.classList.add("show");
        
        // Show interactive question buttons
        showInteractiveQuestion();
    }, 1000);
}

function showInteractiveQuestion() {
    // Prevent duplicated buttons if already present
    if (document.querySelector(".interactive-container")) return;

    const container = document.createElement("div");
    container.className = "interactive-container";

    const yesBtn = document.createElement("button");
    yesBtn.className = "btn-choice btn-yes";
    yesBtn.innerText = "Mau dong ❤️";

    const noBtn = document.createElement("button");
    noBtn.className = "btn-choice btn-no";
    noBtn.innerText = "Tutup";

    container.appendChild(yesBtn);
    container.appendChild(noBtn);
    bq.appendChild(container);

    // Event listener for "Yes"
    yesBtn.addEventListener("click", handleYesAnswer);

    // Event listener for dodging "No"
    // Mouseenter handles desktop hover, touchstart handles mobile tap attempts
    noBtn.addEventListener("mouseenter", () => dodgeButton(noBtn));
    noBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        dodgeButton(noBtn);
    });
}

// Make the "No" button jump to a random location inside the card bounding box
function dodgeButton(btn) {
    const cardRect = contentCard.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    // Padding to prevent escaping the boundaries
    const padding = 15;
    
    // Calculate max bounds relative to the button's offset parent container
    const parentContainer = btn.parentElement;
    const parentRect = parentContainer.getBoundingClientRect();

    // Generate random coordinate position relative to parent container
    const maxLeft = parentRect.width - btnRect.width - padding;
    const maxTop = 150; // Allow moving up or down within visual range
    const minTop = -100;

    const newLeft = Math.floor(Math.random() * maxLeft);
    const newTop = Math.floor(Math.random() * (maxTop - minTop)) + minTop;

    // Apply styles to break flow and reposition
    btn.style.position = "absolute";
    btn.style.left = `${newLeft}px`;
    btn.style.top = `${newTop}px`;
    btn.style.transition = "all 0.15s ease-out";
}

function handleYesAnswer() {
    // Sparkle explosion!
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const x = window.innerWidth / 2 + (Math.random() - 0.5) * 250;
            const y = window.innerHeight / 2 + (Math.random() - 0.5) * 250;
            createSparkle(x, y);
        }, i * 20);
    }

    // Show SweetAlert celebration popup (non-alay romantic version using "aku")
    Swal.fire({
        title: 'Yeay! 😊',
        text: 'Aku senang dengarnya. Makasih banyak ya, Putri. Semoga ke depannya obrolan kita makin seru. ✨',
        imageUrl: stickers[4].src,
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'Gumush Cute Sticker',
        confirmButtonText: 'Oke, deal! 👍',
        backdrop: `rgba(255, 101, 132, 0.2)`
    }).then(() => {
        // Trigger extra continuous hearts shower and sparkle burst
        for (let i = 0; i < 50; i++) {
            setTimeout(createHeart, i * 60);
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createSparkle(x, y);
            }, i * 60);
        }
    });
}

// Particle heart rain generator (FontAwesome)
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "fa-solid fa-heart";
    
    // Random position and scaling
    const startX = Math.random() * 100;
    const size = Math.random() * 1.2 + 0.6; // Scale multiplier (0.6x to 1.8x)
    const duration = Math.random() * 2.5 + 2.5; // 2.5s to 5s
    const opacity = Math.random() * 0.6 + 0.4;

    heart.style.left = `${startX}vw`;
    heart.style.transform = `scale(${size})`;
    heart.style.opacity = `${opacity}`;
    heart.style.animationDuration = `${duration}s`;
    
    // Variations of pink and red shades
    const colors = ["#ff4a76", "#ff7597", "#ff2e63", "#ff5c8a", "#ff007f", "#d90429"];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Sparkle Trail Generator
function createSparkle(x, y) {
    if (document.querySelectorAll('.sparkle').length > 30) return;

    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    
    // Mix of elegant symbols
    const symbols = ["✦", "♥", "★", "✧", "•"];
    sparkle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    const dx = (Math.random() - 0.5) * 80;
    const dy = (Math.random() - 0.5) * 80 - 20; // Float slightly upwards
    const scale = Math.random() * 0.6 + 0.4;
    const rot = Math.random() * 360;
    
    sparkle.style.setProperty('--dx', `${dx}px`);
    sparkle.style.setProperty('--dy', `${dy}px`);
    sparkle.style.setProperty('--scale', scale);
    sparkle.style.setProperty('--rot', `${rot}deg`);
    
    const colors = ["#e56b6f", "#ea8c8f", "#b56576", "#ffb7b2", "#ffdac1", "#ffffff"];
    sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    const container = document.getElementById("sparkle-container");
    if (container) {
        container.appendChild(sparkle);
    }
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Bind Sparkle Trail Listeners
let lastMove = 0;
document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastMove < 30) return; // Throttle trail to keep it smooth
    lastMove = now;
    createSparkle(e.clientX, e.clientY);
});

document.addEventListener("touchmove", (e) => {
    const now = Date.now();
    if (now - lastMove < 30) return;
    lastMove = now;
    if (e.touches && e.touches[0]) {
        createSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
});

// Sparkle Burst on general clicks
document.addEventListener("click", (e) => {
    // Avoid triggering multiple sparkle bubbles on specific interactive elements to keep clean
    if (e.target.closest('.lovein') || e.target.closest('.btn-choice')) return;
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createSparkle(e.clientX + (Math.random() - 0.5) * 30, e.clientY + (Math.random() - 0.5) * 30);
        }, i * 20);
    }
});
