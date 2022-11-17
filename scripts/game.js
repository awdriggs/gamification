
function setup() {
  let myCanvas = createCanvas(800, 400);
  myCanvas.parent("p5-container");
}

function draw() {
  ellipse(mouseX, mouseY, 20, 20);
}
