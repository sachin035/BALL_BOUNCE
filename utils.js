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

      score.updateScore += 100;
      life.ballRemain = BALL_COUNT + 1;
    }
    if (row.objectType === "checkPoint") {
      // console.log(row.position.x);
      // console.log(row.position.y);
      const sachin = GLOBAL.boundaries.indexOf(row);
      console.log({ sachin });
      const checkpointPosition = { x: sachin, y: row.position.y };
      CHECKPOINT.push(checkpointPosition);
      // console.log(CHECKPOINT);

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

// const pointCircle = [];
function boundingPoint() {
  for (let theta = 0; theta <= 2 * Math.PI; theta += 0.0873) {
    const boundPointX = ellipse.position.x + ellipse.radiusX * Math.cos(theta);
    const boundPointY = ellipse.position.y + ellipse.radiusY * Math.sin(theta);
    pointEllipse.push({ boundPointX, boundPointY });
  }
  // for (let theta = 0; theta <= 2 * Math.PI; theta += 0.0873) {
  //   const circlePointX = circle.position.x + circle.radius * Math.cos(theta);
  //   const circlePointY = circle.position.y + circle.radius * Math.sin(theta);
  //   pointCircle.push({ circlePointX, circlePointY });
  // }
}

function ellipseDetection(circle, point) {
  let dx = point.boundPointX - circle.position.x;
  let dy = point.boundPointY - circle.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  return distance <= circle.radius;
}

// console.log(pointEllipse);
// console.log(pointCircle);

for (let i = 0; i < pointEllipse.length; i++) {
  if (isPointInPolygon(pointEllipse[i], pointCircle.points)) {
    // life.dead();
    console.log("kajnfkjab");
    // break;s
  }
}
// isPointInPolygon(pointEllipse, pointCircle);

// function ellipseDetection(circle, ellipse) {
//   console.log(GLOBAL.boundaries);
//   const dx = circle.position.x - ellipse.position.x;
//   const dy = circle.position.y - ellipse.position.y;
//   const angle = Math.atan2(-dy, dx);
//   // const { x, y } = GLOBAL.boundaries[319].pointFromAngle(angle);
//   const { x, y } = GLOBAL.boundaries[319].pointFromAngle(angle);
//   const distance = Math.hypot(x - circle.position.x, y - circle.position.y);
//   return [distance <= circle.radius, { x, y }];
// }

// pointFromAngle(a) {
//   const c = Math.cos(a);
//   const s = Math.sin(a);
//   const ta = s / c;
//   const tt = (ta * ellipse.radiusX / ellipse.radiusY);
//   const d = 1.0 / Math.sqrt(1.0 + tt * tt);
//   const x = ellipse.position.x + Math.sign(c) *  ellipse.radiusX * d;
//   const y = ellipse.position.x- Math.sign(s) * ellipse.radiusY* tt * d;
//   return { x, y };
// }
// function ellipseDetection(ball, ellipse) {
//   // Calculate the distance between the ball and the center of the ellipse
//   const dx = ball.position.x - ellipse.position.x;
//   const dy = ball.position.y - ellipse.position.y;

//   // Normalize the distances to account for the ellipse's dimensions
//   const normalizedX = dx / ellipse.radiusX;
//   const normalizedY = dy / ellipse.radiusY;

//   // Calculate the distance using the formula for an ellipse
//   const distance = Math.sqrt(
//     normalizedX * normalizedX + normalizedY * normalizedY
//   );

//   // Check if the distance is less than or equal to the sum of the radii
//   return distance <= ball.radius / ellipse.radiusX + 1; // Adding 1 for a little buffer
// }

function showLevelFailedImage() {
  if (failureCount < maxFailures) {
    levelFailedImage.src = "./assets/pop.png";
    levelFailedImage.style.display = "block";
    // console.log("before:", failureCount);
    failureCount++;
    // console.log("after:", failureCount);
    score.updateScore = 0;
    setTimeout(resetGame, 2000);
  } else if (failureCount >= maxFailures) {
    levelFailedImage.src = "./assets/level_failed.png";
    levelFailedImage.style.display = "block";

    return;
  }

  if (BALL_COUNT > 0) {
    BALL_COUNT--;
    // console.log(BALL_COUNT);
    life.ballRemain = BALL_COUNT;
  }
  // ball.velocity.x = 0;
  // ball.velocity.y = 0;
}

function resetGame() {
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
  //   CHECKPOINT.pop(); // Remove the last checkpoint from the array
  // } else {
  tileInitialize();
  (ball.position.x = GLOBAL.boundaries[2].position.x + Tile.width / 2),
    (ball.position.y = GLOBAL.boundaries[116].position.y + Tile.width / 2);

  // (GLOBAL.boundaries.position.x=tileIndices[0].)
  // console.log(tileIndices[0].x);
  levelFailedImage.style.display = "none";
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
    tileInitialize();
    levelCompleteDiv.style.display = "none";
  });
}
