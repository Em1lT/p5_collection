let b1, b2,b3;

function setup() {
  createCanvas(400, 400);
  b1 = new Ball(100, 100, 1);
  b2 = new Ball(300, 100, 0.4);
  b3 = new Ball(200, 100, 0.1);
}

function draw() {
  background(220);
  fill("red");
  b1.update();
  b1.render();

  fill("green");
  b2.update();
  b2.render();

  fill("blue");
  b3.update();
  b3.render();

  line(0, 300, width, height);
}
