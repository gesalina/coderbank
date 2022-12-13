/**
 * Clase que crea las tarjeta de credito y se la asigna al usuario
 */
import { databaseGet, databaseUpload } from "../../database/connection.js";

class Card {
  constructor(id, username) {
    this.id = id;
    this.username = username;
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
    let { id, username } = response;
    let cardList = databaseGet("card");
    let time = new Date().toLocaleString();
    let movements = [];
    let cardnumber = "";
    // Crear el número de la tarjeta de forma aleatoria
    for (let i = 0; i <= 17; i++) {
      let creatRandomNumber = Math.floor(Math.random() * 10);
      cardnumber += creatRandomNumber.toString();
    }
    cardList.push({
      cardOwnerId: id,
      user: username,
      cardId: cardnumber,
      thru: "01/22",
      exp: "01/28",
      ccv: "123",
      money: 230000,
    });
    movements.push({
      user: username,
      time: time,
      name: "Se registro una tarjeta",
    });
    let receivedData =
      databaseUpload("card", cardList) ||
      databaseUpload("hasOneCard", true) ||
      databaseUpload("movements", movements);
    return receivedData;
  }
}

export { Card };
