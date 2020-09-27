var dooogie, database, foodstock, data;
var dogEating, dogSitting;
var thumpsupleft, thumpsupright;
var thumpsupleftimage, thumpsuprightimage;
var fedTime, lastFed; 
var food

function preload()
{
  dogSitting = loadImage("images/dogImg.png")
  dogEating = loadImage("images/dogImg1.png")
  dogcrying = loadImage("images/cryingdog.png")
  thumpsupleftimage = loadImage("images/thumpsup.png")
  thumpsuprightimage = loadImage("images/THUMPSUP2.png")

}

function setup() {
  database =firebase.database();
  createCanvas(1400, 700);
  food = new Food()

  // feed = createButton("Feed Your Dooogie");
  // feed.position(700,95);
  // feed.mousePressed(food.deductFoodStock);

  // add = createButton("Add Food");
  // add.position(900,95);

  dooogie = createSprite(700, 400, 50, 50);
  dooogie.addImage("dog1", dogSitting)
  dooogie.scale = 0.5;
  
  foodstock = database.ref('Food');
  foodstock.on("value", food.getFoodStock);

  thumpsupleft = createSprite(300, 170, 50, 50);
  thumpsupleft.addImage("thumps", thumpsupleftimage);
  thumpsupleft.scale = 0.7;
  thumpsupleft.visible = false;

  thumpsupright = createSprite(1100, 170, 50, 50);
  thumpsupright.addImage("thumps1", thumpsuprightimage);
  thumpsupright.scale = 0.7;
  thumpsupright.visible = false;

}


function draw() { 
  background("skyblue"); 
  textSize(30);
  fill("black");

  fedTime =database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })

  if(lastFed == null){
    text("NoT FeD YeT", 50, 100)
  }
  else{
  text("LAsT FeD : "+ lastFed, 50, 100)
  }

  food.display();

  if (keyWentDown("space")&& foodstock > 0){
    dooogie.addImage("dog1", dogEating);
    thumpsupleft.visible = true;
    thumpsupright.visible = true;
    updateFeedTime();

  }

  if(keyWentUp("space") && foodstock > 0){
    thumpsupleft.visible = false;
    thumpsupright.visible = false;
    dooogie.addImage("dog1", dogSitting);
    food.deductFoodStock();
    }

  drawSprites();
  
  if(foodstock > 0){
    text("BRuhhhh YoU CaN Feed me "+ foodstock + " TiMeS", 450, 100);
    text("BRuhhhh UsE SpACe To Feed me ", 470, 50);
  }

  if(foodstock < 30){
    text("BRuhhhh UsE R tO ReFiLL ThE FoOd", 450, 150);
    text("OnE Byyy OnE", 700, 190);
    text("BRuhhhh UsE F tO fUlLy FiLl tHe FoOd TaNk ", 430, 650);
    if (keyWentDown("f")){
      database.ref("/").update({
        Food:30
      })
      dooogie.addImage("dog1", dogSitting);
    }
    
    if (keyWentDown("r")){
      food.updateFoodStock();
      dooogie.addImage("dog1", dogSitting);

    }
  }

  if(foodstock == 0){
  text("BRuhhhh YoU CaNt Feed me Any MoRe", 430, 100);
  dooogie.addImage("dog1", dogcrying);
  thumpsupleft.visible = false;
  thumpsupright.visible = false;
  }

}

async function updateFeedTime(){
  var response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
  var jsonResponse = await response.json();
  hour = jsonResponse.datetime.slice(11,13);
  minutes = jsonResponse.datetime.slice(13,16);
  if(hour >= 12)
  {
    if(hour == 12){
      hour = 12
      fedTime = 12;
    }
    else{
    hour = hour % 12;
    fedTime = hour + minutes + ' PM';
    }
  }
  else if(hour == 0)
  {
    fedTime = '12' + minutes + "AM";
  }
  else 
  {
   fedTime = hour + minutes +' AM';
  }
  database.ref('/').update({
      FeedTime: fedTime
    }) 
}
