class Dot {
  constructor (location, index, parentLocation) {
    this.location = location;
    this.parentLocation = parentLocation
    this.index = index
    this.speed = p5.Vector.random2D()
    this.degr = createVector(0,0)
    this.degrVect = 0;
    this.vel = createVector(0,0)
  }

  getClosestDots(dots, numOfDots) {
    const validDots = dots.filter(
      item => this.location.x !== item.location.x || this.location.y !== item.location.y
    );

   // Sort the valid dots by their distance to `this.location`
    validDots.sort((a, b) => {
      const distA = dist(a.location.x, a.location.y, this.location.x, this.location.y);
      const distB = dist(b.location.x, b.location.y, this.location.x, this.location.y);
      return distA - distB;
    });


    const closeDots = dots.filter(
      item => dist(this.location.x, this.location.y, item.location.x, item.location.y) < 200
    );


    // Return the first three dots in the sorted array, or fewer if less than three
    if (closeDots.length <= numOfDots) {
      return closeDots;
    }

    return closeDots.slice(0, numOfDots);
  }


   steerTowardsTheGroup(vectors) {
     // calculate the heading of the vectors
     vectors.forEach(vector => {

       const heading = p5.Vector.sub(vector.location, this.location)
       this.vel.add(heading).limit(0.7)
     })
  }

  steerAwayFromClosestVectors (vectors) {
    // get the averate vector from the vectors
    if(!vectors) return
    vectors.forEach(vector => {
      this.vel.add(p5.Vector.sub(this.speed, vector.speed)).limit(0.6)
    })
  }

  markClosestVector (vectors) {
    if(!vectors) return
    vectors.forEach(vector => {
      line(this.location.x, this.location.y, vector.location.x, vector.location.y)
    })
  }
  
  markLineOfSight () {
    // mark staright line in fornt
    line(this.location.x, this.location.y, this.location.x + this.speed.x * 10, this.location.y + this.speed.y * 10)
  }
  goToParent () {
    if(!this.parentLocation) return
    this.vel.add(p5.Vector.sub(this.parentLocation, this.location))
    this.vel.limit(5)
  }

  update (closestVectors) {
    // this.vel.add(this.vel)
    // // this.steerAwayFromClosestVectors(closestVectors)
    this.goToParent();
    this.speed.add(this.vel)
    this.speed.limit(3)
    // 
    this.location.add(this.speed);
		// this.vel = createVector(0, 0);
  }

	renderPath() {
		for (let i = 0; i < this.path.length; i++) {
			const s = map(i, 0, this.pathLength, 0, 2);
			strokeWeight(s);
			if (i % 2 == 0) {
				line(
					this.path[i].p1.x,
					this.path[i].p1.y,
					this.path[i].p2.x,
					this.path[i].p2.y
				);
			}
		}
    strokeWeight(1);
	}

  render () {
    ellipse(this.location.x, this.location.y, 20);
    line(this.location.x, this.location.y, this.parentLocation.x, this.parentLocation.y)
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
