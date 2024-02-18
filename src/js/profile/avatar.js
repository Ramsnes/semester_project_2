// avatar.js

import { fetcher } from "../fetcher.js";
import { BASE_API_URL } from "../common/constants.js";
import { getFromLocalStorage } from "../common/utils/localStorageUtil.js";

//
// Event listener for the "Update Avatar" button click
document.addEventListener("DOMContentLoaded", () => {
  const avatarInput = document.getElementById("avatarInput");
  const uploadAvatarBtn = document.getElementById("uploadAvatarBtn");

  uploadAvatarBtn.addEventListener("click", () => {
    const avatarUrl = avatarInput.value.trim();

    if (avatarUrl) {
      updateAvatar(avatarUrl);
    } else {
      console.error("URL field is empty.");
      // Display error message to user
      alert("Please enter the URL of the new avatar.");
    }
  });
});

//
// Function that retrieves accessToken and userName, sends PUT request with fetcher
async function updateAvatar(avatarUrl) {
  try {
    // Retrieve access token and username from local storage
    const accessToken = getFromLocalStorage("accessToken");
    const username = getFromLocalStorage("username");

    // Check if username is null or undefined
    if (!username) {
      console.error("Username is not available in local storage");
      return;
    }

    // Construct API URL for updating avatar with the username
    const apiUrl = `${BASE_API_URL}/auction/profiles/${username}/media`;

    // Send PUT request to update avatar
    const response = await fetcher(
      apiUrl,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          avatar:
            "https://akamai.vgc.no/users/schibsted/images/101574301.jpg?t[strip]=1&t[crop][x]=0&t[crop][y]=0&t[crop][width]=3114&t[crop][height]=2176&t[resize][width]=1350&accessToken=a66734f2002c3b811060ad25c93992c1fa10c23d43113dcb1e93eb7d3decc5de",
        }),
      },
      true
    );

    // Update avatar image on the frontend
    const avatarImage = document.getElementById("avatarImage");
    avatarImage.src = response.avatar;
    console.log("Avatar updated successfully.");
  } catch (error) {
    console.error("Error updating avatar:", error.message);
    // Display error message to user
    alert("Failed to update avatar. Please try again later.");
  }
}
