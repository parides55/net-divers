const currentPath = window.location.pathname;
const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

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
    setPageMeta(course);
    const container = document.getElementById("course-details-div");
    
    container.innerHTML = `
    <h1 class="detail-title">${course.title}</h1>
    <p class="detail-description">${course.description}</p>
    ${hasFacts(course) ? `<ul class="fact-list">
            <li><strong>Minimum age:</strong> ${course.min_age}</li>
            <li><strong>Minimum hours:</strong> ${course.min_hours}</li>
            <li><strong>Minimum dives:</strong> ${course.min_dives}</li>
            <li><strong>Maximum depth:</strong> ${course.max_depth}</li>
            <li><strong>Certification required:</strong> ${course.certification}</li>
        </ul>` : ""}
        <div class="detail-actions">
            <a href="courses_and_services_en.html#courses-table" class="btn btn-outline-primary" >Back to courses</a>
            <button type="button" class="btn btn-accent" data-bs-toggle="modal" data-bs-target="#modal">Request Booking</button>
        </div>
    </div>
    `;

    document.getElementById("course-image-div").src = course.image;
    document.getElementById("course-image-div").classList.remove("hide");
    document.getElementById("course-image-div").classList.add("animate__animated", "animate__fadeInRight", "animate__slower");
    document.getElementById("modalLabel").textContent = `Booking Request for: ${course.title}`;
    document.getElementById("course-name-input").value =`Booking request for the course: ${course.title}`;
};

function displayCourseGR(course) {
    setPageMeta(course);
    const container = document.getElementById("course-details-div");
    
    container.innerHTML = `
    <h1 class="detail-title">${course.title}</h1>
    <p class="detail-description">${course.description}</p>
    ${hasFacts(course) ? `<ul class="fact-list">
            <li><strong>Ελάχιστη ηλικία:</strong> ${course.min_age}</li>
            <li><strong>Ελάχιστες ώρες:</strong> ${course.min_hours}</li>
            <li><strong>Ελάχιστες καταδύσεις:</strong> ${course.min_dives}</li>
            <li><strong>Μέγιστο βάθος:</strong> ${course.max_depth}</li>
            <li><strong>Απαιτούμενη πιστοποίηση:</strong> ${course.certification}</li>
        </ul>` : ""}
        <div class="detail-actions">
            <a href="courses_and_services_gr.html#courses-table" class="btn btn-outline-primary" >Επιστροφή στα μαθήματα</a>
            <button type="button" class="btn btn-accent" data-bs-toggle="modal" data-bs-target="#modal">Αίτημα κράτησης</button>
        </div>
    </div>
    `;

    document.getElementById("course-image-div").src = course.image;
    document.getElementById("course-image-div").classList.remove("hide");
    document.getElementById("course-image-div").classList.add("animate__animated", "animate__fadeInRight", "animate__slower");
    document.getElementById("modalLabel").textContent = `Αίτημα κράτησης για: ${course.title}`;
    document.getElementById("course-name-input").value =`Αίτηση κράτησης για το μάθημα: ${course.title}`;
};

function setTranslationLinkEN(course) {
    const translationLink = document.getElementById("translation-link");
    translationLink.href = `course_info_en.html?id=${course.slug}`;
}

function setTranslationLinkGR(course) {
    const translationLink = document.getElementById("translation-link");
    translationLink.href = `course_info_gr.html?id=${course.slug}`;
}

// The "More Courses" card lists several courses in its description,
// so it has no single age, hours, dives or depth to show.
function hasFacts(course) {
    return !["More Courses", "Άλλα Μαθήματα"].includes(course.category);
}

// Set the page <title> and meta description for the item being shown,
// so each course / dive site has its own title and description in search results.
function setPageMeta(item) {
    if (!item) return;
    if (item.seo_title) {
        document.title = item.seo_title;
        const metaTitle = document.querySelector('meta[name="title"]');
        if (metaTitle) metaTitle.setAttribute("content", item.seo_title);
    }
    if (item.seo_description) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", item.seo_description);
    }
}
