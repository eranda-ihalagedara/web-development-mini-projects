let gridSize = 16;
let penColor = 'black';
let isOverPad = false;
let isMouseDown = false;

const containerDiv = document.querySelector('#container');
containerDiv.classList.toggle('pen-enabled');

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
            
            div.addEventListener('mousedown', (e) => {
                isMouseDown = true;
                changeColor(e, penColor);
            });
            div.addEventListener('mouseup', () => {
                isMouseDown = false;
            });
            div.addEventListener('mouseover', (e) => {
                if(!isMouseDown) return;
                changeColor(e, penColor);
            });
            
            row.appendChild(div);
        }
        containerDiv.appendChild(row);
    }
}

function changeColor(e, color) {
    e.target.style.backgroundColor = color;
}

createGrid(gridSize);

// Erase and Draw
const eraseButton = document.querySelector('#btn-erase');
eraseButton.addEventListener('click', (e) => {
    
    containerDiv.classList.toggle('pen-enabled');
    containerDiv.classList.toggle('eraser-enabled');

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
    });
    containerDiv.classList.add('pen-enabled');
    containerDiv.classList.remove('eraser-enabled');

    penColor = 'black';
    
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