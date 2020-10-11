

var upButton,downButton,jumpSound,gameOverSound,coinSound,BGM,SM,spider,spidey,spideyImg, backImg, rest,restImg, invisibleGround,backg, spideyJumpImg, enemy, enemiesGroup, enemy1 , enemy2, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, coinImg,coinsGroup,score = 00,spideyCrouch,scoreboard,scoreImg,gameOver,GOimg,spideyCol;

var time = 1;

var PLAY = 0 , END = 1;

var gameState = PLAY;


function preload(){
  
  spideyImg = loadAnimation("1.PNG","2.PNG","3.PNG","4.PNG","5.PNG","6.PNG","7.PNG","8.PNG","9.PNG","10.PNG","11.PNG","12.PNG","13.PNG","14.PNG","15.PNG","16.PNG");

  spideyJumpImg = loadImage("spideyJump.png");
  spideyCrouch = loadImage("spideyDuck.png");
  spideyCol = loadImage("15.PNG");
  coinSound = loadSound("coin.mp3");
  backImg = loadImage("backg.jpg");  
  jumpSound = loadSound("jump.mp3");

  gameOverSound = loadSound("GOS.mp3");

  BGM = loadSound("BGM.mp3");

  enemy1 = loadImage("e1.png");
  enemy2 = loadImage("e2.png");
  enemy3 = loadImage("e3.png");
  enemy4 = loadImage("e4.png");
  enemy5 = loadImage("e5.png");
  enemy6 = loadImage("e6.png");
  enemy7 = loadImage("e7.png");
  enemy8 = loadImage("e8.png");
  enemy9 = loadImage("e9.png");
  enemy10 = loadImage("e10.png");
  enemy11 = loadImage("e11.png");
  
  coinImg = loadImage("star.png");
  scoreImg = loadImage("scoreboard.png");
  GOimg = loadImage("GO.png");
  restImg = loadImage("rest.png");
  SM = loadImage("SM.png");

  
  
}


function setup() {
  createCanvas(1350,635);
  
   //spidey y = 316

  
  
  backg = createSprite(8000,310,20000,600);
  backg.addImage(backImg);
  backg.scale = 0.88 ;
  //backg.x = width/2;
  
  spidey = createSprite(150,410,20,50);
  spidey.addAnimation("running",spideyImg);
  spidey.addAnimation("jump",spideyJumpImg);
  spidey.addAnimation("crouch",spideyCrouch);
  spidey.addAnimation("collided",spideyCol);
  
  spidey.scale = 0.7;

  

 


  enemiesGroup = new Group();
  coinsGroup = new Group();


  invisibleGround = createSprite(500,520,1000,5);
  invisibleGround.visible = false;


  scoreboard = createSprite(1240,60,20,20)
  scoreboard.addImage(scoreImg);
  scoreboard.scale = 0.4;

  gameOver = createSprite(620,300,20,20);
  gameOver.addImage(GOimg);
  gameOver.visible = false;

  rest = createSprite(1500,440,20,20)
  rest.addImage(restImg);

  spider = createSprite(200,350,20,20);
  spider.addImage(SM);
  spider.scale = 0.5;
  spider.visible = false;

  //playMusic();

  BGM.loop();

  upButton = createSprite(1060,160,600,300);
  upButton.shapeColor = "blue";

  downButton = createSprite(1060,470,600,300);
  downButton.shapeColor = "red";
  

  
  
}

function draw(){
  background(255);

  BGM.setVolume(0.5);
;     
  time = time + 1;

  if(time > 3600){
    time = 0;
  }

  upButton.visible = false;
  downButton.visible = false;

  upButton.depth = downButton.depth;

  downButton.depth++;

  spidey.collide(invisibleGround);
  spidey.setCollider("rectangle", -40, 10, 200, 270);

  spider.depth = spidey.depth +1;
  


if(gameState === PLAY){

  backg.velocityX = -8;

  

  
  
  //spidey.debug = true;

    
  //scoring
  //score = score + Math.round(Math.random(0.2,0.6)) ;
  
  if (backg.x < -7200){
    backg.x = 500
  }
  
  
   //jump when the space key is pressed
  if((keyWentDown("space") && spidey.y > 410) || (touches.length>0 && touches[touches.length-1].y <=200)){
    spidey.velocityY = -24 ;
    jumpSound.play();
    jumpSound.setVolume(3);
    //console.log(touches);
   }

   /* //jump when the space key is pressed
   if(mousePressedOver(upButton) && spidey.y > 410){
    spidey.velocityY = -24 ;
    jumpSound.play();
    jumpSound.setVolume(3);
    
   }*/
  if(spidey.y < 410) {
    spidey.changeAnimation("jump");
  
  } else if(touches.length>0 && touches[touches.length-1].y >200){
    spidey.changeAnimation("crouch");
    spidey.setCollider("rectangle", -5, 5, 300, 150);

  }else {
    spidey.changeAnimation("running");

  }


  

  //add gravity
  spidey.velocityY = spidey.velocityY + 0.8; 

  //console.log(time);

  for(var i = 0; i < coinsGroup.length; i++){
      
    var co =   coinsGroup.get(i);
  
    if(co.isTouching(spidey)){
      score = score +5;

      coinSound.play();

      co.destroy();
    }
    
    
      
    }
   
    
  




  if(spidey.isTouching(enemiesGroup)){

    gameOverSound.play();
    BGM.stop();

    gameState = END;
    } 

}


if(gameState === END){

  backg.velocityX = 0;
  enemiesGroup.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);
  spidey.velocityY = 0;
  spidey.changeAnimation("collided");

  rest.x = 740;
  gameOver.visible = true;
  spider.visible = true;

  if(mousePressedOver(rest) || (touches.length>0 && touches[touches.length-1].y === 440 && touches[touches.length-1].x === 740)) {
    reset();
   }

   enemiesGroup.setLifetimeEach(-1);
   coinsGroup.setLifetimeEach(-1);
 
}






