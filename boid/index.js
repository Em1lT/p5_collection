
dots = [];

function setup() {
	createCanvas(500, 500);  
  for(let i = 1; i <= 100; i++) {
    dots.push({location: createVector(random(0, width - 10), random(0, height - 10)), index: i, pathIndex: undefined});
  }
}

function forward(item) {
  if(!item) return
  let closest;
  return closest
}

function draw() {
	background(220);
  frameRate(10);
  dots.forEach((dot) => {
    ellipse(dot.location.x, dot.location.y, 10)
    const v = p5.Vector.random2D();
    dot.location.add(v)
  })
}



