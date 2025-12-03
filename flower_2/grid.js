function setupSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    grid[i] = []
    for (let j = 0; j < gridSize; j++ ) {
      grid[i][j] = {
        location: {
          x: i * size,
          y: j * size
        },
        type: "air" // ground, flower_base, flower, 
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

function setupSeeds(soil){

}


function drawSquares() {
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if (grid[i][j].type === "air") {
        fill('lightblue')
      } else if (grid[i][j].type === "ground") {
        fill('green')
      } else if (grid[i][j].type === "ground") {
        fill('lightgreen')
      } else {
        fill('')
      }
      rect(grid[i][j].location.x, grid[i][j].location.y, boxSize, boxSize)
    }
  }
}
