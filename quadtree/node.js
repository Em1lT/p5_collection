class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  update() {
    this.x += 0.8;
    this.y += 0.8;
  }

  render() {
    circle(this.x, this.y, 2)
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
    return (point.x >= this.x - this.w &&
      point.x < this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y < this.y + this.h);
  }

  intersects(range) {
    return !(range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h);
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

    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.topLeft = new QuadTree(ne, this.treshold);
    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.topRight = new QuadTree(nw, this.treshold);
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.bottomRight = new QuadTree(se, this.treshold);
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.bottomLeft = new QuadTree(sw, this.treshold);
    this.divided = true
  }

  addChild(child) {
    if (!this.bound.contains(child)) {
      return false;
    }

    if (this.items.length < this.treshold) {
      this.items.push(child)
      return true
    } else {
      if (!this.divided) {
        this.subdivide()
      }
      if (this.topLeft.addChild(child)) {
        return true
      }
      if (this.topRight.addChild(child)) {
        return true
      }
      if (this.bottomLeft.addChild(child)) {
        return true
      }
      if (this.bottomRight.addChild(child)) {
        return true
      }
    }
  }

 query(range, found) {
    if (!found) {
      found = [];
    }
    if (!this.bound.intersects(range)) {
      return;
    } else {
      for (let p of this.items) {
        if (range.contains(p)) {
          found.push(p);
        }
      }
      if (this.divided) {
        this.topLeft.query(range, found);
        this.topRight.query(range, found);
        this.bottomLeft.query(range, found);
        this.bottomRight.query(range, found);
      }
    }
    return found;
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
