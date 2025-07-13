let gridSize = 10;
let gridWidth;
let grid = [];
let selectedElement = "air";
let startCreation = false;
let pauseCreation = false;
let isMousePressed = false;
let isFirstTile = true;
let currentGrid = null;
let canvasSize = 400;
let slider;
let lost = false;
let path = [];
let roads = [];


function setupSquares() {
  gridWidth = width / gridSize;
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      const ground = false // j < gridSize - 4
      grid[i][j] = {
        i: i,
        j: j,
        location: {
          x: i * gridWidth,
          y: j * gridWidth,
        },
        type: ground ? "ground": "air",
      };
    }
  }
  console.log(grid)
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(10);
  strokeWeight(1);
  colorMode(HSL, 255);
  setupSquares();
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
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const widthBox = (width / gridSize);
      const heightBox = (height / gridSize);
      fillSquares(grid[j][i].type);
      rect(grid[j][i].location.x, grid[j][i].location.y, widthBox, heightBox);
    }
  }
}

function draw() {
  background(220);
  drawSquares();
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
        // Only log the current cell, not adjacent elements
      }
    }
  }
}
