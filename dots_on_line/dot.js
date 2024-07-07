
class Dot {
  constructor (location, index, pathIndex) {
    this.location = location;
    this.speed = createVector(0,0)
    this.degr = createVector(0,0)
    this.vel = createVector(0,0)
  }

  update () {
    this.vel.mult(0.01)
    this.speed.add(this.vel)
    this.location.add(this.speed)
    this.speed.mult(0.9)
  }

  render () {
    ellipse(this.location.x, this.location.y, 10);
  }

  pushFromPointer (pointer, radius) {
    const s = p5.Vector.sub(pointer, this.location)
    this.vel.add(s)

  }

  closeToPointer (pointer, radius) {
    const d = dist(this.location.x, this.location.y, pointer.x, pointer.y)
    if(d < 50) {
       return true 
    }
    return false
  }

}
