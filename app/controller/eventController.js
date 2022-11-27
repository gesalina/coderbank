const eventController = (element,event,toDo) => {
    let getElement = document.getElementById(element);
    let result;
    if(getElement){
        result = getElement.addEventListener(event,toDo);
    }
    return result;
}

export {eventController};