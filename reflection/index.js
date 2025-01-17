function setup() {
  createCanvas(400, 400);
}

function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  const u = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4))
  const u1 = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4))
  const t = u / u1

  const x = x1 + t * (x2 - x1)
  const y = y1 + t * (y2 - y1)

  if(x < 0 || x > width || y < 0 || y > height) {
    return undefined;
  }

  return {
    x,
    y
  }
}

function pointOnLine(pt1, pt2, pt3) {
    const dx = (pt3.x - pt1.x) / (pt2.x - pt1.x);
    const dy = (pt3.y - pt1.y) / (pt2.y - pt1.y);
    const onLine = dx === dy

    // Check on or within x and y bounds
    const betweenX = 0 <= dx && dx <= 1;
    const betweenY = 0 <= dy && dy <= 1;

    return onLine && betweenX && betweenY;
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  frameRate(1)
  fill('red');
  ellipse(windowWidth / 2, windowHeight / 2, 20);

  const p = intersect(
    windowWidth / 2, // x1
    windowHeight / 2, // y1
    windowWidth / 3, // x2
    windowHeight / 3,  // y2
    windowWidth / 3 + 10, // x3
    windowHeight / 3 + 40, // y3
    windowWidth / 3 + 30, // x4
    windowHeight / 3 - 30 // y4
  )

  console.log(p)
  ellipse(p.x, p.y, 10)
  // line(p.x, p.x, p.x + 100, )

  line(windowWidth / 2, windowHeight / 2, p.x || windowWidth / 3, p.y || windowHeight / 3)

  strokeWeight(0.5);
  // calculate the angle of the bounce.
  
  
  // line(p.x || windowWidth / 3, p.y || windowHeight / 3, mouseX, mouseY)
  // strokeWeight(3);
  // line(windowWidth / 3 + 10, windowHeight / 3 + 40, windowWidth / 3 + 30 , windowHeight / 3 - 30)
  line(windowWidth / 3 + 10, windowHeight / 3 + 40, windowWidth / 3 + 30 , windowHeight / 3 - 30)
  strokeWeight(1);
}
