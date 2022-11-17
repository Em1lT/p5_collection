

class Planet {
	constructor(pos) {
		this.position = pos;

	}
	render () {
	    ellipse(this.position.x, this.position.y, 50);
	}

	coordinates () {
		return this.position;
	}
}
