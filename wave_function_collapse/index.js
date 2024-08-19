let gridSize = 10
let gridWidth = 80
let grid = []
let selectedElement = 'sand'
let isMousePressed = false
let isFirstTile = true
let currentGrid = null;
let canvasSize = 800 
let lost = false
let path = []

const possibleObjects = [
{
    type: 'land',
    compatibleElements: ['sand', 'forest', 'land'],
    notCompatibleElements: ['water', 'deepWater'],
    // color: color(102, 204, 0)
},{
    type: 'sand',
    compatibleElements: ['water', 'deepWater', 'land', 'sand'],
    notCompatibleElements: ['forest'],
    // color: color(255, 255, 102)
  },
{
    type: 'water',
    compatibleElements: ['sand', 'deepWater', 'water'],
    notCompatibleElements: ['land', 'forest'],
    // color: color(51, 153, 255)
  },
{
    type: 'deepWater',
    compatibleElements: ['water', 'deepWater'],
    notCompatibleElements: ['land', 'forest'],
    // color: color(0, 0, 204)
  },
{
    type: 'forest',
    compatibleElements: ['land', 'forest'],
    notCompatibleElements: ['water', 'deepWater', 'sand'],
    // color: color(0, 102, 0),
  },
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
      tempGrid.push({type: 'air', location: createVector(widthBox, heightBox, 1), i: i, j:j})
    }
    grid.push(tempGrid)
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(10);
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
        fill(color('#f2d468'))
      } else if(grid[i][j].type === 'water') {
        fill(color('#0277de'))
      } else if(grid[i][j].type === 'land') {
        fill(color('#37fa6b'))
      } else if(grid[i][j].type === 'deepWater') {
        fill(color('#0209d1'))
      } else if(grid[i][j].type === 'forest') {
        fill( color('#00661b'))
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
  if(path.length !== (gridSize * gridSize)) {
    if(isFirstTile) {
      let [i, j] = getRandomTile()
      isFirstTile = false
      currentGrid = grid[i][j]
      currentGrid.type = 'land'
      path.push(currentGrid)
    } else { 
      const adjacentElements = getNextRandomAdjacentElements(currentGrid.i, currentGrid.j)
      if(adjacentElements.length === 0) {
        for(let i = path.length - 1; i >= 0; i--) {
          const elements = getAdjacentElements(path[i].i, path[i].j)
          if(elements.length > 0) {
            const adjacentElement = elements[Math.floor(Math.random() * adjacentElements.length)]
            currentGrid = adjacentElement
            path.push(currentGrid)
            // random type
            currentGrid.type = possibleObjects[Math.floor(Math.random() * possibleObjects.length)].type
            break
          } else {
            continue;
          }
        }
      } else {
        const adjacentElement = adjacentElements[Math.floor(Math.random() * adjacentElements.length)]
        currentGrid = adjacentElement
        path.push(currentGrid)
        const newAdjacentElements = getAdjacentElements(currentGrid.i, currentGrid.j)
        const compatibleElements = newAdjacentElements.filter(el => el.type !== 'air').reduce((acc, el) => {
          const compatibleElements = possibleObjects.find(obj => obj.type === el.type).compatibleElements
          compatibleElements.forEach(el1 => {
            if(acc.includes(el1)) {
              return acc
            } else {
              return addUniqueList(acc,[el1])
            }
          })
          const notCompatibleElements = possibleObjects.find(obj => obj.type === el.type).notCompatibleElements
          notCompatibleElements.forEach(el => {
            if(acc.includes(el)) {
              // remove from acc
              acc = acc.filter(el => el !== el)
            } else {
              return acc
            }
          })
          return acc
        }, [])
        const newType = compatibleElements[Math.floor(Math.random() * compatibleElements.length)]
        currentGrid.type = newType
      }
    }
  } else { }
}
function addUniqueList( list, items) {
  items.forEach(function(item) {
    if (!list.includes(item)) {
      list.push(item);
    }
  });
  return list;
}
function getNextRandomAdjacentElements(i, j) {
  const adjacentElements = getAdjacentElements(i, j).filter(el => el.type === 'air')
  return adjacentElements
}

function getAdjacentElements(i, j) {
  if(grid[i+1] !== undefined && grid[i+1][j] !== undefined && grid[i-1] !== undefined && grid[i-1][j] !== undefined) {
     return [
      grid[i][j+1],
      grid[i][j-1],
      grid[i+1][j],
      grid[i-1][j],
      // filter out if not air
    ].filter(el => el !== undefined)
  } else if (grid[i+1] === undefined) {
     return [
      grid[i][j+1],
      grid[i][j-1],
      grid[i-1][j],
      // filter out if not air
    ].filter(el => el !== undefined)
  } else if (grid[i-1] === undefined) {
     return [
      grid[i][j+1],
      grid[i][j-1],
      grid[i+1][j],
      // filter out if not air
    ].filter(el => el !== undefined)
  }
}
