const stickers = ["🐻", "🐱", "🐰", "🌸", "⭐"];

function createSticker() {

    const s = document.createElement("div");

    s.className = "star";

    s.innerHTML = stickers[Math.floor(Math.random() * stickers.length)];

    s.style.left = Math.random() * 100 + "vw";

    s.style.fontSize = (20 + Math.random() * 20) + "px";

    document.body.appendChild(s);

    setTimeout(() => {

        s.remove();

    }, 7000);

}

setInterval(createSticker, 1000);

const stickers = [
    "/static/stickers/bunny.png",
    "/static/stickers/cat.png",
    "/static/stickers/bear.png"
];

function createSticker() {

    const img = document.createElement("img");

    img.src = stickers[Math.floor(Math.random() * stickers.length)];

    img.className = "floatingSticker";

    img.style.left = Math.random() * window.innerWidth + "px";

    img.style.top = window.innerHeight + "px";

    document.body.appendChild(img);

    setTimeout(() => {

        img.remove();

    }, 12000);

}

setInterval(createSticker, 2500);