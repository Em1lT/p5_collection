class Firework {
  constructor() {
    this.startY = random(windowHeight + 100, windowHeight + 1000);
    this.y = this.startY;
    this.x = random(0, windowWidth);
    this.speed = random(1, 3);
    this.blowHeight = random(0, 400);
    this.expColor = color(random(100, 255), random(0, 255), random(0, 255));
    this.size = random(5, 20);
  }

  draw() {
    fill(this.expColor);
    rect(this.x, this.y, this.size * 0.5, this.size * 3, 10);
  }

  move() {
    if (this.y > this.blowHeight) {
      this.y -= this.speed;
    } else {
      this.y = this.startY;
      bombs.push(new Bomb(this.x, this.blowHeight, this.size, this.expColor));
    }
  }
}
