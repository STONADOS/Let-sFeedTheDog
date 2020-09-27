class Food{
    constructor(){
        this.LastFed;
        this.image = loadImage("images/Milk.png");
    }
getFoodStock(data){
    foodstock = data.val();
}
updateFoodStock(){
    if(foodstock<30){
    data = foodstock += 1;
    database.ref('/').update({
        Food:data
      });
    }
}
deductFoodStock(){
    data = foodstock -= 1;
    database.ref('/').update({
        Food:data
      });
}
display(){
    var x = 110;
    var y = 300;

    imageMode(CENTER);
    if(foodstock>0){
    image(this.image, 560, 530, 180, 180);
    }

    if(foodstock!=0){
        for(var i = 0;i<foodstock-1;i++){
            if(i%10 == 0){
                x = 100;
                y = y+ 60;
            }
            image(this.image, x, y, 150, 150);
            x = x+ 45;
        }
    }
}
}