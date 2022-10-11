class Player {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.numOfRays = 10;
		this.rays = [];
		this.points = 20;
		this.radiusPoints = 360 / this.points;
	}

	update(walls) {
		this.pos = createVector(mouseX, mouseY);
		this.rays = [];
		for (let i = 0; i <= 720; i += this.radiusPoints) {
			const x = cos(i) * i * this.radiusPoints;
			const y = sin(i) * i * this.radiusPoints;
			const closest = this.closestWall(x, y, walls);
			this.rays.push(
				createVector(closest?.x || x, closest?.y || y)
			);
		}
	}

	closestWall(x, y, walls) {
		let closest;
		let closestDist;
		for (let wall of walls) {
			const ray = this.intersect(
				this.pos.x,
				this.pos.y,
				x,
				y,
				wall.pos.x,
				wall.pos.y,
				wall.pos2.x,
				wall.pos2.y
			);
			if (!ray) continue;
			const dis = dist(ray.x, ray.y, this.pos.x, this.pos.y);

			if (dis === 0) {
				continue;
			}

			if (!closestDist || dis < closestDist) {
				closest = ray;
				closestDist = dis;
			}
		}
		return closest;
	}

	render() {
		strokeWeight(0.3);
		for (let ray of this.rays) {
			line(this.pos.x, this.pos.y, ray.x, ray.y);
		}
		strokeWeight(1);
	}

	// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
	// Determine the intersection point of two line segments
	// Return FALSE if the lines don't intersect
	intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
		// Check if none of the lines are of length 0
		if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
			return false;
		}

		let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
		// Lines are parallel
		if (denominator === 0) {
			return false;
		}

		let ua =
			((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
			denominator;
		let ub =
			((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
			denominator;

		// is the intersection along the segments
		if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
			return false;
		}

		// Return a object with the x and y coordinates of the intersection
		let x = x1 + ua * (x2 - x1);
		let y = y1 + ua * (y2 - y1);

		return { x, y };
	}
}
