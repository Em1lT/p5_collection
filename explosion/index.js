let particles = [];
let ball;
let size = 20;
let radius = 360;
let space = radius / size;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = createVector(width / 2, height / 2, 10, 10);

  for (let i = 0; i < size; i++) {
    const part = new Particle(ball.x + sin(i), ball.y + cos(i));
    particles.push(part);
  }
}

function draw() {
  background(200);
  frameRate(30);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update(i);
    particles[i].draw();
    if (particles[i].delete) {
      particles.splice(i, 1);
    }
  }
}
