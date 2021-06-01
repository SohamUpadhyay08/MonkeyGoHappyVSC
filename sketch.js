
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var groundImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var Score;
var overSound;
var collect;
var backGroundImage;


function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground2.png");
  overSound = loadSound("gameOver.mp3")
  collect = loadSound("collect.wav");
  backGroundImage = loadImage("background1.png")
 
}



function setup() {
  createCanvas(600,400);
  monkey = createSprite(80,335,20,20); 
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.07
  
  ground = createSprite(40,380,10,10);
  ground.addImage(groundImage);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  backGround = createSprite(260,190,10,10);
  backGround.addImage(backGroundImage);
  monkey.depth = backGround.depth;
  monkey.depth = monkey.depth+1;
  ground.depth = backGround.depth;
  ground.depth = ground.depth+1;
  
  
  Score = 0;
  stroke("black");
  textSize(20);
  fill("black");
  
  
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background("aquamarine");
  
  
  monkey.collide(ground);
  if(monkey.isTouching(FoodGroup)) {
    collect.play();
    FoodGroup.destroyEach();
    Score = Score+1;
    monkey.scale += + 0.03
  }
  
  if(gameState === PLAY){
    
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  stroke("black");
  textSize(20);
  fill("black");
    
  if (ground.x < 200){
      ground.x = ground.width/2;
    }
    banana();
    stones();
  
  if(keyDown("space")) {
    monkey.velocityY = -20
  }
  monkey.velocityY = monkey.velocityY + 0.8
    
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
    overSound.play();
  }
    
   
  }
  
  
 drawSprites();

 if(gameState === END){
  FoodGroup.setLifetimeEach = -1;
  obstacleGroup.setLifetimeEach = -1
  obstacleGroup.setvelocityXEach = 0;
  ground.velocityX = 0;
  monkey.velocityY = 0;
  monkey.visible = false;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();

  textSize(40)
  fill(255)
  text("GAME OVER",150,200)
  
 }
  
  
  text("Score: "+ Score,200,50);
}

 function banana(){
   if (frameCount % 80 === 0){
  var banana = createSprite(600,Math.round(random(120,200)),10, 10);
  banana.addImage(bananaImage);
  banana.scale = 0.13
   banana.lifetime = 200
   banana.velocityX = -7
   FoodGroup.add(banana)
   }
 }

 function stones(){
   if (frameCount % 300 === 0){
  var stones = createSprite(600,313,10,10);
  stones.addImage(obstacleImage);
  stones.scale = 0.2;
   stones.lifetime = 200;
   stones.velocityX = -(7+2*Score/10);
   obstacleGroup.add(stones);
   }
 }

