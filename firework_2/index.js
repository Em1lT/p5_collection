fireworks = [];
explosions = [];
bombs = [];
const numOfFireworks = 100;
const year = new Date().getFullYear();

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numOfFireworks; i++) {
    fireworks[i] = new Firework();
  }
}

function draw() {
  background(220);
  textSize(50);
  fill(30);
  text("HAPPY NEW YEAR " + year + "!", 5, windowHeight / 2);
  for (let firework of fireworks) {
    firework.draw();
    firework.move();
  }

  for (let bomb of bombs) {
    bomb.draw();
  }
}
