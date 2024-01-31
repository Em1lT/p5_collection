let gridSize = 12
let grid = []
let size = 33
let boxSize = size - 1
let lost = false

function setupSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    let tempGrid = []
    for (let j = 0; j < gridSize; j++ ) {
      tempGrid.push({sand: false, location: createVector(i * size,j * size, 1)})
    }
    grid.push(tempGrid)
  }
}

function update() {
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if(grid[i][j].sand === true) {
        if(grid[i][j + 1]) {
          grid[i][j + 1].sand = true;
          grid[i][j].sand = false;
        } 
      }
    }
  }
}

function setup() {
  createCanvas(400, 400);
  frameRate(2);
  setupSquares();
}

function drawSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      grid[i][j].sand ? fill('brown') && strokeWeight(4) : fill('white') && strokeWeight(1)
      square(grid[i][j].location.x, grid[i][j].location.y, boxSize)
    }
  }
}

function draw() {
  background(220);
  drawSquares();
  update();
}

function mouseClicked({x,y}) {  
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if(grid[i][j].location.x < x && grid[i][j].location.x + 30 > x) {
        if(grid[i][j].location.y < y && grid[i][j].location.y + 30 > y) {
          if(grid[i][j].sand !== true) {
            grid[i][j].sand = true
          }
      }
      }
    }
  }
}
