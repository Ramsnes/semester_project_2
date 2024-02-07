// search.js

import { fetcher } from "../../fetcher.js";
import { BASE_API_URL } from "../constants.js";

// Event listener for the search form submission
document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput").value;

    if (searchInput.trim() !== "") {
      const searchResults = await searchPosts(searchInput);
      displaySearchResults(searchResults);
    }
  });

// Function to perform a search for posts
async function searchPosts(search) {
  // tag search
  const apiUrl = `${BASE_API_URL}/social/posts?_tag=${search}`;

  try {
    // Makes the API call and return the search results
    const searchResults = await fetcher(apiUrl, { method: "GET" }, true);

    // Checks if searchResults is an array
    if (Array.isArray(searchResults)) {
      return searchResults;
    } else {
      console.error("Error: Search results is not an array", searchResults);
      return [];
    }
  } catch (error) {
    console.error("Error searching posts", error);
    return []; // Returns an empty array on error
  }
}

// Function to display search results in the UI
export function displaySearchResults(results) {
  const postsContainer = document.getElementById("postsContainer");
  // Clear existing posts
  postsContainer.innerHTML = "";

  if (results.length === 0) {
    // Display a message when no results are found
    postsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    // Display search results
    results.forEach((post) => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
      // Navigate to the new page on post click
      postElement.addEventListener("click", function () {
        navigateToPostPage(post.id); // Replace 'id' with the actual property name for post ID
      });

      postsContainer.appendChild(postElement);
    });
  }
}

// Function to create an HTML element for a single post
function createPostElement(post) {
  // Creates and returns the HTML element for a single post
  const postElement = document.createElement("div");
  postElement.setAttribute("data-created", post.updated);
  postElement.className = "card m-3 small-card p-0";
  postElement.innerHTML = `
      <img src="${post.media}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.body}</p>
      </div>
    `;
  return postElement;
}

// Function to navigate to the new page with the specific post ID
function navigateToPostPage(postId) {
  window.location.href = `../idPage/index.html?id=${postId}`;
}
