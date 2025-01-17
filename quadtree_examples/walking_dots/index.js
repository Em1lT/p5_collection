const boundary = 400
const numOfPoints = 200
const points = []
let bound
let qtree;

// just an example how to display the quadtree on dynamic environment
function setup() {
  createCanvas(400, 400);
  background(225);
  bound = new Rectangle(200, 200, 200, 200)
  for (let i = 0; i < numOfPoints; i++) {
    const randomX = randomGaussian(width / 2, width / 8);
    const randomY = randomGaussian(height / 2, height / 8);
    const node = new Point(randomX, randomY)
    points.push(node)
  }
}

function draw() {
  background(225);
  frameRate(60)
  qtree = new QuadTree(bound, 4)
  points.forEach(p => {
    p.update();
    p.render()
    const node = new Point(p.x, p.y);
    qtree.addChild(node)
  })
  qtree.render()
}

