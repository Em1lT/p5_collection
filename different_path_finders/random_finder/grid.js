class Grid {
  constructor(size) {
    this.gridWidth = size;
    this.size = width / this.gridWidth;
    this.grid = [];
    this.boxSize = this.size;
    this.path = [];
    this.current = null;
    this.finish = false;
  }

  setupSquares() {
    for (let i = 0; i < this.gridWidth; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.gridWidth; j++) {
        const cell = new Cell(i * this.boxSize, j * this.boxSize, i, j);
        this.grid[i][j] = cell;
      }
    }
    this.grid[1][1].mark = true;
    this.current = this.grid[0][0];
    this.grid[this.gridWidth - 1][this.gridWidth - 1].finish = true;
    this.path.push(this.grid[this.gridWidth - 1][this.gridWidth - 1]);
  }

  setupObstacles() {
    for (let i = 0; i < this.gridWidth; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        const s = Math.floor(Math.random() * 100);
        if (s > 80 && !this.grid[i][j].finish) {
          this.grid[i][j].obstacle = true;
        }
      }
    }
  }

  drawSquares() {
    for (let i = 0; i < this.gridWidth; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        if (this.grid[i][j].finish) {
          fill("green");
        } else if (this.grid[i][j].mark) {
          fill("red");
        }  else if (this.grid[i][j].obstacle) {
          fill("gray");
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

  pathFind() {
    const next = this.getNextRandomAdjacentElements(
      this.current.i,
      this.current.j,
    );
    if (!next) {
      for (let i = this.path.length - 1; i >= 0; i--) {
        const elements = this.getCombatibleElements(this.path[i].i, this.path[i].j);
        if (elements.length > 0) {
          const adjacentElement =
            elements[Math.floor(Math.random() * elements.length)];
          adjacentElement.mark = true;
          if(adjacentElement.finish) {
            console.log('finish!')
            this.finish = true;
          }
          this.path.push(adjacentElement);
          this.current = adjacentElement;
          break;
        } else {
          continue;
        }
      }
    }
    if (next) {
      next.mark = true;
      this.path.push(next);
      this.current = next;

      if(next.finish) {
        console.log('finish!')
        this.finish = true;
      }
    }
  }


  getNextRandomAdjacentElements(i, j) {
    const adjacentElements = this.getAdjacentElements(i, j).filter(
      (el) => !el.obstacle && !el.mark,
    );
    return adjacentElements[
      Math.floor(Math.random() * adjacentElements.length)
    ];
  }

  getCombatibleElements(i, j) {
    return this.getAdjacentElements(i, j).filter(
      (el) => !el.obstacle && !el.mark,
    );
  }

  getAdjacentElements(i, j) {
    if (this.grid[i + 1] === undefined) {
      return [
        this.grid[i][j + 1],
        this.grid[i][j - 1],
        this.grid[i - 1][j],
      ].filter((el) => el !== undefined);
    } else if (this.grid[i - 1] === undefined) {
      return [
        this.grid[i][j + 1],
        this.grid[i][j - 1],
        this.grid[i + 1][j],
      ].filter((el) => el !== undefined);
    } else if (this.grid[i][j + 1] === undefined) {
      return [
        this.grid[i][j - 1],
        this.grid[i - 1][j],
        this.grid[i + 1][j],
      ].filter((el) => el !== undefined);
    } else if (this.grid[i][j - 1] === undefined) {
      return [
        this.grid[i][j + 1],
        this.grid[i + 1][j],
        this.grid[i - 1][j],
      ].filter((el) => el !== undefined);
    } else {
      return [
        this.grid[i][j + 1],
        this.grid[i][j - 1],
        this.grid[i - 1][j],
        this.grid[i + 1][j],
      ].filter((el) => el !== undefined);
    }
  }
}
