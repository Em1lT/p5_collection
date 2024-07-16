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
    this.items = []
    this.divided = false
  }

  subdivide() {
    const x = this.bound.x
    const y = this.bound.y
    const w = this.bound.w
    const h = this.bound.h

    const topLeft = new QuadTree(new Rectangle(x, y, w/2, h/2), this.treshold)
    const topRight = new QuadTree(new Rectangle(x + w/2, y, w/2, h/2), this.treshold)
    const bottomLeft = new QuadTree(new Rectangle(x, y + h/2, w/2, h/2), this.treshold)
    const bottomRight = new QuadTree(new Rectangle(x + w/2, y + h/2, w/2, h/2), this.treshold)

    this.children.push(topLeft)
    this.children.push(topRight)
    this.children.push(bottomLeft)
    this.children.push(bottomRight)
    this.divided = true
  }

  addChild(child) {
    this.items.push(child)
    // add point if is in bound & check 
  }


  render() {
    strokeWeight(2)
    rect(this.bound.x, this.bound.y, this.bound.w , this.bound.h);
    strokeWeight(1)
    this.items.forEach(child => {
      child.render()
    })
    if (this.items.length > this.treshold){
      this.subdivide()
    }
    if (this.divided) {
      this.children.forEach(child => {
        console.log('child', child)
        child.render()
      })
     }
  }
}
