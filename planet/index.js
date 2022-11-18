let comets = [];
let planet;
let snap_start;
let snap_end;
let drag = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    planet = new Planet(createVector(width / 2, height / 2), 40);
}

function draw() {
    background(220);


    planet.renderGravityArea();
    planet.render();

    comets.forEach((comet, index) => {
        if (comet.outOfZone) {
            comets.splice(index, 1);
        }
        comet.update(planet);
        comet.render();
    });

    if (drag) {
		fill("black");
        strokeWeight(1);
        line(snap_start.x, snap_start.y, mouseX, mouseY);
        snap_end = createVector(mouseX, mouseY);
        let d = dist(snap_start.x, snap_start.y, mouseX, mouseY);
        text(Math.floor(d) / 20, mouseX + 20, mouseY + 20);
    }
}

function mouseDragged() {
    if (!drag) {
        snap_start = createVector(mouseX, mouseY);
        drag = true;
    }
}

function mouseReleased() {
    drag = false;
    shoot = true;
    const acc = p5.Vector.sub(snap_start, snap_end);
    const d = dist(snap_start.x, snap_start.y, snap_end.x, snap_end.y);
    acc.mult((0.1 * d) / 20);
    acc.limit(10);
    comets.push(new Comet(snap_start, acc));
}
