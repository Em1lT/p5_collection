let size = 100;
let showImage = false;
let arr = [];
let posCharMap =
  "@#$%^&*()_ZXCVBNM<>?";

function preload() {
  img = createImage(100, 100);
}

function setup() {
  createCanvas(800, 800);
  background(200);
  img.loadPixels();
  setupArr();
}

function draw() {
  background(200);
  frameRate(10);
  updateArr();
}

function setupArr() {
  const w = width / size;
  const h = height / size;
  for (let i = 0; i < size; i++) {
    let a1 = [];
    for (let j = 0; j < size; j++) {
      const imageX = (i + j * size) * 4;
      a1.push({
        i,
        j,
        w,
        h,
        imageX,
        startChar: ".",
        endChar: "@",
        done: false,
      });
    }
    arr.push(a1);
  }
}

function updateArr() {
  for (let a of arr) {
    for (let i of a) {
      if (i.done) {
        text(i.endChar, i.i * i.w, i.j * i.h);
        continue;
      }
      const randomChar = posCharMap.charAt(
        Math.floor(Math.random() * posCharMap.length),
      );
      if (randomChar === i.endChar) i.done = true;
      text(randomChar, i.i * i.w, i.j * i.h);
    }
  }
}
