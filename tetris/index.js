let gridSize = 4
let grid = []
let size
let boxSize
let newPiece = true

function setupSquares() {
  for (let i = 0; i < gridSize; i++) {
    grid[i] = []
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = {
        location: {
          x: i * size,
          y: j * size
        },
        newPiece: false,
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
}

function drawSquares() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j].mark) {
        fill('red')
      } else {
        fill('white')
      }
      rect(grid[i][j].location.x, grid[i][j].location.y, boxSize, boxSize)
    }
  }
}

function updateSquares() {
  let changeBits = 0
  for (let i = gridSize - 1; i > 0; i--) {
    for (let j = gridSize - 1; j > 0; j--) {
      if (grid[i][j].mark) { // if the current square is marked
        if (grid[i][j + 1] && !grid[i][j + 1].mark) { // if the square below is not marked or does  exists
          changeBits++;
          grid[i][j + 1].mark = true;
          grid[i][j + 1].newPiece = true;
          grid[i][j].mark = false;
          grid[i][j].newPiece = false;
        }
      }
    }
  }
  if (changeBits === 0) {
    newPiece = true
  }
}
function markAllNewPiecesGone() {
  // mark all new pieces as gone
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j].newPiece) {
        grid[i][j].newPiece = false
      }
    }
  }
}

function checkForNewPiece() {
  if (newPiece) {
    markAllNewPiecesGone()
    let piece = grid[gridSize / 2][1]
    piece.mark = true
    piece.newPiece = true
    newPiece = false
  }
}

function getNewPieceLocation() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j].newPiece) return { i, j }
    }
  }
}

function numberOfNewPieces() {
  let numberOfNewPieces = 0
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j].newPiece) numberOfNewPieces++
    }
  }
  return numberOfNewPieces
}

function keyPressed() {
  if (key === 'n') {
    // Code to run.
    const { i, j } = getNewPieceLocation()
    if (grid[i - 1][j] && !grid[i - 1][j].mark) {
      grid[i][j].mark = false
      grid[i][j].newPiece = false
      grid[i - 1][j].mark = true
      grid[i - 1][j].newPiece = true
    }
  }
  if (key === 'm') {
    const { i, j } = getNewPieceLocation()
    if (grid[i + 1][j] && !grid[i + 1][j].mark) {
      grid[i][j].mark = false
      grid[i][j].newPiece = false
      grid[i + 1][j].mark = true
      grid[i + 1][j].newPiece = true
    }
  }
}

function draw() {
  background(220);
  frameRate(1);
  drawSquares();
  updateSquares();
  checkForNewPiece();
}

