
class Quad {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.children = []
  }

  addChild(child) {
    this.children.push(child)
  }
  
  render() {
    square(this.x, this.y, this.width, this.height)
  }
}

class QuadTree {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.children = []
  }

  addChild(child) {
    this.children.push(child)
  }
  
  render() {
    square(this.x, this.y, this.width, this.height)
  }
}
