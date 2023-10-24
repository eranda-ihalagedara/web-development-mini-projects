// Get the element with id "output"
let viewpoint = document.getElementById("viewpoint");
let panel = document.getElementById("panel");
// let txt = document.getElementById("mouse_loc");

// Add a "mousemove" event listener

viewpoint.onmousemove = function(event) {

  // Get the X and Y coordinates of the mouse
  const rect = viewpoint.getBoundingClientRect();
  const xPos = event.clientX - (rect.left + viewpoint.offsetWidth/2);
  const yPos = event.clientY - (rect.top + viewpoint.offsetHeight/2);

  viewpoint.style.perspectiveOrigin = `${50 + xPos/10}% ${50 + yPos/5}%`;
 
  // txt.innerHTML = xPos + "," + yPos + " | " + event.clientX + ","+event.clientY + " | " + rect.top + "," + rect.left;
    
};