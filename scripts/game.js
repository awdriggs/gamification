
let cookie;
let radius = 200; //image will be 400px, so radius is half

function preload() {
  soundFormats('wav');
  clickSound = loadSound('assets/sound.wav');
  cookie = loadImage('assets/cookie.png'); //load the image before starting the sketch
}

function setup() {
  let myCanvas = createCanvas(900, 500); //naming canvas so it shows at the right point in dom
  myCanvas.parent("p5-container");

  cookie.loadPixels(); //loads the image once
}

function draw() {
  background(255);
  let cookieSize;
  let distance = dist(mouseX, mouseY, width/2, height/2);

  if(distance <= radius){
    cookieSize = 400;
  } else {
    cookieSize = 390;
  }

  //for the animation only
  if (mouseIsPressed === true && distance <= radius) {
    cookieSize = 390;
  } else {
    cookieSize = 400;
  }

  image(cookie, width/2 - cookieSize/2, height/2 - cookieSize/2, cookieSize, cookieSize);
}

// add points if clicked.
// why not doing this all in draw? mouseClicked fires onces per event, otherwise mouseispressed allows player to hold down mouse. not cool.
function mouseClicked() {
  let distance = dist(mouseX, mouseY, width/2, height/2);
  if(distance <= radius){
    //this is a little weird, we are effecting thingsoutside of the p5 program
    //how, they are global!
    clickSound.play();
    points++;
    update();
  }
}
