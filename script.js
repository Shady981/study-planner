// =========================================
// DARK MODE
// =========================================

const themeToggle =
    document.getElementById("themeToggle");

// Load Theme From LocalStorage

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "☀️";

}

// Toggle Theme

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    // Save Theme

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

        themeToggle.textContent = "☀️";

    } else {

        localStorage.setItem("theme", "light");

        themeToggle.textContent = "🌙";

    }

});

// =========================================
// CHECKBOXES + LOCAL STORAGE
// =========================================

// Get All Checkboxes

const checkboxes =
    document.querySelectorAll('input[type="checkbox"]');

// Load Saved State

checkboxes.forEach((checkbox, index) => {

    const savedState =
        localStorage.getItem(`checkbox-${index}`);

    if (savedState === "true") {

        checkbox.checked = true;

    }

    // Save On Change

    checkbox.addEventListener("change", () => {

        localStorage.setItem(
            `checkbox-${index}`,
            checkbox.checked
        );

        updateProgressBars();

    });

});

// =========================================
// PROGRESS BARS
// =========================================

function updateProgressBars() {

    // Get All Day Cards

    const dayCards =
        document.querySelectorAll(".day-card");

    dayCards.forEach((card) => {

        // Get Checkboxes Inside This Day

        const tasks =
            card.querySelectorAll(
                'input[type="checkbox"]'
            );

        // Get Checked Tasks

        const checkedTasks =
            card.querySelectorAll(
                'input[type="checkbox"]:checked'
            );

        // Calculate Progress

        const progress =
            (checkedTasks.length / tasks.length) * 100;

        // Update Progress Bar

        const progressBar =
            card.querySelector(".progress-bar");

        progressBar.style.width =
            `${progress}%`;

    });

}

// Run On Page Load

updateProgressBars();

// =========================================
// SMOOTH SCROLL ANIMATION
// =========================================

const cards =
    document.querySelectorAll(
        ".day-card, .stat-card, .exam-card"
    );

const observer =
    new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0px)";

            }

        });

    }, {

        threshold: 0.1

    });

// Apply Animation

cards.forEach((card) => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(30px)";

    card.style.transition =
        "all 0.5s ease";

    observer.observe(card);

});

// =========================================
// AUTO SCROLL TO TODAY
// =========================================

window.addEventListener("load", () => {

    const today =
        new Date().getDate();

    const allTitles =
        document.querySelectorAll(".day-title");

    allTitles.forEach((title) => {

        if (title.textContent.includes(today)) {

            title.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }

    });

});

// =========================================
// CONFETTI EFFECT ON FINAL DAY
// =========================================

const finalExam =
    document.querySelector(".exam-day:last-child");

if (finalExam) {

    finalExam.addEventListener("mouseenter", () => {

        finalExam.style.boxShadow =
            "0 0 30px rgba(245,158,11,0.5)";

    });

    finalExam.addEventListener("mouseleave", () => {

        finalExam.style.boxShadow = "";

    });

}

// =========================================
// COMPLETED TASK STYLE
// =========================================

checkboxes.forEach((checkbox) => {

    checkbox.addEventListener("change", () => {

        const taskContent =
            checkbox.parentElement.querySelector(
                ".task-content"
            );

        if (checkbox.checked) {

            taskContent.style.opacity = "0.5";

            taskContent.style.textDecoration =
                "line-through";

        } else {

            taskContent.style.opacity = "1";

            taskContent.style.textDecoration =
                "none";

        }

    });

});

// =========================================
// INITIAL COMPLETED STYLE
// =========================================

checkboxes.forEach((checkbox) => {

    const taskContent =
        checkbox.parentElement.querySelector(
            ".task-content"
        );

    if (checkbox.checked) {

        taskContent.style.opacity = "0.5";

        taskContent.style.textDecoration =
            "line-through";

    }

});

// =========================================
// END
// =========================================