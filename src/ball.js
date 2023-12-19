class Ball {
  constructor({ position, radius, velocity, image }) {
    this.position = position;
    this.radius = radius;
    this.velocity = velocity;
    this.image = image;
    this.rotationAngle = 0;
    this.isGrounded = false;
    this.distanceTravel = 0;
    this.camerabox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: canvas.width / 1.25,
      height: 80,
    };
  }

  draw(ctx) {
    ctx.save();

    // Translate to the center of the ball
    ctx.translate(this.position.x, this.position.y);

    if (keys.D) {
      this.rotationAngle += 0.09;
      ctx.rotate(this.rotationAngle);
    }

    if (keys.A) {
      this.rotationAngle -= 0.09;
      ctx.rotate(this.rotationAngle);
    }

    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.closePath();

    ctx.clip();

    ctx.drawImage(
      this.image,
      -this.radius, // x-coordinate relative to the new origin
      -this.radius, // y-coordinate relative to the new origin
      2 * this.radius,
      2 * this.radius
    );

    ctx.restore();
  }

  move() {
    if (keys.D) {
      this.position.x += 3;
      this.shouldPanCameraToTheLeft();
    }
    if (keys.A) {
      this.position.x -= 3;
      this.shouldPanCameraToTheRight();
    }
    if (this.position.y + this.radius >= canvas.height) {
      this.velocity.y = 0;
      this.position.y = canvas.height - this.radius;
      this.isGrounded = true;
    } else {
      this.position.y += this.velocity.y;
      this.isGrounded = false;
    }

    if (keys.W && this.isGrounded) {
      this.velocity.y = -12;
    } else {
      this.velocity.y += GRAVITY;
    }
    this.position.y += this.velocity.y;
  }

  updateCameraBox() {
    this.camerabox.position.x = this.position.x - this.camerabox.width / 2;
    this.camerabox.position.y = this.position.y - this.camerabox.height / 2;

    ctx.fillStyle = "rgba(0,0,255,0.001)";
    ctx.fillRect(
      this.camerabox.position.x,
      this.camerabox.position.y,
      this.camerabox.width,
      this.camerabox.height
    );
  }

  shouldPanCameraToTheLeft() {
    let cameraboxRightSide = this.camerabox.position.x + this.camerabox.width;
    if (cameraboxRightSide >= canvas.width) {
      if (this.position.x >= 725) {
        this.position.x = 725;
      }
      GLOBAL.boundaries.forEach((tile) => {
        // console.log(tile);
        if (tile instanceof Tile || tile instanceof Enemy) {
          tile.velocity.x = this.velocity.x;
          tile.position.x += tile.velocity.x;
        }
      });

      // console.log(GLOBAL.boundaries.length);
      // console.log(tile.position.x);
      // if ( >= GLOBAL.boundaries.length) {
      //   console.log({ cameraboxRightSide });
      //   // tile.position.x = 0;
      // }
    }
  }

  shouldPanCameraToTheRight() {
    let cameraboxLeftSide = this.camerabox.position.x;
    if (cameraboxLeftSide <= 0) {
      if (this.position.x <= 475) {
        this.position.x = 475;
      }
      GLOBAL.boundaries.forEach((tile) => {
        if (tile instanceof Tile || tile instanceof Enemy) {
          tile.velocity.x = this.velocity.x;
          tile.position.x -= tile.velocity.x;
        }
      });
    }
  }
}
