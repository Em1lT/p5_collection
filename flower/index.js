let gridSize = 30;
let canvasSize = 900;
let grid;


function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(10);
  strokeWeight(1);
  colorMode(HSL, 255);
  grid = new Grid(gridSize, canvasSize);
  grid.setup();
}

function draw() {
  background(220);
  grid.render();
}

function mousePressed() {
  if (mouseX < canvasSize && mouseY < canvasSize) {
    logElement({ x: mouseX, y: mouseY });
  }
}

function logElement({ x, y }) {
  gridWidth = width / gridSize;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = grid[i][j];
      const cellWidth = gridWidth;
      const cellHeight = gridWidth;
      if (
        cell.location.x <= x && x < cell.location.x + cellWidth &&
        cell.location.y <= y && y < cell.location.y + cellHeight
      ) {
        console.log(cell);
        console.log(getAdjacentElements(cell.i, cell.j))
        // Only log the current cell, not adjacent elements
      }
    }
  }
}
