fetch('data/diving_sites.json')
    .then(response => response.json())
    .then(data => {
        displayDivingSites(data);
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

function displayDivingSites(data) {
    const row = document.querySelector(".sites-row"); // container row

    data.forEach(site => {
        const col = document.createElement("div");
        col.classList.add("col");
        col.classList.add("mb-5");

        col.innerHTML = `
            <a href="/diving_site_info.html?id=${site.name}" class="text-decoration-none">
                <div class="card sites-cards text-bg-dark">
                    <img src="${site.image}" class="card-img" alt="Image of ${site.name}">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${site.name}</h5>
                        <p class="card-text">Location: ${site.location}</p>
                        <p class="card-text"><small>Depth: ${site.depth}</small></p>
                    </div>
                </div>
            </a>
        `;
        row.appendChild(col);
    });
};
