let snake = document.querySelector(".snake");
let food = document.querySelector(".food");
let playArea = document.querySelector(".play-ground");
let controllers = document.querySelectorAll(".controllers i");
let score = document.querySelector(".score");
let highScore = document.querySelector(".high-score");
let gameOverBox = document.querySelector(".reply-box");
let lastScoreDisplay = document.querySelector(".score-display");
let playBtn = document.querySelector(".play-again");

//requirments
let gameOver = false;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let foodX, foodY;
let snakeBody = [];
let intervalId;
let gameScore = 0;
let highScoreElement = 0;

//game audios
let overSound = new Audio('assets/over.mp3');
const eatSound = new Audio('assets/eat.mp3');

//check highscore
let highScoreRetrieve = () => {
    let savedScore = localStorage.getItem("highScore") || 0;
    highScore.innerText = savedScore;
}
highScoreRetrieve();

//gameover
let gameEnd = () => {
    clearInterval(intervalId); 
    gameOverBox.style.visibility = "visible";
    lastScoreDisplay.innerText = gameScore;
    playBtn.addEventListener("click", function(){
        location.reload();
    })
}

//random food appear
let updateFood = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    food.style.gridColumnStart = foodX;
    food.style.gridRowStart = foodY;
}
updateFood();
food.style.gridColumnStart = foodX;
food.style.gridRowStart = foodY;

//check for wall collisions
let wallCollision = () => {
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        overSound.play();
        gameOver = true;
    }
}

//direction velocity keyboard
document.addEventListener('keydown', e => {
    if (e.key === "ArrowUp" && velocityY != 1 || e.key === "w" && velocityY != 1) {
        velocityY = -1;
        velocityX = 0;
    }
    if (e.key === "ArrowDown" && velocityY != -1 || e.key === "s" && velocityY != -1) {
        velocityY = 1;
        velocityX = 0;
    }
    if (e.key === "ArrowLeft" && velocityX != 1 || e.key === "a" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    if (e.key === "ArrowRight" && velocityX != -1 || e.key === "d" && velocitX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
});

//direction velocity buttons
controllers.forEach(arrow => {
    arrow.addEventListener('click', () => {
        const direction = arrow.dataset.direction;
        if (direction === "ArrowUp" && velocityY != 1) {
            velocityY = -1;
            velocityX = 0;
        }
        if (direction === "ArrowDown" && velocityY != -1) {
            velocityY = 1;
            velocityX = 0;
        }
        if (direction === "ArrowLeft" && velocityX != 1) {
            velocityX = -1;
            velocityY = 0;
        }
        if (direction === "ArrowRight" && velocityX != -1) {
            velocityX = 1;
            velocityY = 0;
        }
    });
});

//render snake and food in css
let renderSnake = () => {
    playArea.innerHTML = "";

    //draw food
    playArea.innerHTML += `<div class="food" style="grid-row-start: ${foodY}; grid-column-start: ${foodX};"></div>`;

    //draw snake head
    playArea.innerHTML += `<div class="snake" style="grid-row-start: ${snakeY}; grid-column-start: ${snakeX};  background-color: #027cffe3;"></div>`;

    //draw snake body
    snakeBody.forEach(seg => {
        playArea.innerHTML += `<div class="snake" style="grid-row-start: ${seg[1]}; grid-column-start: ${seg[0]};"></div>`;
    });
}

//movements and directions of snake
let moveSnake = () => {
    wallCollision();
    if (!gameOver) {
        snakeBody.unshift([snakeX, snakeY]);
        //move snake head
        snakeX += velocityX;
        snakeY += velocityY;
        //check for food collisions
        if (snakeX === foodX && snakeY === foodY) {
            eatSound.play();
            updateFood(); 
            gameScore++;
            score.innerText = gameScore;

            //high score
            if(gameScore > highScore.innerText){
                highScoreElement = gameScore;
                highScore.innerText = gameScore;
                localStorage.setItem("highScore", gameScore);
            }
        }else{
            snakeBody.pop();
        }
        //check for self collisions
        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
                gameOver = true;
                overSound.play();
            }
        }
        renderSnake();
    } else {
        gameEnd();
    }
}

intervalId = setInterval(moveSnake, 100);