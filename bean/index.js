let pos;
let degrVect;
let degr = 0;
let bullet = false;
let bulletPos;

function setup() {
    createCanvas(400, 400);
    pos = createVector(200, 200);
}

function draw() {
    background(220);
    degrVect = createVector(sin(degr), cos(degr));
    line(pos.x, pos.y, pos.x + degrVect.x * 20, pos.y + degrVect.y * 20);
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
            console.log("here2");
            bullet = true;
            bulletPos = undefined;
        }
        console.log(bulletPos);
        line(bulletPos.x, bulletPos.y, bulletPos.x + 10, bulletPos.y + 10);
        bulletPos.add(0.1);
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        if (!bullet) {
            console.log("here1");
            bulletPos = p5.Vector.add(degrVect, pos);
            bullet = true;
        }
    }
}
