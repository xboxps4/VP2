var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var fedtime
var LastFeed
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  

} 

function draw(){
 background(0);

 foodobject.display()

 fedTime = database.ref('FeedTime');
 fedTime.on("value",function(data){
   LastFeed = data.val();
 });

 drawSprites();

 fill(255,255,254);
 textSize(25);
 if(LastFeed >= 12){
  text("Last Feed : "+ LastFeed%12 + " PM", 350,30);
 }else if(LastFeed == 0){
   text("Last Feed : 12 AM",350,30);
 }else{
   text("Last Feed : "+ LastFeed + " AM", 350,30);
 }

 fill(255,255,254);
 textSize(25);
 text("PRESS UP_ARROW TO ADD FOOD",500,400)
 text("PRESS DOWN_ARROW TO FEED DOG",500,100)

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}

function keyPressed(){
  if(keyCode===UP_ARROW){
    AddFood();
  }
  if(keyCode===DOWN_ARROW){
    FeedDog();
  }
}