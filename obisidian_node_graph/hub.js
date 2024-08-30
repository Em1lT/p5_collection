class Hub {
  constructor(location) {
    this.location = location;
    this.numOfDots = 3;
    this.children = [];
    for (let i = 1; i <= this.numOfDots; i++) {
      const location = createVector(
        random(0, width - 10),
        random(0, height - 10),
      );
      this.children.push(new Dot(location, i, this.location));
    }
  }

  render() {
    fill("red");
    ellipse(this.location.x, this.location.y, 60);
    fill("white");
  }

  udpateDots() {
    this.children.forEach((dot) => {
      dot.update(this.children);
      dot.render();
    });
  }

  update() {
    this.udpateDots();
  }
}
