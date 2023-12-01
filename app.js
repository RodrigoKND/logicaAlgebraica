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
    for (let i = 0; i < 3; i++) {
        const input = document.createElement('input');
        input.type = "text";
        input.placeholder = "Solo variables de texto unitarias";
        input.style.width = "18rem";
        input.classList.add("me-2", "variables", "text-center");
        getElement(".output", 1).appendChild(input);
    }

    onlyOneVariable();
}
let varUnitary = [];
const onlyOneVariable = () => {
    const variables = getElement(".variables", 2);
    variables.forEach(input => {
        input.addEventListener("change", e => {
            if (e.target.value) {
                ++count;
                variablesHeader.push(e.target.value);
                varUnitary.push(e.target.value);
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
let conditional = [];
let conjuntion = [];
let disyuntion = [];
let biconditional = [];
let negative = [];
const controlOperations = (inputValue) => {
    const split = inputValue.trim().split(" ");
    if (split.length > 1) {
        alert("No se puede dejar espacios en blanco para las funciones");
    } else {
        const firstElement = split[0].toString();
        for (let i = 0; i < firstElement.length; i++) {
            if (firstElement[i] === "=" && firstElement[i + 1] === ">") {
                conditional.push(firstElement[i - 1] + "➼" + firstElement[i + 2]);
                variablesHeader.push(firstElement[i - 1] + "➼" + firstElement[i + 2]);
            } else if (firstElement[i] === "&") {
                conjuntion.push(firstElement[i - 1] + "&" + firstElement[i + 1]);
                variablesHeader.push(firstElement[i - 1] + "&" + firstElement[i + 1]);
            } else if (firstElement[i] === "||") {
                disyuntion.push(firstElement[i - 1] + "||" + firstElement[i + 1]);
                variablesHeader.push(firstElement[i - 1] + "||" + firstElement[i + 1]);
            } else if (firstElement[i] === "<" && firstElement[i + 1] === "=" && firstElement[i + 2] === ">") {
                biconditional.push(firstElement[i - 1] + "↹" + firstElement[i + 3]);
                variablesHeader.push(firstElement[i - 1] + "↹" + firstElement[i + 3]);
            } else if (firstElement[i] === "-") {
                negative.push(firstElement[i + 1]);
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
const variablesSeem = (arrayLogic, input, numberElements, column, middle) => {
    arrayLogic.map(value => {
        if (value === variablesHeader[numberElements]) {
            if (column < middle) {
                input.classList.add("trusty");
                input.value = "V"
            } else {
                input.classList.add("falsy");
                input.value = "F"
            }
        }
    })
}
const getNextElement = (arrayOperation)=>{
    const lengthUnitary = varUnitary.length;
    for(let i = lengthUnitary; i < variablesHeader.length; i++){
        for(let j = 0; j < arrayOperation.length; j++){
            if(variablesHeader[i].includes(arrayOperation[j] )){
                const value = arrayOperation[j];
                operationResult(value);
            }   
        }
    }
}
const operationResult = (value)=>{
    const input = getElement("td input", 2);
    let valuesLogic = [];
    let elementsNoClass = [];
    input.forEach(element=>{
        if(element.classList.contains("trusty") || element.classList.contains("falsy")) valuesLogic.push(element.value);
        else elementsNoClass.push(element);
    })
    //[V V V V F F F F V V V V F F F F V V V V F F F F]
    
    console.log(valuesLogic.slice(valuesLogic.length/2));
    for(let i = 0; i < valuesLogic.length; i+=4){
        // for(let j = 1; j < trusty.length; j+= 2){
        //     if(value.includes("&")){
        //         if(trusty[i] === "V" && trusty[j] === "V"){
        //             elementsNoClass.forEach(element=>{
        //                 element.value = "V";
        //             })
        //         }else{
        //             elementsNoClass.forEach(element=>{
        //                 element.value = "F";
        //             })
        //         }
        //     }
        // }
    }
}

const createTable = () => {
    const table = getElement("table", 1);
    const tr = document.createElement("tr");
    const quantityVariables = variablesHeader.length;
    const middle = (Math.pow(2, varUnitary.length)) / 2;
    variablesHeader.map(content => {
        const th = document.createElement("th");
        th.innerHTML = content;
        tr.appendChild(th);
    })
    table.appendChild(tr);
    const tBody = document.createElement("tBody");
    const trBody = document.createElement("tr");
    for (let i = 0; i < quantityVariables; i++) {
        const td = document.createElement("td");
        for (let j = 0; j < Math.pow(2, varUnitary.length); j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("form-control", "border", "border-primary", "text-center");
            input.readOnly = true;
            variablesSeem(varUnitary, input, i, j, middle);
            td.appendChild(input);
        }
        trBody.appendChild(td);
        tBody.appendChild(trBody);
    }
    table.appendChild(tBody);
    getNextElement(conjuntion);
}