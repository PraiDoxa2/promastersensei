var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var dino = {
  x: 50,
  y: 250,
  jump: false,
  speed: 0,
  gravity: 0.5,
  height: 50,
  width: 50,
  draw: function() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  jumpAction: function() {
    this.jump = true;
    this.speed = -12;
  },
  update: function() {
    if (this.jump) {
      this.y += this.speed;
      this.speed += this.gravity;
      if (this.y >= 250) {
        this.y = 250;
        this.jump = false;
        this.speed = 0;
      }
    }
  }
};

var cactus = {
  x: 800,
  y: 250,
  speed: 5,
  width: 50,
  height: 50,
  draw: function() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  update: function() {
    this.x -= this.speed;
    if (this.x < -50) {
      this.x = 800;
    }
  }
};

var score = 0;

function drawScore() {
  ctx.fillStyle = "#000000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 700, 50);
}

function checkCollision() {
  var cactusLeft = cactus.x;
  var cactusRight = cactus.x + cactus.width;
  var cactusTop = cactus.y;
  var cactusBottom = cactus.y + cactus.height;

  var dinoLeft = dino.x;
  var dinoRight = dino.x + dino.width;
  var dinoTop = dino.y;
  var dinoBottom = dino.y + dino.height;

  if (cactusRight > dinoLeft && cactusLeft < dinoRight && cactusBottom > dinoTop && cactusTop < dinoBottom) {
    return true;
  }

  return false;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dino.draw();
  dino.update();

  cactus.draw();
  cactus.update();

  drawScore();

  if (checkCollision()) {
    alert("Game Over! Your score: " + score);
    location.reload();
  }

  score++;

  setTimeout(gameLoop, 20);
}

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 32) {
    dino.jumpAction();
  }
});

gameLoop();
