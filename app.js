const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const levelCount = document.querySelector('.level');
const moles = document.querySelectorAll('.mole');
const highscoreBoard = document.querySelectorAll('.highscore');
let lastHole;
let timeUp = false;
let score = 0;
let level = 1;
let highscore = 0;
let newTime;
let peepTime;

loadScore();

function startGame() {
    resetGame();
    scoreBoard.textContent = 0;
    levelCount.textContent = 1;
    timeUp = false;
    score = 0;
    level = 1;
    newTime = setTimeout(() => timeUp = true, 60000);
    peep();
}

function resetGame() {
    const holes = document.querySelectorAll('.hole');
    for (var i = 0; i < holes.length; i++) {
        let hole = holes[i];
        if (hole.classList[2] == 'up') {
            hole.classList.remove('up');
        }
    }
    clearTimeout(newTime);
    clearTimeout(peepTime);
}

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    let time;
    if (score >= 45) {
        time = randomTime(100, 300);
        level = 4;
    }else if (score >= 30 && score <= 44) {
        time = randomTime(200, 500);
        level = 3;
    } else if (score >= 15 && score <= 29) {
        time = randomTime(300, 700);
        level = 2;
    } else {
        time = randomTime(500, 1000);
        level = 1;
    }
    const hole = randomHole(holes);
    hole.classList.add('up');
    peepTime = setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
    levelCount.textContent = level;
}

function whack(e) {
    if (!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
    saveScore();
}

function saveScore() {
    for (var i = 0; i < highscoreBoard.length; i++) {
        highscore = parseInt(highscoreBoard[i].textContent);
        if(score > highscore) {
            highscoreBoard[i].textContent = score;
            localStorage.setItem("highscore", JSON.stringify(score));
        }
    }
}

function loadScore() {
    let localData = localStorage.getItem("highscore");
    if(localData){
        highscore = JSON.parse(localData);
        highscoreBoard[0].textContent = highscore;
    }
}

moles.forEach(mole => mole.addEventListener('click', whack))