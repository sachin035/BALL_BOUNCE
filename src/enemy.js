class Enemy {
  constructor({ position, width, height, velocity, image, color, objectType }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    this.image = image;
    this.color = color;
    this.objectType = objectType;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.move();
  }
  move() {
    this.position.y += this.velocity.y;
  }

  detectCollisionWithBlock(entities) {
    entities.forEach((entity) => {
      if (entity.objectType !== "enemy" && objectDetection(this, entity)) {
        // console.log("Collision detected between enemy and other entity:");
        this.velocity.y *= -1;
        this.move();
      }
    });
  }
}
