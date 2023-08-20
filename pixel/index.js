function setup() {}

function draw() {
  let pink = color(255, 102, 204);
  loadPixels();

  let d = pixelDensity();
  let halfImage = 4 * width * (height * d);
  for (let i = 0; i < halfImage; i += 4) {
    pixels[i] = red(pink);
    pixels[i + 1] = green(pink);
    pixels[i + 2] = blue(pink);
    pixels[i + 3] = alpha(pink);
  }
  updatePixels();
}
