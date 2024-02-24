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
    })
    .catch((error) => {
      console.error("Error fetching post details", error);
    });
});

function renderPostDetails(postDetails) {
  const postContainer = document.getElementById("postDetailsContainer");

  // Create HTML elements for the post details
  const postElement = document.getElementById("postDetails");

  // Auction content
  postElement.innerHTML = `
    <h1 id="dynamicPostTitle" class="mt-5 mb-4">${postDetails.title}</h1>
    <p id="dynamicPostBody">${postDetails.description}</p>
    <div class="image-container">
      <img class="post-image" src="${postDetails.media[0]}"/>
    </div>
    <a href="edit-post.html?id=${postDetails.id}" class="btn btn-primary">Navigate to Edit Post</a>`;

  // Prepend the post details to the post container
  postContainer.prepend(postElement);
}

//
// Delete
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
