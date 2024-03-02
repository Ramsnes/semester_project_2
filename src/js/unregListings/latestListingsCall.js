// latestListingsCall.js
import { fetchUnregListings } from "./latestListings.js";

// Call fetchUnregListings function
fetchUnregListings()
  .then(() => {
    console.log("Listings fetched successfully.");
  })
  .catch((error) => {
    console.error("Error fetching listings:", error);
  });
