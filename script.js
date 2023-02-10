// Constants for the game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const bird = new Image();
bird.src = 'bird.png';
const bg = new Image();
bg.src = 'background.png';
const fg = new Image();
fg.src = 'foreground.png';
const pipeNorth = new Image();
pipeNorth.src = 'pipeNorth.png';
const pipeSouth = new Image();
pipeSouth.src = 'pipeSouth.png';

// Variables for the game
let birdX = 10;
let birdY = 150;
let gravity = 1.0;
let score = 0;
let pipeDistance = 170;
let pipes = [];
pipes[0] = {
  x: canvas.width,
  y: 1,
};

// Functions for the game
function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipes.length; i++) {
    ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
    ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + pipeNorth.height + pipeDistance);
    pipes[i].x--;

    if (pipes[i].x == 125) {
      pipes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
      });
    }

    // Collision detection
    if (birdX + bird.width >= pipes[i].x && birdX <= pipes[i].x + pipeNorth.width && (birdY <= pipes[i].y + pipeNorth.height || birdY + bird.height >= pipes[i].y + pipeNorth.height + pipeDistance)) {
      location.reload();
    }

    if (pipes[i].x == 5) {
      score++;
    }
  }

  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(bird, birdX, birdY);
  birdY += gravity;

  ctx.fillStyle = '#000';
  ctx.font = '20px Verdana';
  ctx.fillText('Score: ' + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

// Event listeners for the game
document.addEventListener('keydown', function (event) {
  if (event.keyCode == 32) {
    birdY -= 50;
  }
});

bg.onload = draw;
