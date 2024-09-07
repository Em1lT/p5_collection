let gridSize = 3
let gridWidth
let grid = []
let selectedElement = 'sand'
let startCreation = false
let pauseCreation = false
let isMousePressed = false
let isFirstTile = true
let currentGrid = null;
let canvasSize = 800 
let slider;
let lost = false
let path = []
let roads = []

const possibleObjects = [
{
    type: 'land',
    compatibleElements: ['sand', 'forest', 'land', 'rock'],
    notCompatibleElements: ['water', 'deepWater'],
    // color: color(102, 204, 0)
},{
    type: 'sand',
    compatibleElements: ['water', 'deepWater', 'land', 'sand', 'rock'],
    notCompatibleElements: ['forest'],
    // color: color(255, 255, 102)
  },
{
    type: 'water',
    compatibleElements: ['sand', 'deepWater', 'water', 'rock'],
    notCompatibleElements: ['land', 'forest'],
    // color: color(51, 153, 255)
  },
{
    type: 'deepWater',
    compatibleElements: ['water', 'deepWater', 'sand', 'rock'],
    notCompatibleElements: ['land', 'forest'],
    // color: color(0, 0, 204)
  },
{
    type: 'forest',
    compatibleElements: ['land', 'forest', 'rock'],
    notCompatibleElements: ['water', 'deepWater', 'sand'],
    // color: color(0, 102, 0),
  },
{
    type: 'rock',
    compatibleElements: ['land', 'forest','water', 'deepWater', 'sand', 'rock' ],
    notCompatibleElements: [],
    // color: color(0, 102, 0),
  },
  {
    type: 'road',
    compatibleElements: ['land', 'forest','water', 'deepWater', 'sand' ],
    notCompatibleElements: [],

  }
]
function getPossibleObjects() {
  return possibleObjects.filter(obj => obj.type !== 'road' && obj.type !== 'air')
}

function getRandomPossibeObject() {
  // exlude road and air
  const possibleObjects = getPossibleObjects()
  return possibleObjects[Math.floor(Math.random() * possibleObjects.length)]
}


function adjacentObjects(x, y) {
  const adjacentObjects = []
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if(grid[i][j].type === 'air') {
        if(grid[i][j].location.x < x && grid[i][j].location.x + gridWidth > x) {
          if(grid[i][j].location.y < y && grid[i][j].location.y + gridWidth > y) {
            adjacentObjects.push(grid[i][j])
          }
        }
      }
    }
  }
  return adjacentObjects
}

function setupSquares() {
  gridWidth = width / gridSize
  for (let i = 0; i < gridSize; i++ ) {
    grid[i] = []
    for (let j = 0; j < gridSize; j++ ) {
      grid[i][j] = {
        i: i,
        j: j,
        location: {
          x: i * gridWidth,
          y: j * gridWidth
        },
        type: 'air',
      }
    }
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(60);
  strokeWeight(1);
  colorMode(HSL, 255);
  setupSquares();
  let b2 = createButton(`${pauseCreation ? 'Resume' : 'Pause'} creation`);
    b2.position(50, 850);
    b2.mousePressed(() => {
      pauseCreation = !pauseCreation;
    });
  let b1 = createButton(`Start creation`);
    b1.position(50, 900);
    b1.mousePressed(() => {
      startCreation = true;
    });
  let b3 = createButton('Next step');
    b3.position(200, 900);
    b3.mousePressed(() => {
      updatePath();
    });
  let b4 = createButton('calculate types');
    b4.position(300, 900);
    b4.mousePressed(() => {
      calculateTypes();
    });
  slider = createSlider(0, 100, 50, 1);
  slider.position(50, 950);
  slider.size(100);
}

function calculateTypes() {
  const types = {}
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      types[grid[i][j].type] = types[grid[i][j].type] ? types[grid[i][j].type] + 1 : 1
    }
  }
  console.log(types)
}

