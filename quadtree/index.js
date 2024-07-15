let gridSize = 3
let size = 133
let grid = []
let boxSize = size - 1

function setupSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    let tempGrid = []
    for (let j = 0; j < gridSize; j++ ) {
      tempGrid.push({location: createVector(i * size,j * size, 1)})
    }
    grid.push(tempGrid)
  }
}

function setup() {
  createCanvas(400, 400);
  setupSquares();
}

function drawSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      square(grid[i][j].location.x, grid[i][j].location.y, boxSize)  
    }
  }
}

function draw() {
  background(220);
  drawSquares();
}
