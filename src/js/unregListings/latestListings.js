// latestListings.js
import { fetcher } from "../fetcher.js";
import { BASE_API_URL } from "../common/constants.js";

// Function to fetch listings without login required
export async function fetchUnregListings() {
  const url = `${BASE_API_URL}/auction/listings`;
  try {
    const response = await fetcher(url, { method: "GET" });

    // // Renders latest 9 listings
    const latestListings = response.data.slice(0, 9); // Fjernes denne og bytt ut 'latestListings.forEach' med 'response.forEach' så renderes 6 poster

    // Renders each listing
    latestListings.forEach((listing) => {
      renderListing(listing);
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
}

// Render listing fn
function renderListing(listing) {
  const listingsContainer = document.getElementById("listingsContainer");

  const listingElement = document.createElement("div");
  listingElement.className = "card m-3 small-card p-0";

  // Listing info rendered
  listingElement.innerHTML = `
        <img src="${listing.media[0].url}" class="card-img-top" alt="${listing.media[0].alt}" />
        <div class="card-body">
        <h5 class="card-title">${listing.title}</h5>
        <p class="card-text">${listing.description}</p>
        </div>
        `;

  // Adds the list info to the ID container in HTML
  listingsContainer.appendChild(listingElement);
}
