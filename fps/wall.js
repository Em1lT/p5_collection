class Wall {
  constructor(x1, y1, x2, y2) {
    this.pos = createVector(x1, y1);
    this.pos2 = createVector(x2, y2);
  }

  render() {
    line(this.pos.x, this.pos.y, this.pos2.x, this.pos2.y);
  }
}
