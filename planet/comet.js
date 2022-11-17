class Comet {
	constructor(pos) {
		this.path = [];
		this.position = pos;
		this.acc = createVector(2, 2);
		this.vel = createVector(0, 0);
	}
	update() {}

	render(planet) {
		const planetPos = planet.coordinates();
		const cometPos = this.coordinates();

		let oldComet = cometPos.copy();

		let dis = dist(
			planetPos.x,
			planetPos.y,
			this.position.x,
			this.position.y
		);

		if (dis < 400) {
			this.vel = p5.Vector.sub(planetPos, cometPos);
		}
		this.vel.limit(0.05);
		this.acc.add(this.vel);
		this.position.add(this.acc);
		this.vel = createVector(0, 0);

		this.path.push({
			p1: createVector(oldComet.x, oldComet.y),
			p2: createVector(this.position.x, this.position.y),
		});

		ellipse(this.position.x, this.position.y, 10);
		if (this.path.length >= 1000) {
			this.path.shift();
			this.path.shift();
		}

		for (let i = 0; i < this.path.length; i++) {
			const s = map(i, 0.5, 1000, 0.1, 2);
			strokeWeight(s);
			if (i % 2 == 0) {
				line(
					this.path[i].p1.x,
					this.path[i].p1.y,
					this.path[i].p2.x,
					this.path[i].p2.y
				);
			}
		}
	}

	coordinates() {
		return this.position;
	}
}
