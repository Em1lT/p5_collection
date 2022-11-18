let comets = [];
let planet;

function setup() {
	createCanvas(windowWidth, windowHeight);
	planet = new Planet(createVector(width / 2, height / 2), 40);
	comets.push(new Comet(createVector(100, 180)));
}

function draw() {
	background(220);

	planet.renderGravityArea();
	planet.render();

	comets.forEach((comet, index) => {
		if (comet.outOfZone) {
			comets.splice(index,1)
		}
		comet.update(planet);
		comet.render();
	});
}

function mousePressed() {}
