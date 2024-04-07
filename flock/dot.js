
class Dot {
  constructor (location, index, pathIndex) {
    this.location = location;
    this.index = index
    this.pathIndex = pathIndex;
  }

  getClosest (dots) {
    return dots.reduce((closest, item) => {
      if(!closest) {
        closest = item
        return closest
      }
      const c1 = dist(item.location.x, item.location.y, this.location.x, this.location.y)
      const c2 = dist(item.location.x, item.location.y, closest.location.x, closest.location.y)
      if(c2 < c1) {
        closest = item
        return closest
      }
      return closest
    }, null)
    
  }

  update (vector) {
    this.location.add(vector);
  }

  render () {
    ellipse(this.location.x, this.location.y, 10)

  }

}
