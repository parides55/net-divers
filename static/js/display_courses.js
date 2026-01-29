const currentPath = window.location.pathname;
const currentFile = currentPath.split('/').pop(); // Get just the filename


if (currentFile === 'courses_and_services_gr.html') {
    // Greek version
    fetch('data/courses_services_gr.json')
        .then(response => response.json())
        .then(data => {
            printData(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
} else {
    // English version
    fetch('data/courses_services_en.json')
        .then(response => response.json())
        .then(data => {
            printData(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

function printData(data) {
    const collapseOne = document.getElementById("collapseOne");
    const collapseTwo = document.getElementById("collapseTwo");
    const collapseThree = document.getElementById("collapseThree");
    const collapseFour = document.getElementById("collapseFour");
    const collapseFive = document.getElementById("collapseFive");
    const collapseSix = document.getElementById("collapseSix");

    data.forEach(course => {
        if (course.popular === "yes") {
            collapseOne.appendChild(createCourseCardEN(course));
        } else if (course.popular === "ναι") {
            collapseOne.appendChild(createCourseCardGR(course));
        }

        if (course.category === "Entry-Level") {
            collapseTwo.appendChild(createCourseCardEN(course));
        } else if (course.category === "Συνεχιζόμενη Εκπαίδευση") {
            collapseTwo.appendChild(createCourseCardGR(course));
        };

        if (course.category === "Entry-Level") {
            collapseTwo.appendChild(createCourseCardEN(course));
        } else if (course.category === "Συνεχιζόμενη Εκπαίδευση") {
            collapseTwo.appendChild(createCourseCardGR(course));
        };

        if (course.category === "Continuing Education") {
            collapseThree.appendChild(createCourseCardEN(course));
        } else if (course.category === "Εισαγωγικό Επίπεδο") {
            collapseThree.appendChild(createCourseCardGR(course));
        }

        if (course.category === "First Aid") {
            collapseFour.appendChild(createCourseCardEN(course));
        } else if (course.category === "Πρώτες Βοήθειες") {
            collapseFour.appendChild(createCourseCardGR(course));
        }

        if (course.category === "Specialty") {
            collapseFive.appendChild(createCourseCardEN(course));
        } else if (course.category === "Ειδικότητα") {
            collapseFive.appendChild(createCourseCardGR(course));
        }

        if (course.category === "Leadership") {
            collapseSix.appendChild(createCourseCardEN(course));
        } else if (course.category === "Ηγεσία") {
            collapseSix.appendChild(createCourseCardGR(course));
        }
    });
};

function createCourseCardEN(course) {
    const col = document.createElement("div");
    col.classList.add("accordion-body");

    col.innerHTML = `
        <div class="card courses-cards mb-5">
            <img src="${course.image}" class="card-img-top" alt="${course.title}">
            <div class="card-body popular-card-body">
                <h4 class="card-title fw-bold">${course.title}</h4>
                <a href="course_info_en.html?id=${encodeURIComponent(course.slug)}"
                    class="btn btn-outline-primary">
                    View this course
                </a>
            </div>
        </div>
    `;

    return col;
}

function createCourseCardGR(course) {
    const col = document.createElement("div");
    col.classList.add("accordion-body");

    col.innerHTML = `
        <div class="card courses-cards mb-5">
            <img src="${course.image}" class="card-img-top" alt="${course.title}">
            <div class="card-body popular-card-body">
                <h4 class="card-title fw-bold">${course.title}</h4>
                <a href="course_info_gr.html?id=${encodeURIComponent(course.slug)}"
                    class="btn btn-outline-primary">
                    Δείτε το μάθημα
                </a>
            </div>
        </div>
    `;

    return col;
}