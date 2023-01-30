let size = 20;
let radius = 360;
let space = radius / size;
class Bomb {
  constructor(x, y, size = 10) {
	this.x = random(300)
	this.y = random(300)
  }

  update() {}
  draw() {
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
