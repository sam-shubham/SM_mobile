
//BounceOff Command

function bounceOff(obj1,obj2) {


    if (obj1.x - obj2.x < obj2.width/2 + obj1.width/2
      && obj2.x - obj1.x < obj2.width/2 + obj1.width/2) {
        obj1.velocityX = obj1.velocityX * (-1);
        obj2.velocityX = obj2.velocityX * (-1);
    }
  
    if (obj1.y - obj2.y < obj2.height/2 + obj1.height/2
      && obj2.y - obj1.y < obj2.height/2 + obj1.height/2){
        obj1.velocityY = obj1.velocityY * (-1);
        obj2.velocityY = obj2.velocityY * (-1);
    }
  
  }