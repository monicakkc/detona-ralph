const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 30,
        qtdLives: 10,
        gameOverType:"",
    },
    actions: {
        timerId: setInterval(randomSquare, 700),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

//contador regressivo
function countDown() {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;
    if (state.values.currentTime <=0){
        gameOver("O tempo acabou!")
    } else if (state.values.qtdLives <=0) {
        gameOver("Suas vidas acabaram!")
    }
}

//game over
function gameOver(gameOverType) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    let mostraResult = `Game Over! ${gameOverType} Seu resultado foi: ${state.values.result} ` 
    alert(mostraResult);
}

//tocando sons
function playSounds(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.05;
    audio.play();
}

//percorrendo os quadrados e removendo imagem de todos
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    } );

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

//movendo o inimigo entre os quadrados
// function moveEnemy() {
//     state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
// }

//ouvindo o clique do mouse nos quadrados
function addListenerHitBox() {
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSounds("hit");
            } else {
                state.values.qtdLives--
                state.view.lives.textContent = state.values.qtdLives;
            }
        })
    });
        
};

// inicializando o jogo
function initialize() {
    // moveEnemy();
    addListenerHitBox();
};

initialize()
