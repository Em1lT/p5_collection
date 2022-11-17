class Planet {
    constructor(pos, mass) {
        this.position = pos;
        this.mass = mass;
        this.influence = mass * 10;
    }
    render() {
        fill("red");
        strokeWeight();
        ellipse(this.position.x, this.position.y, this.mass);
    }

    renderGravityArea() {
        fill("grey");
        ellipse(this.position.x, this.position.y, this.influence * 2);
    }

    coordinates() {
        return this.position;
    }
}
