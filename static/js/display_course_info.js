const currentPath = window.location.pathname;
const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");


if (currentPath.includes('course_info_gr.html')) {
    // Greek version
    fetch('data/courses_services_gr.json')
        .then(response => response.json())
        .then(data => {
            const course = data.find(item => item.slug === courseId); // pick the right one
            console.log('courseId in Greek:', courseId);
            displayCourseGR(course);
        })
        .catch(error => console.error("Error fetching JSON:", error));
    fetch('data/courses_services_en.json')
        .then(response => response.json())
        .then(data => {
            const courseTitle = data.find(item => item.slug === courseId); // pick the right one
            console.log('courseId Translation:', courseId);
            setTranslationLinkEN(courseTitle);
        })
        .catch(error => console.error("Error fetching JSON:", error));
} else {
    // English version
    fetch('data/courses_services_en.json')
        .then(response => response.json())
        .then(data => {
            const course = data.find(item => item.slug === courseId); // pick the right one
            console.log('courseId:', courseId);
            displayCourseEN(course);
        })
        .catch(error => console.error("Error fetching JSON:", error));
    fetch('data/courses_services_gr.json')
        .then(response => response.json())
        .then(data => {
            const courseTitle = data.find(item => item.slug === courseId); // pick the right one
            console.log('courseId Translation:', courseId);
            setTranslationLinkGR(courseTitle);
        })
        .catch(error => console.error("Error fetching JSON:", error));
};

function displayCourseEN(course) {
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
            <a href="courses_and_services_en.html#courses-table" class="btn btn-outline-dark" >Back to courses</a>
            <a href="mailto:christos@net-divers.com.cy?subject=Course Inquiry:%20${course.title}?" target="_blank" class="btn btn-success">Request Booking</a>
        </div>
    </div>
    `;

    document.getElementById("course-image-div").src = course.image;
    document.getElementById("course-image-div").classList.remove("hide");
    document.getElementById("course-image-div").classList.add("animate__animated", "animate__fadeInRight", "animate__slower");
};

function displayCourseGR(course) {
    const container = document.getElementById("course-details-div");
    
    container.innerHTML = `
    <h4 class="text-center mb-4 fst-italic">${course.title}</h4>
    <p>${course.description}</p>
    <p>
        <ul>
            <li><strong>Ελάχιστη ηλικία:</strong> ${course.min_age}</li>
            <li><strong>Ελάχιστες ώρες:</strong> ${course.min_hours}</li>
            <li><strong>Ελάχιστες καταδύσεις:</strong> ${course.min_dives}</li>
            <li><strong>Μέγιστο βάθος:</strong> ${course.max_depth}</li>
            <li><strong>Απαιτούμενη πιστοποίηση:</strong> ${course.certification}</li>
        </ul>
    </p>
        <div class="text-body-secondary d-flex justify-content-evenly">
            <a href="courses_and_services_gr.html#courses-table" class="btn btn-outline-dark" >Επιστροφή στα μαθήματα</a>
            <a href="mailto:christos@net-divers.com.cy?subject=Course Inquiry:%20${course.title}?" target="_blank" class="btn btn-success">Αίτημα κράτησης</a>
        </div>
    </div>
    `;

    document.getElementById("course-image-div").src = course.image;
    document.getElementById("course-image-div").classList.remove("hide");
    document.getElementById("course-image-div").classList.add("animate__animated", "animate__fadeInRight", "animate__slower");
};

function setTranslationLinkEN(course) {
    const translationLink = document.getElementById("translation-link");
    translationLink.href = `course_info_en.html?id=${course.slug}`;
}

function setTranslationLinkGR(course) {
    const translationLink = document.getElementById("translation-link");
    translationLink.href = `course_info_gr.html?id=${course.slug}`;
}