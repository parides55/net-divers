const currentPath = window.location.pathname;
const params = new URLSearchParams(window.location.search);
const siteId = params.get("id");

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

if (currentPath.includes('diving_site_info_gr.html')) {
    // Greek version
    fetch('data/diving_sites_gr.json')
        .then(response => response.json())
        .then(data => {
            const site = data.find(item => item.slug === siteId); // pick the right one;
            displaySiteInfoGR(site);
        })
        .catch(error => console.error("Error fetching JSON:", error));
    fetch('data/diving_sites_en.json')
        .then(response => response.json())
        .then(data => {
            const translateSite = data.find(item => item.slug === siteId); // pick the right one
            setTranslationLinkEN(translateSite);
        })
        .catch(error => console.error("Error fetching JSON:", error));
} else {
    // English version
    fetch('data/diving_sites_en.json')
        .then(response => response.json())
        .then(data => {
            const site = data.find(item => item.slug === siteId); // pick the right one
            displaySiteInfoEN(site);
        })
        .catch(error => console.error("Error fetching JSON:", error));
    fetch('data/diving_sites_gr.json')
        .then(response => response.json())
        .then(data => {
            const translateSite = data.find(item => item.slug === siteId); // pick the right one
            setTranslationLinkGR(translateSite);
        })
        .catch(error => console.error("Error fetching JSON:", error));
}


function displaySiteInfoEN(site) {
    setPageMeta(site);
    const container = document.querySelector(".diving-site-col");
    container.innerHTML = `
        <h1 class="detail-title">${site.name}</h1>
    <p>${site.description}</p>
    <ul class="fact-list">
            <li><strong>Location:</strong> ${site.location}</li>
            <li><strong>Maximum depth:</strong> ${site.depth}</li>
            <li><strong>Certification required:</strong> ${site.difficulty}</li>
            <li><strong>Access:</strong> ${site.access}</li>
            <li><strong>Tips:</strong> ${site.tips}</li>
        </ul>
        <div class="detail-actions">
            <a href="explore_cy_en.html#diving-sites-section" class="btn btn-outline-primary" >Back to Diving Sites</a>
        </div>
    </div>
    `;

    document.getElementById("diving-site-image-div").src = site.image;
    document.getElementById("diving-site-image-div").classList.remove("hide");
    document.getElementById("diving-site-image-div").classList.add("animate__animated", "animate__fadeInRight", "animate__slower");
};

function displaySiteInfoGR(site) {
    setPageMeta(site);
    const container = document.querySelector(".diving-site-col");
    container.innerHTML = `
        <h1 class="detail-title">${site.name}</h1>
    <p>${site.description}</p>
    <ul class="fact-list">
            <li><strong>Τοποθεσία:</strong> ${site.location}</li>
            <li><strong>Μέγιστο βάθος:</strong> ${site.depth}</li>
            <li><strong>Απαιτούμενη πιστοποίηση:</strong> ${site.difficulty}</li>
            <li><strong>Πρόσβαση:</strong> ${site.access}</li>
            <li><strong>Συμβουλές:</strong> ${site.tips}</li>
        </ul>
        <div class="detail-actions">
            <a href="explore_cy_gr.html#diving-sites-section" class="btn btn-outline-primary" >Επιστροφή στα Καταδυτικά Σημεία</a>
        </div>
    </div>
    `;

    document.getElementById("diving-site-image-div").src = site.image;
    document.getElementById("diving-site-image-div").classList.remove("hide");
    document.getElementById("diving-site-image-div").classList.add("animate__animated", "animate__fadeInRight", "animate__slower");
};

// Update translation link based on current page
function setTranslationLinkEN() {
    const siteTitle = document.getElementById("translation-link");
    siteTitle.href = `diving_site_info_en.html?id=${siteId}`;
}

function setTranslationLinkGR() {
    const siteTitle = document.getElementById("translation-link");
    siteTitle.href = `diving_site_info_gr.html?id=${siteId}`;
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
