class Firework {
	constructor() {
		this.x = windowWidth / 2;
		this.startY = random(windowHeight + 100, windowHeight + 1000);
		this.y = this.startY; 
		this.offset = random(-1,1)
		this.speed = random(1,3);
		this.blowHeight = random(0, 400);
		this.expColor = color(random(100,255), random(0,255), random(0,255));
		this.size = random(5,20);
	}

	draw() {
		rect(this.x, this.y, this.size, this.size * 3, 10);
		fill(20);
	}

	move(){
		if(this.y > this.blowHeight) {
			this.y -= this.speed;
			this.x += this.offset;
		} else {
			explosions.push(new Explosion(this.x,this.y, this.expColor));	
			this.y = this.startY;
		}
	}
}


class Explosion {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.explSize = random(100,200);
		this.size = random(10, 80);
		this.removed = false;
	}

	draw(){
		fill(this.color);
		ellipse(this.x, this.y, this.size, this.size);
	}
	grow(){
		if(this.size < this.explSize) {
			this.size += 5;
		} else {
			this.removed = true;
		}
	}
	removable(){
		return this.removed;
	}
}
