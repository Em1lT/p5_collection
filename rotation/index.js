let angle = 0;
let pos;

function setup() {
  createCanvas(400, 400);
  pos = createVector(width / 2, height / 2);
  angleMode(DEGREES);
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  rect(0, 0, 100, 50);
  angle = angle + 1;
}
