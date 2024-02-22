let mouse;
let grid = []
function setup() {
  createCanvas(500, 500);
  pixelDensity(1);
  for (let i = 0; i < width; i ++) {
    grid[i] = [];
    for (let j = 0; j < height; j++) {
      grid[i][j] = {type: 'air', x: i, y: j};
    }
  }


}

function draw() {
  background(51);
	frameRate(2);
  loadPixels();
  updatePixels();
  // updateSand();
}

function update () {
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
}

function updateSand() {
  for (let i = 0; i < width; i ++) {
    for (let j = 0; j < height; j++) {
      const cell = grid[i][j];
      if (cell.type === 'sand') {
        if (grid[i][j + 1] && grid[i][j + 1].type === 'air') {
          grid[i][j + 1] = {type: 'sand', x: i, y: j + 1};
          grid[i][j] = {type: 'air', x: i, y: j};
        }  
      }
    }
  }

}

function mouseClicked() {
	mouseClick = createVector(mouseX, mouseY);
  createSand(mouseClick)
}

function createSand(mouseClick) {
  console.log(grid[mouseClick.x][mouseClick.y])
  grid[mouseClick.x][mouseClick.y] = {type: 'sand', x: mouseClick.x, y: mouseClick.y};
  console.log(grid[mouseClick.x][mouseClick.y])
  console.log(grid.filter((cell) => cell.type === 'air').length);
}
