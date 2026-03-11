// ====== CONFIG ======
const HER_NAME = "Bianca";
const UNLOCK_CODE = "2019-2026";

// ====== STATE ======
let currentPage = 'welcomePage';

// ====== PAGE NAVIGATION ======
function showPage(pageId) {
    // Hide current page
    const currentElement = document.getElementById(currentPage);
    if (currentElement) {
        currentElement.classList.remove('active');
    }
    
    // Show new page
    const newElement = document.getElementById(pageId);
    if (newElement) {
        newElement.classList.add('active');
        currentPage = pageId;
        
        // Scroll to top
        newElement.scrollTop = 0;
        
        // Handle audio based on page
        handleAudio(pageId);
    }
}

// ====== AUDIO MANAGEMENT ======
function handleAudio(pageId) {
    const birthdayMusic = document.getElementById('birthdayMusic');
    const bgMusic = document.getElementById('bgMusic');
    
    if (pageId === 'birthdayPage') {
        // Play birthday music during birthday page
        if (birthdayMusic) {
            birthdayMusic.muted = false;
            birthdayMusic.currentTime = 0;
            birthdayMusic.play().catch(err => console.log('Birthday music play prevented'));
        }
        if (bgMusic) {
            bgMusic.pause();
        }
    } else if (pageId === 'codeUnlockPage') {
        // Stop birthday music, keep silence
        if (birthdayMusic) {
            birthdayMusic.pause();
        }
        if (bgMusic) {
            bgMusic.muted = true;
        }
    } else if (pageId === 'proposalPage') {
        // Play background music on proposal page
        if (birthdayMusic) {
            birthdayMusic.pause();
        }
        if (bgMusic) {
            bgMusic.muted = false;
            bgMusic.play().catch(err => console.log('Background music play prevented'));
        }
    }
}

// ====== CODE VERIFICATION ======
function verifyCode() {
    const codeInput = document.getElementById('codeInput');
    const enteredCode = codeInput.value.trim().toUpperCase();
    const codeError = document.getElementById('codeError');
    
    if (enteredCode === UNLOCK_CODE.toUpperCase()) {
        // Correct code!
        codeError.style.display = 'none';
        codeInput.style.display = 'none';
        document.querySelector('#codeUnlockPage .btn-primary').style.display = 'none';
        
        // Show success message
        const content = document.querySelector('#codeUnlockPage .page-content');
        const originalHTML = content.innerHTML;
        content.innerHTML = `
            <div class="emoji-xl">💕</div>
            <h1>Correct! 🎉</h1>
            <p>You unlocked your special message...</p>
        `;
        
        // Transition to proposal page
        setTimeout(() => {
            content.innerHTML = originalHTML;
            codeInput.style.display = 'block';
            document.querySelector('#codeUnlockPage .btn-primary').style.display = 'block';
            codeInput.value = '';
            showPage('proposalPage');
        }, 2000);
    } else {
        // Incorrect code
        codeError.style.display = 'block';
        codeInput.value = '';
        codeInput.focus();
    }
}

// ====== TRANSITIONS ======
function continueToCouplePage() {
    const bgMusic = document.getElementById('bgMusic');
    
    // Save music state
    if (bgMusic && !isNaN(bgMusic.currentTime)) {
        localStorage.setItem('musicCurrentTime', bgMusic.currentTime);
    }
    localStorage.setItem('musicPlaying', 'true');
    
    // Navigate to couple page
    window.location.href = 'Love-Proposal-main/index.html';
}

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', function() {
    // Set the name
    const herNameEl = document.getElementById('herName');
    if (herNameEl) {
        herNameEl.textContent = HER_NAME;
    }
    
    // Initialize first page
    showPage('welcomePage');
    
    // Allow Enter key for code input
    document.getElementById('codeInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyCode();
        }
    });
});
