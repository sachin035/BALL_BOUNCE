const tileIndices = [];

function tileInitialize(selectedMap) {
  console.log(selectedMap);
  clearCanvas();
  GLOBAL.boundaries = [];
  levelFailed = false;

  selectedMap.forEach((row, i) => {
    // console.log(map[i].length);
    row.forEach((column, j) => {
      // const tileIndex = {
      //   x: j,
      //   y: i,
      // };
      // tileIndices.push(tileIndex);

      // tileIndices.forEach((tileIndex) => {
      //   const x = tileIndex.x;
      //   const y = tileIndex.y;
      //   //  console.log(`Tile at (${x}, ${y})`);
      // });
      // console.log({ originalTilePositions });
      //if checkpoint
      //j>checkpointcoloumn-2;
      //continue

      // if (column === objectMapping.checkPoint) {
      //   checkPointcolumn = j;

      //   console.log(j);
      // }
      switch (column) {
        case objectMapping.block:
          GLOBAL.boundaries.push(
            new Tile({
              position: {
                x: Tile.width * j,
                y: Tile.height * i,
              },
              color: "red",
              objectType: "block",

              image: createImage("../assets/block.png"),
            })
          );
          break;

        case objectMapping.restBlock:
          GLOBAL.boundaries.push(
            new Tile({
              position: {
                x: Tile.width * j,
                y: Tile.height * i,
              },
              color: "green",
              objectType: "restBlock",
              image: createImage("../assets/block.png"),
            })
          );
          break;

        // case 0:
        //   boundaries.push(
        //     new Tile({
        //       position: {
        //         x: Tile.width * j,
        //         y: Tile.height * i,
        //       },
        //       // color: "skyblue",
        //       image: createImage("./assets/"),
        //     })
        //   );
        //   break;

        case objectMapping.fireObstcale:
          GLOBAL.boundaries.push(
            new Tile({
              position: {
                x: Tile.width * j,
                y: Tile.height * i,
              },
              color: "brown",
              objectType: "fireObstacle",
              image: createImage("../assets/fire.png"),
            })
          );
          break;

        case objectMapping.checkPoint:
          GLOBAL.boundaries.push(
            new Tile({
              position: {
                x: Tile.width * j,
                y: Tile.height * i,
              },
              color: "yellow",
              objectType: "checkPoint",
              image: createImage("../assets/checkpoint.png"),
            })
          );
          break;

        case objectMapping.enemy:
          GLOBAL.boundaries.push(
            new Enemy({
              position: {
                x: Tile.width * j,
                y: Tile.height * i,
              },
              height: 100,
              width: 100,
              velocity: {
                x: 0,
                y: 3,
              },
              objectType: "enemy",
              // color: "orange",
              image: createImage("../assets/enemy.png"),
            })
          );
          // alert("enemy psuesh");
          break;

        case objectMapping.sizeIncreaser:
          GLOBAL.boundaries.push(
            new Tile({
              position: {
                x: Tile.width * j,
                y: Tile.height * i,
              },
              color: "black",
              objectType: "sizeIncreaser",
              image: createImage("../assets/size_increaser.png"),
            })
          );
          break;

        case objectMapping.sizeDecreaser:
          GLOBAL.boundaries.push(
            new Tile({
              position: {
                x: Tile.width * j,
                y: Tile.height * i,
              },
              color: "purple",
              objectType: "sizeDecreaser",
              image: createImage("../assets/size_decreaser.png"),
            })
          );
          break;

        case objectMapping.lifePoint:
          GLOBAL.boundaries.push(
            new Tile({
              position: {
                x: Tile.width * j,
                y: Tile.height * i,
              },
              color: "purple",
              objectType: "lifePoint",
              image: createImage("../assets/life.png"),
            })
          );
          break;

        case objectMapping.water:
          GLOBAL.boundaries.push(
            new Tile({
              position: {
                x: Tile.width * j,
                y: Tile.height * i,
              },
              color: "skyblue",
              objectType: "water",
              image: createImage("../assets/water.png"),
            })
          );
          break;

        case objectMapping.levelCompleted:
          GLOBAL.boundaries.push(
            new Tile({
              position: {
                x: Tile.width * j,
                y: Tile.height * i,
              },
              color: "skyblue",
              objectType: "levelCompleted",
              image: createImage("../assets/levelComplete.png"),
            })
          );
          break;

        case objectMapping.levelCompleted:
          GLOBAL.boundaries.push(
            new Tile({
              position: {
                x: Tile.width * j,
                y: Tile.height * i,
              },
              color: "skyblue",
              objectType: "levelCompleted",
              image: createImage("../assets/levelComplete.png"),
            })
          );
          break;
        // case objectMapping.ellipseObstacle:
        //   GLOBAL.boundaries.push(
        //     new EllipseObstacle({
        //       position: {
        //         x: Tile.width * j,
        //         y: Tile.height * i,
        //       },
        //       radiusX: 25,
        //       radiusY: 35,
        //       lineWidth: 8,
        //       objectType: "ellipseObstacle",
        //       // image: createImage("./assets/levelComplete.png"),
        //     })
        //   );
        //   break;
      }
    });
  });
}
console.log(GLOBAL.boundaries);
