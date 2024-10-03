let num1 = 0;
let num2 = 0;
let opt = '';
const precision = 10;
let overwrite = true;

const display = document.querySelector('#display');
const numpad = document.querySelectorAll('button.numpad');
const operator = document.querySelectorAll('button.operator');
const btnDot = document.querySelector('#b-dot');
const btnAC = document.querySelector('#b-ac');
const btnEqual = document.querySelector('#b-equal');

numpad.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (overwrite) {
            display.textContent = e.target.value;
            overwrite = false;
        } else {
            display.textContent += e.target.value;
        }
    });
});

btnDot.addEventListener('click', (e) => {
    if (!display.textContent.includes('.')) {
        display.textContent += e.target.value;
    }
});

btnAC.addEventListener('click', () => {
    display.textContent = '0';
    num1 = 0;
    num2 = 0;
    opt = '';
    overwrite = true;
});

operator.forEach((button) => {
    button.addEventListener('click', (e) => {
        opt = e.target.value;
        if (num1 === 0) {
            num1 = parseFloat(display.textContent, 10);
            // display.textContent = '0';
        } else {
            num2 = parseFloat(display.textContent, 10);
            const result = Number(operate(num1, num2, opt).toPrecision(precision));
    
            if(result === 'NaN') {
                display.textContent = 'Error';
            } else if(Number.isInteger(result)) {
                display.textContent = parseInt(result);
            } else {
                display.textContent = result;
            }
            num1 = parseFloat(display.textContent, 10);
            num2 = 0;
        }
        overwrite = true;
    });
});

btnEqual.addEventListener('click', () => {
    if(opt === '') return;
    num2 = parseFloat(display.textContent, 10);
    const result = Number(operate(num1, num2, opt).toPrecision(precision));

    if(result === 'NaN') {
        display.textContent = 'Error';
    } else if(Number.isInteger(result)) {
        
        display.textContent = parseInt(result);
    } else {
        display.textContent = result;
    }
    num1 = 0;
    num2 = 0;
    opt = '';
    overwrite = true;
});

function operate(num1, num2=1, operator) {
    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num1 / num2;
        case '%': return num1/100;
        default: return NaN;
    }
}

