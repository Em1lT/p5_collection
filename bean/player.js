class Player {
  constructor(pos) {
    this.pos = pos;
    this.degrVect = 0;
    this.degr = 0;
    this.size = 20;
    this.bullets = [];
  }

  turn(value) {
    this.degr += value;
  }

  move(value) {
    this.pos.add(this.degrVect.mult(value));
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
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();
      this.bullets[i].render();
      if (this.bullets[i].checkForDelete()) {
        //delete
        this.bullets.splice(i);
      }
    }
  }

  shoot() {
    this.bullets.push(
      new Bullet(createVector(this.pos.x, this.pos.y), this.degr)
    );
  }
}
