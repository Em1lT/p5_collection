numOfDots = 1
dots = [];
walls = [];

function setup() {
	createCanvas(500, 500);  
  for(let i = 1; i <= numOfDots; i++) {
    const location = createVector(random(0, width - 10), random(0, height - 10))
    dots.push(new Dot(location, i, undefined))
  }

  //  draw walls
  walls.push(new Wall(0, 0, width, 0))
  walls.push(new Wall(0, 0, 0, height))
  walls.push(new Wall(width, 0, width, height))
  walls.push(new Wall(0, height, width, height))
}

function udpateDots () {
  dots.forEach((dot) => {
    const dotsArrCopy = [...dots]
    const closest = dot.getClosest(dotsArrCopy);
    dot.update(closest, walls)
    // dot.steerToCenter()
    // dot.pushAwayFromOthers(closest)
    dot.render()
  })
}

function draw() {
	background(220);
  angleMode(DEGREES);
  // frameRate(1);
  udpateDots()
  // draw walls
  strokeWeight(4)
  walls.forEach(wall => {
    wall.render()
  })
  strokeWeight(1)
}

