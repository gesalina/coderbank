/**
 * Importamos los archivos necesarios
 */
import { User } from "./controller/UserController.js";
import {
  sucessfullyRegisterTemplate,
  showCardInfo,
} from "../templates/login.js";
import { eventHandler } from "./handler/eventHandler.js";
import { showLoginTemplate } from "./handler/viewhandler.js";
import { databaseGet, databaseUpload } from "../database/connection.js";
import { createCard, payCard, withdrawMoney } from "./card.js";

const createUser = () => {
  /**
   * default: input
   */
  const elementTag = "input";
  const data = document.getElementsByTagName(elementTag);
  // Obtiene el container con los inputs y el <div> para mostrar los errores
  const container = document.getElementById("inputContainer");
  let errorBox = document.getElementById("errors");

  let [username, email, password, repeatPassword] = data;

  // Validamos que existan todos los datos solicitados
  let validateBlank =
    !username.value || !email.value || !password.value || !repeatPassword.value
      ? (errorBox.innerHTML = "Debe ingresar todos los datos")
      : false;

  let validatePassword =
    password.value !== repeatPassword.value
      ? (errorBox.innerHTML = "Las contraseñas no coinciden")
      : false;

  let validateLength =
    password.value < 8
      ? (errorBox.innerHTML = "La contraseña debe ser mayor a 8 caracteres")
      : false;

  // Creamos un nuevo usuario con los valor obtenidos
  let newUser = new User(username.value, email.value, password.value);

  // Obtiene los usuarios desde el localstorage
  let userList = newUser.get("users");

  // Valida que el usuario ingresado no exista
  let findUser = userList.find((result) => username.value === result.user);

  let validateUser = findUser
    ? (errorBox.innerHTML = "El usuario existe")
    : false;

  if (!validateBlank && !validatePassword && !validateUser && !validateLength) {
    newUser.create(newUser);
    container.innerHTML = sucessfullyRegisterTemplate();
    eventHandler("loginForm", "click", showLoginTemplate);
  }
};
/**
 * Auntentica al usuario con los almacenados
 */
const authenticateUser = () => {
  /**
   * default: input
   */
  const elementTag = "input";
  const data = document.getElementsByTagName(elementTag);
  // Obtiene el <div> para mostrar los errores
  let errorBox = document.getElementById("errors");
  let [username, password] = data;

  let validateBlank =
    !username.value || !password.value
      ? (errorBox.innerHTML = "Debe ingresar todos los datos")
      : false;

  let searchUser = databaseGet("users");
  let validateSession = databaseGet("onSession");
  let findUser = searchUser.find((result) => username.value === result.user);
  let inexistentUser = !findUser
    ? (errorBox.innerHTML = "El usuario no existe en nuestros registros")
    : false;
  if (!inexistentUser && !validateBlank) {
    // Previene cambiar el estado de la sesión a abierta si esta ya lo esta.
    if (validateSession === "false") {
      databaseUpload("onSession", "true");
    }
    databaseUpload("actualUser", username.value);
    location.href = "home.html";
  }
};
function userOnSession() {
  let validateSession = databaseGet("onSession");
  let userOnline = databaseGet("actualUser");
  let hasOneCard = databaseGet("hasOneCard");
  if (validateSession === "false") {
    location.href = "login.html";
  }
  // Activa el botón de logout en la navegación del sitio
  eventHandler("logout", "click", logout);
  let showInfo = document.getElementById("userName");
  const homeContainer = document.getElementById("container");
  showInfo.innerHTML = `Hola ${userOnline}`;

  /**
   * Si el usuario no posee una tarjeta, muestra el botón para solicitar una
   */
  if (hasOneCard === "false") {
    homeContainer.style.margin = "0px";
    homeContainer.innerHTML = `
    <div class="getcard">
    <div class="getcardinfo">
    <h3>Para empezar a operar, solicita tu tarjeta totalmente gratis!</h3>
    <button class="getcardbutton" id="getcard">Solicitar tarjeta</button>
    </div>
    </div>`;
    eventHandler("getcard", "click", createCard);
  } else {
    /**
     * En caso que tenga una tarjeta, la muestra en la vista home
     */
    let getCard = databaseGet("card");
    let getMovements = databaseGet("movements");
    let findCard = getCard.find((result) => userOnline === result.user);
    let findMovements = getMovements.filter(
      (result) => userOnline === result.user
    );

    homeContainer.innerHTML = showCardInfo(findCard, findMovements);
    eventHandler("paycard", "click", payCard) ||
      eventHandler("withdraw", "click", withdrawMoney);
  }
}
/**
 * Función para cerrar la sesión
 */
const logout = () => {
  databaseUpload("onSession", "false");
  location.href = "login.html";
};
export { createUser, authenticateUser, userOnSession, logout };
