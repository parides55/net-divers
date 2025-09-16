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
    <div class="card text-center">
        <div class="card-body">
            <h5 class="card-title">${course.title}</h5>
            <p class="card-text mt-3">${course.description}</p>
            <p class="card-text">
                <ul class="text-start">
                    <li><strong>Category:</strong> ${course.category}</li>
                    <li><strong>Minimum age:</strong> ${course.min_age}</li>
                    <li><strong>Minimum hours:</strong> ${course.min_hours}</li>
                    <li><strong>Minimum dives:</strong> ${course.min_dives}</li>
                    <li><strong>Maximum depth:</strong> ${course.max_depth}</li>
                    <li><strong>License required:</strong> ${course.license_required}</li>
                    <li><strong>Certification required:</strong> ${course.certification}</li>
                </ul>
            </p>
        </div>
        <div class="card-header">
            <img src="${course.image}" class="card-img-top py-5 course-info-image" alt="${course.title}">
        </div>
        <div class="card-footer text-body-secondary">
            <a href="/courses_and_services.html" class="btn btn-primary" >Back to courses</a>
        </div>
    </div>
    `;
}