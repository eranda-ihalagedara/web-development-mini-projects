let gridSize = 16;
let penColor = 'black';
let isMouseDown = false;

const containerDiv = document.querySelector('#container');


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


