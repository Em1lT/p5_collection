// Initialize the Image Classifier method with MobileNet
let i = 0;
let label = "";
let confidence = "";
let videoId;

const classifier = ml5.imageClassifier(
  "DoodleNet",
  (modelLoaded = () => {
    label = "Model Loaded!";
  })
);

// Create a new facemesh method
// const facemesh = ml5.facemesh(videoId, modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log("Model Loaded!");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  videoId = capture.id();
}

function draw() {
  frameRate(30);
  textSize(50);

  image(capture, 0, 0, 1080, 720);
  text(label, 200, 100);
  text(confidence, 200, 150);
  if (i > 100) {
    classifier.classify(capture, (err, res) => {
      label = res[0].label;
      confidence = res[0].confidence;
    });

    /* 
    facemesh.predict(capture, (results) => {
      // do something with the results
      const topLeftPoint = results[0].boundingBox.topLeft;
      const bottomRightPoint = results[0].boundingBox.bottomRight;
      console.log(topLeftPoint[0]);
      point(topLeftPoint[0][0], topLeftPoint[0][1]);
      point(bottomRightPoint[0], bottomRightPoint[1]);
    });*/
    i = 0;
  }
  i++;
}
