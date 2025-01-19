dots = [];
numberOfDots = 100;

function setup() {
  createCanvas(500, 500);
  for (let i = 1; i <= numberOfDots; i++) {
    dots.push(
      new Dot(
        createVector(random(0, width - 10), random(0, height - 10))
      )
    );
  }
}

function draw() {
  background(220);
  frameRate(20);
  dots.forEach((dot) => {
    dot.update();
    dot.render();
  })
}



