class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  render() {
    circle(this.x, this.y, 10)
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return point.x >= this.x && point.x <= this.x + this.w && point.y >= this.y && point.y <= this.y + this.h
  }
}

class QuadTree {
  constructor(bound, treshold) {
    this.bound = bound
    this.treshold = treshold
    this.children = []
    this.items = []
    this.divided = false
  }

  contains(point) {
    return this.bound.contains(point)
  }

  subdivide() {
    const x = this.bound.x
    const y = this.bound.y
    const w = this.bound.w
    const h = this.bound.h

    let topLeft = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.northeast = new QuadTree(ne, this.capacity);
    let topRight = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.northwest = new QuadTree(nw, this.capacity);
    let bottomLeft = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.southeast = new QuadTree(se, this.capacity);
    let bottomRight = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.southwest = new QuadTree(sw, this.capacity);

    this.topLeft = topLeft
    this.topRight = topRight
    this.bottomLeft = bottomLeft
    this.bottomRight = bottomRight
    this.divided = true
  }

  addChild(child) {
    if (!this.bound.contains(child)) {
      return false;
    }
    if (this.items.length <= this.treshold) {
      this.items.push(child)
      return true
    }

    if (this.items.length >= this.treshold){
      this.subdivide()
    }

    if (this.divided) {
      if (this.topLeft.contains(child)) {
        this.topLeft.addChild(child)
        return true
      }
      if (this.topRight.contains(child)) {
        this.topRight.addChild(child)
        return true
      }
      if (this.bottomLeft.contains(child)) {
        this.bottomLeft.addChild(child)
        return true
      }
      if (this.bottomRight.contains(child)) {
        this.bottomRight.addChild(child)
        return true
      }
    }
  }


  render() {
    noFill();
    rectMode(CENTER);
    rect(this.bound.x, this.bound.y, this.bound.w * 2, this.bound.h * 2);

    if (this.divided) {
      this.topLeft.render()
      this.topRight.render()
      this.bottomLeft.render()
      this.bottomRight.render()
     }
    this.items.forEach(child => {
      child.render()
    })
  }
}
