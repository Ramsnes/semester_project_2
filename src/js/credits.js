// credits.js
import { fetcher } from "../js/fetcher.js";
import { getFromLocalStorage } from "../js/common/utils/localStorageUtil.js";
import { BASE_API_URL } from "./common/constants.js";

document.addEventListener("DOMContentLoaded", async () => {
  const displayCredit = async () => {
    try {
      // Fetches username from local storage
      const username = getFromLocalStorage("username");

      if (!username) {
        console.error("Username not available");
        return;
      }

      // Fetch credit
      const creditsResponse = await fetcher(
        `${BASE_API_URL}/auction/profiles/${username}/credits`,
        { method: "GET" },
        true
      );

      // Display credit
      const totalCreditElement = document.getElementById("totalCredit");
      totalCreditElement.innerText = `Total Credit: ${creditsResponse.credits}`;
    } catch (error) {
      console.error("Error fetching credit:", error.message);
    }
  };

  // Call the function
  await displayCredit();
});
