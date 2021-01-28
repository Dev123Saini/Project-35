var balloon,ballonoImg;
var database,balloonPosition;
var bgImg;
var height;





function preload(){

balloonImg = loadAnimation("Ha.png","Haa.png","Haaa.png");
bgImg = loadImage("H.png");




}



function setup() {
  createCanvas(1500,700);

  database = firebase.database();


  balloon = createSprite(100, 520, 100, 100);
  balloon.addAnimation("back",balloonImg);
  balloon.scale = 0.6;

  balloonPosition = database.ref('Balloon/position');
  balloonPosition.on("value",readPosition,showError);


  
  
  
  
}

function draw() {
  background(bgImg);  
  
  if(keyDown(LEFT_ARROW)){
    balloon.x-=10;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x+=10;
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.scale+=0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.scale-=0.005;
  }

  textSize(25);
  fill("black")
  text("Use arrow keys to move hot air ballon",60,24);


  drawSprites();

}


function updateHeight(x,y){
  database.ref('Balloon/position').set({
    'x': balloon.position.x + x ,
    'y': balloon.position.y + y
  })
}
  
function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){

  console.log("Error in writing the database");




}





  