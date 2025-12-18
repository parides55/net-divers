fetch('data/courses_services.json')
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

    data.forEach(course => {
        if (course.popular === "yes") {
            const col = document.createElement("div");
            col.classList.add("accordion-body");

            col.innerHTML = `
                <div class="card courses-cards mb-5">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}">
                    <div class="card-body popular-card-body">
                        <h4 class="card-title fw-bold">${course.title}</h4>
                        <a href="course_info.html?id=${course.title}" class="btn btn-outline-primary">View this course</a>
                    </div>
                </div>
            `;
            collapseOne.appendChild(col);
        } else if (course.category === "Entry-Level") {
            const col = document.createElement("div");
            col.classList.add("accordion-body");

            col.innerHTML = `
                <div class="card courses-cards mb-5">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}">
                    <div class="card-body popular-card-body">
                        <h4 class="card-title fw-bold">${course.title}</h4>
                        <a href="course_info.html?id=${course.title}" class="btn btn-outline-primary">View this course</a>
                    </div>
                </div>
            `;
            collapseTwo.appendChild(col);
        } else if (course.category === "Continuing Education") {
            const col = document.createElement("div");
            col.classList.add("accordion-body");

            col.innerHTML = `
                <div class="card courses-cards mb-5">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}">
                    <div class="card-body popular-card-body">
                        <h4 class="card-title fw-bold">${course.title}</h4>
                        <a href="course_info.html?id=${course.title}" class="btn btn-outline-primary">View this course</a>
                    </div>
                </div>
            `;
            collapseThree.appendChild(col);
        } else if (course.category === "Specialty") {
            const col = document.createElement("div");
            col.classList.add("accordion-body");

            col.innerHTML = `
                <div class="card courses-cards mb-5">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}">
                    <div class="card-body popular-card-body">
                        <h4 class="card-title fw-bold">${course.title}</h4>
                        <a href="course_info.html?id=${course.title}" class="btn btn-outline-primary">View this course</a>
                    </div>
                </div>
            `;
            collapseFour.appendChild(col);
        }
    });
}