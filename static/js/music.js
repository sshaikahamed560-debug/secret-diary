const music = document.getElementById("bgMusic");

// Restore state immediately
window.addEventListener("pageshow", async () => {
    const isPlaying = sessionStorage.getItem("musicPlaying") === "true";
    const savedTime = sessionStorage.getItem("musicTime");

    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    music.volume = 0.5;

    if (isPlaying) {
        try {
            await music.play();
        } catch (e) {
            console.log("Autoplay blocked on back navigation");
        }
    }
});

// Save progress continuously
setInterval(() => {
    if (!music.paused) {
        sessionStorage.setItem("musicTime", music.currentTime);
    }
}, 800);

// Track play state
music.addEventListener("play", () => {
    sessionStorage.setItem("musicPlaying", "true");
});

music.addEventListener("pause", () => {
    sessionStorage.setItem("musicPlaying", "false");
});

// First interaction fallback
document.addEventListener("click", () => {
    music.play().catch(() => { });
}, { once: true });

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        music.play().catch(() => { });
    }
});