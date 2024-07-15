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
}

class QuadTree {
  constructor(bound, treshold) {
    this.bound = bound
    this.treshold = treshold
    this.children = []
    this.divided = false
  }

  subdivide() {
    const x = this.bound.x
    const y = this.bound.y
    const w = this.bound.w
    const h = this.bound.h

    const topLeft = new QuadTree(x, y, w/2, h/2)
    const topRight = new QuadTree(x + w/2, y, w/2, h/2)
    const bottomLeft = new QuadTree(x, y + h/2, w/2, h/2)
    const bottomRight = new QuadTree(x + w/2, y + h/2, w/2, h/2)

    this.children.push(topLeft)
    this.children.push(topRight)
    this.children.push(bottomLeft)
    this.children.push(bottomRight)
    this.divided = true
  }

  addChild(child) {
    this.children.push(child)

    if ( this.children.length > this.treshold ) {
      if (!this.divided) {
        // this.subdivide()
      }
    }
  }


  render() {
    rect(this.bound.x, this.bound.y, this.bound.w * 2, this.bound.h * 2);
    this.children.forEach(child => {
      child.render()
    })
    if (this.divided) {
      this.
    }
  }
}
