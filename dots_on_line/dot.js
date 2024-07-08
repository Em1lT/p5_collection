
class Dot {
  constructor (location) {
    this.location = createVector(location.x, location.y);
    this.originalLocation = createVector(location.x, location.y);
    this.speed = createVector(0,0)
    this.degr = createVector(0,0)
    this.vel = createVector(0,0)
    this.IsOnpointerRadius = false
  }

  closestDots (dots, numOfDots) {
    const validDots = dots.filter(
      item => this.location.x !== item.location.x || this.location.y !== item.location.y
    );
      // Sort the valid dots by their distance to `this.location`
    validDots.sort((a, b) => {
      const distA = dist(a.location.x, a.location.y, this.location.x, this.location.y);
      const distB = dist(b.location.x, b.location.y, this.location.x, this.location.y);
      return distA - distB;
    });
      // Return the first three dots in the sorted array, or fewer if less than three
    if (validDots.length <= numOfDots) {
      return validDots;
    }
      // Return the first three dots in the sorted array, or fewer if less than three
    return validDots.filter(item => dist(this.location.x, this.location.y, item.location.x, item.location.y) < 50).slice(0, numOfDots);
  }

  update (dots) {
    this.vel.limit(0.9)
    this.speed.add(this.vel)
    this.speed.mult(0.9)

    this.location.add(this.speed)
    this.vel = createVector(0, 0)

    if(!this.IsOnpointerRadius) {
      const s = p5.Vector.sub(this.originalLocation, this.location)
      this.vel.add(s).limit(0.9)
      this.speed.add(this.vel)
    } else {
      const closestDots = this.closestDots(dots, 3);
      closestDots.forEach(item => {
        const d = dist(this.location.x, this.location.y, item.location.x, item.location.y)
        const g = map(d, 0, 100, 1, 3)
        this.vel.add(p5.Vector.add(createVector(item.location.x, item.location.y), this.location)).limit(g)
        this.speed.add(this.vel)
        this.speed.limit(0.5)
        this.location.add(this.speed)

      })
    }
    this.vel = createVector(0, 0)
  }

  render () {
    ellipse(this.location.x, this.location.y, 40);
    // line(this.originalLocation.x, this.originalLocation.y, this.location.x, this.location.y)
  }

  pushFromPointer (pointer, radius) {
    if(!this.IsOnpointerRadius) return
    const s = p5.Vector.sub(pointer, this.location)
    this.vel.add(s)

  }

  closeToPointer (pointer, radius) {
    const d = dist(this.location.x, this.location.y, pointer.x, pointer.y)
    if(d < radius / 2) {
       this.IsOnpointerRadius = true
      return true
    }
    this.IsOnpointerRadius = false
    return false
  }

}
