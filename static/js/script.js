const currentPath = window.location.pathname;
const currentFile = currentPath.split('/').pop(); // Get just the filename

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
            <div class="card popular-cards">
                <img src="${course.image}" class="card-img-top popular-card-img-top" alt="${course.title}">
                <div class="card-body popular-card-body">
                    <h4 class="card-title fw-bold">${course.title}</h4>
                    <a href="course_info.html?id=${course.title}" class="btn btn-outline-primary">View this course</a>
                </div>
            </div>
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
            <div class="card popular-cards">
                <img src="${course.image}" class="card-img-top popular-card-img-top" alt="${course.title}">
                <div class="card-body popular-card-body">
                    <h4 class="card-title fw-bold">${course.title}</h4>
                    <a href="course_info.html?id=${course.title}" class="btn btn-outline-primary">Δείτε το μάθημα</a>
                </div>
            </div>
            `;
            popularCoursesRow.appendChild(col);
        }
    });
};