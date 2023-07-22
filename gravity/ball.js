class Ball {
  constructor(posX, posY, mass) {
    this.pos = createVector(posX, posY);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 12 * mass * 3;
    this.mass = mass;
    this.gravity = createVector(0, 0.098);
  }

  force(f) {
    let calcForce = createVector(0, this.mass);
    calcForce.add(f);
    this.acc.add(calcForce);
  }

  update() {
    this.force(this.gravity);
    this.edges();
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc = createVector(0, 0);
  }

  render() {
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    let velLine = p5.Vector.add(this.pos, this.vel);
    line(this.pos.x, this.pos.y, velLine.x, velLine.y);
  }

  edges() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r + 4;
      this.vel.y *= -0.8;
      // this.vel.mult(createVector(0,-0.7))
    }

    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -0.5;
      // vel.mult(createVector(-1,0))
    } else if (this.pos.x <= 0 + this.r) {
      this.pos.x = 0 + this.r;
      this.vel.x *= -0.5;
      // vel.mult(createVector(1,0))
    }
  }
}
