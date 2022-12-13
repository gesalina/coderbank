/**
 * Importamos las funciones necesarias para iterar con
 * la base de datos.
 */
import { databaseGet, databaseUpload } from "../../database/connection.js";
/**
 *  Clase principal de usuario
 */
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  /**
   *  Obtiene los datos de usuarios
   */
  get(response) {
    let receivedData = databaseGet(response);
    return receivedData;
  }

  /**
   *  Crea y almacena un usuario nueva en la base de datos
   */
  create(response) {
    let { username, password } = response;
    let userList = databaseGet("users");
    userList.push({
      userID: Math.floor(Math.random() * 10000 + 10),
      user: username,
      password: password
    });
    let receivedData =
      databaseUpload("users", userList) || databaseUpload("onSession", "false") || databaseUpload("hasOneCard", "false");
    return receivedData;
  }
}

export { User };
