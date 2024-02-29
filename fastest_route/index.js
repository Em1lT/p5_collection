let dots = [];
let stop = false
let seconds = 0
let numberOfdots = 1000
let goalCoordinates = {}

function setup() {
	createCanvas(800, 800);  
  setInterval(timer, 1000);
  for(let i = 1; i <= numberOfdots; i++) {
    dots.push({x: random(0, width - 10), y: random(0, height - 10), index: i, pathIndex: undefined});
  }
  dots.push({x: 0, y: 0, index: 0, pathIndex: 0});
  const goal = {x: random(width), y: random(width), index: dots.length + 1, goal: true, pathIndex: undefined}
  dots.push(goal);
  goalCoordinates = {x: goal.x, y: goal.y}

}

function timer() {
  if(!stop) {
    seconds++;
  }
}


function dotColor(globalIndex) {
  dots.forEach(item => {
    if(item.pathIndex === globalIndex) {
      fill('yellow')
    } else if(item.pathIndex >= 0 ) {
      fill('red')
    } else if (item.goal === true) {
      fill('green')
    } else {
      fill('white')
    }
    ellipse(item.x, item.y, 10)
  })
}

function drawLine() {
  const s = dots.filter((item) => item.pathIndex >= 0)
  .sort((a,b) => {
    return a.pathIndex - b.pathIndex
  })
  for(let i = 0; i < s.length; i++) {
    const item = s[i]
    if(item.pathIndex > 0) {
      line(item.x, item.y, s[i - 1].x, s[i - 1].y)
    } 
  }
}

// This will only go to the closest dot
// function forward(item) {
//   // change this logic to return the smartest one 
//   if(!item) return
//   let closest;
//   dots.forEach((dot) => {
//     const d = dist(item.x, item.y, dot.x, dot.y)
//     if(d != 0 && d ) {
//       if(!closest) {
//         closest = dot
//       } else if (dot.pathIndex === undefined && closest && d < dist(item.x, item.y, closest.x, closest.y)) {
//         closest = dot
//       }
//     }
//   })
//   return closest
// }

function forward(item) {
  // change this logic to return the smartest one 
  if(!item) return
  let closest;
  dots.forEach((dot) => {
    const d = dist(item.x, item.y, dot.x, dot.y)
    const d1 = dist(dot.x, dot.y, goalCoordinates.x, goalCoordinates.y)
    if(d != 0 && d) {
      if(!closest) {
        closest = dot
      }  else if (
        dot.pathIndex === undefined &&
        closest &&
        d < dist(item.x, item.y, closest.x, closest.y) &&
        d1 < dist(item.x, item.y, goalCoordinates.x, goalCoordinates.y)
      ) {
        closest = dot
      }
    }
  })
  return closest
}

function draw() {
	background(220);
  frameRate(10);
  fill('black')
  text(seconds, 10, height - 10)
  const x = dots.filter(item => item.pathIndex >= 0).sort((a,b) => {
    return b.pathIndex - a.pathIndex
  })[0]

  const globalIndex = x.pathIndex
  dotColor(globalIndex);
  drawLine()

  if(!stop) {
    for(let i = 0; i < dots.length; i++) {
      const item = dots[i]
      if(item.pathIndex === globalIndex) {
        const closest = forward(item)
        if(item.goal) {
          stop = true
          continue;
        }
        closest.pathIndex = globalIndex + 1
        continue;
      } 
    }
  }
}



