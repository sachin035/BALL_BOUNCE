const keys = {
  A: false,
  D: false,
  W: false,
  S: false,
  // SPACEBAR: false,
};

window.onkeydown = (e) => {
  // console.log(e.code);
  switch (e.code) {
    case "KeyA":
      keys.A = true;
      break;
    case "KeyW":
      keys.W = true;
      break;
    case "KeyS":
      keys.S = true;
      break;
    case "KeyD":
      keys.D = true;
      break;
    // case "Space":
    //   keys.SPACEBAR = true;
  }
  //   console.log(keys);
};

window.onkeyup = (e) => {
  //console.log(e.code);

  switch (e.code) {
    case "KeyA":
      keys.A = false;
      break;
    case "KeyW":
      keys.W = false;
      break;
    case "KeyS":
      keys.S = false;
      break;
    case "KeyD":
      keys.D = false;
      break;
    // case "Space":
    //   keys.SPACEBAR = false;
  }
  //   console.log(keys);
};
