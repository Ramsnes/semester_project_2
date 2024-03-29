// postDetails.js
import { fetcher } from "./fetcher.js";
import { BASE_API_URL } from "./common/constants.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Get post ID from the URL
  const postId = new URLSearchParams(window.location.search).get("id");

  // Fetch post details
  const listingUrl = `${BASE_API_URL}/auction/listings/${postId}`;
  let postDetails;

  try {
    postDetails = await fetcher(listingUrl, { method: "GET" }, true);
    document.title = `Listing - ${postDetails.title}`;
    renderPostDetails(postDetails);

    // Submit btn -
    const submitBidButton = document.getElementById("submitBidBtn");
    submitBidButton.addEventListener("click", () => {
      const bidAmount = document.getElementById("bidAmount").value;
      submitBid(postId, bidAmount);
    });
  } catch (error) {
    console.error("Error fetching post details", error);
  }

  if (!postDetails) {
    return;
  }

  // Fetch bids for the listing
  const bidsUrl = `${BASE_API_URL}/auction/listings/${postId}?_bids=true`;
  try {
    const bidResponse = await fetcher(bidsUrl, { method: "GET" }, true);

    if (!bidResponse && bidResponse.bids.length === 0) {
      console.error("No bids found for the listing");
      return;
    }

    const container = document.getElementById("bids-container");

    bidResponse.bids.forEach((bid) => {
      const bidElement = document.createElement("div");
      bidElement.classList.add("bid-container");

      bidElement.innerHTML = `
        <p>Bid Amount: ${bid.amount}</p>
        <p>Bidder Name: ${bid.bidderName}</p>
      `;
      container.appendChild(bidElement);
    });
  } catch (error) {
    console.error("Error fetching bids for the listing", error);
  }
});

function renderPostDetails(postDetails) {
  const postContainer = document.getElementById("postDetailsContainer");

  // Parse the deadline date
  const deadlineDate = new Date(postDetails.endsAt);

  // Format the deadline date
  const formattedDeadline = deadlineDate.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  });

  // Create HTML elements for the post details
  const postElement = document.getElementById("postDetails");

  // Auction id content rendered
  postElement.innerHTML = `
    <h1 id="dynamicPostTitle" class="mt-5 mb-4">${postDetails.title}</h1>
    <p id="dynamicPostBody">${postDetails.description}</p>
    <div class="image-container">
      <img class="post-image" src="${postDetails.media[0]}"/>
      </div>
      <p id="postEndsAt">Deadline: ${formattedDeadline}</p>
      <div>
            <label for="bidAmount">Enter bid amount</label>
            <input type="number" id="bidAmount" required />
            <button id="submitBidBtn">Submit bid</button>
      </div>
      <div id="bidsContainer"></div>
    
    `;

  // Prepend the post details to the post container
  postContainer.prepend(postElement);
}

//
// Bid function
async function submitBid(postId, bidAmount) {
  const apiUrl = `${BASE_API_URL}/auction/listings/${postId}/bids`;

  // For å være sikker bidAmount er et nummer, så bruk denne variabel i fetcher
  const bodyObject = {
    amount: parseInt(bidAmount),
  };

  try {
    const response = await fetcher(
      apiUrl,
      {
        method: "POST",
        body: JSON.stringify(bodyObject),
      },
      true
    );

    // Navigation and alert msg

    alert("Bid placed, unless already ended!");

    // Bid success msg
    console.log("Bid placed successfully:", response);

    // Maybe display success msg
  } catch (error) {
    console.error("Error placing bid:", error);
    // Error msg also
  }
}

//
// Delete listing
const deletePostButton = document.getElementById("deletePostBtn");

deletePostButton.addEventListener("click", () => {
  // Get post ID from the URL
  const postId = new URLSearchParams(window.location.search).get("id");

  // Fetch post details
  const apiUrl = `${BASE_API_URL}/auction/listings/${postId}`;

  fetcher(apiUrl, { method: "DELETE" }, true)
    .then(() => {
      // Navigating for now
      window.location.href = "../feed/index.html";
    })
    .catch((error) => {
      console.error("Error fetching post details", error);
    });
});

//
// Bids fetched and rendered

import { fetchBidsForListing } from "./bidsFetch.js";

document.addEventListener("DOMContentLoaded", async () => {
  const postId = new URLSearchParams(window.location.search).get("id");

  // Fetch post details
  const apiUrl = `${BASE_API_URL}/auction/listings/${postId}`;

  try {
    const postDetails = await fetcher(apiUrl, { method: "GET" }, true);
    document.title = `Listing - ${postDetails.title}`;
    renderPostDetails(postDetails);

    // Fetch bids for the listing
    const bidResponse = await fetchBidsForListing(postId);

    // Render bids
    renderBids(bidResponse.bids);
  } catch (error) {
    console.error("Error fetching post details", error);
  }
});

// Function to render bids
function renderBids(bids) {
  const bidsContainer = document.getElementById("bidsContainer");

  // Clear previous bids
  bidsContainer.innerHTML = "";

  // Render each bid
  bids.forEach((bid) => {
    const bidElement = document.createElement("div");
    bidElement.innerHTML = `
      <p>Bid Amount: ${bid.amount}</p>
      <p>Bidder Name: ${bid.bidder.name}</p>
    `;
    bidsContainer.appendChild(bidElement);
  });
}
