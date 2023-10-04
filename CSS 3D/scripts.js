// Get the element with id "output"
let output = document.getElementById("output");
let viewpoint = document.getElementById("viewpoint");
let panel = document.getElementById("panel");

// Add a "mousemove" event listener

viewpoint.onmousemove = function(event) {
    // Get the X and Y coordinates of the mouse
    const xPos = event.clientX - (viewpoint.offsetLeft + viewpoint.offsetHeight/2);
    const yPos = event.clientY - (viewpoint.offsetTop + viewpoint.offsetWidth/2);
  
    panel.style.transform = `rotateX(${yPos/5}deg) rotateY(${xPos/5}deg)`;

  };


//   viewpoint.onmouseleave = function(event) {
//     // Get the X and Y coordinates of the mouse
    
//     panel.style.transform = `rotateX(${yPos/}deg) rotateY(${xPos/2}deg)`;

//   };
