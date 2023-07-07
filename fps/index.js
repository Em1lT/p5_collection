let player;
let walls = [];
let numOfWalls = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(100, 100);
  for (let i = 0; i < numOfWalls; i++) {
    const wall = new Wall(
      random(windowWidth),
      random(windowHeight / 2),
      random(windowWidth),
      random(windowHeight / 2)
    );
    walls.push(wall);
  }

  // splitting line
  walls.push(new Wall(0, windowHeight / 2, windowWidth, windowHeight / 2));

  // outer walls
  walls.push(new Wall(1, 1, 1, windowHeight / 2));
  walls.push(new Wall(1, 1, windowWidth, 0));
  walls.push(new Wall(windowWidth, 1, windowHeight / 2, 0));
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
