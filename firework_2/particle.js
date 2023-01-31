class Particle {
  constructor(x, y, size = 10) {
    this.pos = createVector(x, y);
    this.size = size;
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.gravity = createVector(0, 0.098);
    this.delete = false;
  }

  update(i) {
    this.pos.add(createVector(sin(i) * 4, cos(i) * 4));
    this.vel.add(this.gravity);
    this.acc.add(this.vel);
    this.pos.add(this.acc);
    this.vel = createVector(0, 0);
    this.size -= 0.1;
    if (this.size < 0) this.delete = true;
  }
  draw() {
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
