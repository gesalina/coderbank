const messageList = [
  {
    type: "data_needed",
    message: "No se recibieron datos para realizar la consulta",
  },
  {
    type: "local_storage_loaded",
    message: "Los datos fueron correctamente guardados",
  },
  {
    type: "action_complete",
    message: "Se realizo con exito",
  },
  {
    type: "action_incomplete",
    message: "No se pudo realizar con exito",
  },
];

const errorHandler = (messageType) => {
  let result;
  messageList.map((messageResult) => {
    if (messageType === messageResult.type) {
      result = console.log(messageResult.message);
    }
  });
  return result;
};

export { errorHandler };
