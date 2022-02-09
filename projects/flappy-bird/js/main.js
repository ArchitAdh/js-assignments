//START PAGE

const playBtn = document.getElementById("play");
const startBtn = document.querySelector(".main-menu");
const game = document.querySelector(".game");
const start = document.querySelector(".start");

//obstacle speed, repeat and gravity
var repeat = 140;
var speed = 3;
var gravity = 3;

//obstacle class
var obstacleClass = ["obstacle", "pipe-1"];

//open game menu
playBtn.addEventListener("click", () => {
  game.style.display = "flex";
  start.style.display = "none";
});

//go back to start menu
startBtn.addEventListener("click", () => {
  game.style.display = "none";
  start.style.display = "block";
});

// choose birds
document.querySelector(".choose--bird").addEventListener("click", (e) => {
  const target = e.target.className;
  const bird = document.querySelector(".bird");
  const birdConfig = document.querySelector(".config-bird-img");
  if (target === "bird1") {
    bird.style.backgroundImage = "url('../img/bird1.png')";
    birdConfig.src = "/img/bird1.png";
  }
  if (target === "bird2") {
    bird.style.backgroundImage = "url('../img/bird2.png')";
    birdConfig.src = "/img/bird2.png";
  }
  if (target === "bird3") {
    bird.style.backgroundImage = "url('../img/bird3.png')";
    birdConfig.src = "/img/bird3.png";
  }
});

// choose pipes
document.querySelector(".choose--pipe").addEventListener("click", (e) => {
  const target = e.target.className;
  const pipeConfig = document.querySelector(".config-pipe-img");

  if (target === "pipe1") {
    obstacleClass = ["obstacle", "pipe-1"];
    pipeConfig.src = "/img/pipe1.png";
  }
  if (target === "pipe2") {
    obstacleClass = ["obstacle", "pipe-2"];
    pipeConfig.src = "/img/pipe2.png";
  }
  if (target === "pipe3") {
    obstacleClass = ["obstacle", "pipe-3"];
    pipeConfig.src = "/img/pipe3.png";
  }
});

//Choose level
document.querySelector(".choose--level").addEventListener("click", (e) => {
  const target = e.target.className;
  const groundSpeed = document.querySelector(".ground-container");
  const levelConfig = document.querySelector(".config-level-img");

  if (target === "easy") {
    repeat = 140;
    speed = 3;
    groundSpeed.style.width = "650px";
    levelConfig.src = "/img/easy.png";
  }
  if (target === "med") {
    repeat = 60;
    speed = 6;
    gravity = 3.4;
    groundSpeed.style.width = "750px";
    levelConfig.src = "/img/med.png";
  }
  if (target === "hard") {
    repeat = 40;
    speed = 8;
    gravity = 3.8;
    groundSpeed.style.width = "850px";
    levelConfig.src = "/img/hard.png";
  }
});

// GAME PAGE

class Game {
  constructor() {
    this.bird = document.querySelector(".bird");
    this.sky = document.querySelector(".sky");
    this.ground = document.querySelector(".ground-moving");
    this.groundContainer = document.querySelector(".ground-container");
    this.gameWindow = document.querySelector(".game-container");
    this.addScore = this.gameWindow.querySelector(".addScore");
    this.LeaderBoardUI = document.querySelector(".leaderboard");

    this.formUI = this.LeaderBoardUI.querySelector("form");

    this.isGameOver = true;
  }

  initializeGame() {
    //remove obstacle if present (for restart)
    if (this.obstacles) {
      this.obstacles.forEach((obstacle) => obstacle.removeObstacles());
    }

    this.birdLeft = 200;
    this.birdBottom = 220;
    this.gravity = gravity;
    this.isGameOver = false;
    this.frames = 0;
    this.gameId;
    this.obstacles = [];
    this.score = 0;
    this.ground.style.width = "auto";
  }

  startGame = () => {
    this.updateBird();

    //end game if collision
    this.obstacles.forEach((obstacle) => {
      if (
        obstacle.didCollideWithBird({ x: this.birdLeft, y: this.birdBottom })
      ) {
        this.endGame();
        this.addToLeaderBoard();
      }
    });

    //generate obstacle in every 140 * 20ms
    if (this.frames % repeat === 0) {
      this.generateObstacle();
    }

    this.obstacles.forEach((obstacle) => {
      obstacle.update();

      //display score
      if (this.birdLeft > obstacle.x + 60 && !obstacle.counted) {
        this.score++;
        obstacle.counted = true;
      }
    });

    this.gameWindow.querySelector(".score").innerHTML = this.score;

    //increase frames by 1 every 20ms
    this.frames++;

    if (this.isGameOver) {
      return;
    }

    this.gameId = setTimeout(this.startGame, 20);
  };

  updateBird() {
    this.birdBottom -= this.gravity;
    this.bird.style.bottom = this.birdBottom + "px";
    this.bird.style.left = this.birdLeft + "px";
  }

  generateObstacle() {
    const obstacle = new Obstacle();
    obstacle.addToContainer(this.gameWindow);
    this.obstacles.push(obstacle);
  }

  endGame() {
    this.isGameOver = true;
    clearTimeout(this.gameId);
    this.bird.style.bottom = 0;
    //stops moving ground
    this.ground.style.width = "500px";
  }

