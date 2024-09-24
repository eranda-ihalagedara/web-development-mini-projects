let gridSize = 16;
let penColor = '#000000';
let curColor = '#000000';
let isErasing = false;
let opacity = 100;
let isOverPad = false;
let isMouseDown = false;

const containerDiv = document.querySelector('#grid');
containerDiv.classList.add('pen-enabled');

containerDiv.addEventListener('mousedown', (e) => {
    isMouseDown = true;
});
containerDiv.addEventListener('mouseup', (e) => {
    isMouseDown = false;
});


function createGrid(size) {
    for (let i = 0; i < size ; i++) {
        const row = document.createElement('div');
        row.setAttribute('class', 'grid-row');
        for(let j = 0; j < size ; j++) {
            const div = document.createElement('div');
            div.setAttribute('class', 'grid-tile');
            div.style.opacity = 0;
            
            div.addEventListener('mousedown', (e) => {drawOnTile(e, penColor)});
            div.addEventListener('mouseover', (e) => {
                if(!isMouseDown) return;
                drawOnTile(e, penColor);
            });
            
            row.appendChild(div);
        }
        containerDiv.appendChild(row);
    }
}

function drawOnTile(e, color) {
    if(!isErasing) {
        e.target.style.backgroundColor = color;
        e.target.style.opacity = Math.max(Math.min(Number.parseFloat(e.target.style.opacity) + opacity / 100, 1), 0);
    } else{
        e.target.style.backgroundColor = 'white';
        e.target.style.opacity = '0';
    }
}

createGrid(gridSize);

// Erase and Draw
const eraseButton = document.querySelector('#btn-erase');
eraseButton.addEventListener('click', (e) => {
    
    containerDiv.classList.toggle('pen-enabled');
    containerDiv.classList.toggle('eraser-enabled');

    isErasing = !isErasing;

    if(isErasing) {
        eraseButton.textContent = "Pen";
    } else {
        eraseButton.textContent = "Eraser";
    }
});

// Clear pad
const clearButton = document.querySelector('#btn-clear');
clearButton.addEventListener('click', (e) => {
    const tiles = document.querySelectorAll('.grid-tile');
    tiles.forEach((tile) => {
        tile.style.backgroundColor = 'white';
        tile.style.opacity = '0';
    });
    containerDiv.classList.add('pen-enabled');
    containerDiv.classList.remove('eraser-enabled');

    penColor = '#000000';
    opacitySign = 1;
    isErasing = false;
    eraseButton.textContent = "Eraser";
});

// Change color
const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('input', (e) => {
    curColor = e.target.value;
    penColor = curColor;
});

// Change opacity
const opacityRange = document.querySelector('#opacity-range');
const opacityValue = document.querySelector('#opacity-value');
opacityRange.addEventListener('input', (e) => {
    opacity = e.target.value;
    opacityValue.textContent = `Opacity: ${opacity}`;
});

// Change grid size
const gridSizeRange = document.querySelector('#grid-size-range');
const gridSizeLabel = document.querySelector('#grid-size-label');
gridSizeRange.addEventListener('input', (e) => {
    gridSize = parseInt(e.target.value, 10);
    gridSizeLabel.textContent = `${gridSize} x ${gridSize}`;
});

gridSizeRange.addEventListener('change', (e) => {
    
    while (containerDiv.firstChild) {
        containerDiv.removeChild(containerDiv.firstChild);
    }
    createGrid(gridSize);
});