class Life {
  constructor() {
    this.ballRemain = BALL_COUNT;
    this.ballRemainImg = new Image();
    this.ballRemainImg.src = "./assets/ball_life.png"; // Set the correct path for your image
    this.x = 0;
    this.y = 0;
    this.radius = 15;
  }

  update(ctx) {
    ctx.font = "12px 'Nunito', sans-serif";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.fillText("BALL LIFE :", 0, 0);
    ctx.strokeText("BALL LIFE :", 10, 30);
    if (this.ballRemain === 3 || this.ballRemain > 3) {
      this.draw1(ctx);
      this.draw2(ctx);
      this.draw3(ctx);
    } else if (this.ballRemain === 2) {
      this.draw1(ctx);
      this.draw2(ctx);
    } else if (this.ballRemain === 1) {
      this.draw1(ctx);
    }
  }

  draw1(ctx) {
    this.drawImage(ctx, 100, 25);
  }

  draw2(ctx) {
    this.drawImage(ctx, 140, 25);
  }

  draw3(ctx) {
    this.drawImage(ctx, 180, 25);
  }

  drawImage(ctx, x, y) {
    ctx.drawImage(
      this.ballRemainImg,
      x - this.radius,
      y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }
}
