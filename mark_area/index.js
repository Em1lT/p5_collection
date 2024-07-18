const boundary = 400
const items = []

function setup() {
  createCanvas(400, 400);
  background(225);
  for (let i = 0; i < 12000; i++) {
    // const randomX = Math.floor(Math.random() * boundary)
    // const randomY = Math.floor(Math.random() * boundary)
    const randomX = randomGaussian(width / 2, width / 8);
    const randomY = randomGaussian(height / 2, height / 8);
    const node = new Point(randomX, randomY)
    items.push(node)
  }
}

function showInfo() {
  text ('FPS: ' + frameRate(), 10, 20)
  text ('Points: ' + items.length, 10, 30)
}

function renderPoints() {
  items.forEach(p => {
    p.render()
  })
}

function renderClosestPoints() {
  const range = new Rectangle(mouseX, mouseY, 25, 25);
  if (mouseX < width && mouseY < height) {
    rect(range.x, range.y, range.w * 2, range.h * 2);
    const points = items.filter(p => range.contains(p))
    points.forEach(p => {
      strokeWeight(2)
      stroke('green')
      p.render()
      stroke('black')
      strokeWeight(1)
    })
  }
}

function renderClosestPointsWithDist() {
  const range = new Rectangle(mouseX, mouseY, 25, 25);
  if (mouseX < width && mouseY < height) {
    rect(range.x, range.y, range.w * 2, range.h * 2);
    const pointsWithDist = items.filter(p => {
      const dis = dist(p.x, p.y, mouseX, mouseY)
      if(dis < 25) {
      return {
        point: p,
        }
      }
    })
    pointsWithDist.forEach(p => {
      strokeWeight(2)
      stroke('green')
      p.render()
      stroke('black')
      strokeWeight(1)
    })
  }
}

function draw() {
  background(225);
  rectMode(CENTER)
  frameRate(60)
  showInfo()
  renderPoints()
  renderClosestPoints()
}

