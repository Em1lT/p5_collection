numOfDots = 2
dots = [];

function setup() {
	createCanvas(500, 500);  
  for(let i = 1; i <= numOfDots; i++) {
    dots.push(new Dot(createVector(random(0, width - 10), random(0, height - 10)), i, undefined))
  }
}

function udpateDots () {
  dots.forEach((dot) => {
    const v = p5.Vector.random2D();
    const closest = dot.getClosest(dots);
    dot.render()
    dot.update(closest)
  })
}

function draw() {
	background(220);
  frameRate(1);
  udpateDots()
}