spawnEnemy();
spawnCoin();

  drawSprites();

fill("red");
textSize(40);
text(score,1170,75);



}
   
function spawnEnemy() {

  
  

  //console.log(time);
  
  //enemy = createSprite(1400,412,20,20);
  //enemy.y = random(1360,1500);*/

  switch(time){
      
    case 700 : enemy = createSprite(1400,412,20,20);
              enemy.addImage(enemy1);
              enemy.velocityX = -8;
              enemy.lifetime = 250;
              enemy.scale = 0.9;
              enemiesGroup.add(enemy);
              //enemy.debug = true;
              enemy.setCollider("rectangle",-8,5,140,220);
              
              
              
    break;

    case 1300 : enemy = createSprite(1400,412,20,20);
                enemy.addImage(enemy2);
                enemy.velocityX = -8;
                enemy.lifetime = 250;
                enemy.scale = 0.9;
                enemiesGroup.add(enemy);
                enemy.setCollider("rectangle",-40,0,100,250);
                
    break;

    case 1800 : enemy = createSprite(1400,412,20,20);
                enemy.addImage(enemy3);
                enemy.velocityX = -8;
                enemy.lifetime = 250;
                enemy.scale = 0.9;
                enemiesGroup.add(enemy);
                enemy.setCollider("rectangle",0,0,200,200);
                
    break;

    case 5300 : enemy = createSprite(1400,412,20,20);
                enemy.addImage(enemy4);
                enemy.velocityX = -8;
                enemy.lifetime = 250;
                enemy.scale = 0.9;
                enemiesGroup.add(enemy);
                enemy.setCollider("rectangle",-10,0,110,250);
    break;

    case 3100 : enemy = createSprite(1400,412,20,20);
                enemy.addImage(enemy5);
                enemy.velocityX = -8;
                enemy.lifetime = 250;
                enemy.scale = 0.9;
                enemiesGroup.add(enemy);
                enemy.setCollider("rectangle",10,0,140,250);
    break;

    case 3500 : enemy = createSprite(1400,412,20,20);
                enemy.addImage(enemy6);
                enemy.velocityX = -8;
                enemy.lifetime = 250;
                enemy.scale = 0.9;
                enemiesGroup.add(enemy);
                enemy.setCollider("rectangle",0,0,210,250);

    break;
    
    case 4000  : enemy = createSprite(1400,432,20,20);
              enemy.addImage(enemy7);
              enemy.velocityX = -8;
              enemy.lifetime = 250;
              enemy.scale = 0.7;
              enemiesGroup.add(enemy);
              enemy.setCollider("rectangle",0,20,210,190);
    break;

    case 5000 : enemy = createSprite(1400,412,20,20);
                enemy.addImage(enemy8);
                enemy.velocityX = -8;
                enemy.lifetime = 250;
                enemy.scale = 0.9;
                enemiesGroup.add(enemy);
                enemy.setCollider("rectangle",0,25,210,200);
    break;

    case 4700 : enemy = createSprite(1400,412,20,20);
                enemy.addImage(enemy9);
                enemy.velocityX = -8;
                enemy.lifetime = 250;
                enemy.scale = 0.9;
                enemiesGroup.add(enemy);
                enemy.setCollider("rectangle",-8,5,190,250);
    break;

    case 4400: enemy = createSprite(1400,290,20,20);
                enemy.addImage(enemy10);
                enemy.velocityX = -8;
                enemy.lifetime = 250;
                enemy.scale = 0.9;
                enemiesGroup.add(enemy);
                //enemy.debug = true;
                enemy.setCollider("rectangle",-8,5,140,220);
    break;

    case 2500 : enemy = createSprite(1400,310,20,20);
                enemy.addImage(enemy11);
                enemy.scale = 0.9;
                enemy.velocityX = -8;
                enemy.lifetime = 250;
                enemiesGroup.add(enemy);
                //enemy.debug = true;
                enemy.setCollider("rectangle",5,5,200,190);
    break;


  }

}


function spawnCoin() {
  //code  to spawn the Coin
  if (World.frameCount % Math.round( random(60,100)) === 0) {
   var coin = createSprite(1400,310,40,10);
    coin.addImage(coinImg);
    coin.velocityX = -8;

    //coin.debug = true;
    coin.setCollider("circle",0,0,26);

    coinsGroup.add(coin);
    coin.y = random(120,210);
    
    
    
    
     //assign lifetime to the variable
    coin.lifetime = 200;
    
    //adjust the depth
    coin.depth = spidey.depth;
    spidey.depth = spidey.depth + 1;
    
    //add each banana to the group
    coinsGroup.add(coin);
    
    //banana.debug = true;
    //banana.setCollider("rectangle",0,0,800,400);*/
  
  }

}

function reset(){
  gameState = PLAY;

  time = 0;
  
   enemiesGroup.destroyEach();
   coinsGroup.destroyEach();
   gameOver.visible = false;
   spider.visible = false;
   rest.x = 1600;
   spidey.changeAnimation("running");
   
  gameOverSound.stop();
  BGM.loop();

  score = 0;
  
  
}

