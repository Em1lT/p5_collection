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
  let branches = [];
  // for (let i = 0; i < lines.length; i++) {
  //   if (lines.length === 1) {
  //   }
  //   if (i === 0 && lines.length !== 1) continue;
  //   const newBranch = {
  //     a: createVector(lines[i].a.x, lines[i].a.y),
  //     b: createVector(lines[i].a.x - 50, lines[i].a.y - 50),
  //   };

  //   branches.push(newBranch);
  // }
  lines.push(...branches);
}
