var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var invisibleGround;

var PLAY = 1;
var End = 0;
var gameState = PLAY;

var score = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(50,340,30,30)
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(300,380,620,10);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
}

function draw() {
  background("white");
 
if(gameState === PLAY){  
  
  if(keyDown("space") && monkey.y >= 100){
    monkey.velocityY = -10;
  }
  if(monkey.isTouching(FoodGroup)){
    score = score+1;
    FoodGroup.destroyEach();
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisibleGround); 

  spawnObstacles();
  spawnBananas();
}
  
  fill("black");
  text("Score : "+score,500,30);   
  
  drawSprites();
}
function spawnObstacles(){
  if(frameCount%250 === 0){
    obstacle = createSprite(600,363,20,20);
    obstacle.scale = 0.1  
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}
function spawnBananas(){
  if(frameCount%100 === 0){
    banana = createSprite(600,250,30,30);
    banana.velocityX = -5
    banana.y = Math.round(random(150,300));
    banana.scale = 0.1;
    banana.addImage(bananaImage);
    
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}
