
import { errorHandler } from '../app/handler/errorHandler.js'
/**
 * Consulta a la base de datos y obtiene los valores
 * de la base de datos consultada
 * @returns Object
 */
const databaseGet = (name) => {
  let internalDatabase = localStorage.getItem(name);
  if (!internalDatabase) {
    return [];
  }
  let result = JSON.parse(internalDatabase);
  return result;
};
/**
 * Carga los datos obtenidos y los inserta en la base de datos
 * @returns
 */
const databaseUpload = (to, data) => {
  if (!to || !data) {
    return false
  }
  return localStorage.setItem(to, JSON.stringify(data));
};

export {databaseGet,databaseUpload, errorHandler};