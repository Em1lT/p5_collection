let pos
let degrVect
let degr = 0

function setup() {
  createCanvas(400, 400);
  pos = createVector(200,200)
}

function draw() {
  background(220);
  degrVect = createVector(sin(degr), cos(degr))
  line(pos.x, pos.y, pos.x + degrVect.x * 5, pos.y + degrVect.y  * 5)
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    degr++;
  } else if (keyCode === RIGHT_ARROW) {
    degr--;
  } else if (keyCode === UP_ARROW) {
    pos.add(degrVect.mult(10))
  } else if (keyCode === DOWN_ARROW) {
    pos.sub(degrVect.mult(10))
  }
}
