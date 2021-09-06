var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var igroundGroup, groundGroup, cloudsGroup, obstaclesGroup;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var fground,finvisibleGround;
var gameOver, restart;



function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight-120);

  gameOver = createSprite(camera.position.x+50,220);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(camera.position.x+50,250,20,20);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  trex = createSprite(10,485,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  trex.velocityX=10;

  fground = createSprite(1000,displayHeight-300,5000,10);
  finvisibleGround = createSprite(2500,displayHeight-280,5000,10);
  fground.addImage("ground",groundImage);
  finvisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  groundGroup = new Group();
  igroundGroup = new Group();
  
  score = 0;
}

function draw() {

  background(255);
  text("Score: " + score, camera.position.x,200);
  trex.collide(finvisibleGround);
  camera.position.y = displayHeight/2;
  camera.position.x = trex.x+500;
  finvisibleGround.x=trex.x;
  if (gameState===PLAY){
    gameOver.visible = false;
    restart.visible = false;
    
    score = score + Math.round(getFrameRate()/40);
  
    if(keyDown("space") && trex.y >= displayHeight-320) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    
    spawnClouds();
    spawnObstacles();
    spawngrounds();
    trex.collide(finvisibleGround);

    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {

    gameOver.x=trex.x+500;
    restart.x=trex.x+500;
    gameOver.visible = true;
    restart.visible = true;

    
    trex.velocityX=0;;

    trex.velocityY = 0;
    
    trex.changeAnimation("collided",trex_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 40 === 0) {
    var cloud = createSprite(trex.x+100,Math.round(random(100,300)),40,10);
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;


    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    cloudsGroup.add(cloud);

  }
  
}

function spawngrounds() {


  
  if(frameCount % 20 === 0){
    var ground = createSprite(trex.x+3000,displayHeight-300,5000,10);
    var invisibleGround = createSprite(trex.x,displayHeight-290,10000,10);
    ground.addImage("ground",groundImage);
    invisibleGround.visible = false;
  }


}

function spawnObstacles() {
  if(frameCount % 45 === 0) {
    var obstacle = createSprite(trex.x+200,displayHeight-320,10,40);
    obstacle.scale = 0.5;

    obstaclesGroup.collide(finvisibleGround);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
       
    }
    obstaclesGroup.add(obstacle);
    
  }
}

function reset(){
  gameState = PLAY;

  trex.velocityX=10;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}