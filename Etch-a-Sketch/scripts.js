let gridSize = 16;
let penColor = 'black';
let opacity = 100;
let opacitySign = 1;
let isOverPad = false;
let isMouseDown = false;

const containerDiv = document.querySelector('#container');
containerDiv.classList.add('pen-enabled');

// Stop drawing when mouse leaves the pad
containerDiv.addEventListener('mouseleave', (e) => {
    isMouseDown = false;
})

function createGrid(size) {
    for (let i = 0; i < size ; i++) {
        const row = document.createElement('div');
        row.setAttribute('class', 'flex-row');
        for(let j = 0; j < size ; j++) {
            const div = document.createElement('div');
            div.setAttribute('class', 'flex-item');
            div.style.opacity = 0;
            
            div.addEventListener('mousedown', (e) => {
                isMouseDown = true;
                drawOnTile(e, penColor);
            });
            div.addEventListener('mouseup', () => {
                isMouseDown = false;
            });
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
    e.target.style.backgroundColor = color;
    e.target.style.opacity = Math.max(Math.min(Number.parseFloat(e.target.style.opacity) + opacitySign*opacity / 100, 1), 0);
}

createGrid(gridSize);

// Erase and Draw
const eraseButton = document.querySelector('#btn-erase');
eraseButton.addEventListener('click', (e) => {
    
    containerDiv.classList.toggle('pen-enabled');
    containerDiv.classList.toggle('eraser-enabled');
    opacitySign *= -1;

    penColor = ((curColor) => {
        if (curColor == 'black') return 'white';
        return 'black';
    })(penColor);

    if(eraseButton.textContent == "Erase") {
        eraseButton.textContent = "Draw";
    } else {
        eraseButton.textContent = "Erase";
    }
});

// Clear pad
const clearButton = document.querySelector('#btn-clear');
clearButton.addEventListener('click', (e) => {
    const tiles = document.querySelectorAll('.flex-item');
    tiles.forEach((tile) => {
        tile.style.backgroundColor = 'white';
        tile.style.opacity = '0';
    });
    containerDiv.classList.add('pen-enabled');
    containerDiv.classList.remove('eraser-enabled');

    penColor = 'black';
    opacitySign = 1;
    eraseButton.textContent = "Erase";
});

// Change grid size
const resolutionButton = document.querySelector('#btn-resolution');
resolutionButton.addEventListener('click', (e) => {
    let newGridSize = prompt("Enter new grid size(4 - 64):");
    newGridSize = parseInt(newGridSize, 10);

    // Validate if input is a number and an integer
    if (isNaN(newGridSize) || !Number.isInteger(newGridSize)) {
        alert("Invalid input! Please enter a valid integer.");
        return;
    }

    if(newGridSize < 4 || newGridSize > 64) {
        alert("Grid size must be between 4 and 64");
        return;
    }

    while (containerDiv.firstChild) {
        containerDiv.removeChild(containerDiv.firstChild);
    }

    gridSize = newGridSize;
    createGrid(gridSize);

});

// Change opacity
const opacityRange = document.querySelector('#opacity-range');
const opacityValue = document.querySelector('#opacity-value');
opacityRange.addEventListener('input', (e) => {
    opacity = e.target.value;
    opacityValue.textContent = opacity;
});