
dots = [];

function setup() {
	createCanvas(500, 500);  
  for(let i = 1; i <= 100; i++) {
    dots.push({x: random(0, width - 10), y: random(0, height - 10), index: i, pathIndex: undefined});
  }
    dots.push({x: 0, y: 0, index: 0, pathIndex: 0});
    dots.push({x: width, y: height, index: dots.length + 1, goal: true, pathIndex: undefined});
}

function startAndStop() {

}

function forward(item) {
  let closest;
  console.log(item)
  dots.forEach((dot) => {
    if(!item.y) return; 
    const d = dist(item.x, item,y, dot.x, dot.y);
    if(!closest) {
      closest = dot
    } else if (d < dist(item.x, item,y, closest.x, closest.y)) {
      closest = dot;
    }
  })
  return closest
}

function draw() {
	background(220);
  frameRate(1);
	
  dots.forEach(item => {
    if(item.pathIndex === 0) {
      fill('red')
    } 
    else if (item.goal === true) {
      fill('yellow')

    } else {
      fill('white')
    }
    ellipse(item.x, item.y, 10)
  })

}



