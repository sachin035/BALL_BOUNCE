const homeScreen = document.getElementById("homeScreen");
homeScreen.style.width = canvas.width;
console.log(canvas.width);
homeScreen.style.height = canvas.height;

const titleMenu = document.getElementById("title-menu");
const levelSelection = document.getElementById("level");
const btnLevel = document.getElementById("btn-level");
const leftControl = document.getElementById("left_control");
levelSelection.style.display = "none";
btnLevel.addEventListener("click", function () {
  titleMenu.style.display = "none";
  levelSelection.style.display = "block";
});

levelSelection.addEventListener("click", function () {
  levelSelection.style.display = "none";
  titleMenu.style.display = "block";
});
