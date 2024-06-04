let dots = [];
let stop = false
let seconds = 0
let numberOfdots = 100
let goalCoordinates = {}

function setup() {
	createCanvas(800, 800);  
  setInterval(timer, 1000);
  for(let i = 1; i <= numberOfdots; i++) {
    dots.push({x: random(0, width - 10), y: random(0, height - 10), index: i, pathIndex: undefined});
  }
  const start  = {x: random(width), y: random(width), index: dots.length + 1, pathIndex: 0}
  const goal = {x: random(width), y: random(width), index: dots.length + 1, goal: true, pathIndex: undefined}
  dots.push(start);
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

function forward1(item) {
  // Also includes the dots distance from the goal. Much faster algorithm but all dots 
  if(!item) return
  let closest;
  dots.forEach((dot) => {
    const d = dist(item.x, item.y, dot.x, dot.y)
    strokeWeight(0.1)
    line(item.x, item.y, dot.x, dot.y)
    strokeWeight(1)
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

function getClosestPoints (item) {
  const closestDots = dots.filter((dot) => {
    const d = dist(item.x, item.y, dot.x, dot.y)
    return d < 100 && dot.pathIndex === undefined
  })

  if(closestDots.length > 0) {
    return closestDots
  }
  return dots.filter((dot) => {
    const d = dist(item.x, item.y, dot.x, dot.y)
    return d < 200 && dot.pathIndex === undefined
  })
}

function getClosestPoints1(item) {
  const s = dots.copyWithin(0, dots.length);
  return s.sort((a,b) => {
    return dist(item.x, item.y, a.x, a.y) - dist(item.x, item.y, b.x, b.y)
  }).filter(dot => dot.pathIndex === undefined).slice(0,20)
}

function forward(item) {
  if(!item) return
  let closest;
  const closestDots = getClosestPoints1(item)
  closestDots.forEach((dot) => {
    const d = dist(item.x, item.y, dot.x, dot.y)
    strokeWeight(0.2)
    line(item.x, item.y, dot.x, dot.y)
    strokeWeight(1)
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

function render () {
  const x = dots.filter(item => item.pathIndex >= 0).sort((a,b) => {
    return b.pathIndex - a.pathIndex
  })[0]

  const globalIndex = x.pathIndex
  dotColor(globalIndex);
  drawLine()
}

function update () {
  const x = dots.filter(item => item.pathIndex >= 0).sort((a,b) => {
    return b.pathIndex - a.pathIndex
  })[0]

  const globalIndex = x.pathIndex

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

function draw() {
	background(220);
  frameRate(10);
  fill('black')
  text(seconds, 10, height - 10)
  render()
}

function mouseClicked() {
  update()
}



