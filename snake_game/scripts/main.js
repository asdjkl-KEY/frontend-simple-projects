/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let direction = 'right';

let snake = [
    {
        x: 40,
        y: 0
    },
    {
        x: 20,
        y: 0
    },
    {
        x: 0,
        y: 0
    }
];

let fruit = {
    x: 40,
    y: 40
}

canvas.width = 400;
canvas.height = 400;

let score = 0;

function drawSnake(){
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, scale, scale);
    });
}

function drawFruit(){
    ctx.fillStyle = 'red';
    ctx.fillRect(fruit.x, fruit.y, scale, scale);
}

function updateCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFruit();
}

function moveSnake(){
    let head = {
        x: snake[0].x,
        y: snake[0].y
    };

    if(direction === 'right') head.x += scale;
    if(direction === 'left') head.x -= scale;
    if(direction === 'up') head.y -= scale;
    if(direction === 'down') head.y += scale;

    snake.unshift(head);

    if(head.x === fruit.x && head.y === fruit.y){
        score += 10;
        document.getElementById('score').innerText = score;
        fruit.x = Math.floor(Math.random() * columns) * scale;
        fruit.y = Math.floor(Math.random() * rows) * scale;
    }else{
        snake.pop();
    }
}

function updateFruitPosition(){
    fruit.x = Math.floor(Math.random() * columns) * scale;
    fruit.y = Math.floor(Math.random() * rows) * scale;
}

function checkCollision(){
    if(snake[0].x >= canvas.width || snake[0].x < 0 || snake[0].y >= canvas.height || snake[0].y < 0){
        return true;
    }

    for(let i = 1; i < snake.length; i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            return true;
        }
    }

    return false;
}

function checkGetFruit(){
    if(snake[0].x === fruit.x && snake[0].y === fruit.y){
        updateFruitPosition();
    }
}

function gameLoop(){
    if(checkCollision()){
        snake = [
            {
                x: 40,
                y: 0
            },
            {
                x: 20,
                y: 0
            },
            {
                x: 0,
                y: 0
            }
        ];
        score = 0;
        document.getElementById('score').innerText = score;
        direction = 'right';
    }

    updateCanvas();
    moveSnake();
}

document.addEventListener('keydown', event => {
    if(event.key === 'ArrowUp' && direction !== 'down'){
        direction = 'up';
    }

    if(event.key === 'ArrowDown' && direction !== 'up'){
        direction = 'down';
    }

    if(event.key === 'ArrowLeft' && direction !== 'right'){
        direction = 'left';
    }

    if(event.key === 'ArrowRight' && direction !== 'left'){
        direction = 'right';
    }
});

setInterval(gameLoop, 100);