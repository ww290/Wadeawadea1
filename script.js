const car = document.getElementById("car");
const rock = document.getElementById("rock");
const timerElement = document.getElementById("timer");
const carSound = document.getElementById("carSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const winScreen = document.getElementById("winScreen");
const loseScreen = document.getElementById("loseScreen");
const restartBtn = document.getElementById("restartBtn");

let carPosition = window.innerWidth / 2;
let isGameOver = false;
let rockSpeed = 6; // سرعة الحجارة زادت

// تحريك السيارة باللمس
document.getElementById("gameContainer").addEventListener("touchmove", (e) => {
  const touchX = e.touches[0].clientX;
  carPosition = touchX;
  car.style.left = `${carPosition}px`;
});

// بدء صوت السيارة عند أول لمسة
let carSoundStarted = false;
function startCarSound() {
  if (!carSoundStarted) {
    carSound.play().catch(() => {});
    carSoundStarted = true;
  }
}

// تحريك الحجر
let rockY = -100;
function moveRock() {
  if (isGameOver) return;
  rockY += rockSpeed;
  rock.style.top = rockY + "px";

  // إعادة تعيين موقع الحجر عند تجاوزه أسفل الشاشة
  if (rockY > window.innerHeight) {
    rockY = -100;
    rock.style.left = Math.random() * (window.innerWidth - 50) + "px";
  }

  // الكشف عن التصادم
  const carRect = car.getBoundingClientRect();
  const rockRect = rock.getBoundingClientRect();
  if (
    carRect.left < rockRect.right &&
    carRect.right > rockRect.left &&
    carRect.top < rockRect.bottom &&
    carRect.bottom > rockRect.top
  ) {
    endGame(false);
  }

  requestAnimationFrame(moveRock);
}

// المؤقت
let timeLeft = 60;
const countdown = setInterval(() => {
  if (isGameOver) return;
  timeLeft--;
  timerElement.textContent = "الوقت: " + timeLeft;
  if (timeLeft <= 0) {
    clearInterval(countdown);
    endGame(true);
  }
}, 1000);

// إنهاء اللعبة
function endGame(win) {
  isGameOver = true;
  if (win) {
    winScreen.style.display = "block";
    winSound.play();
  } else {
    loseScreen.style.display = "block";
    loseSound.play();
  }
  restartBtn.style.display = "block";
  carSound.pause();
}

// بدء اللعبة
moveRock();