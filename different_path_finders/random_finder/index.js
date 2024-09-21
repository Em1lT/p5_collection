const gridSize = 4;
let grid;

function setup() {
  createCanvas(800, 800);
  grid = new Grid(gridSize);
  grid.setupSquares();
  grid.setupObstacles();
}

function draw() {
  background(220);
  frameRate(2);
  grid.drawSquares();
  grid.pathFind();
}
