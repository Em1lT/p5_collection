let particle = [];
let ball;
let size = 20;
let radius = 360;
let space = radius / size;
let gloablIndex = 0;
let restartThreshold = 1000;
let restart = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = createVector(width / 2, height / 2, 10, 10);
  setupVectors();
  slider = createSlider(-2, 2, -1);
  slider.position(20, 20);
  slider.style("width", "460px");
}

function setupVectors() {
  for (let j = 1; j < 8; j++) {
    for (let i = 0; i < size; i++) {
      particle.push({
        p: createVector(ball.x + sin(i) * j * 100, ball.y + cos(i) * j * 100),
      });
    }
  }
}

function draw() {
  const sliderValue = slider.value();
  background(200);
  frameRate(60);
  text(sliderValue, 100, 100);
  textSize(32);
  fill(0, 102, 153);
  ellipse(ball.x, ball.y, 30, 30);
  if (restart) {
    setupVectors();
  }

  for (let i = 0; i < particle.length; i++) {
    ellipse(particle[i].p.x, particle[i].p.y, 30, 30);
    particle[i].p.x += sin(i) * sliderValue;
    particle[i].p.y += cos(i) * sliderValue;
    if (particle[i].p.x > width || particle[i].p.x < 0) {
      particle.splice(i, 1);
      continue;
    }
    if (particle[i].p.y > height || particle[i].p.y < 0) {
      particle.splice(i, 1);
      continue;
    }
  }
  gloablIndex++;

  if (gloablIndex > restartThreshold) {
    restart = true;
    gloablIndex = 0;
  } else {
    restart = false;
  }
}
