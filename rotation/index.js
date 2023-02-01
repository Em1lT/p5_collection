let x = 0;
let mouse, center;

function setup() {
  createCanvas(400, 400);
  center = createVector(200, 200);
  rectMode(CENTER);
}

function draw() {
  background(220);
  mouse = createVector(mouseX, mouseY);
  line(mouse.x, mouse.y, center.x, center.y);

  // const rotation = map(mouse.x, 0, width, 0, TWO_PI);
  rotate(x++);
  rect(center.x, center.y, 100, 200);
}
