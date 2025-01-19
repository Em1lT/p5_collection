
class Dot {
  constructor(location) {
    this.location = location;
    this.vel = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
    this.speed = createVector(0, 0);
  }

  update() {
    this.speed.add(this.vel)
    this.speed.limit(5)
    this.location.add(this.speed);
    this.vel = createVector(0, 0);
  }

  render() {
    ellipse(this.location.x, this.location.y, 10);
  }

  intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return false;
    }

    let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    // Lines are parallel
    if (denominator === 0) {
      return false;
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);

    return { x, y };
  }

  arrowHead(start, vector) {
    push();

    var norm = createVector(vector.x, vector.y);
    norm.normalize();

    applyMatrix(
      norm.x, norm.y,
      -norm.y, norm.x,
      vector.x - start.x,
      vector.y - start.y);
    triangle(0, 6, 12, 0, 0, -6);
    pop();
  }
}
