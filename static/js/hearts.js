function createHeart() {

    const heart = document.createElement("div");

    heart.innerHTML = "💖";

    heart.style.position = "fixed";

    heart.style.left = Math.random() * window.innerWidth + "px";

    heart.style.top = window.innerHeight + "px";

    heart.style.fontSize = (20 + Math.random() * 20) + "px";

    heart.style.pointerEvents = "none";

    heart.style.animation = "floatHeart 6s linear forwards";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);

}

setInterval(createHeart, 600);