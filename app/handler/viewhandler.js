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
/*
* Muestra el formulario de inicio de sesión
*/
function showLoginTemplate() {
  let container = document.getElementById("inputContainer");
  container.innerHTML = loginTemplate();
  eventHandler("registerForm", "click", showRegisterTemplate);
  eventHandler("login", "click", authenticateUser);
}
/*
* Muestra el formulario de registro
*/
function showRegisterTemplate() {
  let container = document.getElementById("inputContainer");
  container.innerHTML = registerTemplate();
  eventHandler("loginForm", "click", showLoginTemplate);
  eventHandler("register", "click", createUser);
}
/*
* Muestra un mensaje de registro exitoso
*/
function registerSuccesfully() {
  let formContent = "";
  let container = document.getElementById("container");
  formContent += sucessfullyRegisterTemplate();
  container.innerHTML = "";
  container.innerHTML = formContent;
}
/*
* Función asincronica que obtiene los anuncios principales
*/
async function showAdv() {
  let container = document.getElementById("mainpage");
  let savetext = "";
  /*
  * Evalua que exista el container para poder iniciar el fetch
  */
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
