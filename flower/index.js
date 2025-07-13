let gridSize = 30;
let canvasSize = 600;
let grid;


function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(10);
  strokeWeight(1);
  colorMode(HSL, 255);
  grid = new Grid(gridSize);
  grid.setup();
}

function fillSquares(type) {
  if (type === "air") {
    fill(color("#0277de"));
  } else if (type === "debug") {
    fill("red");
  } else if (type === "ground") {
    fill(color("#37fa6b"));
  } else {
    fill("white");
  }
}

function drawSquares() {
  const widthBox = (width / gridSize);
  const heightBox = (height / gridSize);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const {type, location} = grid[i][j]
      fillSquares(type);
      rect(location.x, location.y, widthBox, heightBox);
    }
  }
}

function draw() {
  background(220);
  grid.render();
}

function getAdjacentElements(i, j) {
  if (
    grid[i + 1] !== undefined &&
    grid[i + 1][j] !== undefined &&
    grid[i - 1] !== undefined &&
    grid[i - 1][j] !== undefined
  ) {
    return [
      grid[i][j + 1],
      grid[i][j - 1],
      grid[i + 1][j],
      grid[i - 1][j],
      // filter out if not air
    ].filter((el) => el !== undefined);
  } else if (grid[i + 1] === undefined) {
    return [
      grid[i][j + 1],
      grid[i][j - 1],
      grid[i - 1][j],
      // filter out if not air
    ].filter((el) => el !== undefined);
  } else if (grid[i - 1] === undefined) {
    return [
      grid[i][j + 1],
      grid[i][j - 1],
      grid[i + 1][j],
      // filter out if not air
    ].filter((el) => el !== undefined);
  }
}

function mousePressed() {
  if (mouseX < canvasSize && mouseY < canvasSize) {
    logElement({ x: mouseX, y: mouseY });
  }
}

function logElement({ x, y }) {
  gridWidth = width / gridSize;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = grid[i][j];
      const cellWidth = gridWidth;
      const cellHeight = gridWidth;
      if (
        cell.location.x <= x && x < cell.location.x + cellWidth &&
        cell.location.y <= y && y < cell.location.y + cellHeight
      ) {
        console.log(cell);
        console.log(getAdjacentElements(cell.i, cell.j))
        // Only log the current cell, not adjacent elements
      }
    }
  }
}
