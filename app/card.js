import { Card } from "../app/controller/CardController.js";
import { databaseGet, databaseUpload } from "../database/connection.js";

const createCard = async () => {
  /**
   * Obtiene el usuario actual y la lista de usuarios
   */
  let userOnline = databaseGet("actualUser");
  let userID = databaseGet("users");
  let container = document.getElementById("getcard");
  /**
   * Busca el id del usuario y llama a la clase Card para crear
   * una nueva tarjeta pasandole el id y el nombre de usuario
   */
  let searchUser = userID.find((result) => userOnline === result.user);
  let newCard = new Card(searchUser.userID, userOnline);
  newCard.create(newCard);
  container.remove();
  /**
   * Mostramos confirmación y recargamos la página
   */
  setTimeout(() => {
    location.reload();
  }, 1500);

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Su tarjeta ha sido aprobada",
    showConfirmButton: false,
    timer: 1500,
  });
};
/**
 * Función asincronica para pagar los gastos de la tarjeta
 */
const payCard = async () => {
  let userOnline = databaseGet("actualUser");
  let getCard = databaseGet("card");
  let payMovement = databaseGet("movements");

  /**
   * Obtenemos el valor del monto ingresado y lo actualizamos en el localstorage
   */
  const { value: ammount } = await Swal.fire({
    title: "Ingresa el monto a pagar",
    input: "text",
    inputPlaceholder: "Ingresa el monto en pesos",
    showCancelButton: true,
  });
  if (ammount) {
    let findCard = getCard.find((result) => userOnline === result.user);
    // Pasamos a float los valores recibidos
    findCard.money = parseFloat(findCard.money) + parseFloat(ammount);
    // Actualizamos los movimientos del usuario
    payMovement.push({
      user: userOnline,
      time: new Date().toLocaleString(),
      name: `Se registro un pago de $${ammount}`,
    });
    databaseUpload("card", getCard) || databaseUpload("movements", payMovement);
    /**
     * Creamos un timeout para recargar la página y mostrar los nuevos datos
     */
    setTimeout(() => {
      location.reload();
    }, 1500);
    /**
     * Mostramos una alerta que se cierra al mismo tiempo que el timeout
     */
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Su pago ha sido ingresado con exito!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
const withdrawMoney = async () => {
  let userOnline = databaseGet("actualUser");
  let getCard = databaseGet("card");
  let payMovement = databaseGet("movements");

  /**
   * Obtenemos el valor del monto ingresado y lo actualizamos en el localstorage
   */
  const { value: ammount } = await Swal.fire({
    title: "Ingresa el monto a retirar",
    input: "text",
    inputPlaceholder: "El monto debe ser en pesos",
    showCancelButton: true,
  });
  if (ammount) {
    let findCard = getCard.find((result) => userOnline === result.user);
    // Pasamos a float los valores recibidos
    findCard.money = parseFloat(findCard.money) - parseFloat(ammount);
    // Actualizamos los movimientos del usuario
    payMovement.push({
      user: userOnline,
      time: new Date().toLocaleString(),
      name: `Se registro un retiro de $${ammount}`,
    });
    databaseUpload("card", getCard) || databaseUpload("movements", payMovement);
    /**
     * Creamos un timeout para recargar la página y mostrar los nuevos datos
     */
    setTimeout(() => {
      location.reload();
    }, 1500);
    /**
     * Mostramos una alerta que se cierra al mismo tiempo que el timeout
     */
    Swal.fire({
      position: "center",
      icon: "success",
      title: "El retiro fue exitoso!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
export { createCard, payCard, withdrawMoney };
