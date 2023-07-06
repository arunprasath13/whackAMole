let scoreMark = document.getElementById("score");
let timeleft = document.getElementById("timeLeft");
let startBtn = document.getElementById("startNewGame");
let pauseBtn = document.getElementById("pauseGame");
let squares = document.querySelectorAll(".square");
let score = 0;
let hitPosition = 0;
let countRem = 60;
let whackMole = null;
let timerId = null;

function countDown() {
  timeleft.innerText = `Time Left : ${countRem--}`;
  if (countRem < 0) {
    clearInterval(whackMole);
    clearInterval(timerId);
  }
}

function randomMole() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
}
randomMole();

function pauseFunc() {
  if (pauseBtn.textContent === "Pause") {
    clearInterval(randomMole);
    clearInterval(countDown);
  }
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (timerId != null) {
      if (square.id === hitPosition) {
        score++;
        scoreMark.innerText = `Your Score is ${score}`;
        hitPosition = null;
      }
    }
  });
});

function startGame() {
  score = 0;
  timeleft = 60;
  whackMole = setInterval(randomMole, 1000);
  timerId = setInterval(countDown, 100);
}

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseFunc);
