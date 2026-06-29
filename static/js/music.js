const music = document.getElementById("bgMusic");

// Restore state when page loads
window.addEventListener("load", async () => {
    const isPlaying = localStorage.getItem("musicPlaying") === "true";
    const savedTime = localStorage.getItem("musicTime");

    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    music.volume = 0.5;

    if (isPlaying) {
        try {
            await music.play();
        } catch (e) {
            console.log("Autoplay blocked");
        }
    }
});

// Save state continuously
setInterval(() => {
    if (!music.paused) {
        localStorage.setItem("musicTime", music.currentTime);
    }
}, 1000);

// Detect play/pause state
music.addEventListener("play", () => {
    localStorage.setItem("musicPlaying", "true");
});

music.addEventListener("pause", () => {
    localStorage.setItem("musicPlaying", "false");
});

// FIRST USER INTERACTION fallback (required by browser)
document.addEventListener("click", () => {
    music.play().catch(() => { });
}, { once: true });