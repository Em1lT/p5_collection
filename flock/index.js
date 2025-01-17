numOfDots = 100
dots = [];
walls = [];

function setup() {
	createCanvas(1400, 900);  
  angleMode(DEGREES);
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
    const closest = dot.getClosestDots(dotsArrCopy, 3);
    dot.update(closest, walls)
    dot.outOfBounds() && dots.splice(dots.indexOf(dot), 1)
    dot.render()
  })
}

function draw() {
	background(220);
  // frameRate(1);
  udpateDots()
  // draw walls
  strokeWeight(4)
  walls.forEach(wall => {
    wall.render()
  })
  strokeWeight(1)
}

