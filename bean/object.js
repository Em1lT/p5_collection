class Ball {
    constructor(size, spwnX, spwnY) {
        this.size = size;
        this.loc = createVector( spwnX, spwnY)
        this.speed = 2;
        this.heading = 2
        this.infected = false
    }

    infect() {
        this.infected = true
    }

    draw() {
        ellipse(this.loc.x, this.loc.y, this.size, this.size)
        stroke('black');

        if(this.infected) {
            stroke('red');
        }
    }

    intersect(other) {
        const d = dist(this.loc.x, this.loc.y, other.loc.x, other.loc.y);
        if (d != 0 && d < (this.size + other.size) / 2) {
          return true;
        } else {
          return false;
        }
    }

    update() {
        if (this.loc.x > width) {
            this.loc.x = 0
        } else if (this.loc.x < 0) {
            this.loc.x = width
        } else if (this.loc.y > height) {
            this.loc.y = 0
        } else if (this.loc.y < 0) {
            this.loc.y = height
        }
        this.heading += 0.3 * random(-1, 1);
        let v = createVector(this.speed * cos(this.heading),this.speed * sin(this.heading))
        this.loc.add(v)
    }
}
