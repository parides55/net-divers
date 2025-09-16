fetch('/data/courses_services.json')
    .then(response => response.json())
    .then(data => {
        printData(data);
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });


function printData(data) {
    const row = document.querySelector(".courses-row"); // container row

    data.forEach(course => {
        const col = document.createElement("div");
        col.classList.add("col");

        col.innerHTML = `
            <div class="card mb-5">
                <img src="${course.image}" class="card-img-top" alt="${course.title}">
                <div class="card-body">
                    <h5 class="card-title">${course.title}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Category: ${course.category}</li>
                    <li class="list-group-item">License Required: ${course.license_required}</li>
                    <li class="list-group-item">Minimum Age: ${course.min_age}</li>
                </ul>
                <div class="card-body">
                    <a href="/course_info.html?id=${course.title}" class="btn btn-outline-dark">More Information</a>
                </div>
            </div>
        `;
        row.appendChild(col);
    });
}