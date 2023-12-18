const levelFailedImage = document.getElementById("levelFailedImage");
let checkpointPosition = null;
let failureCount = 0;
const maxFailures = 3;
const CHECKPOINT = [];

function createImage(src) {
  let img = new Image();
  img.src = src;
  img.onload = function () {
    if (typeof callback === "function") {
      callback(img);
    }
  };
  return img;
}

function collisionDetection(ball, row) {
  const collides =
    ball.position.x < row.position.x + row.width &&
    ball.position.x + ball.radius > row.position.x &&
    ball.position.y < row.position.y + row.height &&
    ball.position.y + ball.radius > row.position.y;

  if (collides) {
    if (row.objectType === "lifePoint") {
      const indexToRemove = GLOBAL.boundaries.indexOf(row);
      if (indexToRemove !== -1) {
        GLOBAL.boundaries.splice(indexToRemove, 1);
      }
      console.log("count", BALL_COUNT);
      score.updateScore += 100;
      BALL_COUNT++;
      life.ballRemain = BALL_COUNT;
      console.log(life.ballRemain, BALL_COUNT);
      // life.update(ctx);
    }
    if (row.objectType === "checkPoint") {
      // console.log(row.position.x);
      // console.log(row.position.y);
      const checkpointX = GLOBAL.boundaries.indexOf(row);

      const checkpointPosition = { x: checkpointX, y: row.position.y };
      CHECKPOINT.push(checkpointPosition);
      console.log(CHECKPOINT);

      // checkpointPosition = row;
      // Remove the tile from the array
      const indexToRemove = GLOBAL.boundaries.indexOf(row);
      if (indexToRemove !== -1) {
        GLOBAL.boundaries.splice(indexToRemove, 1);
      }

      score.updateScore += 100;
    }
  }
  return collides;
}

function objectDetection(a, b) {
  return (
    a.position.x < b.position.x + b.width &&
    a.position.x + a.width > b.position.x &&
    a.position.y < b.position.y + b.height &&
    a.position.y + a.height > b.position.y
  );
}
const pointEllipse = [];

function boundingPoint() {
  for (let theta = 0; theta <= 2 * Math.PI; theta += 0.0873) {
    // const boundPointX = ellipse.position.x + ellipse.radiusX * Math.cos(theta);
    // const boundPointY = ellipse.position.y + ellipse.radiusY * Math.sin(theta);
    const boundPointX = 400 + 15 * Math.cos(theta);
    const boundPointY = 300 + 35 * Math.sin(theta);

    pointEllipse.push({ boundPointX, boundPointY });
  }
}
boundingPoint();
// console.log(pointEllipse);

function ellipseDetection(circle, point) {
  let dx = point.boundPointX - circle.position.x;
  let dy = point.boundPointY - circle.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  return distance <= circle.radius;
}

// console.log(pointEllipse);
// console.log(pointCircle);

function showLevelFailedImage() {
  if (failureCount < maxFailures) {
    console.log("failed");
    levelFailedImage.src = "./assets/pop.png";
    levelFailedImage.style.display = "block";

    // console.log("before:", failureCount);
    failureCount++;
    // console.log("after:", failureCount);
    score.updateScore = 0;
    audioScreen.pause();
    audioGameover.play();
    setTimeout(resetGame, 2000);
  } else if (failureCount >= maxFailures) {
    levelFailedImage.src = "./assets/level_failed.png";
    levelFailedImage.style.display = "block";
    audioScreen.pause();
    audioGameover.play();
    return;
  }

  if (BALL_COUNT > 0) {
    BALL_COUNT--;
    // console.log(BALL_COUNT);
    life.ballRemain = BALL_COUNT;
  }

  // life.update(ctx);
  // ball.velocity.x = 0;
  // ball.velocity.y = 0;
}

function resetGame() {
  audioGameover.pause();
  // if (CHECKPOINT.length > 0) {
  //   const lastCheckpoint = CHECKPOINT[CHECKPOINT.length - 1];
  //   console.log(lastCheckpoint);
  //   ball.position.x = lastCheckpoint.x;
  //   ball.position.y = lastCheckpoint.y;

  //   for (let i = 0; i < GLOBAL.boundaries.length; i++) {
  //     GLOBAL.boundaries[i].position.x -= lastCheckpoint.x;
  //   }
  //   // ball.distanceTravel = 0;

  //   levelFailedImage.style.display = "none";
  //   CHECKPOINT.pop();
  // } else {

  levelFailedImage.style.display = "none";
  tileInitialize(selectedMap);
  game();
  audioScreen.play();
  // (ball.position.x = GLOBAL.boundaries[2].position.x + Tile.width / 2),
  //   (ball.position.y = GLOBAL.boundaries[116].position.y + Tile.width / 2);

  // (GLOBAL.boundaries.position.x=tileIndices[0].)
  // console.log(tileIndices[0].x);
}
// }

// if (checkpointPosition) {
//   console.log("sachin");
//   ball.position.x = checkpointPosition.x;
//   ball.position.y = checkpointPosition.y;
//   console.log(checkpointPosition.x);
//   // const widthDifference = checkpointPosition.x - ball.position.x;
//   const widthDifference = ball.distanceTravel - checkpointPosition.x + 475;
//   console.log("width", widthDifference);
//   for (let i = 0; i < GLOBAL.boundaries.length; i++) {
//     GLOBAL.boundaries[i].position.x -= widthDifference;
//     console.log(GLOBAL.boundaries[i].position.x);
//   }
//   ball.distanceTravel = 0;
//   levelFailedImage.style.display = "none";
// tileInitialize();

// ball.position.x = checkpointPosition.x + Tile.width / 2;
// ball.position.y = checkpointPosition.y + Tile.width / 2;
// console.log(ball.position.x)

function showLevelCompletedImage() {
  const levelCompleteDiv = document.createElement("div");
  levelCompleteDiv.id = "level-complete-message";
  levelCompleteDiv.classList.add("level-complete-message");

  const levelCompleteImage = document.createElement("img");
  levelCompleteImage.src = "./assets/whoo.png";
  levelCompleteImage.alt = "Level Completed";
  levelCompleteDiv.appendChild(levelCompleteImage);

  // Create and append the "Restart" image
  const restartImage = document.createElement("img");
  restartImage.src = "./assets/restart.png";
  restartImage.alt = "Restart";
  restartImage.classList.add("restart-image");
  levelCompleteDiv.appendChild(restartImage);

  // restartImage.addEventListener("click", function () {
  //   tileInitialize(); // Replace with your restart function
  // });

  const menuImage = document.createElement("img");
  menuImage.src = "./assets/menu.png";
  menuImage.alt = "Menu";
  menuImage.classList.add("menu-image");
  levelCompleteDiv.appendChild(menuImage);
  document.body.appendChild(levelCompleteDiv);

  restartImage.addEventListener("click", function () {
    console.log("listened");
    tileInitialize(selectedMap);
    levelCompleteDiv.style.display = "none";
  });
}
