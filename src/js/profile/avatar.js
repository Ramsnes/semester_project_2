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
    // Retrieve access token and current profile name
    const accessToken = getFromLocalStorage("accessToken");
    const currentProfileName = getCurrentUserProfileName();

    // Construct API URL for updating avatar
    const apiUrl = `${BASE_API_URL}/auction/profiles/${currentProfileName}`;

    // Send PUT request to update avatar
    const response = await fetcher(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        avatar: {
          url: avatarUrl,
        },
      }),
    });

    // Check if request was successful
    if (response.status !== 200) {
      throw new Error(`Failed to update avatar. Status: ${response.status}`);
    }

    // Update avatar image on the frontend
    const avatarImage = document.getElementById("avatarImage");
    avatarImage.src = avatarUrl;
    console.log("Avatar updated successfully.");
  } catch (error) {
    console.error("Error updating avatar:", error.message);
    // Display error message to user
    alert("Failed to update avatar. Please try again later.");
  }
}

// fn to obtain the current user's profile name
function getCurrentUserProfileName() {
  // You need to implement this function based on how you track the current user's profile name
  // This could involve accessing it from local storage, session storage, or from a global variable
  // For example, if the profile name is stored in local storage under the key "currentProfileName":
  return getFromLocalStorage("currentProfileName");
}
