const music = document.getElementById("bgMusic");

function toggleMusic() {

    if (!music) return;

    if (music.paused) {

        music.play();

    } else {

        music.pause();

    }

}