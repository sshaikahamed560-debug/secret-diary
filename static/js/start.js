function createStar() {

    const star = document.createElement("div");

    star.innerHTML = "⭐";

    star.style.position = "fixed";

    star.style.left = Math.random() * window.innerWidth + "px";

    star.style.top = Math.random() * window.innerHeight + "px";

    star.style.fontSize = (8 + Math.random() * 18) + "px";

    star.style.opacity = Math.random();

    star.style.pointerEvents = "none";

    star.style.animation = "starGlow 5s linear";

    document.body.appendChild(star);

    setTimeout(() => {

        star.remove();

    }, 5000);

}

setInterval(createStar, 700);