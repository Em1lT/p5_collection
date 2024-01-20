let mouse;
let grid = []
function setup() {
  createCanvas(500, 500);
  pixelDensity(1);
  // create the grid with width and height of the canvas
  for (let i = 0; i < width; i ++) {
    grid[i] = [];
    for (let j = 0; j < height; j++) {
      grid[i][j] = {type: 'air', x: i, y: j};
    }
  }


}

function draw() {
  background(51);
	frameRate(1);
  loadPixels();
  for (let i = 0; i < width; i ++) {
   for (let j = 0; j < height; j++) {
     const cell = grid[i][j];
     var index = (cell.x + cell.y * width) * 4;
      if (cell.type === 'sand') {
         pixels[index] = 255;
         pixels[index + 1] = 0;
         pixels[index + 2] = 25;
         pixels[index + 3] = 255;
      }
    }
  }

  updatePixels();
}

function mouseClicked() {
	mouseClick = createVector(mouseX, mouseY);
  createSand(mouseClick)
}

function createSand(mouseClick) {
  grid[mouseClick.x][mouseClick.y] = {type: 'sand', x: mouseClick.x, y: mouseClick.y};
}
