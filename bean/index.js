let player;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pos = createVector(200, 200);
  player = new Player(createVector(windowWidth / 2, windowHeight / 2));
}

function keys() {
  if (keyIsDown(LEFT_ARROW)) {
    player.turn(0.1);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.turn(-0.1);
  }

  if (keyIsDown(UP_ARROW)) {
    player.move(2.5);
  }

  if (keyIsDown(DOWN_ARROW)) {
    player.move(-2.5);
  }
}

function draw() {
  background(220);
  frameRate(30);
  keys();
  player.update();
  player.render();
}

function keyPressed() {
  if (keyCode === ENTER) {
    player.shoot();
  }
}
