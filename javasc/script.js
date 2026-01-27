let stats = {
    hunger: 100,
    sleep: 100,
    joy: 100
};

let gameOver = false;

/* ================= IMGES ================= */

const images = {
    normal: "/img/ei.png",
    hungry: "/img/ei honger.png",
    sleepy: "/img/happey.jpg",
    sad: "/img/sad.png",
    dead: "/img/OIP.jpg"
};

/* ================= START GAME ================= */

function start_game() {
    document.getElementById("hunger").textContent = stats.hunger;
    document.getElementById("sleep").textContent = stats.sleep;
    document.getElementById("joy").textContent = stats.joy;

    updateBars();
    updateChat();
    updateVisuals();
}


/* ================= BUTTON EVENTS ================= */

document.getElementById("hungerBtn").addEventListener("click", () => {
    if (gameOver) return;
    stats.hunger = Math.min(stats.hunger + 20, 100);
    stats.joy -= 12;
    start_game();
});

document.getElementById("sleepBtn").addEventListener("click", () => {
    if (gameOver) return;
    stats.sleep = Math.min(stats.sleep + 20, 100);
    stats.joy -= 5;
    stats.hunger -= 6;
    start_game();
});

document.getElementById("joyBtn").addEventListener("click", () => {
    if (gameOver) return;
    stats.joy = Math.min(stats.joy + 20, 100);
    stats.sleep -= 7;
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

    hungerBar.style.width = stats.hunger + "%";
    sleepBar.style.width = stats.sleep + "%";
    joyBar.style.width = stats.joy + "%";

    hungerBar.style.backgroundColor = stats.hunger < 30 ? "red" : "blue";
    sleepBar.style.backgroundColor = stats.sleep < 30 ? "red" : "purple";
    joyBar.style.backgroundColor = stats.joy < 30 ? "red" : "gold";
}



/* ================= VISUAL STATES ================= */

function updateVisuals() {
    const character = document.getElementById("character");
    const game = document.getElementById("game");

    game.classList.remove("hungry", "sleepy", "sad");

    if (stats.hunger < 60) {
        character.src = images.hungry;
        game.classList.add("hungry");
    } 
    else if (stats.sleep < 50) {
        character.src = images.sleepy;
        game.classList.add("sleepy");
    } 
    else if (stats.joy < 80) {
        character.src = images.sad;
        game.classList.add("sad");
    } 
    else {
        character.src = images.normal;
    }
}


/* ================= DEATH ================= */

function tama_dood() {
    if (stats.hunger <= 0 || stats.sleep <= 0 || stats.joy <= 0) {
        gameOver = true;
        document.getElementById("character").src = images.dead;

        if (confirm("damm bro, volgende keer beter")) {
            reset();
        }
    }
}

/* ================= DECREASE OVER TIME ================= */

function decrease_values() {
    if (gameOver) return;

    stats.hunger = Math.max(stats.hunger - 5, 0);
    stats.sleep = Math.max(stats.sleep - 2, 0);
    stats.joy = Math.max(stats.joy - 4, 0);

    tama_dood();
    start_game();
}


/* ================= RESET ================= */

function reset() {
    stats.hunger = 100;
    stats.sleep = 100;
    stats.joy = 100;
    gameOver = false;
    start_game();
}

/* ================= CHAT ================= */

function updateChat() {
    const chat = document.getElementById("chat");

    if (hunger < 60) {
        chat.textContent = "I'm hungry 😭";
        
    } 
    else if (sleep < 50) {
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
