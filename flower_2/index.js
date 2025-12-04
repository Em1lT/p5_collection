let gridSize = 20
let grid = []
let seeds = []
let ground = []
let size
let boxSize

function setup() {
  createCanvas(400, 400);
  frameRate(1)
  size = width / gridSize
  boxSize = size
  setupSquares();
  ground = setupGround();
  seeds = setupSeeds(ground);
}


function draw() {
  background(220);
  drawSquares();
  updateFlower(seeds, grid)
}

function updateFlower(seeds, grid) {
  for(const seed of seeds){
    const grow = random([true, true])
    const direction = random(['left', 'center', 'right'])
    flowerGrow(grow, direction, seed, grid)
    // grow up ones

    // or have a flower

  }
}

function flowerGrow(grow, direction, seed, grid) {
  if(grow) {
    const correctTile = mostRecentTile(seed)
    const dir = getDirection(direction)
    const upperTile = getUpperTile(correctTile, dir, grid)
    const flowerLength = seed.connectedNodes.length
    if(upperTile.type === 'air' && flowerLength < 5) {
      upperTile.type = 'flower_base'
      seed.connectedNodes.push(upperTile)
    } 
    if(upperTile.type === 'air' && flowerLength >= 5 && flowerLength < 6) {
      upperTile.type = 'flower'
      seed.connectedNodes.push(upperTile)
    }
    const growPedals =  


  }
}

function mostRecentTile (seed){
  if(seed.connectedNodes.length) {
    return seed.connectedNodes[seed.connectedNodes.length -1]
  } 
  return seed
}

function getUpperTile(seed, dir, grid) {
  try {
    return grid[seed.grid.x + dir][seed.grid.y - 1]
  } catch {
    return grid[seed.grid.x][seed.grid.y]


  }
}

function getDirection(direction) {
  if(direction === "left") return -1
  if(direction === "center") return 0
  if(direction === "left") return 1
}




