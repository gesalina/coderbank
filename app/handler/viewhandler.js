/**
 * EventHandler
 * Maneja los eventos que suceden en las diferentes vistas
 */

import { eventHandler } from "../handler/eventHandler.js";
import {
  loginTemplate,
  registerTemplate,
  sucessfullyRegisterTemplate,
} from "../../templates/login.js";
import { createUser, authenticateUser } from "../user.js";

function showLoginTemplate() {
  let container = document.getElementById("inputContainer");
  container.innerHTML = loginTemplate();
  eventHandler("registerForm", "click", showRegisterTemplate);
  eventHandler("login", "click", authenticateUser);
}
function showRegisterTemplate() {
  let container = document.getElementById("inputContainer");
  container.innerHTML = registerTemplate();
  eventHandler("loginForm", "click", showLoginTemplate);
  eventHandler("register", "click", createUser);
}
function registerSuccesfully() {
  let formContent = "";
  let container = document.getElementById("container");
  formContent += sucessfullyRegisterTemplate();
  container.innerHTML = "";
  container.innerHTML = formContent;
}
async function showAdv() {
  let container = document.getElementById("mainpage");
  let savetext = "";
  if (container) {
    fetch("../../database/data.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((advs) => {
          savetext += advs.text;
          container.innerHTML = `
      <div class="maintext">
      <a href="/login.html">${savetext}</a>
      </div>
      `;
          container.style.backgroundImage = `url(${advs.img})`;
        });
      });
  }
}
showAdv();

export { showLoginTemplate, showRegisterTemplate, registerSuccesfully };
