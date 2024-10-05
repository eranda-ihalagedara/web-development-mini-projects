let num1 = 0;
let num2 = 0;
let opt = '';
const precision = 11;
let overwrite = true;

const display = document.querySelector('#display');
const numpad = document.querySelectorAll('button.numpad');
const operator = document.querySelectorAll('button.operator');
const btnDot = document.querySelector('#b-dot');
const btnAC = document.querySelector('#b-ac');
const btnEqual = document.querySelector('#b-equal');
const btnPercent = document.querySelector('#b-percent');
const btnBackspace = document.querySelector('#b-backspace');
const btnPlusMinus = document.querySelector('#b-plus-minus');

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
    resetOperations();
    display.textContent = '0';
});

btnBackspace.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === '') {
        display.textContent = '0';
    }
})

operator.forEach((button) => {
    button.addEventListener('click', (e) => {
        opt = e.target.value;
        if (num1 === 0) {
            num1 = parseFloat(display.textContent, 10);
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
            num1 = 0;
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
    resetOperations();
});

btnPercent.addEventListener('click', (e) => {
    opt = "%";
    num1 = parseFloat(display.textContent, 10);
    const result = Number(operate(num1, num2, opt).toPrecision(precision));
    if(result === 'NaN') {
        display.textContent = 'Error';
    } else if(Number.isInteger(result)) {
        display.textContent = parseInt(result);
    } else {
        display.textContent = result;
    }
    resetOperations();
});

btnPlusMinus.addEventListener('click', (e) => {
    display.textContent = -parseFloat(display.textContent, 10);
    // display.textContent = num1;
    // resetOperations();
});

function operate(num1, num2, operator) {
    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num1 / num2;
        case '%': return num1/100;
        default: return NaN;
    }
}

function resetOperations() {
    num1 = 0;
    num2 = 0;
    opt = '';
    overwrite = true;
}
