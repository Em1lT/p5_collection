let gridSize = 10
let gridWidth = 75
let grid = []
let selectedElement = 'sand'
let isMousePressed = false
let canvasSize = 800 
let lost = false

const possibleObjects = {
  land: {
    compatibleElements: ['sand', 'forest'],
    color: color(255)
  },
  sand: {
    compatibleElements: ['water', 'deepWater'],
    color: color(120)
  },
  water: {
    compatibleElements: ['sand', 'deepWater'],
    color: color(0)
  },
  deepWater: {
    compatibleElements: ['water'],
    color: color(0)
  },
  forest: {
    compatibleElements: ['land'],
    color: color(0)
  },
}
// grid has type 
// location
// color
// possibleElements
// compatibleElements

function randomObject() {
  const randomObject = possibleObjects[Object.keys(possibleObjects)[Math.floor(Math.random() * Object.keys(possibleObjects).length)]]
  return randomObject
}
function adjacentObjects(x, y) {
  const adjacentObjects = []
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if(grid[i][j].type === 'air') {
        if(grid[i][j].location.x < x && grid[i][j].location.x + gridWidth > x) {
          if(grid[i][j].location.y < y && grid[i][j].location.y + gridWidth > y) {
            adjacentObjects.push(grid[i][j])
          }
        }
      }
    }
  }
  return adjacentObjects
}

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
      if(grid[i][j].type === 'sand') {
        fill(120)
      } else {
        fill(255)
      }
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

function adjacentElements(i, j) {
  grid[i][j+1].type = 'sand'
  grid[i][j-1].type = 'sand'
  grid[i+1][j].type = 'sand'
  grid[i-1][j].type = 'sand'
}


function spawnElement({x,y}) {  
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if(grid[i][j].location.x < x && grid[i][j].location.x + gridWidth > x) {
        if(grid[i][j].location.y < y && grid[i][j].location.y + gridWidth > y) {
          grid[i][j].type = selectedElement
          adjacentElements(i,j)
        }
      }
    }
  }
}
