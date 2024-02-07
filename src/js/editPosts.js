// editPost.js
import { fetcher } from "./fetcher.js";
import { BASE_API_URL } from "./common/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  // Get post ID from the URL
  const postId = new URLSearchParams(window.location.search).get("id");

  // Fetche post details
  const apiUrl = `${BASE_API_URL}/social/posts/${postId}`;

  fetcher(apiUrl, { method: "GET" }, true)
    .then((postDetails) => {
      // inputs pre-filled
      document.getElementById("editPostTitle").value = postDetails.title || "";
      document.getElementById("editPostBody").value = postDetails.body || "";
      document.getElementById("editPostMedia").value = postDetails.media || "";
      document.getElementById("editPostTag").value =
        postDetails?.tags?.join(", ") || "";
    })
    .catch((error) => {
      console.error("Error fetching post details for editing", error);
    });
});

// even listener
document.getElementById("editPostForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // collect values from input fields
  const title = document.getElementById("editPostTitle").value;
  const body = document.getElementById("editPostBody").value;
  const media = document.getElementById("editPostMedia").value;
  const tags = document
    .getElementById("editPostTag")
    .value.split(",")
    // Removes whitespace from the tags
    .map((tag) => tag.trim());

  // Get post ID from the URL
  const postId = new URLSearchParams(window.location.search).get("id");

  // PUT url with id
  const apiUrl = `${BASE_API_URL}/social/posts/${postId}`;

  fetcher(
    apiUrl,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, media, tags }),
    },
    true
  )
    .then(() => {
      const redirectUrl = `/idPage/index.html?id=${postId}`;
      window.location.href = redirectUrl;
    })
    .catch((error) => {
      console.error("Error updating post details", error);
    });
});
