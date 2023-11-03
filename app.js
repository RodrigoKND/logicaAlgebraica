/*
    -- Tenemos que definir la logica booleana de dos expresiones
    -- Mostrarle en una tabla los valores hechos con falso y verdadero
*/

const input = document.querySelector('input');
const variables = document.querySelector('.variables');

const resultBtn = document.querySelector('.resultBtn');
const textWarning = document.querySelector('.warning');

resultBtn.addEventListener('click', () => {
    const splitResult = input.value.trim().split('');
    detectWhiteSpaces(splitResult);
    console.log(splitResult);
})

const detectWhiteSpaces = (array) => {
    for(let i =0; i< array.length; i++){
        if(array[i] === ' '){
            textWarning.textContent = 'Error en el cálculo, no debe dejar espacios en blanco';
            return;
        }
    }
    detectVariables(array);
}

const detectVariables = (arrayVariables)=>{
    let count = 0;
    arrayVariables.filter(value=>{
        if(value.match(/[a-zA-Z]/g)){
            count++;
            console.log(value)
            console.log(count)
        }
    })
    if(!variables.value){
        textWarning.textContent = 'No debe dejar vacio ningún elemento';
    }

    if(String(count) !== variables.value){
        detectVariables(arrayVariables);
    }
}