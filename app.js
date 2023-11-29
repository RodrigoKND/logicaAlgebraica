import { getElement } from "./funcionesGenerales.js";

getElement(".resultBtn").addEventListener("click", e => {
    const valueInput = getElement(".functions", 1).value;
    createInputUnitary();
    createInputsFunctions(Number(valueInput));
})

const createInputUnitary = () => {
    for (let i = 0; i < 4; i++) {
        const input = document.createElement('input');
        input.type = "text";
        input.placeholder = "Solo variables de texto unitarias";
        input.style.width = "18rem";
        input.classList.add("me-2", "variables", "text-center");
        getElement(".output", 1).appendChild(input);
    }

    onlyOneVariable();
}

const onlyOneVariable = () => {
    const variables = getElement(".variables", 2);
    variables.forEach(input => {
        input.addEventListener("change", e => {
            if (e.target.value.length > 1) {
                alert("Solo se debe poner una variable");
                e.target.value = "";
                e.preventDefault();
            }
        })
    })
}

const createInputsFunctions = (numberInput) => {
    for (let i = 0; i < numberInput; i++) {
        const input = document.createElement('input');
        input.type = "text";
        input.placeholder = "Escribe tus funciones";
        input.style.width = "18rem";
        input.classList.add("me-2", "operation", "text-center", "mt-4", "p-4", "border", "border-primary");

        getElement(".output", 1).appendChild(input);
    }
}

const onlyFunctions = () => {
    const operation = getElement(".operation", 2);
    operation.forEach(input => {
        input.addEventListener("change", e => {
            //Controlar los input de las funciones.
        })
    })
}