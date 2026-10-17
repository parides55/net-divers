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

if (currentFile === 'index.html' || currentFile === '') {
    // Greek version
    fetch('data/courses_services_gr.json')
        .then(response => response.json())
        .then(data => {
            printPopularCoursesGR(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
} else {
    // English version
    fetch('data/courses_services_en.json')
        .then(response => response.json())
        .then(data => {
            printPopularCoursesEN(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
};


function printPopularCoursesEN(data) {
    const popularCoursesRow = document.getElementById("popular-courses-row");

    data.forEach(course => {
        if (course.home_page === "yes") {
            const col = document.createElement("div");
            col.classList.add("col");
            col.classList.add("card-cols")
            
            col.innerHTML = `
            <a class="course-card" href="course_info_en.html?id=${encodeURIComponent(course.slug)}">
                <img src="${course.image}" alt="${course.title}" loading="lazy">
                <div class="course-card-body">
                    <h3 class="course-card-title">${course.title}</h3>
                    ${depthTag(course, "Max depth", "m")}
                    <span class="card-link">View this course <span aria-hidden="true">&rarr;</span></span>
                </div>
            </a>
            `;
            popularCoursesRow.appendChild(col);
        }
    });
};


function printPopularCoursesGR(data) {
    const popularCoursesRow = document.getElementById("popular-courses-row");

    data.forEach(course => {
        if (course.home_page === "ναι") {
            const col = document.createElement("div");
            col.classList.add("col");
            col.classList.add("card-cols")
            
            col.innerHTML = `
            <a class="course-card" href="course_info_gr.html?id=${encodeURIComponent(course.slug)}">
                <img src="${course.image}" alt="${course.title}" loading="lazy">
                <div class="course-card-body">
                    <h3 class="course-card-title">${course.title}</h3>
                    ${depthTag(course, "Μέγιστο βάθος", "μ.")}
                    <span class="card-link">Δείτε το μάθημα <span aria-hidden="true">&rarr;</span></span>
                </div>
            </a>
            `;
            popularCoursesRow.appendChild(col);
        }
    });
};

// Small "Max depth 18 m" tag, read from the first number in max_depth.
// Courses without a depth (e.g. first aid) get no tag.
function depthTag(course, label, unit) {
    const match = String(course.max_depth || "").match(/\d+/);
    if (!match) return "";
    return `<p class="depth-tag">${label} <strong>${match[0]} ${unit}</strong></p>`;
}
