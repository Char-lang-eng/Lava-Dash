let state = 1
let square = []
let tick = Date.now()
let squareSize
let place = 0
let velocity = 1
let difficulty = 50
let round = 0
let lives = 4
let alternate = 0
let count = 0
let points = 0

let buzzerS
let mineS
let hitS
let coinS
let whooshS

let guyI
let danger0I
function preload(){
  buzzerS = loadSound("")
  mineS = loadSound("https://cdn.glitch.global/6ef1970c-3ffc-4c71-a129-ea1927162da4/notification-sound-7062.mp3?v=1711666091596")
  hitS = loadSound("https://cdn.glitch.global/6ef1970c-3ffc-4c71-a129-ea1927162da4/bullet-impacting-body-gamemaster-audio-2-2-00-00.mp3?v=1711666380873")
  coinS = loadSound("https://cdn.glitch.global/6ef1970c-3ffc-4c71-a129-ea1927162da4/video-game-bonus-wooden-chime-gamemaster-audio-1-00-00.mp3?v=1711666937325")
  whooshS = loadSound("https://cdn.glitch.global/6ef1970c-3ffc-4c71-a129-ea1927162da4/notification-whoosh-boom-the-foundation-1-00-04.mp3?v=1711721727080")
  
  guyI = loadImage("https://cdn.glitch.global/6ef1970c-3ffc-4c71-a129-ea1927162da4/New%20Piskel%20(1).gif?v=1713874051760")
  dangI = loadImage("floor-0.png")
  dangiI = loadImage("floor-1.png")
  dangiiI = loadImage("floor-2.png")
  dangiiiI = loadImage("floor-3.png")
  spikesI = loadImage("floor-4")
  starI = loadImage("floor-5")
}
function setup(){
  coinS.setVolume(0.25)
  createCanvas(windowWidth, windowHeight)
  squareSize = min(width, height*0.8)
  for(let i = 0; i < 100; i++){
    square[i] = new Square(i)
  }
}
function draw(){
  if(state == 0){
    background(255)
    fill(0, 255, 0)
    for(i=0; i<4; i++){
      if(lives == i){
        fill(100, 0, 0)
      }
      rect((0.4+0.125*i)*squareSize, 0.85*height, 0.125*squareSize, 0.05*height, 10)
    }
    fill(0)
    rect(0.1*squareSize, 0.95*height, 0.8*squareSize, 0.02*height, 10)
    fill(0, 0, 200)
    rect(0.1*squareSize, 0.95*height, 0.8*squareSize*((difficulty+1)/60), 0.02*height, 10)
    if(lives >= 1 || alternate > 0){
      textAlign(LEFT, CENTER)
      textSize(0.04*height)
      fill(0)
      text("Score: "+points, 0.1*squareSize, 0.875*height)
      count = 0
      for(let i = 0; i<100; i++){
        square[i].draw();
        if(square[i].danger == 5){
          count++
        }
      }
      while(count < min(round, 5)){
        square[floor(random(0, 100))].danger = 5
        count++
      }
      if(Date.now() > tick+500 && lives >=1){
        tick = Date.now()
        if(place%10 == 0 && velocity == -1){
          lives = 1
          velocity = 0
          alternate = 50
        }
        if(place%10 == 9 && velocity == 1){
          lives = 1
          velocity = 0
          alternate = 50
        }
        if(floor(place/10) == 0 && velocity == -10){
          lives = 1
          velocity = 0
          alternate = 50
        }
        if(floor(place/10) == 9 && velocity == 10){
          lives = 1
          velocity = 0
          alternate = 50
        }
        difficulty++
        square[place].danger = 3
        place = place+velocity
        square[place].chance /= 1.4
        if(difficulty >= 60){
          for(i = 0; i<5; i++){
            square[floor(random(0, 100))].danger = 4
          }
          if(square[place].danger == 4){
            square[place].danger = 0
          }
          difficulty = 0
          round++
          mineS.play()
        }
        for(let i = 0; i<100; i++){
          square[i].update()
        }
      }
      if(alternate > 0){
        alternate--
      }
    }
    if(lives < 1 && alternate <= 25){
      fill(0, 0, 0, 255-10*alternate)
      rect(0, 0, squareSize, squareSize)
      if(alternate > 0){
        alternate-= 0.25
      }
      else{
        fill(0)
        rect(0, 0, squareSize, squareSize)
        fill(255)
        textSize(0.1*squareSize)
        textAlign(CENTER, CENTER)
        text("Score: "+points, 0.5*squareSize, 0.5*squareSize)
      }
    }
  }
  if(state == 1){
    background(255)
    fill(0, 255, 0)
    for(i=0; i<4; i++){
      if(lives == i){
        fill(100, 0, 0)
      }
      rect((0.4+0.125*i)*squareSize, 0.85*height, 0.125*squareSize, 0.05*height, 10)
    }
    for(let i = 0; i<100; i++){
      square[i].draw()
    }
  }
}
function keyPressed(){
  if(state == 0){
    if(key == "w" || key == "W" || key == "ArrowUp"){
      velocity = -10
    }
    if(key == "s" || key == "S" || key == "ArrowDown"){
      velocity = 10
    }
    if(key == "d" || key == "D" || key == "ArrowRight"){
      velocity = 1
    }
    if(key == "a" || key == "A" || key == "ArrowLeft"){
      velocity = -1
    }
    if(lives == 0 && alternate < 1){
      lives = 4
      for(let i = 0; i < 100; i++){
        square[i].chance = 0.3
        square[i].danger = 0
      }
      difficulty = 50
      round = 0
      place = 0
      velocity = 1
      points = 0
      tick = Date.now()
      whooshS.play()
    }
  }
  if(state == 1){
    state = 0
    lives = 4
    for(let i = 0; i < 100; i++){
      square[i].chance = 0.3
      square[i].danger = 0
    }
    difficulty = 50
    round = 0
    place = 0
    velocity = 1
    points = 0
    tick = Date.now()
    whooshS.play()
  }
}
