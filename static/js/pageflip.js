const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const songs = [

    {
        title: "Song 💖",
        file: "/static/music/song1.mp3",
        cover: "/static/images/album1.jpg"
    },

    {
        title: "Song ❤️",
        file: "/static/music/song2.mp3",
        cover: "/static/images/album2.jpg"
    },

    {
        title: "Beautiful Memories 🌸",
        file: "/static/music/song3.mp3",
        cover: "/static/images/album3.jpg"
    }

];

let current = 0;

function loadSong() {

    audio.src = songs[current].file;

    cover.src = songs[current].cover;

    document.getElementById("title").innerHTML = songs[current].title;

}

function playPause() {

    if (audio.paused) {

        audio.play();

        playBtn.innerHTML = "⏸";

        cover.style.animationPlayState = "running";

    } else {

        audio.pause();

        playBtn.innerHTML = "▶";

        cover.style.animationPlayState = "paused";

    }

}

function nextSong() {

    current++;

    if (current >= songs.length) {

        current = 0;

    }

    loadSong();

    audio.play();

    playBtn.innerHTML = "⏸";

    cover.style.animationPlayState = "running";

}

function previousSong() {

    current--;

    if (current < 0) {

        current = songs.length - 1;

    }

    loadSong();

    audio.play();

    playBtn.innerHTML = "⏸";

    cover.style.animationPlayState = "running";

}

audio.addEventListener("timeupdate", () => {

    progress.value = (audio.currentTime / audio.duration) * 100 || 0;

});

progress.addEventListener("input", () => {

    audio.currentTime = (progress.value / 100) * audio.duration;

});

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

loadSong();