// ⚠️ CHANGE THE NAME HERE ⚠️
const HER_NAME = "Bianca";  // 👈 Replace "Beautiful" with her actual name

// ⚠️ CHANGE THE UNLOCK CODE HERE ⚠️
const UNLOCK_CODE = "2019-2026";  // 👈 Replace with your desired unlock code

// Crash variable - uses localStorage to persist across page reloads
let crash = localStorage.getItem('crash') === 'true';

// Set the name on page load
document.addEventListener('DOMContentLoaded', function() {
    const herNameEl = document.getElementById('herName');
    if (herNameEl) {
        herNameEl.textContent = HER_NAME;
    }
    createFloatingHearts();
    
    // Check if system has crashed, if so, show maintenance page directly
    if (crash) {
        document.getElementById('maintenancePage').style.display = 'flex';
        document.getElementById('birthdayPage').style.display = 'none';
        document.getElementById('codeUnlockPage').style.display = 'none';
        document.getElementById('proposalPage').style.display = 'none';
    } else {
        // Show birthday page first
        document.getElementById('birthdayPage').style.display = 'flex';
        document.getElementById('proposalPage').style.display = 'none';
        document.getElementById('codeUnlockPage').style.display = 'none';
        document.getElementById('maintenancePage').style.display = 'none';
        
        // Birthday button handler
        document.getElementById('birthdayBtn').addEventListener('click', function() {
            document.getElementById('birthdayPage').style.display = 'none';
            document.getElementById('codeUnlockPage').style.display = 'flex';
            startCodeUnlock();
        });
    }
    
    // Auto-play music
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.play().catch(err => {
        console.log('Autoplay prevented:', err);
    });
});

function startCodeUnlock() {
    const codeInput = document.getElementById('codeInput');
    const unlockBtn = document.getElementById('unlockBtn');
    const codeError = document.getElementById('codeError');
    
    // Allow Enter key to unlock
    codeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyCode();
        }
    });
    
    unlockBtn.addEventListener('click', function() {
        verifyCode();
    });
    
    function verifyCode() {
        const enteredCode = codeInput.value.trim().toUpperCase();
        
        if (enteredCode === UNLOCK_CODE.toUpperCase()) {
            // Code is correct!
            codeError.style.display = 'none';
            codeInput.style.display = 'none';
            unlockBtn.style.display = 'none';
            
            // Show success message and transition to proposal page
            const unlockContent = document.querySelector('.unlock-content');
            unlockContent.innerHTML = `
                <div class="unlock-heart-animation">💕</div>
                <h1>Correct! 🎉</h1>
                <p>You unlocked your special message...</p>
            `;
            
            // Transition to proposal page after 2 seconds
            setTimeout(function() {
                document.getElementById('codeUnlockPage').style.display = 'none';
                document.getElementById('proposalPage').style.display = 'block';
                startProposalPage();
            }, 2000);
        } else {
            // Code is incorrect - set crash to true
            crash = true;
            localStorage.setItem('crash', 'true');
            
            // Show maintenance page
            document.getElementById('codeUnlockPage').style.display = 'none';
            document.getElementById('maintenancePage').style.display = 'flex';
        }
    }
}

function startProposalPage() {
    const continueBtn = document.getElementById('continueBtn');
    
    continueBtn.addEventListener('click', function() {
        window.location.href = 'Love-Proposal-main/index.html';
    });
}

function oldStartProposalPage() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const responseMessage = document.getElementById('responseMessage');

    let noBtnClickCount = 0;
    const noMessages = [
        "Are you sure? 🥺",
        "Please reconsider! 💔",
        "Think about it... 🤔",
        "Don't break my heart! 💔",
        "Give me a chance! 🙏",
        "Pretty please? 🥺👉👈",
        "I'll be the best boyfriend ever! 🌟",
        "Just click Yes! It's right there! 👉",
        "The Yes button is looking lonely... 😢",
        "Okay fine, but I'll keep asking! 😤"
    ];

    // Yes button click handler
    yesBtn.addEventListener('click', function() {
        responseMessage.innerHTML = `🎉 Yay! I'm the happiest person alive! 🎉<br>I promise to make you smile every day! 💖`;
        responseMessage.classList.add('success');
        
        // Hide buttons
        document.querySelector('.button-container').style.display = 'none';
        
        // Launch fireworks
        launchFireworks();
        
        // Create more floating hearts
        for(let i = 0; i < 30; i++) {
            setTimeout(createFloatingHearts, i * 100);
        }
        
        // Confetti effect
        confetti();
    });

    // No button click handler with moving button
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        noBtnClickCount++;
        
        if (noBtnClickCount < noMessages.length) {
            responseMessage.textContent = noMessages[noBtnClickCount - 1];
            responseMessage.style.color = '#d63031';
        }
        
        // Make the No button smaller and Yes button bigger
        const yesCurrentSize = window.getComputedStyle(yesBtn).fontSize;
        const yesSize = parseFloat(yesCurrentSize);
        yesBtn.style.fontSize = (yesSize + 0.1) + 'px';
        yesBtn.style.transform = `scale(${1 + noBtnClickCount * 0.1})`;
        
        const noCurrentSize = window.getComputedStyle(noBtn).fontSize;
        const noSize = parseFloat(noCurrentSize);
        if (noSize > 8) {
            noBtn.style.fontSize = (noSize - 1) + 'px';
        }
        
        // Move the No button to a random position
        const container = document.querySelector('.button-container');
        const containerRect = container.getBoundingClientRect();
        
        const maxX = containerRect.width - noBtn.offsetWidth;
        const maxY = 100;
        
        const randomX = Math.random() * maxX - maxX / 2;
        const randomY = Math.random() * maxY - maxY / 2;
        
        noBtn.style.position = 'relative';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // After many clicks, make it almost impossible to click No
        if (noBtnClickCount > 5) {
            noBtn.style.opacity = '0.3';
            noBtn.style.cursor = 'not-allowed';
        }
    });
}

// Floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 30 + 20 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.opacity = '0.7';
            heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear forwards`;
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 7000);
        }, i * 300);
    }
}

// Add float up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Fireworks effect
function launchFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    const colors = ['#ff6b9d', '#ff0844', '#ffeaa7', '#fdcb6e', '#a29bfe', '#fd79a8'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.5;
            
            for (let j = 0; j < 30; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                const angle = (Math.PI * 2 * j) / 30;
                const velocity = 50 + Math.random() * 100;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;
                
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                
                fireworksContainer.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 1000);
            }
        }, i * 200);
    }
}

// Confetti effect
function confetti() {
    const colors = ['#ff6b9d', '#ff0844', '#ffeaa7', '#fdcb6e', '#a29bfe', '#fd79a8', '#00b894'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.zIndex = '999';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const xMovement = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { 
                transform: `translateY(0) translateX(0) rotate(0deg)`,
                opacity: 1 
            },
            { 
                transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${Math.random() * 720}deg)`,
                opacity: 0 
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}