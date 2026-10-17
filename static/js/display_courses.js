const currentPath = window.location.pathname;
const currentFile = currentPath.split('/').pop(); // Get just the filename

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

const isGreek = currentFile === 'courses_and_services_gr.html';

const TEXT = isGreek
    ? { data: 'data/courses_services_gr.json', page: 'course_info_gr.html', view: 'Δείτε το μάθημα', depth: 'Μέγιστο βάθος', unit: 'μ.' }
    : { data: 'data/courses_services_en.json', page: 'course_info_en.html', view: 'View this course', depth: 'Max depth', unit: 'm' };

const grid = document.getElementById("courses-grid");
const pills = Array.from(document.querySelectorAll(".filter-pill"));

// The pills in the HTML decide which categories are shown and what they are called.
// A course whose category has no pill stays hidden, exactly as before.
const categoryLabels = {};
pills.forEach(pill => {
    const key = pill.dataset.filter;
    if (key !== "all" && key !== "popular") categoryLabels[key] = pill.textContent.trim();
});

let courses = [];

fetch(TEXT.data)
    .then(response => response.json())
    .then(data => {
        courses = data.filter(course => course.category in categoryLabels);
        showCourses("all");
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

pills.forEach(pill => {
    pill.addEventListener("click", () => {
        pills.forEach(other => {
            const isActive = other === pill;
            other.classList.toggle("active", isActive);
            other.setAttribute("aria-pressed", isActive);
        });
        showCourses(pill.dataset.filter);
    });
});

function isPopular(course) {
    return course.popular === "yes" || course.popular === "ναι";
}

function showCourses(filter) {
    grid.innerHTML = "";
    courses
        .filter(course => {
            if (filter === "all") return true;
            if (filter === "popular") return isPopular(course);
            return course.category === filter;
        })
        .forEach(course => grid.appendChild(createCourseCard(course)));
}

function createCourseCard(course) {
    const card = document.createElement("a");
    card.className = "course-card";
    card.href = `${TEXT.page}?id=${encodeURIComponent(course.slug)}`;

    // First number in max_depth, e.g. "18m (60 ft.)" -> 18. No number, no tag.
    const depth = String(course.max_depth || "").match(/\d+/);

    card.innerHTML = `
        <img src="${course.image}" alt="${course.title}" loading="lazy">
        <div class="course-card-body">
            <p class="course-card-category">${categoryLabels[course.category]}</p>
            <h3 class="course-card-title">${course.title}</h3>
            ${depth ? `<p class="depth-tag">${TEXT.depth} <strong>${depth[0]} ${TEXT.unit}</strong></p>` : ""}
            <span class="card-link">${TEXT.view} <span aria-hidden="true">&rarr;</span></span>
        </div>
    `;

    return card;
}