  jump = (e) => {
    if (e.key === " ") {
      if (
        this.isGameOver &&
        document.getElementById("name") !== document.activeElement
      ) {
        this.initializeGame();
        this.startGame();
        this.addScore.style.display = "none";
        this.formUI.style.display = "none";
        return;
      }
      this.birdBottom += 50;
    }
  };

  addKeyEvent() {
    document.addEventListener("keydown", this.jump);
  }

  addToLeaderBoard() {
    if (this.isGameOver) {
      this.addScore.style.display = "block";
      //when clicked on add to leader board
      this.addScore.addEventListener("click", () => {
        this.addScore.style.display = "none";
        this.formUI.style.display = "block";
        this.formUI.querySelector(".name").focus();
        //when submitted do following
        this.formUI.addEventListener(
          "submit",
          this.displayScore.bind(event, this.score)
        );
      });
    }
  }

  displayScore = () => {
    event.preventDefault();
    const name = document.querySelector(".name");
    const score = this.score;

    if (name.value == "") {
      return;
    } else if (this.score !== " " && name.value !== " ") {
      //add score to UI
      const ui = new UI();
      ui.addScore(name.value, score);

      //Add score to ls
      Store.addScore(name.value, score);

      name.value = " ";
      this.score = " ";
    }
  };
}

class UI {
  constructor() {
    this.formUI = document.querySelector("form");
    this.nameListUI = document.getElementById("name-list");
  }
  addScore(name, score) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${name}</td>
    <td>${score}</td>
    <td><a href="#" class="delete">X<a></td>
    `;
    this.nameListUI.appendChild(row);
    this.formUI.style.display = "none";
  }

  removeScore(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

// Local Storage Class
class Store {
  //storing all scores in an array
  static getScores() {
    let scores;
    if (localStorage.getItem("scores") === null) {
      scores = [];
    } else {
      scores = JSON.parse(localStorage.getItem("scores"));
    }

    return scores;
  }

  static displayScores() {
    const scores = Store.getScores();
    scores.forEach((score) => {
      const ui = new UI();

      //Add score to ui
      ui.addScore(score.name, score.score);
    });
  }

  static addScore(name, score) {
    let data = {
      name: name,
      score: score,
    };

    const scores = Store.getScores();
    scores.push(data);
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  static removeScore(name) {
    const scores = Store.getScores();

    scores.forEach((score, index) => {
      if (score.name === name) {
        scores.splice(index, 1);
      }
    });

    localStorage.setItem("scores", JSON.stringify(scores));
  }
}

class Obstacle {
  constructor() {
    this.dx = speed;
    this.gap = 370;
    this.topObstacle = this.getNewTopObstacle();
    this.bottomObstacle = this.getNewBottomObstacle();
    this.counted = false;
  }

  getNewTopObstacle() {
    const obstacle = this.createObstacle();
    this.styleTopObstacle(obstacle);
    return obstacle;
  }

  getNewBottomObstacle() {
    const obstacle = this.createObstacle();
    this.styleBottomObstacle(obstacle);
    return obstacle;
  }

  createObstacle() {
    const maxHeight = 70;
    const direction = Math.random() >= 0.5 ? 1 : -1;

    const obstacle = document.createElement("div");

    this.x = 500;
    this.y = Math.ceil(Math.random() * maxHeight) * direction;

    obstacle.classList.add(...obstacleClass);

    return obstacle;
  }

  styleTopObstacle(obstacle) {
    obstacle.style.bottom = appendPx(this.y + this.gap);
    obstacle.style.left = appendPx(this.x);
    obstacle.classList.add("obstacle--top");
  }

  styleBottomObstacle(obstacle) {
    obstacle.style.bottom = appendPx(this.y);
    obstacle.style.left = appendPx(this.x);
  }

  updateObstaclePosition(obstacle, x, y) {
    obstacle.style.left = appendPx(x);
    obstacle.style.bottom = appendPx(y);
  }

  update() {
    this.x -= this.dx;
    this.updateObstaclePosition(this.topObstacle, this.x, this.y + this.gap);
    this.updateObstaclePosition(this.bottomObstacle, this.x, this.y);

    if (this.x < -60) {
      this.removeFromContainer();
    }
  }

  addToContainer(container) {
    container.appendChild(this.topObstacle);
    container.appendChild(this.bottomObstacle);
  }

  removeFromContainer() {
    if (this.x >= -60) {
      return;
    }

    this.removeObstacles();
  }

  removeObstacles() {
    this.topObstacle.remove();
    this.bottomObstacle.remove();
  }

  didCollideWithBird(bird) {
    if (
      bird.y < 1 ||
      (this.x < 249 &&
        this.x > 141 &&
        bird.x === 200 &&
        (bird.y < this.y + 170 || bird.y > this.y + this.gap - 122))
    ) {
      return true;
    }
    return false;
  }
}

function appendPx(number) {
  return `${number}px`;
}

//add space bar functions
const newGame = new Game();
newGame.addKeyEvent();

//display score from ls
Store.displayScores();

//Remove Score
document.getElementById("name-list").addEventListener("click", (e) => {
  //Remove from ui
  const ui = new UI();
  ui.removeScore(e.target);

  //Remove from Local storage
  //accessing the name in leaderboard
  Store.removeScore(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent
  );

  e.preventDefault();
});
