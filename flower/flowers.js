class Flower {
  constructor(x, y, tileSize, maxTiles) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.currentTile = 0;
    this.length = Math.floor(random(2, maxTiles)); // random length between 2 and maxTiles-1
    this.done = false;
    this.color = color(255, 100, 200);
    this.finalColor = color(100, 255, 100);
  }

  grow() {
    if (!this.done) {
      this.currentTile++;
      if (this.currentTile >= this.length) {
        this.done = true;
      }
    }
  }

  render() {
    push();
    noStroke();
    for (let i = 0; i < this.currentTile; i++) {
      fill(this.done ? this.finalColor : this.color);
      ellipse(this.x, this.y - i * this.tileSize, this.tileSize * 0.6, this.tileSize * 0.6);
    }
    pop();
  }
}
