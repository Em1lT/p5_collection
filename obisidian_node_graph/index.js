numOfDots = 2
hubs = [];
MainDots = [];

function setup() {
	createCanvas(1400, 900);  
  angleMode(DEGREES);
  for(let i = 1; i <= numOfDots; i++) {
    const location = createVector(random(0, width - 10), random(0, height - 10))
    hubs.push(new Hub(location, i, undefined))
  }
}

function udpateHubs () {
  hubs.forEach((hub) => {
    hub.render()
    hub.update()
  })
}

function draw() {
	background(220);
  // frameRate(1);
  udpateHubs()
}

