class Grid {
  constructor(size) {
    this.size = width / size;
    this.grid = [];
    this.boxSize = this.size;
    this.path = [];
    this.current = null;
  }

  setupSquares() {
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.size; j++) {
        const cell = new Cell(i * this.boxSize, j * this.boxSize);
        this.grid[i][j] = cell;
      }
    }
    this.grid[0][0].mark = true;
    this.current = this.grid[0][0];
    this.grid[this.size - 1][this.size - 1].finish = true;
  }

  setupObstacles() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const s = Math.floor(Math.random() * 100);
        if (s > 80) {
          this.grid[i][j].obstacle = true;
        }
      }
    }
  }

  drawSquares() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j].mark) {
          fill("red");
        } else if (this.grid[i][j].finish) {
          fill("green");
        } else if (this.grid[i][j].obstacle) {
          fill("black");
        } else {
          fill("white");
        }
        rect(
          this.grid[i][j].location.x,
          this.grid[i][j].location.y,
          this.boxSize,
          this.boxSize,
        );
      }
    }
  }

  setupObstacles() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const s = Math.floor(Math.random() * 100);
        if (s > 80) {
          this.grid[i][j].obstacle = true;
        }
      }
    }
  }

  pathFind() {
    while (!this.current.finish) {
      const next = this.getNextRandomAdjacentElements(this.current.location.x, this.current.location.y);
      console.log(next);
      if (!next) {
        return;
      }
      next.mark = true;
      this.path.push(next);
      this.current = next;
    }
  }

  getNextRandomAdjacentElements(i, j) {
    const adjacentElements = this.getAdjacentElements(i, j)
    return adjacentElements[Math.floor(Math.random() * adjacentElements.length)];
  }

  getAdjacentElements(i, j) {
    if(this.grid[i+1] !== undefined && this.grid[i+1][j] !== undefined && this.grid[i-1] !== undefined && this.grid[i-1][j] !== undefined) {
       return [
        this.grid[i][j+1],
        this.grid[i][j-1],
        this.grid[i+1][j],
        this.grid[i-1][j],
        // filter out if not air
      ].filter(el => el !== undefined)
    } else if (this.grid[i+1] === undefined) {
       return [
        this.grid[i][j+1],
        this.grid[i][j-1],
        this.grid[i-1][j],
        // filter out if not air
      ].filter(el => el !== undefined)
    } else if (this.grid[i-1] === undefined) {
       return [
        this.grid[i][j+1],
        this.grid[i][j-1],
        this.grid[i+1][j],
        // filter out if not air
      ].filter(el => el !== undefined)
    } else if (this.grid[i+1][j] === undefined && this.grid[i-1][j] === undefined) {
      return [
        this.grid[i][j+1],
        this.grid[i][j-1],
        // filter out if not air
      ].filter(el => el !== undefined)
    }
  }

  getNext(current) {
    let next = null;
    if (current.x > 0) {
      next = this.grid[current.x - 1][current.y];
    } else if (current.x < this.size - 1) {
      next = this.grid[current.x + 1][current.y];
    } else if (current.y > 0) {
      next = this.grid[current.x][current.y - 1];
    } else if (current.y < this.size - 1) {
      next = this.grid[current.x][current.y + 1];
    }
    return next;
  }
}
