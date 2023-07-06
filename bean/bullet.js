class Bullet {
  constructor(pos, dgr) {
    this.pos = pos;
    this.degr = dgr;
  }

  checkForDelete() {
    if (this.pos.x > height || this.pos.x < 0) {
      return true;
    }

    if (this.pos.y > width || this.pos.y < 0) {
      return true;
    }
    return false;
  }

  update() {
    this.degrVect = createVector(sin(this.degr), cos(this.degr));
    this.pos.add(this.degrVect.mult(5));
  }

  render() {
    ellipse(this.pos.x, this.pos.y, 10, 10);
  }

  shoot() {}
}
