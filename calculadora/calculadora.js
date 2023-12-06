import { getElement } from "../funcionesGenerales.js";

getElement(".exit", 1).addEventListener("click", () => {
    getElement(".manual", 1).style.display = "none";
    getElement(".seeman", 1).classList.add("showBtnMan");
})
getElement(".seeman", 1).addEventListener("click", () => {
    getElement(".manual", 1).style.display = "block";
})

let valueInput;
getElement(".resultBtn").addEventListener("click", e => {
    valueInput = getElement(".functions", 1).value;
    if (valueInput > 1 && valueInput <= 3) {
        createTable(Number(valueInput));
        getElement(".resultBtn").setAttribute("disabled", "true")
    }
    else alert("Lo siento, por ahora se realiza hasta 3 x 3")
})

const createTable = (number) => {
    const table = getElement("table", 1);
    const tr = document.createElement("tr");
    tr.className = "header";
    for (let i = 0; i < number; i++) {
        const th = document.createElement("th");
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("form-control", "border", "border-secondary", "text-center");
        input.placeholder = "Nombre variable";
        input.setAttribute("col", i);
        input.setAttribute("row", i);
        th.appendChild(input);
        tr.appendChild(th);
    }
    table.appendChild(tr);
    const tBody = document.createElement("tBody");
    const trBody = document.createElement("tr");
    for (let i = 0; i < number; i++) {
        const td = document.createElement("td");
        const middle = (Math.pow(2, number)) / 2;
        for (let j = 0; j < Math.pow(2, number); j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("form-control", "border", "border-primary", "text-center");
            input.setAttribute("row", j);
            input.setAttribute("col", i);
            input.readOnly = true;
            if (j < middle) input.value = "V"
            else input.value = "F"
            td.appendChild(input);
        }
        trBody.appendChild(td);
        tBody.appendChild(trBody);
    }
    table.appendChild(tBody);
    getHeadersNoException();
    getInputHeader();
}
const getInputHeader = () => {
    const th = getElement("th input", 2);
    th.forEach(input => {
        focusHeaderTable(input);
    })
}
const focusHeaderTable = (inputHeader) => {
    inputHeader.addEventListener("click", e => {
        if (e.target.value) {
            inputHeader.readOnly = true;
            const response = prompt(`¿Qué opción quieres? \n 
            1. Conjugacion
            2. Disyuncion 
            3. Condicional
            4. Bicondicional\n`)
            if (response !== null) {
                switch (response) {
                    case "1":
                        const responseHeaders = getHeaders(e.target.value);
                        if (responseHeaders === true) {
                            alert("No existen más elementos para conjugar");
                            break;
                        } else {
                            const resp = prompt("¿Cual fila quieres conjugar?" + " " + responseHeaders.arrayHeaders.toString().toUpperCase());
                            if (resp !== null) {
                                if (resp.includes("<=>")) {
                                    const replacevalue = resp.replace(/<=>/g, "↹");
                                    createColumnAdd(e.target.value, replacevalue, "&", undefined, "y");
                                    break;
                                } else createColumnAdd(e.target.value, resp, "&", undefined, "y");
                                break;
                            } else break;
                        }
                    case "2":
                        const responseHeader = getHeaders(e.target.value);
                        if (responseHeader === true) {
                            alert("No existen más elementos para realizar la operación");
                            break;
                        } else {
                            const resp = prompt("¿Cual fila quieres deseas realizar?" + " " + responseHeader.arrayHeaders.toString().toUpperCase());
                            if (resp !== null) {
                                if (resp.includes("<=>")) {
                                    const replacevalue = resp.replace(/<=>/g, "↹");
                                    createColumnAdd(e.target.value, replacevalue, "||", undefined, "o");
                                    break;
                                }
                                createColumnAdd(e.target.value, resp, "||", undefined, "o");
                                break;
                            } else break;
                        }
                    case "3":
                        const responseHead = getHeaders(e.target.value);
                        if (responseHead === true) {
                            alert("No existen más elementos para realizar la operación");
                            break;
                        } else {
                            const resp = prompt("¿Cual fila quieres hacer la condicional?" + " " + responseHead.arrayHeaders.toString().toUpperCase());
                            if (resp !== null) {
                                if (resp.includes("=>")) {
                                    const replacevalue = resp.replace(/=>/g, "➼");
                                    createColumnAdd(e.target.value, replacevalue, "➼", "V", "c");
                                    break;
                                } else {
                                    createColumnAdd(e.target.value, resp, "➼", "V", "c");
                                    break;
                                }
                            } else break;
                        }
                    case "4":
                        const response = getHeaders(e.target.value);
                        if (response === true) {
                            alert("No existen más elementos para realizar la operación");
                            break;
                        } else {
                            const resp = prompt("¿Cual fila quieres realizar la bicondicional?" + " " + response.arrayHeaders.toString().toUpperCase());
                            if (resp !== null) {
                                if (resp.includes("<=>")) {
                                    const replacevalue = resp.replace(/<=>/g, "↹");
                                    createColumnAdd(e.target.value, replacevalue, "↹", "V", "b");
                                    betweenTwoColumns(e.target.value, replacevalue);
                                    break;
                                } else {
                                    createColumnAdd(e.target.value, resp, "↹", "V", "b");
                                    betweenTwoColumns(e.target.value, resp);
                                }
                                break;
                            } else break;
                        }
                    default:
                        alert("No existe esa opción");
                }
            }
        }
    });
}
const getHeadersNoException = () => {
    let saveHeaders = [];
    const headers = getElement("th input", 2);
    headers.forEach(input => {
        saveHeaders.push(input.value);
    })

    return saveHeaders;
}
const getHeaders = (valueClick) => {
    let arrayHeaders = [];
    let isError = false;
    const headers = getElement("th input", 2);
    headers.forEach(input => {
        if (input.value !== valueClick) {
            arrayHeaders.push(input.value);
        }
    })

    if (arrayHeaders.length === 0 || arrayHeaders[0] === "") return isError = true;

    return { arrayHeaders, isError }
}

