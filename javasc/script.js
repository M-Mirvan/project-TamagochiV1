let hunger = 100;
let sleep = 100;
let joy = 100;
let gameOver = false;

function start_game() {
    document.getElementById("hunger").textContent = hunger;
    document.getElementById("sleep").textContent = sleep;
    document.getElementById("joy").textContent = joy;
    updateChat();
    updateVisuals();
}

// events btn
document.getElementById("hungerBtn").addEventListener("click", () => {
    if (gameOver) return;
    hunger = Math.min(hunger + 20, 100);
    start_game();
});

document.getElementById("sleepBtn").addEventListener("click", () => {
    if (gameOver) return;
    sleep = Math.min(sleep + 20, 100);
    start_game();
});

document.getElementById("joyBtn").addEventListener("click", () => {
    if (gameOver) return;
    joy = Math.min(joy + 20, 100);
    start_game();
});

// Updates character image & background
function updateVisuals() {
    const character = document.getElementById("character");
    const game = document.getElementById("game");

    // Reset 
    game.classList.remove("hungry", "sleepy", "sad");

    
    if (hunger < 90) {
        character.src = "../img/honger.png";
        
        game.classList.add("hungry");
    } else if (sleep < 80) {
        character.src = "../sleepy.png";
        game.classList.add("sleepy");
    } else if (joy < 70) {
        character.src = "../img/sad.png";
        game.classList.add("sad");
    } else {
        character.src = "../img/ei.png"; 
    }
}

// Death 
function tama_dood() {
    if (hunger <= 0 || sleep <= 0 || joy <= 0) {
        gameOver = true;
        document.getElementById("character").src = "../img/OIP.jpg";
        if (confirm("Je tama is dood. Resetten?")) {
            reset();
        }
    }
}

function decrease_values() {
    if (gameOver) return;
    hunger--;
    sleep--;
    joy--;
    tama_dood();
    start_game();
}

// Reset 
function reset() {
    hunger = 100;
    sleep = 100;
    joy = 100;
    gameOver = false;
    start_game();
}

// loop
start_game();
setInterval(decrease_values, 1000);

//chat 
function updateChat() {
    const chat = document.getElementById("chat");

    if (hunger < 20) {
        chat.textContent = "I'm starving 😫 please feed me!";
    } else if (hunger < 90) {
        chat.textContent = "You should eat 🍎";
    } else if (sleep < 20) {
        chat.textContent = "I'm so tired 😴";
    } else if (joy < 20) {
        chat.textContent = "I'm bored 😢 play with me!";
    } else {
        chat.textContent = "I'm feeling great 😊";
    }
}
