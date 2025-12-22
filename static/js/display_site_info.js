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
        <h4 class="text-center mb-4 fst-italic">${site.name}</h4>
    <p>${site.description}</p>
    <p>
        <ul>
            <li><strong>Location:</strong> ${site.location}</li>
            <li><strong>Maximum depth:</strong> ${site.max_depth}</li>
            <li><strong>Certification required:</strong> ${site.certification}</li>
        </ul>
    </p>
        <div class="text-body-secondary d-flex justify-content-evenly">
            <a href="diving_sites.html" class="btn btn-outline-dark" >Back to Diving Sites</a>
        </div>
    </div>
    `;

    document.getElementById("diving-site-image-div").src = site.image;
    document.getElementById("diving-site-image-div").classList.remove("hide");
    document.getElementById("diving-site-image-div").classList.add("animate__animated", "animate__fadeInRight", "animate__slower");
};