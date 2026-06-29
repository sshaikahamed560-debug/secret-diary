setInterval(() => {

    const heart = document.createElement("div");

    heart.innerHTML = "💖";

    heart.style.position = "fixed";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.bottom = "-50px";

    heart.style.fontSize = (20 + Math.random() * 20) + "px";

    heart.style.animation = "floatUp 6s linear";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 6000);

}, 500);