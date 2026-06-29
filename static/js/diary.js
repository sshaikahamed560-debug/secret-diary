function saveDiary() {
    // You can later replace this with backend/API call
    alert("📘 Diary Saved Successfully!");

    // Optional: add animation trigger (if you use .fade class)
    const diaryBox = document.querySelector(".diary-container");
    if (diaryBox) {
        diaryBox.classList.add("fade");

        setTimeout(() => {
            diaryBox.classList.remove("fade");
        }, 1000);
    }
}

function deleteDiary() {
    const confirmDelete = confirm("⚠ Are you sure you want to delete this diary?");

    if (confirmDelete) {
        alert("🗑 Diary Deleted Successfully!");

        // Optional: clear content if you have input/textarea
        const input = document.querySelector("textarea, input");
        if (input) {
            input.value = "";
        }

        // Optional animation effect
        const diaryBox = document.querySelector(".diary-container");
        if (diaryBox) {
            diaryBox.classList.add("shake");

            setTimeout(() => {
                diaryBox.classList.remove("shake");
            }, 400);
        }
    }
}