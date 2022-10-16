let humans = [];

function setup() {
    createCanvas(windowWidth / 2, windowHeight / 2);
    createSurvivors(20)
    createInfected()
}

function draw() {
  background(220);
  updateScreen()
}

function reset() {
    createSurvivors(10)
    createInfected()
}

function createSurvivors (num) {
    for (let i = 0; i < num; i++) {
        humans[i] = new Ball(30, random(width), random(height))
    }
}

function createInfected () {
    const infected = humans[Math.round(random(humans.length))]
    infected.infect()
}

function updateScreen () {
  humans.map((h1) => {
      h1.update();
      h1.draw();
      humans.map((h2) => {
          if(h1.intersect(h2) && h2.infected) {
              h1.infect()
          }
      })
  })
}
