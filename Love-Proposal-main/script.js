function getJSOrganization() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('name') || "Love";
}

const JSOrganization = getJSOrganization();

function showProposal(id) {
    document.querySelectorAll('.proposal-screen').forEach(screen => screen.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if (id === 'proposal-yes') {
        document.body.style.backgroundColor = '#ffecf0';
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
}

function moveRandomEl(element) {
    element.style.position = "absolute";
    element.style.top = Math.floor(Math.random() * 90 + 5) + "%";
    element.style.left = Math.floor(Math.random() * 90 + 5) + "%";
}

document.addEventListener('DOMContentLoaded', () => {
    // Set names
    document.querySelectorAll('[id^="JSOrganization-placeholder"]').forEach(el => {
        el.textContent = JSOrganization;
    });
    
    // Show first proposal
    showProposal('proposal-1');
    
    // Resume music if coming from previous page
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && localStorage.getItem('musicPlaying') === 'true') {
        bgMusic.play().catch(err => {
            console.log('Music play error:', err);
        });
        localStorage.removeItem('musicPlaying');
    }
    
    // Setup move-random button
    const moveRandomBtn = document.getElementById('move-random');
    if (moveRandomBtn) {
        moveRandomBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveRandomEl(moveRandomBtn);
        });
        moveRandomBtn.addEventListener('mouseenter', () => {
            moveRandomEl(moveRandomBtn);
        });
    }
});
