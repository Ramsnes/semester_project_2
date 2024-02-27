// postDetails.js
import { fetcher } from "./fetcher.js";
import { BASE_API_URL } from "./common/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  // Get post ID from the URL
  const postId = new URLSearchParams(window.location.search).get("id");

  // Fetch post details
  const apiUrl = `${BASE_API_URL}/auction/listings/${postId}`;

  fetcher(apiUrl, { method: "GET" }, true)
    .then((postDetails) => {
      document.title = `Post - ${postDetails.title}`;
      renderPostDetails(postDetails);

      // Submit btn -
      const submitBidButton = document.getElementById("submitBidBtn");
      submitBidButton.addEventListener("click", () => {
        const bidAmount = document.getElementById("bidAmount").value;
        submitBid(postId, bidAmount);
      });
    })
    .catch((error) => {
      console.error("Error fetching post details", error);
    });
});

function renderPostDetails(postDetails) {
  const postContainer = document.getElementById("postDetailsContainer");

  // Create HTML elements for the post details
  const postElement = document.getElementById("postDetails");

  // Auction id content
  postElement.innerHTML = `
    <h1 id="dynamicPostTitle" class="mt-5 mb-4">${postDetails.title}</h1>
    <p id="dynamicPostBody">${postDetails.description}</p>
    <div class="image-container">
      <img class="post-image" src="${postDetails.media[0]}"/>
      </div>
      <p id="postEndsAt">Deadline: ${postDetails.endsAt}</p>
      <div>
            <label for="bidAmount">Enter bid amount</label>
            <input type="number" id="bidAmount" required />
            <button id="submitBidBtn">Submit bid</button>
      </div>
    <a href="edit-post.html?id=${postDetails.id}" class="btn btn-primary">Navigate to Edit Post</a>
    `;

  // Prepend the post details to the post container
  postContainer.prepend(postElement);
}

// Bid function
async function submitBid(postId, bidAmount) {
  const apiUrl = `${BASE_API_URL}/auction/listings/${postId}/bids`;

  try {
    const response = await fetcher(
      apiUrl,
      {
        method: "POST",
        body: JSON.stringify({ amount: bidAmount }),
      },
      true
    );

    // Navigation and alert msg
    window.location.href = "../feed/index.html";
    alert("Bid successful!");

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
