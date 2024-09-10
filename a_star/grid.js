class Grid {
  constructor(size) {
    this.size = size
    this.grid = []
    this.boxSize = size
    this.setupSquares()
    this.setupObstacles()
    this.grid[0][0].mark = true
    this.grid[this.size - 1][this.size - 1].finish = true
  }

  setupSquares() {
    for (let i = 0; i < this.size; i++ ) {
      this.grid[i] = []
      for (let j = 0; j < this.size; j++ ) {
        this.grid[i][j] = {
          location: {
            x: i * this.boxSize,
            y: j * this.boxSize
          },
          finish: false,
          obstacle: false,
          mark: false
        }
      }
    }
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
}

