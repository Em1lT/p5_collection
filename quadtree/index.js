const boundary = 400
let qtree;

function setup() {
  createCanvas(400, 400);
  background(225);
  const bound = new Rectangle(200, 200, 200, 200)
  qtree = new QuadTree(bound, 4)
  for (let i = 0; i < 10; i++) {
    // const randomX = Math.floor(Math.random() * boundary)
    // const randomY = Math.floor(Math.random() * boundary)
    const randomX = randomGaussian(width / 2, width / 8);
    const randomY = randomGaussian(height / 2, height / 8);
    const node = new Point(randomX, randomY)
    qtree.addChild(node)
  }
}

function draw() {
  background(225);
  frameRate(10)
  qtree.render()
  const range = new Rectangle(mouseX, mouseY, 25, 25);
  if (mouseX < width && mouseY < height) {
    rect(range.x, range.y, range.w * 2, range.h * 2);
    const points = qtree.query(range)
    points?.forEach(p => {
      strokeWeight(2)
      stroke('green')
      p.render()
      stroke('black')
      strokeWeight(1)
    })
  }
  // const r = new Rectangle(mouseX, mouseY, 10, 10)
}

