
class Dot {
  constructor(location) {
    this.location = location;
    this.vel = createVector(4, 1);
    this.acceleration = createVector(0, 0);
    this.speed = createVector(0, 0);
  }

  closestWall(walls) {
    let closest;
    let closestDist;
    for (let wall of walls) {
      const ray = this.intersect(
        this.location.x,
        this.location.y,
        this.location.x + 10,
        this.location.y + 10,
        wall.pos.x,
        wall.pos.y,
        wall.pos2.x,
        wall.pos2.y
      );
      if (!ray) continue;
      const dis = dist(ray.x, ray.y, this.location.x, this.location.y);

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

  update(walls) {

    const closestWall = this.closestWall(walls);
    if (closestWall) {
      console.log(closestWall)
      this.speed.mult(-1);
    }
    this.speed.add(this.vel)
    this.speed.limit(5)
    this.location.add(this.speed);
    this.vel = createVector(0, 0);
  }

  render() {
    ellipse(this.location.x, this.location.y, 10);
  }
  renderLineOfSight() {
    line(this.location.x, this.location.y, this.location.x + this.speed.x * 10, this.location.y + this.speed.y * 10)
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
}
