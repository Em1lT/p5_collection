class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rays = [];
    this.points = 10; // number of rays
    this.fieldOfView = 40; // field of view
    this.radiusPoints = 360 / this.points;
    this.degrVect = 0;
    this.degr = 0;
  }
  turn(value) {
    this.degr += value;
  }

  move(value) {
    this.pos.add(this.degrVect.mult(value));
  }

  update(walls) {
    this.degrVect = createVector(sin(this.degr), cos(this.degr));
    // this.pos = createVector(mouseX, mouseY);
    stroke("red");
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.degrVect.x * 30,
      this.pos.y + this.degrVect.y * 30
    );
    stroke("black");

    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.degrVect.x + sin(this.degr + this.fieldOfView) * 30,
      this.pos.y + this.degrVect.y + cos(this.degr + this.fieldOfView) * 30
    );

    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.degrVect.x + sin(this.degr - this.fieldOfView) * 30,
      this.pos.y + this.degrVect.y + cos(this.degr - this.fieldOfView) * 30
    );

    this.rays = [];
    for (let i = -this.fieldOfView; i <= this.fieldOfView * 2; i++) {
      const { x, y } = createVector(
        this.pos.x + this.degrVect.x + sin(this.degr + i) * 1000,
        this.pos.y + this.degrVect.y + cos(this.degr + i) * 1000
      );
      const closest = this.closestWall(x, y, walls);
      this.rays.push(createVector(closest?.x || x, closest?.y || y));
    }
  }

  closestWall(x, y, walls) {
    let closest;
    let closestDist;
    for (let wall of walls) {
      const ray = this.intersect(
        this.pos.x,
        this.pos.y,
        x,
        y,
        wall.pos.x,
        wall.pos.y,
        wall.pos2.x,
        wall.pos2.y
      );
      if (!ray) continue;
      const dis = dist(ray.x, ray.y, this.pos.x, this.pos.y);

      if (dis === 0) {
        continue;
      }

      if (!closestDist || dis < closestDist) {
        closest = ray;
        closestDist = dis;
      }
    }
    return closest;
  }

  render() {
    strokeWeight(0.3);
    for (let ray of this.rays) {
      line(this.pos.x, this.pos.y, ray.x, ray.y);
    }
    strokeWeight(1);
  }

  // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
  // Determine the intersection point of two line segments
  // Return FALSE if the lines don't intersect
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
}
