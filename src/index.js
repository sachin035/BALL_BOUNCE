const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 400;
let levelFailed = false;
const levelOne = document.getElementById("one");
const levelTwo = document.getElementById("two");
const startGame = document.getElementById("btn-start-game");
const audioScreen = document.getElementById("audio-screen");
const audioGameover = document.getElementById("audio-gameover");
const life = new Life();
const score = new Score();
let selectedMap = null;
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// const levelFailedImage = document.getElementById("levelFailedImage");

// console.log(GLOBAL.boundaries);
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

// tileInitialize();
function game() {
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
  }
  const ball = new Ball({
    position: initialBallPosition,
    radius: 25,
    velocity: {
      x: 0,
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

  console.log(ball.position);
  const life = new Life();
  const score = new Score();
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
    // enemies.forEach((enemy) => {
    //   console.log({ enemy });
    //   enemy.draw(ctx);
    // enemy.move();
    // });
    // ellipseObstacle.draw(ctx);
    GLOBAL.boundaries.forEach((row) => {
      if (row.objectType === "restBlock") {
        if (collisionDetection(ball, row)) {
          // console.log("first");
          // console.log("collision detection");
          // if (ball.position.y + ball.radius >= row.position.y) {
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
            // if()
            // row.position.x += ball.velocity.x;
            ball.velocity.y = -4;
          } else {
            ball.velocity.y += GRAVITY;
          }
          ball.position.y += ball.velocity.y;
          // if (keys.W && ball.position.y <= row.position.y) {
          //   ball.velocity.y = 4;
          // }
          if (keys.A && ball.position.x > row.position.x + row.width) {
            ball.velocity.x = 0;
            ball.position.x = row.position.x + row.width + ball.radius * 2;
          } else {
            ball.velocity.x = -4;
          }
          // ball.velocity.x = 0;
          // if (keys.D && !this.isGrounded) {
          //   ball.velocity.x = 0;
          //   console.log("boom");
          //   ball.position.x = row.position.x - ball.radius;
          // }
          //   if (keys.A) {
          //     ball.position.x = row.position.x + row.width;
          //   }
        }
      }
      if (row.objectType === "block") {
        if (collisionDetection(ball, row)) {
          ball.velocity.y = 4;
          ball.velocity.x = 0;
          // row.position.x += ball.velocity.x;
          if (keys.D) {
            ball.position.x = row.position.x - ball.radius;
          }
          if (keys.A) {
            ball.position.x = row.position.x + row.width;
          }
          // console.log("asjhfjahfl");
        }
      }
      if (row.objectType === "fireObstacle" && !levelFailed) {
        if (collisionDetection(ball, row)) {
          ball.velocity.y = 0;
          ball.position.y = row.position.y - ball.radius;
          // console.log("fire detection");
          showLevelFailedImage();
          levelFailed = true;
        }
      }
      if (row.objectType === "checkPoint") {
        if (collisionDetection(ball, row)) {
          // console.log("chekpoint");
        }
      }
      if (row.objectType === "lifePoint") {
        if (collisionDetection(ball, row)) {
          // console.log("chekpoint");
        }
      }
      if (row.objectType === "sizeIncreaser") {
        if (collisionDetection(ball, row)) {
          // console.log("chekpoint");
          ball.radius = 30;
          ball.velocity.x = 0;
          if (keys.D) {
            ball.position.x = row.position.x - ball.radius;
          }
          if (keys.W && this.isGrounded) {
            console.log(keys.W);
            ball.velocity.y = -8;
            console.log(ball.velocity.y);
          } else {
            ball.velocity.y += GRAVITY;
          }
          ball.position.y += ball.velocity.y;
        }
      }
      if (row.objectType === "sizeDecreaser") {
        if (collisionDetection(ball, row)) {
          // console.log("chekpoint");
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
      // console.log(row.objectType);
      if (row.objectType === "enemy" && !levelFailed) {
        // console.log("enemy");
        // console.log(row);
        row.detectCollisionWithBlock(GLOBAL.boundaries);
        if (collisionDetection(ball, row)) {
          row.velocity.y = 0;
          showLevelFailedImage();
          levelFailed = true;
        }
      }
      // console.log(pointEllipse);
      if (row.objectType === "ellipseObstacle") {
        // console.log(pointEllipse);
        for (let i = 0; i < pointEllipse.length; i++) {
          if (ellipseDetection(ball, pointEllipse[i])) {
            // console.log("kajnfkjab");

            return;
          }
        }
      }
      if (row.objectType === "levelCompleted") {
        if (collisionDetection(ball, row)) {
          // console.log("levelComplete");
          ball.velocity.x = 0;
          ball.position.x = row.position.x + ball.radius;
          showLevelCompletedImage();
        }
      }
      if (row.objectType === "water") {
        if (collisionDetection(ball, row)) {
          console.log("water");
          if (ball.radius === 30) {
            ball.velocity.y = 0;
            ball.position.y = row.position.y;
          } else if (ball.radius === 25) {
            // ball.velocity.y = 4;
            // ball.velocity.y += GRAVITY;
            // if (keys.W) {
            //   ball.velocity.y = -4;
            // }
            if (keys.W && this.isGrounded) {
              ball.velocity.y = -5;
              this.isGrounded = false; // Set to false until ball lands again
            } else {
              ball.velocity.y += GRAVITY;
            }
            ball.position.y += ball.velocity.y;
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
      // if (row.objectType === "enemy") {
      //   console.log(objectDetection);
      //   if (objectDetection(enemy, row)) {
      //     console.log("enemy ");
      //     enemy.velocity.y = -enemy.velocity.y;
      //   }
      // }
      // // if (collisionDetection(ball, row)) {
      //   // console.log("collision detection");
      //   if (ball.position.y + ball.radius >= row.position.y) {
      //     ball.velocity.y = 0;
      //     ball.position.y = row.position.y - ball.radius;
      //     this.isGrounded = true;
      //   }
      //   if (keys.W && this.isGrounded) {
      //     ball.velocity.y = -4;
      //   } else {
      //     ball.velocity.y += GRAVITY;
      //   }
      //   ball.position.y += ball.velocity.y;
      //   if (ball.position.y <= row.position.y) {
      //     ball.velocity;
      //   }
      //   if (keys.A && ball.position.x >= row.position.x) {
      //     ball.velocity.x = 0;
      //   } else {
      //     ball.velocity.x = -4;
      //   }
      // }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// // function initHomeScreen() {
// //   document.getElementById("homeScreen").style.display = "block";
// //   document.getElementById("canvas").style.display = "none";
// // }

// // // Function to initialize the game screen
// // function initGameScreen() {
// //   document.getElementById("homeScreen").style.display = "none";
// //   document.getElementById("canvas").style.display = "block";
// //   startGame(); // Start the game when the game screen is initialized
// // }
// // startGame();

// // document.getElementById("btn-start-game");
// // document.addEventListener("click", initGameScreen);
// // initHomeScreen();
