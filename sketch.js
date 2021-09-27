//Ghost Runner Game
var gamestate = "serve";

//Tower
var tower, towerImage,check;

//Door
var door, doorImage, doorGroup;

//climber
var climber, climberImage, climberGroup;

//ghost
var ghost, ghostImage, ghostImage2;

//invisible block
var invisibleblock, invisibleBlockGroup;

//score
var score;

//cointext
var coinText;

//coins
var coins, coinsImage, coinsGroup;

//sound
var con;

//block
var block;

//Function Preload
function preload() {
  //Tower
  towerImage = loadImage("tower.png");

  //Door
  doorImage = loadImage("door.png");

  //climber
  climberImage = loadImage("climber.png");

  //ghost
  ghostImage = loadImage("ghost-standing.png");
  ghostImage2 = loadImage("ghost-jumping.png");

  //sound
  con = loadSound("spooky.wav");

  //coins
  coinsImage = loadImage("coin.png");

  //play
  play = loadImage("play.jpg");
}

//Function Setup
function setup() {
  //Canvas
  createCanvas(600, 600);

  //creating groups
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  coinsGroup = new Group();

  //Tower
  tower = createSprite(300, 300, 10, 10);
  tower.addImage(towerImage);
  tower.velocityY = 1;

  //ghost
  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  // ghost.debug=true
  ghost.addImage("ghost", ghostImage);
  ghost.addImage("jumping", ghostImage2);

  //block
  block = createSprite(300, 10, 600, 50);
  block.shapeColor = "white";

  //coin
  coinText = 0;

  //score
  score = 0;
}

//Function Draw
function draw() {
  background("white");

  console.log(gamestate)
  //gamestate play
  if (gamestate === "play") {
    //sound
    //con.play();
      console.log("play")
      score = Math.ceil(frameCount / frameRate());

      //Tower
      if (tower.y > 400) {
        tower.y = 300;
      }

      if (keyDown("left_arrow")) {
        ghost.x = ghost.x - 3;
      }
      if (keyDown("right_arrow")) {
        ghost.x = ghost.x + 3;
      }
      if (keyDown(32) && gamestate==="play") {
        check=1;
        ghost.velocityY = -5;
        ghost.changeAnimation("jumping", ghostImage2);
      }
      if(check===1){
        ghost.velocityY = ghost.velocityY + 0.8;
      }
    

      if (coinsGroup.isTouching(ghost)) {
        coinsGroup.destroyEach();
        coinText = coinText + 1;
      }
    

      if (climberGroup.isTouching(ghost)) {
        ghost.velocityY = 0;
      }
       //Adding functions
    doors();
    coin();
      if (
        invisibleBlockGroup.isTouching(ghost) ||
        ghost.y > 600 ||
        ghost.y < 50 ||
        ghost.x > 530 ||
        ghost.x < 80
      ) {
  
        ghost.visible = false;
        gamestate = "end";
        invisibleBlockGroup.destroyEach();
        doorGroup.destroyEach()
        climberGroup.destroyEach();
    
      }
      console.log(ghost.y)
      console.log(ghost.x)
   

    //Draw Sprites
    drawSprites();
  }
  if (keyDown("r") &&  gamestate === "end") {

    restart();
    console.log(ghost.y)
    console.log(ghost.x)
    drawSprites();
  }

  console.log(gamestate)

  if (gamestate === "serve") {
    //displaying press
    stroke("black");
    fill("black");
    textSize(20);
    console.log("serve")
    text("click on s to start the game", 210, 300);
  
    if (keyDown("s")) {
      gamestate = "play";
    }
  }
  //game state END
  if (gamestate === "end") {
    stroke("blue");
    fill(random(0,255),random(0,255),random(0,255));
    textSize(30);
    text("Gameover", 250, 250);
    fill("Red");
    text("press R to restart", 210, 290);

   
  }

  stroke("black");
  fill("black");
  textSize(20);

  text("Coins:" + coinText, 10, 30);

  stroke("black");
  fill("black");
  textSize(20);
  text("Score:" + score, 300, 30);

}

//Function Doors
function doors() {
  //door
  if (frameCount % 240 === 0) {
    door = createSprite(Math.round(random(120, 400)), -50, 10, 10);
    //door.x = random(80,450);
    console.log(door.x);
    door.velocityY = 1;
    //door.debug=true;
    door.addImage(doorImage);
    door.lifetime = 800;
    door.visible = true;

    //climber
    climber = createSprite(200, 10, 10, 10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;

    //ghost
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    //invisible block
    invisibleblock = createSprite(200, 15);
    invisibleblock.width = climber.width;
    invisibleblock.height = 2;
    invisibleblock.x = door.x;
    invisibleblock.velocityY = 1;
    invisibleblock.visible = false;

    //adding groups
    invisibleBlockGroup.add(invisibleblock);
    doorGroup.add(door);
    climberGroup.add(climber);
  }
}

function coin() {
  //coins

  if (frameCount % 200 === 0) {
    //coin
    coins = createSprite(200, 15);
    coins.x = random(100, 500);
    coins.addImage(coinsImage);
    coins.lifetime = 800;
    coins.velocityY = 1;
    coins.scale = 0.2;
    coinsGroup.add(coins);
  }
}
function restart() {
  gamestate = "play";

  check=0
  ghost.x = 200;
  ghost.y = 200;
  ghost.visible = true;
  coinsText = 0;
  score = 0;

  console.log("restart")
  
}
