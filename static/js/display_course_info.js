const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

fetch('/data/courses_services.json')
    .then(response => response.json())
    .then(data => {
        const course = data.find(item => item.title === courseId); // pick the right one
        displayCourse(course);
    })
    .catch(error => console.error("Error fetching JSON:", error));

function displayCourse(course) {
    const container = document.getElementById("course-details");
    container.innerHTML = `
    <div class="card">
        <img src="${course.image}" class="card-img-top" alt="${course.title}">
        <div class="card-body">
        <h3 class="card-title">${course.title}</h3>
        <p class="card-text">${course.description}</p>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Category: ${course.category}</li>
            <li class="list-group-item">Certification: ${course.certification}</li>
            <li class="list-group-item">Minimum Age: ${course.min_age}</li>
        </ul>
        </div>
    </div>
    `;
}