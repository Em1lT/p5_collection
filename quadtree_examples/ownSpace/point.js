class Point {
  constructor(x, y) {
    this.location = createVector(x, y)
    this.speed = p5.Vector.random2D()
    this.acceleration = p5.Vector.random2D()
    this.velocity = createVector(0, 0)
  }

  steerAwayFromNearest(points) {
    let heading = createVector(0, 0)
    points?.forEach(p => {
      heading = p5.Vector.sub(this.location, p.location)
    })
    heading.limit(3)
    this.velocity.add(heading)
  }
  getNearestPoints(points) {
    return points
      .filter(p => this.location.dist(p.location) > 0)
      .filter(p => this.location.dist(p.location) < 30)
      .sort((a, b) => a.location.dist(this.location) - b.location.dist(this.location))
      .slice(0, 2)
  }

  drawLineToNearest(nearestPoints) {
    nearestPoints.forEach(p => {
      line(this.location.x, this.location.y, p.location.x, p.location.y)
    })
  }

  update() {
    // Base behaviour
    this.speed.add(this.velocity)
    this.speed.limit(2)
    this.location.add(this.speed)
    this.velocity = createVector(0, 0)

    // Checking if point goes out of bounds. and teleports to the other side
    if (this.location.x > width) {
      // if point goes out of bound from the right side
      this.location.x = 0
    }
    if (this.location.x < 0) {
      // if point goes out of bound from the left side
      this.location.x = width
    }
    if (this.location.y > height) {
      // if point goes out of bound from the top side
      this.location.y = 0
    }
    if (this.location.y < 0) {
      // if point goes out of bound from the bottom side
      this.location.y = height
    }
  }

  render() {
    circle(this.location.x, this.location.y, 5)
  }
}

