import { getElement } from "./funcionesGenerales.js";
let count = 0;
let variablesHeader = [];
getElement(".resultBtn").addEventListener("click", e => {
    const valueInput = getElement(".functions", 1).value;
    createInputUnitary();
    createInputsFunctions(Number(valueInput));
    getElement(".btnGenerate").classList.add("show");
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
            if (e.target.value) {
                ++count;
                variablesHeader.push(e.target.value);
            }
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
        input.placeholder = "Escribe funciones. Ej: p=>q,p<=>q,p||q,p&q";
        input.style.width = "18rem";
        input.classList.add("me-2", "operation", "text-center", "mt-4", "p-4", "border", "border-primary");

        getElement(".output", 1).appendChild(input);
    }
    onlyFunctions();
}

//Funcion para detectar el valor de los input de las funciones
const onlyFunctions = () => {
    const operation = getElement(".operation", 2);
    operation.forEach(input => {
        input.addEventListener("change", e => {
            e.preventDefault();
            controlOperations(e.target.value);
        })
    })
}

const controlOperations = (inputValue) => {
    const split = inputValue.trim().split(" ");
    if (split.length > 1) {
        alert("No se puede dejar espacios en blanco para las funciones");
    } else {
        const firstElement = split[0].toString();
        for (let i = 0; i < firstElement.length; i++) {
            if (firstElement[i] === "=" && firstElement[i + 1] === ">") {
                variablesHeader.push(firstElement[i - 1] + "➼" + firstElement[i + 2]);
            } else if (firstElement[i] === "&") {
                variablesHeader.push(firstElement[i - 1] + "&" + firstElement[i + 1]);
            } else if (firstElement[i] === "||") {
                variablesHeader.push(firstElement[i - 1] + "||" + firstElement[i + 1]);
            } else if (firstElement[i] === "<" && firstElement[i + 1] === "=" && firstElement[i + 2] === ">") {
                variablesHeader.push(firstElement[i - 1] + "↹" + firstElement[i + 3]);
            } else if (firstElement[i] === "-") {
                const div = document.createElement("div");
                div.classList.add("text-danger", "text-center");
                div.innerHTML = "No se puede negar manualmente, el sistema lo hará por usted";
                document.body.appendChild(div);
            }
        }
    }
}

getElement(".btnGenerate").addEventListener("click", () => {
    createTable();
})

const createTable = () => {
    const table = getElement("table", 1);
    const tr = document.createElement("tr");
    const valueInput = getElement(".functions", 1).value;
    const quantityVariables = count + Number(valueInput);
    const middle = (Math.pow(2, quantityVariables)) / 2;
    variablesHeader.map(content => {
        const th = document.createElement("th");
        th.innerHTML = content;
        tr.appendChild(th);
    })
    table.appendChild(tr);
    //Segundo for son las columnas
    const tBody = document.createElement("tBody");
    const trBody = document.createElement("tr");
    for (let j = 0; j < quantityVariables; j++) {
        const td = document.createElement("td");
        const input = document.createElement("input");

        input.readOnly = true;
        td.appendChild(input);
        trBody.appendChild(td);
        tBody.appendChild(trBody);
    }

    table.appendChild(tBody);
}