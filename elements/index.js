let gridSize = 50
let grid = []
let size = 8
let selectedElement = 'sand'
let boxSize = size - 1
let lost = false

function setupSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    let tempGrid = []
    for (let j = 0; j < gridSize; j++ ) {
      tempGrid.push({type: 'air', location: createVector(i * size,j * size, 1)})
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
      if(dir === "right")  {
        grid[i + 1][j].type = 'water';
      }
      grid[i][j].type = 'air';
    } else if (!grid[i + 1] && grid[i + 1][j].type !== 'air') {
      if(dir === "right")  {
        grid[i + 1][j].type = 'water';
      }
      if(dir === "left")  {
        grid[i - 1][j].type = 'water';
      }
        grid[i][j].type = 'air';
    }

  } else if (!grid[i][j + 1]) {
    if(grid[i + 1]) {
      if(grid[i + 1][j].type === 'air') {
        grid[i+1][j].type = 'water';
        grid[i][j].type = 'air';
      } 
    }
  } else if (grid[i][j + 1].type === 'water') {
        grid[i+1][j].type = 'water';
        grid[i][j].type = 'air';
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
  createCanvas(400, 400);
  frameRate(30);
  strokeWeight(0);
  setupSquares();
  let b1 = createButton('sand');
  b1.position(50, 500);
  b1.mousePressed(() => {
    selectedElement = 'sand';
  });

  let b2 = createButton('water');
  b2.position(200, 500);
  b2.mousePressed(() => {
    selectedElement = 'water';
  });

  let b3 = createButton('stone');
  b3.position(350, 500);
  b3.mousePressed(() => {
    selectedElement = 'stone';
  });
}

function fillColor (cell) {
  switch (cell.type) {
    case 'sand':
      fill('brown')
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
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      fillColor(grid[i][j])
      square(grid[i][j].location.x, grid[i][j].location.y, boxSize)
    }
  }
}

function draw() {
  background(220);
  drawSquares();
  update();
}

function mouseClicked({x,y}) {  
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if(grid[i][j].location.x < x && grid[i][j].location.x + 30 > x) {
        if(grid[i][j].location.y < y && grid[i][j].location.y + 30 > y) {
          if(grid[i][j].type === 'air') {
            grid[i][j].type = selectedElement;
          }
        }
      }
    }
  }
}