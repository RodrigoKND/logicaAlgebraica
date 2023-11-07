const input = document.querySelector('input');
const variables = document.querySelector('.variables');

const resultBtn = document.querySelector('.resultBtn');
const textWarning = document.querySelector('.warning');

const table = document.querySelector('table');

resultBtn.addEventListener('click', () => {
    const splitResult = input.value.trim().split('');
    detectWhiteSpaces(splitResult);
    // console.log(splitResult);
})

const detectWhiteSpaces = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === ' ') {
            textWarning.textContent = 'Error en el cálculo, no debe dejar espacios en blanco';
            return;
        }
    }
    detectVariables(array);
}

const detectVariables = (arrayVariables) => {
    let count = 0;
    let valuesVariables = [];
    arrayVariables.filter(value => {
        if (value.match(/[a-zA-Z]/g)) {
            count++;
            valuesVariables.push(value);
        }
    })

    if (!variables.value) {
        textWarning.textContent = 'No debe dejar vacio ningún elemento';
    } else textWarning.textContent = '';

    if (count === Number(variables.value)) {
        //obtener las variables del ejercicio
        //Hay que ponerlo en la tabla igual
        createVariablesTable(table, valuesVariables);
        createBodyTablesVariables(table, count);
    } else textWarning.textContent = 'El valor de las variables tiene que ser igual al de su ejercicio';
}

const createVariablesTable = (table, valuesVariables) => {
    const tr = document.createElement('tr');
    valuesVariables.map(value => {
        const th = document.createElement('th');
        th.textContent += value.toLocaleUpperCase();
        tr.appendChild(th);
    })

    table.appendChild(tr);
}

const createBodyTablesVariables = (table, quantityVariables) => {
    const tr = document.createElement('tr');
    const powVariables = Math.pow(2, quantityVariables);
    for (let i = 0; i < quantityVariables; i++) {
        const td = document.createElement('td');
        for (let j = 0; j < powVariables; j++) {
            const input = document.createElement('input');
            input.style.fontWeight = '600';
            input.classList.add('form-control', 'contentTable', 'text-center', 'text-uppercase');
            td.appendChild(input);
            tr.appendChild(td);
        }
    }

    table.appendChild(tr);
}
/*
    De acuerdo a la cantidad de variables se debe sacar la formula para decidir
    cuantas columnas del cuerpo de la tabla se debe crear y que los td tengan dentro
    un input o un contentEditable
*/