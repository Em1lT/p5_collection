const boundary = 400
let qtree;

function setup() {
  createCanvas(boundary, boundary);
  background(220);
  const bound = new Rectangle(boundary, boundary, boundary, boundary)
  qtree = new QuadTree(bound, 4)
  for (let i = 0; i < 10; i++) {
    const randomX = Math.floor(Math.random() * boundary)
    const randomY = Math.floor(Math.random() * boundary)
    const node = new Point(randomX, randomY)
    qtree.addChild(node)
  }
}

function draw() {
  background(220);
  qtree.render()

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

