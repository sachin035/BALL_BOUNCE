class EllipseObstacle {
  constructor({ position, radiusX, radiusY, lineWidth, objectType }) {
    this.position = position;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.lineWidth = lineWidth;
    this.objectType = objectType;
    // console.log(this);
  }

  draw(ctx, rotationAngle) {
    // ctx.save();
    // ctx.translate(this.position.x, this.position.y);

    // // Rotate the ellipse
    // ctx.rotate(rotationAngle);
    ctx.beginPath();
    ctx.ellipse(
      this.position.x,
      this.position.y,
      this.radiusX,
      this.radiusY,
      0,
      0,
      2 * Math.PI
    );
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    //ctx.restore();
    // Draw the inner ellipse
    // ctx.beginPath();
    // ctx.ellipse(
    //   this.position.x,
    //   this.position.y,
    //   this.radiusX - this.lineWidth,
    //   this.radiusY - this.lineWidth,
    //   0,
    //   0,
    //   2 * Math.PI
    // );
    // ctx.fillStyle = "white";
    // ctx.fill();
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = "yellow";
    //ctx.stroke();
  }

  pointFromAngle(a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    const ta = s / c;
    const tt = (ta * this.radiusX) / this.radiusY;
    const d = 1.0 / Math.sqrt(1.0 + tt * tt);
    const x = this.position.x + Math.sign(c) * this.radiusX * d;
    const y = this.position.y - Math.sign(s) * this.radiusY * tt * d;
    return { x, y };
  }
}

// class Circle {
//   constructor({ position, width, height, image, color, objectType }) {
//     this.position = position;
//     this.width = width;
//     this.height = height;

//     this.image = image;
//     this.color = color;
//     this.objectType = objectType;
//   }

//   draw(ctx) {
//     // console.log(this);

//     // ctx.fillStyle = this.color;
//     // ctx.strokeStyle = "black";
//     // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
//     // ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
//     ctx.drawImage(
//       this.image,
//       this.position.x,
//       this.position.y,
//       this.width,
//       this.height
//     );
//   }
// }
