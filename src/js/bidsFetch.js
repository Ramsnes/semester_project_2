// bidsFetch.js

import { fetcher } from "./fetcher.js";
import { BASE_API_URL } from "./common/constants.js";

// Using fetcher and modifies it to GET the ID of who's made a bid
export async function fetchBidsForListing(listingId) {
  const apiUrl = `${BASE_API_URL}/auction/listings/${listingId}/bids`;
  try {
    const response = await fetcher(apiUrl, { method: "GET" }, true);
    return response;
  } catch (error) {
    console.error("Error fetching bids for listing:", error);
    throw error;
  }
}

const bidResponse = await fetchBidsForListing(EN_LISTING_ID);
const itemList = document.getElementById("item-list");

bidResponse.bids.forEach((bid) => {
  const li = document.createElement("li");
  li.textContent = bid.amount; // Assuming each bid has an 'amount' property
  itemList.appendChild(li);
});
