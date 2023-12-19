const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 400;
let levelFailed = false;
let isLevelCompleted = false;
const levelOne = document.getElementById("one");
const levelTwo = document.getElementById("two");
const levelThree = document.getElementById("three");
const startGame = document.getElementById("btn-start-game");
const audioScreen = document.getElementById("audio-screen");
const audioGameover = document.getElementById("audio-gameover");
const life = new Life();
const score = new Score();
let selectedMap = null;
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

startGame.addEventListener("click", function () {
  selectedMap = map;
  tileInitialize(selectedMap);
  game();
  audioScreen.play();

  console.log();
});

levelOne.addEventListener("click", function () {
  selectedMap = map;
  tileInitialize(selectedMap);
  game();
  audioScreen.play();
});

levelTwo.addEventListener("click", function () {
  selectedMap = map1;
  tileInitialize(selectedMap);
  game();
  audioScreen.play();
});
levelThree.addEventListener("click", function () {
  selectedMap = map2;
  tileInitialize(selectedMap);
  game();
  audioScreen.play();
});

// tileInitialize();
function game() {
  levelCompletedImage.style.display = "none";
  levelFailedImage.style.display = "none";
  let initialBallPosition;

  // Set initial position based on the selected map
  if (selectedMap === map) {
    initialBallPosition = {
      x: GLOBAL.boundaries[3].position.x + Tile.width / 2,
      y: GLOBAL.boundaries[116].position.y + Tile.width / 2,
    };
  } else if (selectedMap === map1) {
    // Adjust this part based on your map1 configuration
    initialBallPosition = {
      x: GLOBAL.boundaries[8].position.x + Tile.width / 2,
      y: GLOBAL.boundaries[116].position.y + Tile.width / 2,
    };
  } else if (selectedMap === map2) {
    // Adjust this part based on your map1 configuration
    initialBallPosition = {
      x: GLOBAL.boundaries[3].position.x + Tile.width / 2,
      y: GLOBAL.boundaries[116].position.y + Tile.width / 2,
    };
  }
  const ball = new Ball({
    position: initialBallPosition,
    radius: 25,
    velocity: {
      x: 3,
      y: 3,
    },
    image: createImage("./assets/small_ball.png"),
  });
  // const ellipseObstacle = new EllipseObstacle({
  //   position: {
  //     x: GLOBAL.boundaries[8].position.x + Tile.width / 2,
  //     y: GLOBAL.boundaries[275].position.y + Tile.width / 2,
  //   },
  //   radiusX: 25,
  //   radiusY: 45,
  //   lineWidth: 5,
  // });

  // console.log(ball.position);
  function animate() {
    ctx.clearRect(0, 120, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    GLOBAL.boundaries.forEach((boundary) => {
      boundary.draw(ctx);
    });
    ball.move();
    ball.updateCameraBox(ctx);
    ball.draw(ctx);
    life.update(ctx);
    score.update(ctx);

    GLOBAL.boundaries.forEach((row) => {
      if (row.objectType === "restBlock") {
        if (collisionDetection(ball, row)) {
          if (ball.velocity.y < 0) {
            console.log(row);
            ball.velocity.y = 0;
            ball.position.y = row.position.y + row.height + 50;
          }
          if (ball.velocity.y > 0) {
            ball.velocity.y = 0;
            ball.position.y = row.position.y - ball.radius;
            this.isGrounded = true;
          }
          if (keys.W && this.isGrounded) {
            ball.velocity.y = -4;
          } else {
            ball.velocity.y += GRAVITY;
          }
          ball.position.y += ball.velocity.y;

          if (keys.A && ball.position.x > row.position.x + row.width) {
            ball.velocity.x = 0;
            ball.position.x = row.position.x + row.width + ball.radius * 2;
          } else {
            ball.velocity.x = -4;
          }
        }
      }
      if (row.objectType === "block") {
        if (collisionDetection(ball, row)) {
          ball.velocity.y = 4;
          ball.velocity.x = 0;

          if (keys.D) {
            ball.position.x = row.position.x - ball.radius;
          }
          if (keys.A) {
            ball.position.x = row.position.x + row.width;
          }
        }
      }
      if (row.objectType === "fireObstacle" && !levelFailed) {
        if (collisionDetection(ball, row)) {
          ball.velocity.y = 0;
          ball.position.y = row.position.y - ball.radius;

          showLevelFailedImage();
          levelFailed = true;
        }
      }
      if (row.objectType === "checkPoint") {
        if (collisionDetection(ball, row)) {
        }
      }
      if (row.objectType === "lifePoint") {
        if (collisionDetection(ball, row)) {
        }
      }
      if (row.objectType === "sizeIncreaser") {
        if (collisionDetection(ball, row)) {
          ball.radius = 30;
          ball.velocity.x = 0;
          if (keys.D) {
            ball.position.x = row.position.x - ball.radius;
          }

          ball.position.y += ball.velocity.y;
        }
      }
      if (row.objectType === "sizeDecreaser") {
        if (collisionDetection(ball, row)) {
          ball.radius = 25;
          ball.velocity.x = 0;
          if (keys.D) {
            ball.position.x = row.position.x - ball.radius;
          }
          if (keys.W && this.isGrounded) {
            console.log(keys.W);
            ball.velocity.y = -4;
            console.log(ball.velocity.y);
          } else {
            ball.velocity.y += GRAVITY;
          }
          ball.position.y += ball.velocity.y;
        }
      }

      if (row.objectType === "enemy" && !levelFailed) {
        row.detectCollisionWithBlock(GLOBAL.boundaries);
        if (collisionDetection(ball, row)) {
          row.velocity.y = 0;
          showLevelFailedImage();
          levelFailed = true;
        }
      }

      if (row.objectType === "ellipseObstacle") {
        for (let i = 0; i < pointEllipse.length; i++) {
          if (ellipseDetection(ball, pointEllipse[i])) {
            console.log("Ellipse Obstacle detected");
            return;
          }
        }
      }
      if (row.objectType === "levelCompleted") {
        if (collisionDetection(ball, row)) {
          ball.velocity.x = 0;
          ball.position.x = row.position.x + ball.radius;
          showLevelCompletedImage();
          isLevelCompleted = true;
          return;
        }
      }
      if (row.objectType === "water") {
        if (collisionDetection(ball, row)) {
          console.log("water");
          if (ball.radius === 30) {
            ball.velocity.y = -6;
            ball.position.y = row.position.y;
            this.isGrounded = false;
          }
          if (ball.radius === 25) {
            if (keys.W && this.isGrounded) {
              ball.velocity.y = -3;
              ball.position.y += ball.velocity.y;
              this.isGrounded = false;
            } else {
              const downfall = GRAVITY - UPTHRUST;
              ball.velocity.y += downfall;
              ball.position.y += ball.velocity.y;
            }

            // ball.position.y = row.position.y + ball.radius;
            // if (keys.W && this.isGrounded) {
            //   ball.velocity.y = -4;
            //   ball.velocity.y += UPTHRUST;
            // }
          }
          // ball.velocity.x = 0;
          // if (keys.D) {
          //   ball.position.x = row.position.x - ball.radius;
          // }
          // if (keys.W && this.isGrounded) {
          //   console.log(keys.W);
          //   ball.velocity.y = -30;
          //   console.log(ball.velocity.y);
          // } else {
          //   ball.velocity.y += GRAVITY;
          // }
          // ball.position.y += ball.velocity.y;
        }
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}
