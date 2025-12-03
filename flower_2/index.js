let gridSize = 20
let grid = []
let seeds = []
let ground = []
let size
let boxSize

function setup() {
  createCanvas(400, 400);
  // frameRate(1)
  size = width / gridSize
  boxSize = size
  setupSquares();
  ground = setupGround();
  seeds = setupSeeds(ground);
}


function draw() {
  background(220);
  drawSquares();
}

