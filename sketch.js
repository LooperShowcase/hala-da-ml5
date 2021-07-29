let player;
let bgImage;
let playerImage;
let obstacleImage;
let obstacles = [];
let wordClassifier;
let score = 0;

function preload() {
  bgImage = loadImage("sky.jpg");
  playerImage = loadImage("player.png");
  obstacleImage = loadImage("obstacle.png");
  let options = { probabilityThreshold: 0.7 };
  wordClassifier = ml5.soundClassifier("SpeechCommands18w", options);
}

function setup() {
  createCanvas(1220, 620);
  player = new Player();
  wordClassifier.classify(heardWord);
}
function heardWord(errors, results) {
  let word = results[0].label;
  if (word === "up") {
    player.jump();
  }
  console.log(results[0].label, results[0].confidence);
}
function keyPressed() {
  if (key === " ") {
    player.jump();
    console.log("up");
  }
}
function draw() {
  if (random(1) < 0.009) {
    obstacles.push(new obstacle());
  }
  background(bgImage);

  for (let obs of obstacles) {
    obs.show();
    obs.move();
    if (player.collided(obs) === true) {
      console.log("GAME OVER");
      noLoop();
    }
    if (player.x >= obs.x) {
      score++;

      obstacles = obstacles.filter(function (el) {
        return el.x !== obs.x;
      });
    }
  }
  player.show();

  player.move();
  text(score, 10, 10);
}
