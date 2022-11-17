let comet;
let planet;

function setup() {
	createCanvas(windowWidth, windowHeight);
	planet = new Planet(createVector(width / 2, height / 2), 50);
	comet = new Comet(createVector(200, 200));
	c2 = new Comet(createVector(100, 300));
}

function draw() {
	background(220);

	planet.renderGravityArea();
	comet.render(planet);
	c2.render(planet);
	planet.render();
}
