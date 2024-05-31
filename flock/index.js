numOfDots = 1
dots = [];

function setup() {
	createCanvas(500, 500);  
  for(let i = 1; i <= numOfDots; i++) {
    const location = createVector(random(0, width - 10), random(0, height - 10))
    dots.push(new Dot(location, i, undefined))
  }
}

function udpateDots () {
  dots.forEach((dot) => {
    const v = p5.Vector.random2D();
    const dotsArrCopy = [...dots]
    const closest = dot.getClosest(dotsArrCopy);
    dot.update(closest)
    // dot.steerToCenter()
    // dot.pushAwayFromOthers(closest)
    dot.render()
  })
}

function draw() {
	background(220);
  // angleMode(DEGREES);
  // frameRate(5);
  udpateDots()
}

