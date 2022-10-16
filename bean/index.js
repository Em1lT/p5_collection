let pos;
let degrVect;
let degr = 0;

function setup() {
    createCanvas(400, 400);
    pos = createVector(200, 200);
}

function draw() {
    background(220);
    degrVect = createVector(sin(degr), cos(degr));
    line(pos.x, pos.y, pos.x + degrVect.x * 20, pos.y + degrVect.y * 20);
    if (keyIsDown(LEFT_ARROW)) {
        degr += 0.1
    }

    if (keyIsDown(RIGHT_ARROW)) {
        degr -= 0.1
    }

    if (keyIsDown(UP_ARROW)) {
        pos.add(degrVect.mult(0.5));
    }

    if (keyIsDown(DOWN_ARROW)) {
        pos.sub(degrVect.mult(0.5));
    }
}
