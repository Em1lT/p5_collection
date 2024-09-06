let gridSize = 10
let grid = []
let size
let boxSize

function setupSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    grid[i] = []
    for (let j = 0; j < gridSize; j++ ) {
      grid[i][j] = {
        location: {
          x: i * size,
          y: j * size
        },
        mark: false
      }
    }
  }
}

function setup() {
  createCanvas(400, 400);
  size = width / gridSize
  boxSize = size
  setupSquares();
  grid[0][0].mark = true
}

function drawSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if (grid[i][j].mark) {
        fill('red')
      } else {
        fill('white')
      }
      rect(grid[i][j].location.x, grid[i][j].location.y, boxSize, boxSize)
    }
  }
}

function draw() {
  background(220);
  drawSquares();
}

