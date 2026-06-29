function openModal(src) {

    document.getElementById("photoModal").style.display = "flex";

    document.getElementById("modalImage").src = src;

}

function closeModal() {

    document.getElementById("photoModal").style.display = "none";

}

function toggleLike(btn) {

    if (btn.innerHTML == "❤") {

        btn.innerHTML = "💖";

        btn.style.background = "#ff4f8b";

        btn.style.color = "white";

    }
    else {

        btn.innerHTML = "❤";

        btn.style.background = "white";

        btn.style.color = "black";

    }

}

const search = document.getElementById("searchInput");

if (search) {

    search.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".photo-card").forEach(card => {

            card.style.display = card.innerText.toLowerCase().includes(value)

                ? "inline-block" : "none";

        });

    });

}