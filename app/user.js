/**
 * Importamos los archivos necesarios
 */
import { User } from "./controller/UserController.js";
import { sucessfullyRegisterTemplate } from "../templates/login.js";
import { eventHandler } from "./handler/eventHandler.js";
import { showLoginTemplate } from "./handler/viewhandler.js";
import { databaseGet } from "../database/connection.js";

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
  // if (password.value < 8) {
  //   errorBox.innerHTML = "La contraseña debe ser mayor a 8 caracteres";
  // }

  // Creamos un nuevo usuario con los valor obtenidos
  let newUser = new User(username.value, email.value, password.value);

  // Obtiene los usuarios desde el localstorage
  let userList = newUser.get("users");

  // Valida que el usuario ingresado no exista
  let findUser = userList.find((result) => username.value === result.user);

  let validateUser = findUser
    ? (errorBox.innerHTML = "El usuario existe")
    : false;

  if (!validateBlank && !validatePassword && !validateUser) {
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
  let findUser = searchUser.find((result) => username.value === result.user);
  let inexistentUser = !findUser
    ? (errorBox.innerHTML = "El usuario no existe en nuestros registros")
    : false;
  if (!inexistentUser && !validateBlank) {
    errorBox.innerHTML = "Usuario validado";
    /**
     * Proxima version:
     * Cambiar el estado de onSession a true para validar sesión
     * Redirigir a home.html
     */
  }
};
export { createUser, authenticateUser };
