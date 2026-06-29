let entered = "";

function press(num) {

    if (entered.length >= 4) return;

    entered += num;

    updateDots();

}

function clearPin() {

    entered = entered.slice(0, -1);

    updateDots();

}

function updateDots() {

    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot, index) => {

        if (index < entered.length) {

            dot.style.background = "hotpink";

        } else {

            dot.style.background = "white";

        }

    });

}

function submitPin() {

    fetch("/verify_pin", {

        method: "POST",

        headers: {

            "Content-Type": "application/x-www-form-urlencoded"

        },

        body: "pin=" + entered

    })

        .then(res => res.json())

        .then(data => {

            if (data.success) {

                document.getElementById("message").innerHTML = "💖 Welcome!";

                setTimeout(() => {

                    window.location = "/home";

                }, 700);

            }

            else {

                document.querySelector(".lock-card").classList.add("shake");

                document.getElementById("message").innerHTML = "❌ Wrong PIN";

                setTimeout(() => {

                    document.querySelector(".lock-card").classList.remove("shake");

                    entered = "";

                    updateDots();

                }, 500);

            }

        });

}