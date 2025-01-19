dots = [];
numberOfDots = 1;
walls = [];

function setup() {
  createCanvas(500, 500);
  for (let i = 1; i <= numberOfDots; i++) {
    dots.push(
      new Dot(
        createVector(randomGaussian(width / 2), randomGaussian(height / 2)),
      )
    );
  }
  walls.push(new Wall(0, 0, width, 0))
  walls.push(new Wall(0, 0, 0, height))
  walls.push(new Wall(width, 0, width, height))
  walls.push(new Wall(0, height, width, height))
}

function draw() {
  background(220);
  frameRate(60);
  dots.forEach((dot) => {
    dot.update(walls);
    dot.renderLineOfSight();
    dot.render();
  })
  strokeWeight(4)
  walls.forEach(wall => {
    wall.render()
  })
  strokeWeight(1)
}



