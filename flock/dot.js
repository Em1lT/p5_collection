
class Dot {
  constructor (location, index, pathIndex) {
    this.location = location;
    this.index = index
    this.pathIndex = pathIndex;
    this.speed = createVector(0,0)
    this.degr = createVector(0,0)
    this.degrVect = 0;
    this.vel = createVector(0,0)
  }

  getClosest(dots) {
    const closest = dots.reduce((closest, item) => {
      if (!closest && this.location.x !== item.location.x && this.location.y !== item.location.y) {
        return item; // First iteration, set the first item as the closest
      }
      if(!closest) {
        return
      }
      const c1 = dist(item.location.x, item.location.y, this.location.x, this.location.y);
      const c2 = dist(closest.location.x, closest.location.y, this.location.x, this.location.y);
      if (c1 < c2 && c1 !== 0 && c2 !== 0) {
        return item; // Current item is closer, so it becomes the new closest
      }
      return closest; // No closer item found, keep the current closest
    }, null);

    return closest;
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


  update (vector, walls) {
    //if(vector) {
    //  // this.vel = p5.Vector.sub(vector.location, this.location);
    //}
    // this.vel = p5.Vector.sub(s, this.location);
    this.vel.add(this.vel)
    this.closestWall(walls);
    // console.log(this.location.heading())

    this.vel.limit(0.1)
    this.speed.add(this.vel)
    this.speed.limit(6)
    // const hea = createVector(this.location.x, this.location.y)
    // line(this.location.x, this.location.y, hea.x, hea.y)
    
    this.location.add(this.speed);
		this.vel = createVector(0, 0);
  }

  render () {
    ellipse(this.location.x, this.location.y, 10);

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
