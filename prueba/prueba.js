const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let playerSequence = [];
let score = 0;
const playerNameInput = document.getElementById('playerName');
const startBtn = document.getElementById('startBtn');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const scoreboard = document.getElementById('scoreboard');

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

function startGame() {
    const playerName = playerNameInput.value;
    if (playerName) {
        score = 0;
        sequence = [];
        playerSequence = [];
        nextRound();
        updateHighScore();
        displayScoreboard();
    } else {
        alert('Por favor, ingresa tu nombre.');
    }
}

function nextRound() {
    playerSequence = [];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    showSequence();
}

function showSequence() {
    let index = 0;
    const interval = setInterval(() => {
        if (index >= sequence.length) {
            clearInterval(interval);
            enablePlayerInput();
            return;
        }
        const color = sequence[index];
        highlightButton(color);
        index++;
    }, 1000);
}

function highlightButton(color) {
    const button = document.getElementById(color);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 500);
}

function enablePlayerInput() {
    colors.forEach(color => {
        document.getElementById(color).addEventListener('click', playerClick);
    });
}

function playerClick(event) {
    const color = event.target.id;
    playerSequence.push(color);
    highlightButton(color);
    checkPlayerInput();
}

function checkPlayerInput() {
    const lastIndex = playerSequence.length - 1;
    if (playerSequence[lastIndex] !== sequence[lastIndex]) {
        alert('Juego Terminado');
        saveScore();
        restartBtn.style.display = 'block';
        return;
    }
    if (playerSequence.length === sequence.length) {
        score++;
        scoreDisplay.textContent = score;
        setTimeout(nextRound, 1000);
    }
}

function saveScore() {
    const playerName = playerNameInput.value;
    const storedScores = JSON.parse(localStorage.getItem('scores')) || {};
    storedScores[playerName] = Math.max(storedScores[playerName] || 0, score);
    localStorage.setItem('scores', JSON.stringify(storedScores));
    displayScoreboard();
}

function displayScoreboard() {
    const storedScores = JSON.parse(localStorage.getItem('scores')) || {};
    const scoreboardList = Object.entries(storedScores)
        .map(([name, score]) => `<li>${name}: ${score}</li>`)
        .join('');
    scoreboard.innerHTML = `<h2>Tabla de Puntajes</h2><ul>${scoreboardList}</ul>`;
    scoreboard.style.display = 'block';
}

function restartGame() {
    restartBtn.style.display = 'none';
    startGame();
}
