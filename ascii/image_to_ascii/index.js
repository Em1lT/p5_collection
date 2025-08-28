let img;

const possibleChars = "GGGGggbbb~~``...";
const posCharMap = "`.-':_,^=;><+!rc*/z?#$EETETETETETT%&@";
const asciiArtChars = posCharMap.split("").reverse().join("");
const size = 1;
let showImage = false;

function preload() {
  img = loadImage(imgPath);
}

function setup() {
  createCanvas(800, 800);
  background(200);
  img.loadPixels();
}

function draw() {
  background(200);
  frameRate(1);
  updatePath();
}

function updatePath() {
  const rand = random(1000);
  const w = width / img.width;
  const h = height / img.height;
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      const imageX = (i + j * img.width) * 4;
      const r = img.pixels[imageX];
      const g = img.pixels[imageX + 1];
      const b = img.pixels[imageX + 2];
      const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const mappedChar = map(brightness, 0, 255, 0, asciiArtChars.length);
      // square(i * w, j * h, w);
      textSize(w * 1.2);
      const c = asciiArtChars[Math.floor(mappedChar)];
      text(c, i * w, j * h);
    }
  }
}
