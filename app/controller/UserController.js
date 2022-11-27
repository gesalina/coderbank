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
    let { username } = response;
    let userList = databaseGet("users");
    userList.push({
        user: username,
        onSession: false
    });
    let receivedData = databaseUpload("users", userList);
    return receivedData;
  }
  /**
   *  Logea al usuario a la página correspondiente
   */
  login() {}
  /**
   * Actualiza los datos del usuario
   */
  update() {}
  /**
   *  Elimina al usuario
   */
  delete() {}
}

export { User };
