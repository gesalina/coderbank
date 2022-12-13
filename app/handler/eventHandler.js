/**
 * Rutas permitidas para utilizar loadHandler
 */
const routes = [{
  web: 'http://127.0.0.1:5500/home.html'
}];

/**
 * Maneja los eventos
 * @returns called function()
 */

const eventHandler = (element, event, toDo) => {
  let getElement = document.getElementById(element);
  let result;
  if (getElement) {
    result = getElement.addEventListener(event, toDo);
  }
  return result;
};

/**
 * 
 * Maneja los eventos al cargar una página especifica
 * 
 */
const loadHandler = (event, route, toDo) => {
  let findRoute = routes.find((result) => route === result.web);
  let result = !event && !toDo && route ? true : false;
  let getElement;
  if (!result && findRoute) {
    getElement = window.addEventListener(event, toDo);
  }
  return getElement;
};
export { eventHandler, loadHandler };
