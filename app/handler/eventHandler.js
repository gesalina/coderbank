/**
 * Maneja los eventos
 * @returns called function()
 */

const eventHandler = (element,event,toDo) => {
  let getElement = document.getElementById(element);
  let result;
  if(getElement){
      result = getElement.addEventListener(event,toDo);
  }
  return result;
}

export { eventHandler };
