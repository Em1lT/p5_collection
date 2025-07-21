class Grid {
  constructor(size, canvasSize) {
    this.size = size;
    this.tiles = [];
    this.numOfLastRow = size - 1;
    this.boxSize = (this.size / width);
    this.flowers = [];
  }

  setup() {
    this.setupTiles()
    this.setupGroundTiles()
  }

 setupGroundTiles() {
   for (let i = 0; i < this.size; i++) {
     const cell =  this.tiles[i][this.numOfLastRow]
     cell.type = 'ground' // Last row 
     // Place a flower on each ground tile
     cell.flower = new Flower(
       cell.location.x + cell.size / 2,
       cell.location.y + cell.size / 2,
       cell.size,
       this.size // maxTiles is grid height
     );
   }
 }

 setupTiles() {
  for (let i = 0; i < this.size; i++) {
    this.tiles[i] = [];
    for (let j = 0; j < this.size; j++) {
      const location = {
        x: this.size * i,
        y: this.size * j,
      }
      const newTile = new Tile(i, j, location, "air", this.boxSize * this.size * 28 , this.grid)
      this.tiles[i].push(newTile)
    }
  }
  console.log('Setup made, tile count: ', this.tiles.length)
 }

render() {
  for (let i = 0; i < this.size; i++) {
    // Only one flower grows per column at a time
    let flowerGrew = false;
    for (let j = 0; j < this.size; j++) {
      const cell = this.tiles[i][j]
      cell.render()
      // If this is a ground tile with a flower
      if (cell.type === 'ground' && cell.flower) {
        // Only grow if not done and the tile above is air
        if (!cell.flower.done && !flowerGrew) {
          // Check if the next tile above is air
          let nextJ = this.numOfLastRow - cell.flower.currentTile;
          if (nextJ > 0 && this.tiles[i][nextJ - 1].type === 'air') {
            cell.flower.grow();
            // Mark the tile above as 'stem' as the flower grows
            this.tiles[i][nextJ - 1].type = 'stem';
          } else if (cell.flower.currentTile < cell.flower.length) {
            // If blocked, don't grow
          }
          flowerGrew = true;
        }
        cell.flower.render();
      }
    }
  }
}
}
