let gridSize = 10
let gridWidth = 75
let grid = []
let selectedElement = 'sand'
let isMousePressed = false
let isFirstTile = true
let currentGrid = null;
let currentGridCoords = [];
let canvasSize = 800 
let lost = false

const possibleObjects = [
{
    type: 'land',
    compatibleElements: ['sand', 'forest'],
    // color: color(102, 204, 0)
},{
    type: 'sand',
    compatibleElements: ['water', 'deepWater'],
    // color: color(255, 255, 102)
  },
{
    type: 'water',
    compatibleElements: ['sand', 'deepWater'],
    // color: color(51, 153, 255)
  },
{
    type: 'deepWater',
    compatibleElements: ['water'],
    // color: color(0, 0, 204)
  },
{
    type: 'forest',
    compatibleElements: ['land'],
    // color: color(0, 102, 0),
  }
]

function randomObject() {
  const randomObject = possibleObjects[Math.floor(Math.random() * possibleObjects.length)]
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
  frameRate(1);
  strokeWeight(1);
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
        fill(color(255, 255, 102))
      } 
      if(grid[i][j].type === 'water') {
        fill(color(51, 153, 255))
      }
      if(grid[i][j].type === 'land') {
        fill(color(102, 204, 0))
      }
      if(grid[i][j].type === 'deepWater') {
        fill(color(0, 0, 204))
      }
      if(grid[i][j].type === 'forest') {
        fill('green')
      } else {
        fill('skyBlue')
      }
    }
  }
}
function getRandomTile () {
  const i = Math.floor(Math.random() * gridSize)
  const j = Math.floor(Math.random() * gridSize)
  return [i, j]
}

function draw() {
  background(220);
  drawSquares();
  if(isFirstTile) {
    let [i, j] = getRandomTile()
    isFirstTile = false
    currentGrid = grid[i][j]
    currentGrid.type = 'forest'
    currentGridCoords = [i, j]
  } else { 
    let adjacentElements = getAdjacentElements(currentGridCoords[0], currentGridCoords[1])
    // get random adjjacent element
    const adjacentElement = adjacentElements[Math.floor(Math.random() * adjacentElements.length)]
    console.log(adjacentElement)
    currentGrid = adjacentElement
    currentGridCoords = [currentGrid.location.x, currentGrid.location.y]
    currentGrid.type = 'forest'
  }
}

function getAdjacentElements(i, j) {
  return [
    grid[i][j+1],
    grid[i][j-1],
    grid[i+1][j],
    grid[i-1][j],
  ]
}
