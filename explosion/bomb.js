class Bomb {
  constructor(x, y, size = 10) {
    this.pos = createVector(x, y);
    this.size = size;
    this.radius = 360;
    this.space = this.radius / this.size;
    this.particles = [];
    this.delete = false;
    this.expSetp = false;
  }

  update() {}

  draw() {
    if (this.pos.x > width / 2) {
      this.explosion();
    } else {
      this.pos.add(createVector(2, 0));
      ellipse(this.pos.x, this.pos.y, this.size);
    }
  }

  explosionSetup() {
    for (let i = 0; i < this.size; i++) {
      const part = new Particle(this.pos.x + sin(i), this.pos.y + cos(i));
      this.particles.push(part);
    }
  }

  explosion() {
    if (!this.expSetp) {
      this.explosionSetup();
      this.expSetp = true;
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(i);
      this.particles[i].draw();
      if (this.particles[i].delete) {
        this.particles.splice(i, 1);
      }
    }
  }
}
