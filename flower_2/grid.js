function setupSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    grid[i] = []
    for (let j = 0; j < gridSize; j++ ) {
      grid[i][j] = {
        length: 0,
        grid: {
          x: i,
          y: j
        },
        location: {
          x: i * size,
          y: j * size
        },
        type: "air", // ground, flower_base, flower, 
        connectedNodes: []
      }
    }
  }
}

function setupGround(){
  const ground = []
  for (let i = 0; i <= gridSize - 1; i++ ) {
    const soil = grid[i][gridSize-1]
    soil.type = "ground"
    ground.push(soil)
  }
  return ground
}

function setupSeeds(soilArr){
  const seeds = []
  for(let i = 0; i < 1; i++) {
    const plant = random(soilArr) // p5 function
    plant.type = "plant"
    seeds.push(plant)
  }
  return seeds
}


function drawSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if (grid[i][j].type === "air") {
        fill('lightblue')
      } else if (grid[i][j].type === "ground") {
        fill('darkgreen')
      } else if (grid[i][j].type === "plant") {
        fill('lightgreen')
      } else if (grid[i][j].type === "flower_base") {
        fill('green')
      } else if (grid[i][j].type === "flower") {
        fill('brown')
      }
      else {
        fill('')
      }
      rect(grid[i][j].location.x, grid[i][j].location.y, boxSize, boxSize)
    }
  }
}
