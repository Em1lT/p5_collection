let pos;
let degrVect;
let degr = 0;
let bullet = false;
let bulletPos;
let size = 20;

function setup() {
    createCanvas(400, 400);
    pos = createVector(200, 200);
}

function draw() {
    background(220);
    degrVect = createVector(sin(degr), cos(degr));
    line(pos.x, pos.y, pos.x + degrVect.x * size, pos.y + degrVect.y * size);
    if (keyIsDown(LEFT_ARROW)) {
        degr += 0.1;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        degr -= 0.1;
    }

    if (keyIsDown(UP_ARROW)) {
        pos.add(degrVect.mult(0.5));
    }

    if (keyIsDown(DOWN_ARROW)) {
        pos.sub(degrVect.mult(0.5));
    }

    if (bullet) {
        if (bulletPos.x > width) {
            bullet = false;
            bulletPos = undefined;
            return;
        }
        ellipse(pos.x + bulletPos.x * size, pos.y + bulletPos.y * size, size);
        const m = bulletPos.copy()
        bulletPos.add(m.normalize());
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        if (!bullet) {
            bulletPos = degrVect.copy()// p5.Vector.add(degrVect, pos);
            bullet = true;
        }
    }
}
