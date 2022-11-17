let comet;
let planet;

function setup() {
	createCanvas(windowWidth, windowHeight);
    planet = new Planet(createVector(width / 2, height / 2))
    comet = new Comet(createVector(100, 100));
}

function draw() {
	background(220);

    comet.render(planet);
	fill("red");
    planet.render();
	fill("black");
}
