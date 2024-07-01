
class Dot {
  constructor (location, index, pathIndex) {
    this.location = location;
    this.index = index
    this.pathIndex = pathIndex;
    this.speed = p5.Vector.random2D()
    this.degr = createVector(0,0)
    this.degrVect = 0;
    this.vel = createVector(0,0)
    this.guideLineLen = 80
    this.guideLines = [
      createVector(this.location.x + this.guideLineLen, this.location.y),
      createVector(this.location.x, this.location.y + this.guideLineLen),
      createVector(this.location.x - this.guideLineLen, this.location.y),
      createVector(this.location.x, this.location.y - this.guideLineLen),
    ]
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

  closestWall(x ,y ,walls) {
    let closest;
    let closestDist;
    for (let wall of walls) {
      const ray = this.intersect(
        this.location.x,
        this.location.y,
        x,
        y,
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

  updateGuideLines () {
    this.guideLines = [
      createVector(this.location.x + this.guideLineLen, this.location.y),
      createVector(this.location.x, this.location.y + this.guideLineLen),
      createVector(this.location.x - this.guideLineLen, this.location.y),
      createVector(this.location.x, this.location.y - this.guideLineLen),
    ]
  }

  outOfBounds () {
    return this.location.x < 0 || this.location.x > width || this.location.y < 0 || this.location.y > height
  }

  steerAwayFromClosestWall (walls) {
    const s = this.guideLines.map(guideLine => {
      return this.closestWall(guideLine.x, guideLine.y, walls);
    }).filter(item => item)
    // Push away from other dots
    s.forEach(item => {
      // adjust to the direction of the wall
      const d = dist(this.location.x, this.location.y, item.x, item.y)
      // push away from the wall
      const g = map(d, 0, 100, 0.1, 1)
      this.vel.sub(p5.Vector.sub(createVector(item.x, item.y), this.location)).limit(g)

    })
  }

   steerTowardsTheGroup(vector) {
     // copy vector heading
     const heading = p5.Vector.sub(vector.location, this.location)
     heading.normalize()
     this.vel.add(heading)
  }

  steerAwayFromClosestVector (vector) {
    if(!vector) return
    const d = dist(this.location.x, this.location.y, vector.location.x, vector.location.y)
    const g = map(d, 0, 100, 0.01, 0.1)
    this.vel.add(p5.Vector.sub(this.location, vector.location)).limit(g)
  }

  markClosestVector (vector) {
    line(this.location.x, this.location.y, vector.location.x, vector.location.y)
  }
  
  markLineOfSight () {
    // mark staright line in fornt
    line(this.location.x, this.location.y, this.location.x + this.speed.x * 10, this.location.y + this.speed.y * 10)
  }

  update (closestVector, walls) {
    this.vel.add(this.vel)

    // this.markClosestVector(closestVector)
    this.steerTowardsTheGroup(closestVector)
    this.steerAwayFromClosestVector(closestVector)
    this.steerAwayFromClosestWall(walls)

    this.speed.add(this.vel)
    this.speed.limit(4)
    
    this.location.add(this.speed);
		this.vel = createVector(0, 0);
    this.updateGuideLines()
  }

  render () {
    ellipse(this.location.x, this.location.y, 10);
    this.markLineOfSight()
    // this.arrowHead(this.vel, this.location)
    // this.guideLines.forEach(guideLine => {
    //   line(this.location.x, this.location.y, guideLine.x, guideLine.y)
    // })
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
