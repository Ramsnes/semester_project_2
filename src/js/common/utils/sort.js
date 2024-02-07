// Sort.js
document.getElementById("sortLatest").addEventListener("click", function () {
  sortPosts("latest");
});

document.getElementById("sortOldest").addEventListener("click", function () {
  sortPosts("oldest");
});

document.getElementById("sortAZ").addEventListener("click", function () {
  sortPosts("az");
});

document.getElementById("sortZA").addEventListener("click", function () {
  sortPosts("za");
});

function sortPosts(sortBy) {
  const postsContainer = document.getElementById("postsContainer");
  const posts = Array.from(postsContainer.children);

  // case names appended to id's in feed html
  switch (sortBy) {
    case "latest":
      posts.sort((a, b) => {
        const dateA = new Date(a.getAttribute("data-created"));
        const dateB = new Date(b.getAttribute("data-created"));
        return dateB - dateA;
      });
      break;
    case "oldest":
      posts.sort((a, b) => {
        const dateA = new Date(a.getAttribute("data-created"));
        const dateB = new Date(b.getAttribute("data-created"));
        return dateA - dateB;
      });
      break;
    case "az":
      posts.sort((a, b) =>
        a
          .querySelector(".card-title")
          .innerText.localeCompare(b.querySelector(".card-title").innerText)
      );
      break;
    case "za":
      posts.sort((a, b) =>
        b
          .querySelector(".card-title")
          .innerText.localeCompare(a.querySelector(".card-title").innerText)
      );
      break;
    default:
      break;
  }

  posts.forEach((post) => {
    postsContainer.appendChild(post);
  });
}
