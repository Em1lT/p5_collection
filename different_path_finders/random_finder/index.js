const gridSize = 10;
let grid;

function setup() {
  createCanvas(800, 800);
  grid = new Grid(gridSize);
  grid.setupSquares();
  grid.setupObstacles();
}

function draw() {
  background(220);
  frameRate(10);
  grid.drawSquares();
  if(!grid.finish) {
    grid.pathFind();
  }
}
