//Seleccionar elementos

export const getElement = (element = undefined, option = 1) => {
    if (option === 1) return document.querySelector(element);

    else return document.querySelectorAll(element);
}

