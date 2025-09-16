const params = new URLSearchParams(window.location.search);
const siteId = params.get("id");

fetch('data/diving_sites.json')
    .then(response => response.json())
    .then(data => {
        const site = data.find(item => item.name === siteId); // pick the right one
        displaySiteInfo(site);
    })
    .catch(error => console.error("Error fetching JSON:", error));

function displaySiteInfo(site) {
    const container = document.querySelector(".diving-site-col");
    container.innerHTML = `
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">${site.name}</h5>
                <p class="card-text mt-3">${site.description}</p>
                <p class="card-text">
                    <ul class="text-start">
                        <li><strong>Location:</strong> ${site.location}</li>
                        <li><strong>Maximum depth:</strong> ${site.depth}</li>
                        <li><strong>Certification required:</strong> ${site.certification}</li>
                    </ul>
                </p>
            </div>
            <div class="card-header">
                <img src="${site.image}" class="card-img-top py-5 course-info-image" alt="${site.title}">
            </div>
            <div class="card-footer text-body-secondary">
                <a href="/diving_sites.html" class="btn btn-outline-dark" >Back to diving sites</a>
            </div>
        </div>
    `;
};