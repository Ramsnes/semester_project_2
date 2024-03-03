// posts.js - creates posts
import { fetcher } from "./fetcher.js";
import { POSTS_API_URL } from "./common/constants.js";
import { displaySearchResults } from "./common/utils/search.js";

const postForm = document.getElementById("postForm");
// Bytta endpoint url
const urlFeed = "https://api.noroff.dev/api/v1/auction/listings"; // Bytta url til /auction

// Poster listing
postForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const postTitle = document.getElementById("postTitle").value;
  const postBody = document.getElementById("postBody").value;
  const postMedia = document.getElementById("postMedia").value;
  const tags = document.getElementById("postTags").value;
  const endsAt = document.getElementById("postEndsAt").value;

  const date = new Date();
  date.setDate(date.getDate() + 1); // Add one day
  const isoString = date.toISOString();

  const postData = {
    title: postTitle,
    description: postBody, // Bytta 'body' med 'description'
    media: [postMedia], // media must be array (api doc)
    tags: tags.split(","), // Splits the tags strong into an array
    endsAt: isoString, // La til deadline
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

    // Render of new post on the page
    renderPost(response);
  } catch (error) {
    console.error("Error creating a new post:", error);
  }
});

// Rendering listing
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
  // La til [0] på media siden det nå er array
  // La til '.description' i stedet for '.body'
  postElement.innerHTML = `
    <img src="${post.media[0]}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${post.description}</p>
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
  window.location.href = `../idPage/index.html?id=${postId}`;
}
