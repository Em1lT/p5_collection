
class Dot {
  constructor (location, index, pathIndex) {
    this.location = location;
    this.index = index
    this.pathIndex = pathIndex;
  }

  getClosest(dots) {
    const closest = dots.reduce((closest, item) => {
      if (!closest) {
        return item; // First iteration, set the first item as the closest
      }
      const c1 = dist(item.location.x, item.location.y, this.location.x, this.location.y);
      const c2 = dist(closest.location.x, closest.location.y, this.location.x, this.location.y);
      if (c1 < c2) {
        return item; // Current item is closer, so it becomes the new closest
      }
      return closest; // No closer item found, keep the current closest
    }, null);

    return closest;
  }

  update (vector) {
    this.location.sub(vector);
  }

  render () {
    ellipse(this.location.x, this.location.y, 10)

  }

}
