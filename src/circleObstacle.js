class EllipseObstacle {
  constructor({ position, radiusX, radiusY, lineWidth, objectType }) {
    this.position = position;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.lineWidth = lineWidth;
    this.objectType = objectType;
    // console.log(this);
  }

  draw(ctx) {
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
    ctx.closePath();
    // ctx.restore();
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

  // pointFromAngle(a) {
  //   const c = Math.cos(a);
  //   const s = Math.sin(a);
  //   const ta = s / c;
  //   const tt = (ta * this.radiusX) / this.radiusY;
  //   const d = 1.0 / Math.sqrt(1.0 + tt * tt);
  //   const x = this.position.x + Math.sign(c) * this.radiusX * d;
  //   const y = this.position.y - Math.sign(s) * this.radiusY * tt * d;
  //   return { x, y };
  // }

  // detectCollisionWithEllipse(entities) {
  //   entities.forEach((entity) => {
  //     if (
  //       entity.objectType !== "ellipseObstacle" &&
  //       ellipseDetection(this, entity)
  //     ) {
  //       //       // console.log("Collision detected between enemy and other entity:");
  //       //       console.log("hurray");
  //       function boundingPoint() {
  //         for (let theta = 0; theta <= 2 * Math.PI; theta += 0.0873) {
  //           const boundPointX =
  //             this.position.x + this.radiusX * Math.cos(theta);
  //           const boundPointY =
  //             this.position.y + this.radiusY * Math.sin(theta);
  //           // const boundPointX = 400 + 15 * Math.cos(theta);
  //           // const boundPointY = 300 + 35 * Math.sin(theta);

  //           pointEllipse.push({ boundPointX, boundPointY });
  //         }
  //       }
  //       boundingPoint();
  //     }
  //   });
  // }
}
