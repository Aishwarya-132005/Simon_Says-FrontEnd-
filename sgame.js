let gameSeq = [];
let userSeq = [];

const btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

const h2 = document.querySelector(".subtitle");
const startBtn = document.getElementById("start-btn");

document.addEventListener("keypress", startGame);
startBtn.addEventListener("click", startGame);

function startGame() {
    if (!started) {
        started = true;
        levelUp();
    }
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * 4);
    const randColor = btns[randIdx];
    const randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    setTimeout(() => btnFlash(randBtn), 500);
}

function checkBtn(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    h2.innerHTML = `💀 Game Over! Your Score: <b>${level}</b><br>Press any key or click Start`;
    document.body.style.backgroundColor = "#ff4d4d";
    setTimeout(() => {
        document.body.style.backgroundColor = "";
    }, 200);
    reset();
}

function btnPress() {
    if (!started) return;

    const btn = this;
    userFlash(btn);
    const userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkBtn(userSeq.length - 1);
}

const allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