function drawSquares() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const widthBox = width / gridSize * i 
      const heightBox = height / gridSize * j 
      square(widthBox,heightBox, gridWidth)
      rect(grid[i][j].location.x, grid[i][j].location.y, widthBox, heightBox)
      if(grid[i][j].type === 'sand') {
        fill(color('#f2d468'))
      } else if(grid[i][j].type === 'water') {
        fill(color('#0277de'))
      } else if(grid[i][j].type === 'land') {
        fill(color('#37fa6b'))
      } else if(grid[i][j].type === 'deepWater') {
        fill(color('#0209d1'))
      } else if(grid[i][j].type === 'forest') {
        fill( color('#00661b'))
      } else if(grid[i][j].type === 'rock') {
        fill(color('#696864'))
      } else if(grid[i][j].type === 'road') {
        fill(color('#454444'))
      } else {
        fill('white')
      }
    }
  }
}
function getRandomTile () {
  const i = Math.floor(Math.random() * gridSize)
  const j = Math.floor(Math.random() * gridSize)
  if(grid[i][j].type === 'air') {
    return [i, j]
  } else {
    return getRandomTile()
  }
}
function updatePath() {
  if((path.length) < (gridSize * gridSize) - roads.length) {
    if(isFirstTile) {
      let [i, j] = getRandomTile()
      isFirstTile = false
      currentGrid = grid[i][j]
      currentGrid.type = 'land'
      path.push(currentGrid)
    } else { 
      const adjacentElements = getNextRandomAdjacentElements(currentGrid.i, currentGrid.j)
      if(adjacentElements.length === 0) {
        for(let i = path.length - 1; i >= 0; i--) {
          const elements = getNextRandomAdjacentElements(path[i].i, path[i].j)
          if(elements.length > 0) {
            const adjacentElement = elements[Math.floor(Math.random() * adjacentElements.length)]
            currentGrid = adjacentElement
            path.push(currentGrid)
            // random type
            currentGrid.type = getRandomPossibeObject().type
              //possibleObjects[Math.floor(Math.random() * possibleObjects.length)].type
            break
          } else {
            continue;
          }
        }
      } else {
        const adjacentElement = adjacentElements[Math.floor(Math.random() * adjacentElements.length)]
        currentGrid = adjacentElement
        path.push(currentGrid)
        const newAdjacentElements = getAdjacentElements(currentGrid.i, currentGrid.j)
        let compatibleElements = getCompatibleElements(newAdjacentElements)
        // if more water elements, then water
        // if land then land
        if(slider.value() > 75) { // more water elements
          if(compatibleElements.includes('water')) {
            compatibleElements = [...compatibleElements, 'water', 'water']
          }

        } else if (slider.value() < 25) { // less water elements, more land
          if(compatibleElements.includes('land')) {
            compatibleElements = [...compatibleElements, 'land', 'land']
          }
        }
        const random = Math.floor(Math.random() * compatibleElements.length)
        const newType = compatibleElements[random]
        currentGrid.type = newType
      }
    } 
  }
}

function draw() {
  background(220);
  drawSquares();
  updatePath()
  if(startCreation && !pauseCreation) {
    updatePath()
  }
}

function addUniqueList( list, items) {
  items.forEach(function(item) {
    if (!list.includes(item)) {
      list.push(item);
    }
  });
  return list;
}

function getCompatibleElements(adjacentElements) {
    const combatibleAdjacentElements = adjacentElements.filter(el => el.type !== 'air');
    const elementCount = {};

    const s1 = combatibleAdjacentElements.reduce((acc, el) => {
        const compatibleElements = getPossibleObjects().find(obj => obj.type === el.type).compatibleElements;
        // Count occurrences of each compatible element
        compatibleElements.forEach(el1 => {
            if (!elementCount[el1]) {
                elementCount[el1] = 0;
            }
            elementCount[el1]++;
        });

        const notCompatibleElements = possibleObjects.find(obj => obj.type === el.type).notCompatibleElements;
        // Filter out incompatible elements
        acc = acc.filter(el => !notCompatibleElements.includes(el));
        return acc;
    }, []);

    // Add elements that are common across all combatibleAdjacentElements
    const totalElements = combatibleAdjacentElements.length;
    Object.keys(elementCount).forEach(el => {
        if (elementCount[el] === totalElements) {
            addUniqueList(s1, [el]);
        }
    });
    return s1;
}

function mousePressed() { 
  if( mouseX < canvasSize && mouseY < canvasSize ) {
    // if ( !startCreation ) {
    //   spawnElement({x: mouseX, y:mouseY});
    // } else {
      logElement({x: mouseX, y:mouseY});
    // }
  }
}

function logElement({x,y}) {  
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if(grid[i][j].location.x < x && grid[i][j].location.x + 50 > x) {
        if(grid[i][j].location.y < y && grid[i][j].location.y + 50 > y) {
          console.log(grid[i][j])
          console.log(getAdjacentElements(i, j))
        }
      }
    }
  }
}

function spawnElement({x,y}) {  
  for (let i = 0; i < gridSize; i++ ) {
    for (let j = 0; j < gridSize; j++ ) {
      if(grid[i][j].location.x < x && grid[i][j].location.x + 50 > x) {
        if(grid[i][j].location.y < y && grid[i][j].location.y + 50 > y) {
            grid[i][j].type = 'road';
            roads.push({x: x, y: y})
        }
      }
    }
  }
}


function getNextRandomAdjacentElements(i, j) {
  const adjacentElements = getAdjacentElements(i, j).filter(el => el.type === 'air')
  return adjacentElements
}

function getAdjacentElements(i, j) {
  if(grid[i+1] !== undefined && grid[i+1][j] !== undefined && grid[i-1] !== undefined && grid[i-1][j] !== undefined) {
     return [
      grid[i][j+1],
      grid[i][j-1],
      grid[i+1][j],
      grid[i-1][j],
      // filter out if not air
    ].filter(el => el !== undefined)
  } else if (grid[i+1] === undefined) {
     return [
      grid[i][j+1],
      grid[i][j-1],
      grid[i-1][j],
      // filter out if not air
    ].filter(el => el !== undefined)
  } else if (grid[i-1] === undefined) {
     return [
      grid[i][j+1],
      grid[i][j-1],
      grid[i+1][j],
      // filter out if not air
    ].filter(el => el !== undefined)
  }
}
