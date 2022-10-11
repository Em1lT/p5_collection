function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(220);
    frameRate(0);
    angleMode(DEGREES);
    strokeWeight(5);
    const { x, y } = createVector(width / 2, height / 2);

    line(x, y, x, 90);
    line(x, y, sin(x) * 10 * 60, cos(x) * 10 * 60);
}
