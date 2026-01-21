const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

fetch('data/courses_services_en.json')
    .then(response => response.json())
    .then(data => {
        const course = data.find(item => item.title === courseId); // pick the right one
        displayCourse(course);
    })
    .catch(error => console.error("Error fetching JSON:", error));

function displayCourse(course) {
    const container = document.getElementById("course-details-div");
    
    container.innerHTML = `
    <h4 class="text-center mb-4 fst-italic">${course.title}</h4>
    <p>${course.description}</p>
    <p>
        <ul>
            <li><strong>Minimum age:</strong> ${course.min_age}</li>
            <li><strong>Minimum hours:</strong> ${course.min_hours}</li>
            <li><strong>Minimum dives:</strong> ${course.min_dives}</li>
            <li><strong>Maximum depth:</strong> ${course.max_depth}</li>
            <li><strong>Certification required:</strong> ${course.certification}</li>
        </ul>
    </p>
        <div class="text-body-secondary d-flex justify-content-evenly">
            <a href="courses_and_services.html#courses-table" class="btn btn-outline-dark" >Back to courses</a>
            <a href="mailto:christos@net-divers.com.cy?subject=Course Inquiry:%20${course.title}?" target="_blank" class="btn btn-success">Request Booking</a>
        </div>
    </div>
    `;

    document.getElementById("course-image-div").src = course.image;
    document.getElementById("course-image-div").classList.remove("hide");
    document.getElementById("course-image-div").classList.add("animate__animated", "animate__fadeInRight", "animate__slower");
}