let gridSize = 50
let grid = []
let seeds = []
let ground = []
let size
let boxSize

function setup() {
  createCanvas(400, 400);
  frameRate(10)
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
  }
}

function flowerGrow(grow, direction, seed, grid) {
  if(grow && !seed.done) {
    const correctTile = mostRecentTile(seed)
    const dir = getDirection(direction)
    const upperTile = getUpperTile(correctTile, dir, grid)
    const flowerLength = seed.connectedNodes.length
    if(upperTile.type === 'air' && flowerLength < seed.height && !seed.maxHeight) {
      upperTile.type = 'flower_base'
      seed.connectedNodes.push(upperTile)
    } 
    if(upperTile.type === 'air' && flowerLength >= seed.height && flowerLength < seed.height +1 && !seed.maxHeight) {
      upperTile.type = 'flower'
      seed.maxHeight = true
    }
    if(seed.maxHeight) {
      const growPedals = getAdjacentTiles(correctTile, grid) 
      for(pedal of growPedals) {
        if(pedal.type !== 'flower') pedal.type = "pedal"
        pedal.color = seed.color
      }
      seed.done = true
    }
  }
}

function getAdjacentTiles(tile, grid) {
  const adjacents = []
  for(let i = -1; i <= 1; i++) {
    for(let j = -1; j <= 1; j++) {
      adjacents.push( grid[tile.grid.x + i][tile.grid.y + j])
    }
  }
  return adjacents
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
  if(direction === "right") return 1
}




