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
        <img src="${site.image}" class="img-fluid mb-4" alt="Image of ${site.name}">
        <h2>${site.name}</h2>
        <p><strong>Location:</strong> ${site.location}</p>
        <p><strong>Depth:</strong> ${site.depth}</p>
        <p>${site.description}</p>
        <a href="/diving_sites.html" class="btn btn-primary mt-3">Back to Diving Sites</a>
    `;
};