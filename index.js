// A Class for a Button
class Button {
  constructor(x_, y_, t_) {
    // Location and text content
    this.x = x_;
    this.y = y_;
    this.t = t_;
  }
  // Is a point inside the button?
  contains(mx, my) {
    return mx >= this.x - + textWidth(this.t) / 2 && mx <= this.x + textWidth(this.t) / 2 &&
      my >= this.y - 16 && my <= this.y + 16;
  }

  // Show the text
  display(mx, my) {
    this.x = mx;
    this.y = my;

    fill("black");
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Start!", this.x, this.y);
  }
}

let backtrack, drum;
let shapes = ["circle", "square"];

function preload() {
  colors = loadJSON("/media/color-palette.json");
  backtrack = loadSound("/media/backtrack.mp3");
  drum = loadSound("/media/drum.mp3");
}

let x, y, button, backgroundColor, curStroke;
let gameStart = false;

// Create a new canvas to the browser size
function setup() {
  createCanvas(windowWidth, windowHeight);

  strokeWeight(10);
  rectMode(CENTER);
  x = width / 2;
  y = height / 2;

  //set styles for the start buttom
  button = new Button(x, y, "Start!");

  curStroke = 0;

  frameRate(20);

  //sound files set up
  backtrack.setVolume(2);
  backgroundColor = random(colors.list);
}

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let repeats, shape, shapeColor;
let drawActive = false;

function mousePressed () {
  if (button.contains(mouseX, mouseY) && !gameStart) {
    console.log("contains");
    gameStart = true;
    backtrack.play();
  } else {
    console.log("not contains");
  }
  if (gameStart) {
    if (curStroke != 0) {
      drum.play();

      //draw random numbers of random shapes
      repeats = random(5, 21)
      shape = random(shapes);
      shapeColor = random(colors.list);

      // make sure shapes are visible
      if (shapeColor === backgroundColor) {
        shapeColor = random(colors.list);
      }
      stroke(shapeColor);

      drawActive = true;
      setTimeout(function() {
        drawActive = false;
      }, 2000);
    }
    curStroke++;
  }
}

function draw() {
  if (curStroke > 6) {
    backgroundColor = random(colors.list);
    curStroke = 1;
  }

  // Fill in the background
  background(backgroundColor);

  if (!gameStart) {
    button.display(width/2, height/2);
  }

  if (drawActive) {
    noFill();
    // Find largest dimension
    const maxDim = max(width, height);

    for (let i = 0; i <= repeats; i++) {
      rotate(PI/12);
      if (shape === "circle") {
        ellipse(random(0, width), random(0, height), random(maxDim/20, maxDim/10));
      } else if (shape === "square") {
        //console.log("draw squares");
        rect(random(0, width), random(0, height), random(maxDim/20, maxDim/10));
      }
    }
  }
}