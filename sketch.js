var canvas, ground;
var backgroundImage, bgImg, red, blue, green, pink;
var database, gameState;
var form, player, playerCount;
var allPlayers, box1, box2;
var boxes = [];
var platformimg, mplatformimg, spikeimg, speedImage, laserpwrimg, laser;
var platformGroup, mplatformGroup, spikeGroup, speedGroup, laserpwrGroup, laserGroup;

//BP
function preload() {
  backgroundImage = loadImage("./assets/background.png");
  blue = loadImage("./assets/blue.png");
  red = loadImage("./assets/red.png");
  green = loadImage("./assets/green.png");
  pink = loadImage("./assets/pink.png");
  platformimg = loadImage("./assets/platform.png");
  mplatformimg = loadImage("./assets/moving.png");
  spikeimg = loadImage("./assets/spike.png");
  speedImage = loadImage("./assets/speed.png");
  coinImage = loadImage("./assets/coin.png");
  laserpwrimg = loadImage("./assets/coin.png");
  laser = loadImage("./assets/bomb.png");
  }

//BP
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
 console.log(box1.y);
}

//BP
function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}