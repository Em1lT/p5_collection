let particle = [];
let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = createVector(width / 2, height / 2, 10, 10);
  for (let i = 0; i < 40; i++) {
    particle.push({
      p: createVector(ball.x + sin(i) * 100, ball.y + cos(i) * 100),
    });
  }
}

function draw() {
  ellipse(ball.x, ball.y, 30, 30);
  for (let i = 0; i < 40; i++) {
    ellipse(particle[i].p.x, particle[i].p.y, 30, 30);
    particle[i].p.x += sin(i);
    particle[i].p.y += cos(i);
  }
}
