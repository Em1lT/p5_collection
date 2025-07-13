class Tile {
    constructor(i, j, location, type, size, grid) {
      this.i = i;
      this.j = j;
      this.size = size
      this.location = location
      this.type = type
      this.grid = grid
    }

    setColor(type) {
      if (type === "air") {
        fill(color("#0277de"));
      } else if (type === "debug") {
        fill("red");
      } else if (type === "ground") {
        fill(color("#37fa6b"));
      } else {
        fill("white");
      }
    }

    render() {
      this.setColor(this.type)
      rect(this.location.x, this.location.y, this.size, this.size);
    }

    getType() {
        return this.type
    }

    setType(type) {
        this.type = type
    }
    
}
