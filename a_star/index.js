let gridSize = 50
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
        finish: false,
        obstacle: false,
        mark: false
      }
    }
  }
}

function setupObstacles() {
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      const s = Math.floor(Math.random() * 100)
      if( s > 80 ) {
        grid[i][j].obstacle = true;
      }
    }
  }
}

function setup() {
  createCanvas(800, 800);
  size = width / gridSize
  boxSize = size
  setupSquares();
  setupObstacles();
  grid[0][0].mark = true
  grid[gridSize - 1][gridSize - 1].finish = true
}

function drawSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if (grid[i][j].mark) {
        fill('red')
      } else if (grid[i][j].finish) {
        fill('green')
      } else if (grid[i][j].obstacle) {
        fill('black')
      }
      else {
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

