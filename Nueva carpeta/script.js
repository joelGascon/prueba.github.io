//VARIABLES GLOBALES
let sequence = []; //SECUENCIA GENERADA POR EL JUEGO
let playerSequence = []; //SECUENCIA INGRESADA POR EL JUGADOR
let colors = ["red", "green", "blue", "yellow"];
let currentScore = 0;
let highScore = localStorage.getItem("highScore") || 0;
let playerName = "";

//ELEMENTOS DEL DOM
const startButton = document.getElementById("start-game");
const restartButton = document.getElementById("restart-game");
const gameBoard = document.getElementById("game-board");
const scoreBoard = document.getElementById("scoreboard");
const nameInput = document.getElementById("name-input");
const playerNameInput = document.getElementById("player-name");
const currentScoreDisplay = document.getElementById("current-score");
const highScoreDisplay = document.getElementById("high.score");

//MOSTRAR EL MEJOR PUNTAJE GUARDADO
highScoreDisplay.textContent = highScore;

//FUNCIÓN PARA EMPEZAR JUEGO
startButton.addEventListener("click", () => {
    console.log("Botón de inicio presionado");
    if (playerNameInput.value.trim() === ""){
        alert("Por favor, ingrese su nombre.");
        return;
    }
    playerName = playerNameInput.value;
    sequence = [];
    playerSequence = [];
    currentScore = 0;
    currentScoreDisplay.textContent = currentScore;
    nameInput.classList.add("hidden");
    gameBoard.classList.remove("hidden");
    scoreBoard.classList.remove("hidden");
    nextRound();
});

//FUNCIÓN PARA GENERAR EL SIGUIENTE COLOR EN LA SECUENCIA
function nextRound() {
    playerSequence = [];
    sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    playSequence();
}

//FUNCIÓN PARA REPRODUCIR LA SECUENCIA VISUALMENTE
function playSequence() {
    let i = 0;
    const interval = setInterval(()=> {
        if (i >= sequence.length) {
            clearInterval(interval);
            return;
        }
        activateButton(sequence[i]);
        i ++; 
    }, 800);
}

//FUNCIÓN PARA ILUMINAR EL BOTÓN
function activateButton(color) {
    const button = document.getElementById(color);
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 400);
}

//FUNCIÓN PARA MANEJAR LA ENTRADA DEL JUGADOR
document.querySelectorAll(".color-button").forEach(button => {
    button.addEventListener("click", (event) => {
        const clickedColor = event.target.id;
        playerSequence.push(clickedColor);
        activateButton(clickedColor);

        //VERIFICAR ENTRADA JUGADOR
        checkPlayerInput();
    });
});

//FUNCIÓN PARA VERIFICAR SI EL JUGADOR SIGUE LA SECUENCIA CORRECTAMENTE
function checkPlayerInput() {
    let index = playSequence.length - 1;
    if (playerSequence[index] !== sequence[index]) {
        endGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        currentScore++;
        currentScoreDisplay.textContent = currentScore;
        setTimeout(nextRound, 1000);
    }
}

//FUNCIÓN PARA TERMINAR EL JUEGO
function endGame() {
    alert("Juego terminado, ${playerName}. Tu puntaje fue: ${currentScore}");

    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem("highScore" , highScore);
        highScoreDisplay.textContent = highScore;

    }
    gameBoard.classList.add("hidden");
    nameInput.classList.remove("hidden");
}

//BOTÓN DE REINICIO
restartButton.addEventListener("click", () => {
    location.reload();
});