class Grid {
  constructor(size) {
    this.size = width / size
    this.grid = []
    this.boxSize = this.size 
  }

  setupSquares() {
    for (let i = 0; i < this.size; i++ ) {
      this.grid[i] = []
      for (let j = 0; j < this.size; j++ ) {
        const cell = new Cell(i * this.boxSize, j * this.boxSize)
        this.grid[i][j] = cell
      }
    }
    this.grid[0][0].mark = true
    this.grid[this.size - 1][this.size - 1].finish = true
  }

  setupObstacles() {
    for (let i = 0; i < this.size; i++ ) {
      for (let j = 0; j < this.size; j++ ) {
        const s = Math.floor(Math.random() * 100)
        if( s > 80 ) {
          this.grid[i][j].obstacle = true;
        }
      }
    }
  }

 drawSquares() {
  for (let i = 0; i < this.size; i++ ) {
    for (let j = 0; j < this.size; j++ ) {
      if (this.grid[i][j].mark) {
        fill('red')
      } else if (this.grid[i][j].finish) {
        fill('green')
      } else if (this.grid[i][j].obstacle) {
        fill('black')
      }
      else {
        fill('white')
      }
      rect(this.grid[i][j].location.x, this.grid[i][j].location.y, this.boxSize, this.boxSize)
    }
  }
}
}

