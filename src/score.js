class Score {
  constructor() {
    this.x = 1050;
    this.y = 30;
    this.updateScore = 0;
  }

  update(ctx) {
    ctx.beginPath();
    ctx.font = "12px 'Nunito', sans-serif";
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "yellow";
    ctx.fillText("Score :" + this.updateScore, 0, 0);
    ctx.strokeText("Score :" + this.updateScore, this.x, this.y);
  }
}
