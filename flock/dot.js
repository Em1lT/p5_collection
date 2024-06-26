
class Dot {
  constructor (location, index, pathIndex) {
    this.location = location;
    this.index = index
    this.pathIndex = pathIndex;
    this.speed = createVector(1,1)
    this.degr = createVector(0,0)
    this.degrVect = 0;
    this.vel = p5.Vector.random2D();
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

  update (vector) {
    //if(vector) {
    //  // this.vel = p5.Vector.sub(vector.location, this.location);
    //}
    const s = createVector(width/2, height/2 )
    this.vel = p5.Vector.sub(s, this.location);
    this.vel.add(this.vel)
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

  drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }

}
