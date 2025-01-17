const boundary = 400
const numOfPoints = 1000
const points = []
let bound
let qtree;

// example of using quadtree to optimze the rendering of points
// example shows points that will move away from other points
function setup() {
  createCanvas(800, 800);
  background(225);

  bound = new Rectangle(200, 200, 600, 600)
  for (let i = 0; i < numOfPoints; i++) {
    const randomX = randomGaussian(width / 2, width / 8);
    const randomY = randomGaussian(height / 2, height / 8);
    const node = new Point(randomX, randomY)
    points.push(node)
  }
}
function showFPS() {
  text(`FPS ${frameRate()}`, 200, 200)
}

function draw() {
  background(225);
  frameRate(60)
  qtree = new QuadTree(bound, 2)
  points.forEach(p => {
    const nearestPoints = qtree.query(new Rectangle(p.location.x, p.location.y, 30, 30))
    // const nearestPoints = p.getNearestPoints(points)
    p.steerAwayFromNearest(nearestPoints)
    p.update();
    p.render()
    const node = new Point(p.location.x, p.location.y);
    qtree.addChild(node)
  })
  // qtree.render()
  // showFPS();
}

