let gridSize = 3
let bombs = gridSize * gridSize / 3
let grid = []
let size = 133
let boxSize = size - 1
let lost = false

function setupSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    let tempGrid = []
    for (let j = 0; j < gridSize; j++ ) {
      tempGrid.push({bomb: false, marked: false, location: createVector(i * size,j * size, 1)})
    }
    grid.push(tempGrid)
  }
}

function setupBombs () {
  for (let i = 0; i < bombs; i++) {
    let randomGrid = grid[Math.round(random(gridSize - 1))][Math.round(random(gridSize - 1))]
    randomGrid.bomb = true
  }
}

function setup() {
  createCanvas(400, 400);
  setupSquares();
  setupBombs();
}

function drawSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if(!lost) {
      grid[i][j].bomb ? stroke('red') && strokeWeight(4) : grid[i][j].player ? stroke('green') && strokeWeight(4) : stroke('black') && strokeWeight(1)
      square(grid[i][j].location.x, grid[i][j].location.y, boxSize)
        continue
      }
      fill('black')
      square(grid[i][j].location.x, grid[i][j].location.y, boxSize)  
    }
  }
}

function draw() {
  background(220);
  drawSquares();
}

function mouseClicked({x,y}) {  
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if(grid[i][j].location.x < x && grid[i][j].location.x + 100 > x) {
        if(grid[i][j].location.y < y && grid[i][j].location.y + 100 > y) {
          if(grid[i][j].bomb == true) {
            lost = true  
          }
          grid[i][j].player = true
      }
      }
    }
  }
}
