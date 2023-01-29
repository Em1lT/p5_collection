let particle = [];
let ball;
let size = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = createVector(width / 2, height / 2, 10, 10);
  for (let i = 0; i < size; i++) {
    const m = 40 / size;
    particle.push({
      p: createVector(ball.x + sin(m * i) * 100, ball.y + cos(i * m) * 100),
    });
  }
}

function draw() {
  ellipse(ball.x, ball.y, 30, 30);
  for (let i = 0; i < size; i++) {
    ellipse(particle[i].p.x, particle[i].p.y, 30, 30);
    /*particle[i].p.x += sin(i);
    	  particle[i].p.y += cos(i); */
  }
}
