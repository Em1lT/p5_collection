
const gridSize = 4
let grid 

function setup() {
  createCanvas(800, 800);
  grid = new Grid(gridSize);
  grid.setupSquares();
}

function draw() {
  background(220);
  grid.drawSquares();
}

