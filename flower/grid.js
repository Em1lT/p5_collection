class Grid {
  constructor(size) {
    this.size = size;
    this.tiles = [];
    this.numOfLastRow = size - 1;
    this.boxSize = this.size;
  }

  setup() {
    this.setupTiles()
    this.setupGroundTiles()
  }

 setupGroundTiles() {
   for (let i = 0; i < this.size; i++) {
     const cell =  this.tiles[i][4]
     console.log(cell)
     cell.type = 'ground' // Last row 
   }
 }

 setupTiles() {
  for (let i = 0; i < this.size; i++) {
    this.tiles[i] = [];
    for (let j = 0; j < this.size; j++) {
      const location = {
        x: i * this.size,
        y: j * this.size,
      }
      const newTile = new Tile(i, j, location, "air", this.boxSize, this.grid)
      this.tiles[i].push(newTile)
    }
  }
  console.log('Setup made, tile count: ', this.tiles.length)
  console.log(this.tiles)
 }

render() {
  for (let i = 0; i < this.size; i++) {
    for (let j = 0; j < this.size; j++) {
      const cell = this.tiles[i][j]
      cell.render()
    }
  }
}
}
