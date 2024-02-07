// registerUser.js

import { fetcher } from "../fetcher.js";
import { REGISTER_API_URL } from "../common/constants.js";

const form = document.querySelector("#registrationForm");
const name = document.querySelector("#registerUsername");
const email = document.querySelector("#registerEmail");
const password = document.querySelector("#registerPassword");

async function registerUser(user) {
  // POST request
  const postBody = JSON.stringify(user);
  const myData = await fetcher(REGISTER_API_URL, {
    method: "POST",
    body: postBody,
  });

  if (myData?.errors?.length > 0) {
    return alert(myData?.errors[0]?.message);
  }

  // Alert etter registrering fullført
  window.location.href = "/index.html";
  alert("User created");
}

// Form

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userRegistrationDetails = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  registerUser(userRegistrationDetails); //hoisted
});
