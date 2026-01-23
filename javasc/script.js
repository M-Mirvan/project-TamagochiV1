let hunger = 100;
let sleep = 100;
let joy = 100;
let gameOver = false;

/* ================= START GAME ================= */

function start_game() {
    document.getElementById("hunger").textContent = hunger;
    document.getElementById("sleep").textContent = sleep;
    document.getElementById("joy").textContent = joy;

    updateBars();
    updateChat();
    updateVisuals();
}

/* ================= BUTTON EVENTS ================= */

document.getElementById("hungerBtn").addEventListener("click", () => {
    if (gameOver) return;
    hunger = Math.min(hunger + 20, 100);
    start_game();
});
document.getElementById("hungerBtn").addEventListener("click", () => {
    if (hunger) + "%";
    joy -= 12;
    start_game();
});

document.getElementById("sleepBtn").addEventListener("click", () => {
    if (gameOver) return;
    sleep = Math.min(sleep + 20, 100);
    start_game();
});

document.getElementById("sleepBtn").addEventListener("click", () => {
    if (sleep) + "%";
    joy -= 5;
    hunger -= 6;
    start_game();
});

document.getElementById("joyBtn").addEventListener("click", () => {
    if (gameOver) return;
    joy = Math.min(joy + 20, 100);
    start_game();
});
document.getElementById("joyBtn").addEventListener("click", () => {
    if (joy) + "%";
    sleep -= 7;
    start_game();
});

/* ================= AUDIO ================= */

const audio = new Audio("/audio/return-to-the-8-bit-past-301282.mp3");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    audio.play();
  });
});

/* ================= BARS ================= */

function updateBars() {
    const hungerBar = document.getElementById("hungerBar");
    const sleepBar = document.getElementById("sleepBar");
    const joyBar = document.getElementById("joyBar");

    hungerBar.style.width = hunger + "%";
    sleepBar.style.width = sleep + "%";
    joyBar.style.width = joy + "%";

    if (hunger < 30) {
        hungerBar.style.backgroundColor = "red";
    } else {
        hungerBar.style.backgroundColor = "blue";
    }

    if (sleep < 30) {
        sleepBar.style.backgroundColor = "red";
    } else {
        sleepBar.style.backgroundColor = "purple";
    }

    if (joy < 30) {
        joyBar.style.backgroundColor = "red";
    } else {
        joyBar.style.backgroundColor = "gold";
    }
}


/* ================= VISUAL STATES ================= */

function updateVisuals() {
    const character = document.getElementById("character");
    const game = document.getElementById("game");

    game.classList.remove("hungry", "sleepy", "sad");

    if (hunger < 30) {
        character.src = "/img/ei honger.png";
        game.classList.add("hungry");
    } 
    else if (sleep < 60) {
        character.src = "/img/happey.jpg";
        game.classList.add("sleepy");
    } 
    else if (joy < 80) {
        character.src = "/img/sad.png";
        game.classList.add("sad");
    } 
    else {
        character.src = "/img/ei.png";
    }
}

/* ================= DEATH ================= */

function tama_dood() {
    if (hunger <= 0 || sleep <= 0 || joy <= 0) {
        gameOver = true;
        document.getElementById("character").src = "/img/OIP.jpg";

        if (confirm("Your Tamagotchi died 😢 Reset?")) {
            reset();
        }
    }
}

/* ================= DECREASE OVER TIME ================= */

function decrease_values() {
    if (gameOver) return;

    hunger = Math.max(hunger - 5, 0);
    sleep = Math.max(sleep - 2, 0);
    joy = Math.max(joy - 4, 0);

    tama_dood();
    start_game();
}

/* ================= RESET ================= */

function reset() {
    hunger = 100;
    sleep = 100;
    joy = 100;
    gameOver = false;
    start_game();
}

/* ================= CHAT ================= */

function updateChat() {
    const chat = document.getElementById("chat");

    if (hunger < 30) {
        chat.textContent = "I'm hungry 😭";
    } 
    else if (sleep < 60) {
        chat.textContent = "I'm sleepy 😴";
    } 
    else if (joy < 80) {
        chat.textContent = "Play with me 😢";
    } 
    else {
        chat.textContent = "I'm happy 😊";
    }
}

/* ================= LOOP ================= */



start_game();
setInterval(decrease_values, 1000);
