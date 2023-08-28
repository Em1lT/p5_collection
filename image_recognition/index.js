// Initialize the Image Classifier method with MobileNet
let i = 0;
let label = "";
let confidence = "";
let classifier;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  classifier = ml5.imageClassifier(
    "MobileNet",
    capture,
    (modelLoaded = () => {
      label = "Model Loaded!";
    })
  );
}
function imageClassifyj() {
  classifier.classify(capture, (_, res) => {
    label = res[0].label;
    confidence = res[0].confidence;
  });
}

function ui() {
  image(capture, 0, 0, 1080, 720);
  text(label, 200, 100);
  text(confidence, 200, 150);
}

function draw() {
  frameRate(30);
  textSize(50);

  ui();
  imageClassifyj();
}
