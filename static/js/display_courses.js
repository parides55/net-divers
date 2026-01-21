fetch('data/courses_services_en.json')
    .then(response => response.json())
    .then(data => {
        printData(data);
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });


function printData(data) {
    const collapseOne = document.getElementById("collapseOne");
    const collapseTwo = document.getElementById("collapseTwo");
    const collapseThree = document.getElementById("collapseThree");
    const collapseFour = document.getElementById("collapseFour");
    const collapseFive = document.getElementById("collapseFive");
    const collapseSix = document.getElementById("collapseSix");

    data.forEach(course => {
        if (course.popular === "yes") {
            collapseOne.appendChild(createCourseCard(course));
        } 

        if (course.category === "Entry-Level") {
            collapseTwo.appendChild(createCourseCard(course));
        } else if (course.category === "Continuing Education") {
            collapseThree.appendChild(createCourseCard(course));
        } else if (course.category === "First Aid") {
            collapseFour.appendChild(createCourseCard(course));
        } else if (course.category === "Specialty") {
            collapseFive.appendChild(createCourseCard(course));
        } else if (course.category === "Leadership") {
            collapseSix.appendChild(createCourseCard(course));
        }
    });
};

function createCourseCard(course) {
    const col = document.createElement("div");
    col.classList.add("accordion-body");

    col.innerHTML = `
        <div class="card courses-cards mb-5">
            <img src="${course.image}" class="card-img-top" alt="${course.title}">
            <div class="card-body popular-card-body">
                <h4 class="card-title fw-bold">${course.title}</h4>
                <a href="course_info.html?id=${encodeURIComponent(course.title)}"
                    class="btn btn-outline-primary">
                    View this course
                </a>
            </div>
        </div>
    `;

    return col;
}