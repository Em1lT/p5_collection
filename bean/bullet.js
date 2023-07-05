class Bullet {
  constructor(pos, dgr) {
    this.pos = pos;
    this.degr = dgr;
  }

  update() {
    this.degrVect = createVector(sin(this.degr), cos(this.degr));
  }

  render() {
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.degrVect.x * this.size,
      this.pos.y + this.degrVect.y * this.size
    );
  }

  shoot() {}
}
