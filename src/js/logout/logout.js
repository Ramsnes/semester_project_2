import { removeFromLocalStorage } from "../common/utils/localStorageUtil.js";

const logoutUser = () => {
  try {
    removeFromLocalStorage("accessToken");
    window.location.href = "/index.html";
  } catch (error) {
    console.error("Error during logout", error);
  }
};

const logoutButton = document.querySelector("#logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", logoutUser);
}
