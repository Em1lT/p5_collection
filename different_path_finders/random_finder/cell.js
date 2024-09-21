class Cell {
  constructor(x, y, i, j) {
    this.location = {
      x: x,
      y: y,
    };
    this.i = i;
    this.j = j;
    this.finish = false;
    this.obstacle = false;
    this.mark = false;
  }

  update({ finish, obstacle, mark }) {
    this.finish = finish;
    this.obstacle = obstacle;
    this.mark = mark;
  }

  render() {
    if (this.mark) {
      fill("red");
    } else if (this.finish) {
      fill("green");
    } else if (this.obstacle) {
      fill("black");
    } else {
      fill("white");
    }
    rect(this.x, this.y, boxSize, boxSize);
  }
}
