class Comet {
	constructor(pos, acc) {
		this.path = [];
		this.position = pos;
		this.acc = acc;
		this.vel = createVector(0, 0);
		this.outOfZone = false;
		this.pathLength = 100;
	}
	update(planets) {
		fill("black");

		const cometPos = this.coordinates().copy();

		for (planet of planets) {
			const planetPos = planet.coordinates();
			let dis = this.calclulateDistance(
				planetPos.x,
				planetPos.y,
				this.position.x,
				this.position.y
			);
			if (this.checkPlanetInfluence(dis, planet.influence)) {
				this.vel = p5.Vector.sub(planetPos, cometPos);
				const gForce = map(dis, 0, width, 0, 1)
				this.vel.limit(gForce * 0.02 * planet.mass);
			}
		}

		this.acc.add(this.vel);
		this.acc.limit(8)
		this.position.add(this.acc);
		this.vel = createVector(0, 0);

		this.addPath(
			cometPos.x,
			cometPos.y,
			this.position.x,
			this.position.y
		);
		this.checkBorder();
		this.checkPathLength();
	}

	render() {
		ellipse(this.position.x, this.position.y, 20);
		this.renderPath();
	}

	checkBorder() {
		if (this.position.x > width * 2) {
			this.outOfZone = true;
		}

		if (this.position.x < width * -2) {
			this.outOfZone = true;
		}

		if (this.position.y > height * 2) {
			this.outOfZone = true;
		}

		if (this.position.y < height * -2) {
			this.outOfZone = true;
		}
	}

	checkPlanetInfluence(distance, influence) {
		return distance < influence;
	}

	addPath(x1, y1, x2, y2) {
		this.path.push({
			p1: createVector(x1, y1),
			p2: createVector(x2, y2),
		});
	}
	checkPathLength() {
		if (this.path.length >= this.pathLength) {
			this.path.shift();
			this.path.shift();
		}
	}

	renderPath() {
		for (let i = 0; i < this.path.length; i++) {
			const s = map(i, 0, this.pathLength, 0, 2);
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

	calclulateDistance(x1, y1, x2, y2) {
		return dist(x1, y1, x2, y2);
	}

	coordinates() {
		return this.position;
	}
}
