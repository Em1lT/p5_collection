let lines = [];
let comet;
let c_acc;
let c_vel;

function setup() {
	createCanvas(windowWidth, windowHeight);
	comet = createVector(800, 800);
	c_acc = createVector(0, 5);
}

function draw() {
	background(220);
	planet = createVector(width / 2, height / 2);
	let old_comet = comet.copy();

	c_vel = p5.Vector.sub(planet, comet);
	let dis = dist(planet.x, planet.y, comet.x, comet.y);
	c_vel.limit(0.00005 * dis);
	c_acc.add(c_vel);
	comet.add(c_acc);
	c_vel = createVector(0, 0);

	ellipse(comet.x, comet.y, 10);
	lines.push({
		p1: createVector(old_comet.x, old_comet.y),
		p2: createVector(comet.x, comet.y),
	});
	if (lines.length >= 1000) {
		lines.shift();
		lines.shift();
	}

	for (let i = 0; i < lines.length; i++) {
		const s = map(i, 0.5, 1000, 0.1, 2);
		strokeWeight(s);
		if (i % 2 == 0) {
			line(
				lines[i].p1.x,
				lines[i].p1.y,
				lines[i].p2.x,
				lines[i].p2.y
			);
		}
	}
	fill("red");
	ellipse(planet.x, planet.y, 50);
	fill("black");
}
