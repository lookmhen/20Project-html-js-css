//display setting
let board;
let boardWidth = 800;
let boardheight = 300;
let context;

//player settings
let playerWidth = 64;
let playerheigth = 64;
let playerX = 50;
let playerY = boardheight - playerheigth; //คำนวนเพื่อให้อยู่ที่พื้นพอดี
let playerImg;
let player = {
  x: playerX,
  y: playerY,
  width: playerWidth,
  height: playerheigth,
};

//physics
let velocityY = 0;
let gravity = 0.25;

//tree settings
let treeImg;
let treeWidth = 60;
let treeHeight = 120;
let treeX = 700;
let treeY = boardheight - treeHeight; //คำนวนต้นไม้เพื่อให้อยู่ที่พื้นพอดี
//generate tree
let treeArray = [];
let treeSpeed = -3; //ความเร็วการเคลื่อนที่ของต้นไม้

//game over
let gameover = false;

//score
let score=0;

window.onload = () => {
  //display
  board = document.getElementById("board");
  board.height = boardheight;
  board.width = boardWidth;
  context = board.getContext("2d");

  //player
  playerImg = new Image();
  playerImg.src = "./image/player.png";
  playerImg.onload = function () {
    context.drawImage(
      playerImg,
      player.x,
      player.y,
      player.width,
      player.height
    );
  };
  //tree
  treeImg = new Image();
  treeImg.src = "./image/tree.png";

  requestAnimationFrame(update);
  setInterval(createTree, 3000);
  document.addEventListener("keydown", movePlayer);
};
//update animetion
function update() {
  requestAnimationFrame(update);
  if (gameover) {
    return;
  }
  context.clearRect(0, 0, board.width, boardheight);
  velocityY += gravity;

  //create player object
  player.y = Math.min(player.y + velocityY, playerY);
  context.drawImage(playerImg, player.x, player.y, player.width, player.height);

  //create tree object
  for (let i = 0; i < treeArray.length; i++) {
    let tree = treeArray[i];
    tree.x += treeSpeed; //ทำให้เคลื่อนที่
    context.drawImage(treeImg, tree.x, tree.y, tree.width, tree.height);
    if (onCrash(player, tree)) {
      gameover = true;
      context.textAlign='center'
      context.font='20px Arial'
      context.fillText("Game Over!!",boardWidth/2,boardheight/2)
    }
  }
  //display Score
  score++;
  context.textAlign='left'
  context.font='20px Arial'
  context.fillText(`Score = ${score}`,5,20)
}

function movePlayer(e) {
  if (gameover) {
    return;
  }
  if (e.code == "Space" && player.y == playerY) {
    velocityY = -10;
  }
}

function createTree() {
  if (gameover) {
    return;
  }
  let tree = {
    img: treeImg,
    x: treeX,
    y: treeY,
    width: treeWidth,
    height: treeHeight,
  };
  treeArray.push(tree);
  if (treeArray.length > 5) {
    treeArray.shift();
  }
}

function onCrash(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj1.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

function restartGame(){
    location.reload();
}
