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

  // setVelocity(velocityX, velocityY) {
  //   this.velocity.x = velocityX;
  //   this.velocity.y = velocityY;
  // }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.strokeStyle = "black";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    // ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
