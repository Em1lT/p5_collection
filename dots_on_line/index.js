numOfDots = 200
mouseRadius = 300
dots = [];

function setup() {
	createCanvas(900, 900);  
  for(let i = 1; i <= numOfDots; i++) {
    const location = createVector(random(0, width - 10), random(0, height - 10))
    dots.push(new Dot(location, i, undefined))
  }
}

function udpateDots () {
  dots.forEach((dot) => {
      const pointer = createVector(mouseX, mouseY)
      dot.closeToPointer(pointer, mouseRadius)
      if(dot.IsOnpointerRadius) {
        dot.pushFromPointer(pointer, mouseRadius)
        fill('red')
      } else {
        fill('white')
      }
      dot.update(dots)
      dot.render()
      fill('white')
  })
}

function draw() {
	background(220);
  // frameRate(1);
  udpateDots()
}

