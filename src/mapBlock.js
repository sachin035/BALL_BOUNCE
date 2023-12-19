class Tile {
  static width = 50;
  static height = 50;
  constructor({ position, color, image, objectType }) {
    this.position = position;
    this.width = Tile.width;
    this.height = Tile.height;
    this.color = color;
    this.objectType = objectType;
    this.image = image;
    this.velocity = { x: 0, y: 0 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