const createColumnAdd = (elementClick, nextElement, valueVariado, valueCells = undefined, nameoperation) => {
    const arrayHeaders = getHeadersNoException();
    let indexElement = arrayHeaders.indexOf(arrayHeaders[arrayHeaders.length - 1]);
    const header = getElement(".header", 1);
    const th = document.createElement("th");
    const input = document.createElement("input");
    input.setAttribute("col", `${indexElement + 1}`);
    input.setAttribute("row", 0);
    input.type = "text";
    input.readOnly = true;
    input.value = elementClick + valueVariado + nextElement;
    if (nameoperation === "y") {
        input.classList.add("form-control", "border", "border-primary", "text-center", "bg-primary", "text-white");
    } else if (nameoperation === "o") {
        input.classList.add("form-control", "border", "border-primary", "text-center", "bg-danger", "text-white");
    } else if (nameoperation === "c") {
        input.classList.add("form-control", "border", "border-primary", "text-center", "bg-warning");
    } else if (nameoperation === "b") {
        input.classList.add("form-control", "border", "border-primary", "text-center", "bg-success", "text-white");
    }

    th.appendChild(input);

    header.appendChild(th);
    if (valueCells === undefined) {
        createTDtable(valuesMatrizDetect(), true)
    } else {
        createTDtable(valueCells, false);
    }
}
const createTDtable = (valueCells, confirmMessage) => {
    if (confirmMessage) {
        const arrayHeaders = getHeadersNoException();
        let indexElement = arrayHeaders.indexOf(arrayHeaders[arrayHeaders.length - 1]);
        const td = document.createElement("td");
        for (let i = 0; i < Math.pow(2, valueInput); i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.readOnly = true;
            input.value = valueCells[i];
            input.setAttribute("row", i);
            input.setAttribute("col", `${indexElement}`);
            input.classList.add("form-control", "border", "border-primary", "text-center");
            td.appendChild(input);

            getElement("tBody tr", 1).appendChild(td);
        }
    } else {
        const arrayHeaders = getHeadersNoException();
        let indexElement = arrayHeaders.indexOf(arrayHeaders[arrayHeaders.length - 1]);
        const td = document.createElement("td");
        for (let i = 0; i < Math.pow(2, valueInput); i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.readOnly = true;
            input.value = valueCells;
            input.setAttribute("row", i);
            input.setAttribute("col", `${indexElement}`);
            input.classList.add("form-control", "border", "border-primary", "text-center");
            td.appendChild(input);

            getElement("tBody tr", 1).appendChild(td);
        }
    }
}
const valuesMatrizDetect = () => {
    const inputValues = getElement("td input", 2);
    const valueFirst = [];
    for (let i = 0; i < Math.pow(2, valueInput); i++) {
        valueFirst.push(inputValues[i].value)
    }
    return valueFirst;
}

const betweenTwoColumns = (valueClick, valueResponse) => {
    const inputs = getElement("td input", 2);
    const headers = getElement("th input", 2);
    let col = "", row = "", colOrigin = "";
    headers.forEach(input => {
        if (input.value === valueResponse) {
            col = input.getAttribute("col");
            row = input.getAttribute("row");
        } else if (input.value === valueClick) {
            colOrigin = input.getAttribute("col");
        }
    })
    // console.log(col)
    let countV = 0, countFOrigin = 0;
    console.log("LOngitryd", inputs.length, "cola llegar", col, "col donde se da click", colOrigin)

    for (let i = 0; i < inputs.length; i++) {
        //Columna a llegar
        if (inputs[i].getAttribute("col") === col) {
            if (inputs[i].value !== "F") {
                countV++;
            }
        }
        if (inputs[i].getAttribute("col") === colOrigin) {
            if (inputs[i].value !== "V") {
                countFOrigin++;
            }
        }
    }
    if (countFOrigin > 0 && countV > 2) {
        const middleColumn = Math.pow(2, valueInput) / 2;
        for (let i = 0; i < inputs.length; i++) {
            if (Number(inputs[i].getAttribute("col")) === Number(col) + 1 && Number(inputs[i].getAttribute("row")) >= middleColumn) {
                inputs[i].value = "F";
            }
        }
    }
}





