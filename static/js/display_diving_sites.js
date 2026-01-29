const currentPath = window.location.pathname;
const currentFile = currentPath.split('/').pop(); // Get just the filename

if (currentFile === 'explore_cy_gr.html') {
    // Greek version
    fetch('data/diving_sites_gr.json')
        .then(response => response.json())
        .then(data => {
            displayDivingSitesGR(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
} else {
    // English version
    fetch('data/diving_sites_en.json')
        .then(response => response.json())
        .then(data => {
            displayDivingSitesEN(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

function displayDivingSitesEN(data) {
    const row = document.querySelector(".sites-row"); // container row

    data.forEach(site => {
        const col = document.createElement("div");
        col.classList.add("col", "d-flex", "justify-content-center");
        col.classList.add("mb-5");

        col.innerHTML = `
            <a href="diving_site_info_en.html?id=${site.slug}" class="text-decoration-none">
                <div class="card sites-cards">
                    <img src="${site.image}" class="card-img" alt="Image of ${site.name}">
                    <div class="card-img-overlay d-flex align-items-end">
                        <h3 class="card-title text-light fs-1">${site.name}</h3>
                    </div>
                </div>
            </a>
        `;
        row.appendChild(col);
    });
};

function displayDivingSitesGR(data) {
    const row = document.querySelector(".sites-row"); // container row

    data.forEach(site => {
        const col = document.createElement("div");
        col.classList.add("col", "d-flex", "justify-content-center");
        col.classList.add("mb-5");

        col.innerHTML = `
            <a href="diving_site_info_gr.html?id=${site.slug}" class="text-decoration-none">
                <div class="card sites-cards">
                    <img src="${site.image}" class="card-img" alt="Image of ${site.name}">
                    <div class="card-img-overlay d-flex align-items-end">
                        <h3 class="card-title text-light fs-1">${site.name}</h3>
                    </div>
                </div>
            </a>
        `;
        row.appendChild(col);
    });
};
