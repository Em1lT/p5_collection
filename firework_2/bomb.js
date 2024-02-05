class Bomb {
  constructor(x, y, size = 10, color) {
    this.pos = createVector(x, y);
    this.size = size;
    this.radius = 360;
    this.space = this.radius / this.size;
    this.particles = [];
    this.delete = false;
    this.expSetp = false;
    this.color = color;
  }

  draw() {
    if (!this.expSetp) {
      this.explosionSetup();
      this.expSetp = true;
    } else {
      this.explosion();
    }
  }

  explosionSetup() {
    const base = new Particle(this.pos.x, this.pos.y, 20, this.color);
    this.particles.push(base);
    for (let i = 0; i < this.size; i++) {
      const part = new Particle(
        this.pos.x + sin(i),
        this.pos.y + cos(i),
        10,
        this.color
      );
      this.particles.push(part);
    }

    this.particles.shift();
  }

  explosion() {
    if (this.particles.length == 0) {
      this.delete = true;
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
