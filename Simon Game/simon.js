let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let high = document.querySelector(".highscore");
let highscore = 0;

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let radIdx = Math.floor(Math.random() * 3);
  let radCol = btns[radIdx];
  let radBtn = document.querySelector(`.${radCol}`);
  gameSeq.push(radCol);
  gameFlash(radBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if(level > highscore){
        highscore = level;
        high.innerText = `Highscore: ${highscore}`;
    }
    h2.innerHTML = `Game over! Your score was <b> ${level} </b>. <br> Press any key to start again &#128640;`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "white";
    } , 150)
    
    reset();
  }
}

function btnPrssed() {
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPrssed);
}

function reset() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}
