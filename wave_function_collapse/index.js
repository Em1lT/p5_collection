let gridSize = 10
let gridWidth = 75
let grid = []
let selectedElement = 'sand'
let isMousePressed = false
let canvasSize = 800 
let lost = false

function setupSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    let tempGrid = []
    for (let j = 0; j < gridSize; j++ ) {
      const widthBox = width / gridSize * i 
      const heightBox = height / gridSize * j 
      tempGrid.push({type: 'air', location: createVector(widthBox, heightBox, 1)})
    }
    grid.push(tempGrid)
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(30);
  strokeWeight(0);
  colorMode(HSL, 255);
  setupSquares();
}

function drawSquares() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const widthBox = width / gridSize * i 
      const heightBox = height / gridSize * j 
      square(widthBox,heightBox, gridWidth)
    }
  }
}

function draw() {
  background(220);
  drawSquares();
}

function mousePressed() { 
  if( mouseX < canvasSize && mouseY < canvasSize ) {
    spawnElement({x: mouseX, y:mouseY});
  }
}


function spawnElement({x,y}) {  
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if(grid[i][j].location.x < x && grid[i][j].location.x + 10 > x) {
        if(grid[i][j].location.y < y && grid[i][j].location.y + 10 > y) {
          console.log(grid[i][j])
        }
      }
    }
  }
}
