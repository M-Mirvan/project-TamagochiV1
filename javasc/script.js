let hunger = 100;
let sleep = 100;
let energy = 100;

let isDead = false;
let currentMood = "";
let gameLoop;

const hungerBar = document.getElementById("hunger-bar");
const sleepBar = document.getElementById("sleep-bar");
const energyBar = document.getElementById("energy-bar");

const petImg = document.getElementById("pet-img");

function updateBar(bar, value) {
  bar.style.width = value + "%";
}

function updatePetMood() {
  let newMood = "happy";

  if (hunger <= 0 || sleep <= 0 || energy <= 0) {
    newMood = "dead";
  } else if (sleep < 30 || hunger < 30) {
    newMood = "sad";
  }

  if (newMood === "dead") {
    petImg.src = "/img/OIP.png";
  } else if (newMood === "sad") {
    petImg.src = "/img/sad.png";
  } else {
    petImg.src = "/img/happey.jpg";
  }
}

function die() {
  isDead = true;
  clearInterval(gameLoop);

  petImg.src = "/img/OIP.png";
  document.getElementById("death-overlay").style.display = "flex";

  document.querySelectorAll("button").forEach(btn => {
    btn.disabled = true;
  });
}

// GAME LOOP
gameLoop = setInterval(() => {
  if (isDead) return;

  hunger = Math.max(0, hunger - 1);
  sleep = Math.max(0, sleep - 0.5);
  energy = Math.max(0, energy - 0.8);

  updateBar(hungerBar, hunger);
  updateBar(sleepBar, sleep);
  updateBar(energyBar, energy);

  updatePetMood();

  if (hunger === 0 || sleep === 0 || energy === 0) {
    die();
  }
}, 1000);

// BUTTONS
document.getElementById("eat-btn").onclick = () => {
  if (!isDead) hunger = Math.min(100, hunger + 30);
};

document.getElementById("sleep-btn").onclick = () => {
  if (!isDead) sleep = Math.min(100, sleep + 40);
};

document.getElementById("energy-btn").onclick = () => {
  if (!isDead) energy = Math.min(100, energy + 25);
};

// INITIAL DRAW
updateBar(hungerBar, hunger);
updateBar(sleepBar, sleep);
updateBar(energyBar, energy);
updatePetMood();
