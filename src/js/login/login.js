// login.js
import { fetcher } from "../fetcher.js";
import { LOGIN_API_URL } from "../common/constants.js";
import { addToLocalStorage } from "../common/utils/localStorageUtil.js";

const form = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

async function loginUser(user) {
  const postBody = JSON.stringify(user);
  try {
    // Validates email domain on the server side
    const userLoginData = await fetcher(
      LOGIN_API_URL,
      {
        method: "POST",
        body: postBody,
        headers: {
          "Content-Type": "application/json",
        },
      },
      false
    );

    if (userLoginData.statusCode === 401) {
      return alert("Invalid email or password");
    }

    // Assuming the server returns a token on successful login
    const token = userLoginData.accessToken;

    // Ensure that the email is from a valid domain and from @noroff
    const validEmailDomains = ["@stud.noroff.no"];
    const isValidEmail = validEmailDomains.some((domain) =>
      user.email.endsWith(domain)
    );

    if (isValidEmail) {
      // Save token to local storage
      addToLocalStorage("accessToken", token);
      // Save username to local storage
      const username = userLoginData.name;
      addToLocalStorage("username", username);
      addToLocalStorage("avatarUrl", userLoginData?.avatar);

      window.location.href = "../src/js/feed/index.html";
    } else {
      console.error("Invalid email domain");
    }
  } catch (error) {
    console.error("Login failed", error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userLoginDetails = {
    email: email.value,
    password: password.value,
  };
  await loginUser(userLoginDetails); //hoisted
});
