const boundary = 400
let qtree;

function setup() {
  createCanvas(400, 400);
  background(225);
  const bound = new Rectangle(200, 200, 200, 200)
  qtree = new QuadTree(bound, 4)
  for (let i = 0; i < 20; i++) {
    const randomX = Math.floor(Math.random() * boundary)
    const randomY = Math.floor(Math.random() * boundary)
    const node = new Point(randomX, randomY)
    qtree.addChild(node)
  }
}

function draw() {
  background(225);
  frameRate(10)
  qtree.render()
  // const r = Rectangle(mouseX, mouseY, 10, 10)
  rect(mouseX, mouseY, 20, 20)
}
/*
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

function drawSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      square(grid[i][j].location.x, grid[i][j].location.y, boxSize)  
    }
  }
}
*/

