
fireworks = [];
explosions = [];
const all = 70;
const year = new Date().getFullYear();

function setup() {
	createCanvas(windowWidth, windowHeight);  
	for(let i = 0; i < all; i++) {
		fireworks[i] = new Firework(); 
	}
}

function draw() {
	background(220);
	textSize(50);
	fill(30);
	text('HAPPY NEW YEAR ' + year + '!' ,5 , windowHeight/ 2);	
	for(let firework of fireworks) {
		firework.draw();
		firework.move();  
	}

	for(let i in explosions) {
		explosions[i].draw();
		explosions[i].grow();
		if(explosions[i].removable()){
			explosions.splice(i,1);
		}
	}
}



class Firework {
	constructor() {
		this.x = random(0,windowWidth);
		this.startY = random(windowHeight + 100, windowHeight + 1000);
		this.y = this.startY; 
		this.speed = random(1,3);
		this.blowHeight = random(0, 400);
		this.color = color(random(100,255), random(0,255), random(0,255));
		this.size = random(5,20);
	}

	draw() {
		rect(this.x, this.y, this.size, this.size * 3, 10);
		fill(this.color);
	}

	move(){
		if(this.y > this.blowHeight) {
			this.y -= this.speed;
		} else {
			explosions.push(new Explosion(this.x,this.y, this.color));	
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
