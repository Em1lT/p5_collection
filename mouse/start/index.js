let comets = [];
let planets = [];
let planet;
let drag = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    planets.push(new Planet(createVector(width / 2, height / 2), 50));

    // One comet random position
    comets.push(new Comet(createVector(width / 3, height / 3), createVector(2)));
}

function draw() {
    background(220);
    for (let planet of planets) {
        planet.renderGravityArea();
        planet.render();
    }

    comets.forEach((comet, index) => {
        if (comet.outOfZone) {
            comets.splice(index, 1);
        }
        comet.update(planets);
        comet.render();
    });
}

function mouseDragged() {
    if (!drag) {
        drag = true;
    }
}

function mouseReleased() {
    drag = false;
}
