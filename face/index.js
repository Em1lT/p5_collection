// Initialize the Image Classifier method with MobileNet
let videoId;
let loaded = false;
let facemesh;

// When the model is loaded
function modelLoaded() {
  console.log("Model Loaded!");
  loaded = true;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(200, 200);
  facemesh = ml5.facemesh(capture, modelLoaded);
}

function correct(value) {
  return value + 220;
}

function drawLines(topLeftPoint, bottomRightPoint) {
  ellipse(correct(topLeftPoint[1]), correct(topLeftPoint[0]), 10, 10);
  ellipse(correct(topLeftPoint[0]), correct(bottomRightPoint[1]), 10, 10);
  ellipse(correct(bottomRightPoint[0]), correct(topLeftPoint[1]), 10, 10);
  ellipse(correct(bottomRightPoint[0]), correct(bottomRightPoint[1]), 10, 10);
  ellipse(correct(bottomRightPoint[0]), correct(bottomRightPoint[1]), 10, 10);

  line(
    correct(topLeftPoint[0]),
    correct(topLeftPoint[1]),
    correct(topLeftPoint[0]),
    correct(bottomRightPoint[1])
  );
  line(
    correct(topLeftPoint[0]),
    correct(bottomRightPoint[1]),
    correct(bottomRightPoint[0]),
    correct(topLeftPoint[1])
  );
}

function draw() {
  frameRate(3);
  background(220);
  if (!loaded && !videoId) {
    return;
  }
  image(capture, 0, 0, 1080, 720);
  facemesh.predict(capture, (results) => {
    const [topLeftPoint] = results[0].boundingBox.topLeft;
    const [bottomRightPoint] = results[0].boundingBox.bottomRight;
    drawLines(topLeftPoint, bottomRightPoint);
  });
}
