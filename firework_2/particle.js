class Particle {
  constructor(x, y, size = 10, color) {
    this.pos = createVector(x, y);
    this.size = size;
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.gravity = createVector(0, 0.098);
    this.color = color;
    this.delete = false;
    this.reducer = 0.1;
  }

  update(i) {
    this.pos.add(createVector(sin(i) * 4, cos(i) * 4));
    this.vel.add(this.gravity);
    this.acc.add(this.vel);
    this.pos.add(this.acc);
    this.size -= this.reducer;
    this.vel = createVector(0, 0);
    if (this.size < 0) this.delete = true;
  }

  draw() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
