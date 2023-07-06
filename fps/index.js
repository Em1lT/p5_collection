let player;
let walls = [];
let numOfWalls = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(width / 2, height / 2);
  for (let i = 0; i < numOfWalls; i++) {
    const wall = new Wall(
      random(width),
      random(width),
      random(height),
      random(height)
    );
    walls.push(wall);
  }
}

function keys() {
  if (keyIsDown(LEFT_ARROW)) {
    player.turn(3);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.turn(-3);
  }

  if (keyIsDown(UP_ARROW)) {
    player.move(2);
  }

  if (keyIsDown(DOWN_ARROW)) {
    player.move(-2);
  }
}

function draw() {
  background(220);
  frameRate(30);
  angleMode(DEGREES);
  keys();
  player.update(walls);
  player.render();

  for (let wall of walls) {
    wall.render();
  }
}
