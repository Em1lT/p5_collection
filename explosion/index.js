let bombs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  b1 = new Bomb(100, 100, 20);
  b2 = new Bomb(90, 200, 30);
  b3 = new Bomb(110, 300, 20);
  b4 = new Bomb(150, 400, 30);
  bombs.push(...[b1, b2, b3, b4]);
}

function draw() {
  background(200);
  frameRate(30);

  for (let i = 0; i < bombs.length; i++) {
    bombs[i].draw();
    if (bombs[i].delete) {
      bombs.splice(i, 1);
    }
  }
}
