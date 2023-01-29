let particle = [];
let ball;
let size = 20;
let radius = 360;
let space = radius / size;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = createVector(width / 2, height / 2, 10, 10);

  for (let j = 1; j < 4; j++) {
    for (let i = 0; i < size; i++) {
      particle.push({
        p: createVector(ball.x + sin(i) * j * 100, ball.y + cos(i) * j * 100),
      });
    }
  }
}

function draw() {
  background(200);
  frameRate(60);
  ellipse(ball.x, ball.y, 30, 30);
  for (let i = 0; i < particle.length; i++) {
    ellipse(particle[i].p.x, particle[i].p.y, 30, 30);
    particle[i].p.x += sin(i);
    particle[i].p.y += cos(i);
  }
}
