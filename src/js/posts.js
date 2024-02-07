// posts.js - creates posts
import { fetcher } from "./fetcher.js";
import { POSTS_API_URL } from "./common/constants.js";
import { displaySearchResults } from "./common/utils/search.js";

const postForm = document.getElementById("postForm");
const urlFeed = "https://api.noroff.dev/api/v1/social/posts";

document.addEventListener("DOMContentLoaded", async () => {
  const posts = await fetcher(POSTS_API_URL, { method: "GET" }, true);

  displaySearchResults(posts);
});

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const postTitle = document.getElementById("postTitle").value;
  const postBody = document.getElementById("postBody").value;
  const postMedia = document.getElementById("postMedia").value;
  const tags = document.getElementById("postTags").value;

  const postData = {
    title: postTitle,
    body: postBody,
    media: postMedia,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    tags: tags.split(","), // Splits the tags strong into an array
  };

  try {
    const response = await fetcher(
      urlFeed,
      {
        method: "POST",
        body: JSON.stringify(postData),
      },
      true
    );

    if (response?.errors?.length > 0) {
      return alert(response?.errors?.[0]?.message || "Something went wrong!");
    }

    // Render of new post on the page
    renderPost(response);
  } catch (error) {
    console.error("Error creating a new post:", error);
  }
});

// Rendering posts

function renderPost(post) {
  const postsContainer = document.getElementById("postsContainer");

  // Create HTML elements for the post
  const postElement = document.createElement("div");
  postElement.className = "card m-3 small-card p-0";
  postElement.setAttribute(
    "data-created",
    new Date(post?.created).toISOString()
  ); // Adds created attribute from sort.js

  // Add post content
  postElement.innerHTML = `
    <img src="${post.media}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${post.body}</p>
      <img src="${post.media || ""}" />
    </div>
  `;

  // Append the post to the posts container
  postsContainer.appendChild(postElement);

  // Add click event to newly created post to navigate to edit-post.html immediately after creation
  postElement.addEventListener("click", () => {
    navigateToEditPost(post.id);
  });
}

// Function to navigate to edit-post.html immediately after creation
function navigateToEditPost(postId) {
  window.location.href = `/idPage/edit-post.html?id=${postId}`;
}
