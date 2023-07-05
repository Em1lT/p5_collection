let player;
let walls = [];
let numOfWalls = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // player = new Player(random(width), random(height));
  player = new Ray(width / 2, height / 2);
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

function draw() {
  background(220);
  frameRate(30);
  angleMode(DEGREES);
  player.update(walls);
  player.render();

  for (let wall of walls) {
    wall.render();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.updateAngle(1);
  } else if (keyCode === RIGHT_ARROW) {
    player.updateAngle(-1);
  } else if (keyCode === UP_ARROW) {
    player.move();
  } else if (keyCode === DOWN_ARROW) {
  }
}
