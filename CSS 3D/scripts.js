// Get the element with id "output"
let viewpoint = document.getElementById("viewpoint");
let panel = document.getElementById("panel");
// let txt = document.getElementById("mouse_loc");

// Add a "mousemove" event listener

viewpoint.onmousemove = function(event) {
  console.log('In')

  // Get the X and Y coordinates of the mouse
  const rect = viewpoint.getBoundingClientRect();
  const xPos = event.clientX - (rect.left + viewpoint.offsetWidth/2);
  const yPos = event.clientY - (rect.top + viewpoint.offsetHeight/2);

  // panel.style.transform = `rotateX(${yPos/5}deg) rotateY(${xPos/10}deg)`;
  viewpoint.style.perspectiveOrigin = `${50 + xPos/10}% ${50 + yPos/5}%`;
  // panel.style.perspectiveOrigin = `50% 50%`;

  // txt.innerHTML = xPos + "," + yPos + " | " + event.clientX + ","+event.clientY + " | " + rect.top + "," + rect.left;
    
};