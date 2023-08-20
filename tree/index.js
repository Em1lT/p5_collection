const lines = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  const trunk = {
    a: createVector(width / 2, windowHeight - 100),
    b: createVector(windowWidth / 2, windowHeight),
  };
  lines.push(trunk);
}

function draw() {
  background(220);
  frameRate(1);
  for (let branch of lines) {
    line(branch.a.x, branch.a.y, branch.b.x, branch.b.y);
  }
}

function updateBranch() {}

function mouseClicked() {
  console.log(lines.length);
  let ass = [];
  for (let branch of lines) {
    const newBranch = {
      a: createVector(branch.b.x, branch.b.y),
      b: createVector(branch.b.x - 10, branch.b.y - 10),
    };

    ass.push(newBranch);
  }
  lines.push(...ass);
}
