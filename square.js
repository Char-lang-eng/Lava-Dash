class Square{
constructor(number){
    this.number = number
    this.x = number%10/10
    this.y = floor(number/10)/10
    this.chance = 0.3
    this.danger = 0
  }
  draw(){
    fill(255, 255*(3-this.danger)/3, 255*(3-this.danger)/3)
    stroke(0)
    if(this.danger == 4){
      fill(100, 0, 100)
    }
    if(this.danger == 5){
      fill(250, 250, 100)
    }
    rect(this.x*squareSize, this.y*squareSize, squareSize/10, squareSize/10)
    if(this.danger == 0){
      image(dangI, this.x*squareSize, this.y*squareSize, squareSize/10, squareSize/10)
    }
    if(this.danger == 1){
      image(dangiI, this.x*squareSize, this.y*squareSize, squareSize/10, squareSize/10)
    }
    if(this.danger == 2){
      image(dangiiI, this.x*squareSize, this.y*squareSize, squareSize/10, squareSize/10)
    }
    if(this.danger == 3){
      image(dangiiiI, this.x*squareSize, this.y*squareSize, squareSize/10, squareSize/10)
    }
    if(this.danger == 4){
      image(spikesI, this.x*squareSize, this.y*squareSize, squareSize/10, squareSize/10)
    }
    if(this.danger == 5){
      image(starI, this.x*squareSize, this.y*squareSize, squareSize/10, squareSize/10)
    }
    if(place == this.number){
      if(alternate%8 < 4){
        if(state == 1){
            image(stillI, (this.x-0.018)*squareSize, (this.y-0.01)*squareSize, squareSize/8, squareSize/8)
        }
        else{
            image(guyI, (this.x-0.018)*squareSize, (this.y-0.01)*squareSize, squareSize/8, squareSize/8)
        }
      }
      if(this.danger == 5){
        points++
        coinS.play()
        this.danger = 0
      }
    }
  }
  update(){
    if(random(0, 1) < this.chance && this.danger > 0 && this.danger <= 3){
      this.danger--
    }
    if(place == this.number && this.danger > 0 && this.danger < 5){
      lives--
      if(lives == 0){
        buzzerS.play()
      }
      else{
        hitS.play()
      }
      alternate = 50
    }
  }
}
