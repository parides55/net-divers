const currentPath = window.location.pathname;
const currentFile = currentPath.split('/').pop(); // Get just the filename

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

const isGreek = currentFile === 'explore_cy_gr.html';

const TEXT = isGreek
    ? { data: 'data/diving_sites_gr.json', page: 'diving_site_info_gr.html', view: 'Δείτε το σημείο', access: 'Πρόσβαση', alt: 'Φωτογραφία:' }
    : { data: 'data/diving_sites_en.json', page: 'diving_site_info_en.html', view: 'View dive site', access: 'Access', alt: 'Image of' };

const list = document.querySelector(".sites-list");
const sortPills = Array.from(document.querySelectorAll(".filter-pill"));

let sites = [];

fetch(TEXT.data)
    .then(response => response.json())
    .then(data => {
        sites = data.map(site => ({ ...site, ...maxDepth(site.depth) }));
        showSites("featured");
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

sortPills.forEach(pill => {
    pill.addEventListener("click", () => {
        sortPills.forEach(other => {
            const isActive = other === pill;
            other.classList.toggle("active", isActive);
            other.setAttribute("aria-pressed", isActive);
        });
        showSites(pill.dataset.sort);
    });
});

// Deepest figure in metres from the depth text, and whether it has a "+".
// e.g. "17–42 m" -> 42, "1 m to 40+ m" -> 40+, "Έως 10 μ." -> 10. No figure -> null.
function maxDepth(text) {
    const found = Array.from(String(text || "").matchAll(/(\d+)(\+?)\s*(?:m|μ)/g),
        match => ({ value: Number(match[1]), plus: match[2] === "+" }));
    if (!found.length) return { maxDepth: null, depthPlus: false };
    const deepest = found.reduce((a, b) => (b.value > a.value ? b : a));
    return { maxDepth: deepest.value, depthPlus: deepest.plus };
}

// Short access for the list: the first sentence of "access", without the full stop,
// e.g. "Boat access only. Organised trips operate..." -> "Boat access only".
function shortAccess(text) {
    return String(text || "").split(".")[0].trim();
}

// Short place name for the list: the part of "location" before the first comma.
function shortLocation(text) {
    return String(text || "").split(",")[0].trim();
}

function showSites(order) {
    // "featured" keeps the order of the JSON file; "depth" goes from shallowest to deepest.
    const ordered = order === "depth"
        ? [...sites].sort((a, b) =>
            (a.maxDepth ?? Infinity) - (b.maxDepth ?? Infinity) || a.depthPlus - b.depthPlus)
        : sites;

    list.innerHTML = "";
    ordered.forEach(site => list.appendChild(createSiteRow(site)));
}

function createSiteRow(site) {
    const row = document.createElement("a");
    row.className = "site-row";
    row.href = `${TEXT.page}?id=${site.slug}`;

    row.innerHTML = `
        <div class="site-access">
            ${site.access ? `
            <span class="site-access-label">${TEXT.access}</span>
            <span class="site-access-value">${shortAccess(site.access)}</span>` : ""}
        </div>
        <img src="${site.image}" alt="${TEXT.alt} ${site.name}" loading="lazy">
        <div class="site-text">
            <h3 class="site-name">${site.name}</h3>
            <p class="site-city">${shortLocation(site.location)}</p>
            <p class="site-excerpt">${site.excerpt}</p>
            <span class="card-link">${TEXT.view} <span aria-hidden="true">&rarr;</span></span>
        </div>
    `;

    return row;
}
