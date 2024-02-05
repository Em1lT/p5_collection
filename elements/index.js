let gridSize = 100
let gridWidth = 7
let grid = []
let selectedElement = 'sand'
let isMousePressed = false
let canvasSize = 800 
let lost = false

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

function updateSand(i, j) {
  if(grid[i][j + 1] && grid[i][j + 1].type === 'air' ) {
    grid[i][j + 1].type = 'sand';
    grid[i][j].type = 'air';
  } else if (grid[i][j + 1] && grid[i][j + 1].type !== 'air' ) {
    if(grid[i + 1] && grid[i + 1][j + 1].type === 'air') {
      grid[i + 1][j + 1].type = 'sand';
      grid[i][j].type = 'air';
    } else if (grid[i - 1] && grid[i - 1][j + 1].type === 'air') {
      grid[i - 1][j + 1].type = 'sand';
      grid[i][j].type = 'air';
    }
  }
}

function updateWater(i, j) {
  if(grid[i][j + 1] && grid[i][j + 1].type === 'air' ) {
    grid[i][j + 1].type = 'water';
    grid[i][j].type = 'air';
  } else if (grid[i][j + 1] && grid[i][j + 1].type !== 'air' ) {
    if(grid[i + 1] && grid[i + 1][j + 1].type === 'air') {
      grid[i + 1][j + 1].type = 'water';
      grid[i][j].type = 'air';
    } else if (grid[i - 1] && grid[i - 1][j + 1].type === 'air') {
      grid[i - 1][j + 1].type = 'water';
      grid[i][j].type = 'air';
    } else if (grid[i + 1] && grid[i + 1][j].type === 'air') {
      grid[i + 1][j].type = 'water';
      grid[i][j].type = 'air';
    } else if (grid[i - 1] && grid[i - 1][j].type === 'air') {
      grid[i - 1][j].type = 'water';
      grid[i][j].type = 'air';
    } 
  }
}

function update() {
  for (let i = gridSize - 1 ; i > 0; i--) {
    for (let j = gridSize - 1 ; j > 0; j-- ) {
      if(grid[i][j] && grid[i][j].type === 'sand') {
        updateSand(i, j)
      } else if (grid[i][j] && grid[i][j].type === 'water' ) {
        updateWater(i, j);
      }
    } 
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(60);
  strokeWeight(0);
  setupSquares();
  let b1 = createButton('Sand');
  b1.position(50, 900);
  b1.mousePressed(() => {
    selectedElement = 'sand';
  });

  let b2 = createButton('Water');
  b2.position(200, 900);
  b2.mousePressed(() => {
    selectedElement = 'water';
  });

  let b3 = createButton('Stone');
  b3.position(350, 900);
  b3.mousePressed(() => {
    selectedElement = 'stone';
  });

  let b4 = createButton('Remove');
  b4.position(450, 900);
  b4.mousePressed(() => {
    selectedElement = 'remove';
  });
}

function fillColor (cell) {
  switch (cell.type) {
    case 'sand':
      fill(color(194, 178, 200), 100)
      break; 
    case 'air':
      fill('white')
      break; 
    case 'stone':
      fill('grey')
      break; 
    case 'water':
      fill('blue')
      break; 
  }
}

function drawSquares() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const widthBox = width / gridSize * i 
      const heightBox = height / gridSize * j 
      fillColor(grid[i][j])
      square(widthBox,heightBox, gridWidth)
    }
  }
}

function draw() {
  background(220);
  drawSquares();
  update();
  if(isMousePressed && mouseX < canvasSize && mouseY < canvasSize ) {
    spawnElement({x: mouseX, y:mouseY});
  }
}

function mousePressed() { 
  if( mouseX < canvasSize && mouseY < canvasSize ) {
    isMousePressed = true
  }
}

function mouseReleased() { 
  isMousePressed = false
}

function spawnElement({x,y}) {  
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if(grid[i][j].location.x < x && grid[i][j].location.x + 50 > x) {
        if(grid[i][j].location.y < y && grid[i][j].location.y + 50 > y) {
          if(selectedElement === 'remove') {
            grid[i][j].type = 'air';
          } else if(random(1) < 0.10 && grid[i][j].type === 'air') {
            grid[i][j].type = selectedElement;
          } 
        }
      }
    }
  }
}
