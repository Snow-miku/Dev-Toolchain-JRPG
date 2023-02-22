let battleMusic, winMusic, attackSound, goku, tom;

function preload() {
  colors = loadJSON("/media/color-palette.json");
  battleMusic = loadSound("/media/battle.mp3");
  winMusic = loadSound("/media/win.mp3");
  attackSound = loadSound("/media/attack.mp3");
  goku = loadImage("/media/goku.png");
  tom = loadImage("/media/tom.png");
  hit = loadImage("/media/hit.png");
}

const textSize = 50;
let x, y;
let startButton, attackButton, winPrompt;
let hpBar1, hpBar2, char1, char2, hp2;

// Create a new canvas to the browser size
function setup() {
  createCanvas(windowWidth, windowHeight);

  //get the center of the page
  x = width / 2;
  y = height / 2;

  //set the proper volume
  battleMusic.setVolume(0.1);
  attackSound.setVolume(0.2);
  winMusic.setVolume(0.3);

  startButton = new Sprite(x, y);
  startButton.textSize = textSize;
  startButton.text = "Start";
  startButton.w = textWidth("Start")*10;
  startButton.h = textSize * 1.5;
  startButton.textColor = colors.blue1;
  startButton.shapeColor = color(0, 0, 0, 0);
  startButton.strokeColor = colors.blue1;
  startButton.strokeWeight = 4;

  attackButton = new Sprite(x, y*1.7);
  attackButton.textSize = textSize;
  attackButton.text = "Attack!";
  attackButton.w = textWidth("Start")*10;
  attackButton.h = textSize * 1.5;
  attackButton.textColor = colors.blue1;
  attackButton.shapeColor = color(0, 0, 0, 0);
  attackButton.strokeColor = colors.blue1;
  attackButton.strokeWeight = 4;

  winPrompt = new Sprite();
  winPrompt.textSize = 100;
  winPrompt.text = "YOU WIN!!";
  winPrompt.textColor = colors.pink4;
  winPrompt.shapeColor = color(0, 0, 0, 0);
  winPrompt.strokeColor = color(0, 0, 0, 0);
  winPrompt.strokeWeight = 10;
  winPrompt.collider = "none"; // set the colliding space to zero
  winPrompt.depth = 10000;

  hpBar1 = genHealthBar();
  hpBar1.x = x * 0.5;
  hpBar2 = genHealthBar();
  hpBar2.x = x * 1.5;

  goku.resize(width/3, 0);
  char1 = genCharacter(goku);
  char1.x = x * 0.5;
  tom.resize(width/3.5, 0);
  char2 = genCharacter(tom);
  char2.x = x * 1.5;

  initGame();
}

let gameStarted = false; //the state of the game
let attackAllowed = false;

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //get the center of the page
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(colors.black);

  if (!gameStarted) {
    if (startButton.mouse.pressing()) {
      startButton.shapeColor = colors.grey;
    }
    if (startButton.mouse.released()) {
        startGame();
    }
    if (mouse.released()) {
      startButton.shapeColor = color(0, 0, 0, 0);
    }
  }
  if (gameStarted) {
    if (attackAllowed) {
      if (attackButton.mouse.pressing()) {
        attackButton.textColor = colors.pink4;
        attackButton.shapeColor = colors.pink4;
      }
      if (attackButton.mouse.released()) {
        attack();
      }
      if (mouse.released()) {
        attackButton.textColor = colors.blue1;
        attackButton.shapeColor = color(0, 0, 0, 0);
      }
    }
    if (hp2 <= 0) {
      winGame();
    }
  }
}

function startGame() {
  console.log("Game Started");
  gameStarted = true;
  battleMusic.loop();
  setTimeout(() => {attackAllowed = true}, 3800)

  //switch visibility
  startButton.visible = false;
  attackButton.visible = true;
  hpBar1.visible = true;
  hpBar2.visible = true;
  char1.visible = true;
  char2.visible = true;
}

function endGame() {
  console.log("Game Ended");
  gameStarted = false;
}

function attack() {
  console.log("Attacked!");
  attackSound.stop();
  attackSound.play();
  char2.changeImage("hit");
  setTimeout(() => {
    char2.changeImage("char");
  }, 100);
  hp2 -= 20;
}

function winGame() {
  console.log("YOU WIN!!");
  battleMusic.stop();
  winPrompt.visible = true;
  setTimeout(() => {
    winMusic.play();
  }, 1000);
  endGame();
  setTimeout(() => {
    initGame();
  }, 25000);
}

function initGame() {
  //switch visibility
  startButton.visible = true;
  attackButton.visible = false;
  winPrompt.visible = false;

  hpBar1.visible = false;
  hpBar2.visible = false;
  char1.visible = false;
  char2.visible = false;

  //switch game state
  gameStarted = false;

  //restroe character health;
  hp2 = 100;
}

//create Sprite object for health bars
function genHealthBar() {
  let hp = new Sprite();
  hp.shapeColor = colors.green1;
  hp.strokeColor = colors.pink1;
  hp.strokeWeight = 3;
  hp.y = y * 0.2;
  hp.h = 20;
  hp.width = x / 2;
  hp.collider = "none";
  hp.depth = 1;
  return hp;
}

//create Sprite object for health bars
function genCharacter(link) {
  let char = new Sprite(x, y, width/2);
  char.addImage("hit", hit);
  char.addImage("char", link);
  char.shapeColor = colors.green1;
  char.strokeColor = colors.pink1;
  char.strokeWeight = 3;
  char.h = 20;
  char.width = x / 2;
  char.collider = "none";
  char.depth = 0;
  return char;
}