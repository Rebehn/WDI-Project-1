// $(function(){
console.log('loaded');
var speed = 80;
var gridWidth = 20;
var gridHeight = 20;
for(var x=gridHeight;x>=1;x--){
  for(var y=1;y<=gridWidth;y++){
    $('.content').append("<div class='cell' id='cell" + y + "-"+ x + "'>(" + y + "," + x + ")</div>");
  }
}
var snake = ['1-1','2-1','3-1','4-1'];
var dir = 'r';

$('#cell4-1').addClass('snakeHead');
$('#cell3-1').addClass('snakeBody');
$('#cell2-1').addClass('snakeBody');
$('#cell1-1').addClass('snakeTail');

function addPrey(){
  var xPrey = Math.floor(Math.random()*gridWidth);
  var yPrey = Math.floor(Math.random()*gridWidth);
  $('#cell' + xPrey + '-' + yPrey).addClass('prey');
}

function move(){
  var newHeadX = '';
  var newHeadY = '';

  switch (dir){
    case 'r':
    newHeadX = parseInt(snake[snake.length-1].split("-")[0]) + 1;
    newHeadY = parseInt(snake[snake.length-1].split("-").pop());
    break;
    case 'l':
    newHeadX = parseInt(snake[snake.length-1].split("-")[0]) - 1;
    newHeadY = parseInt(snake[snake.length-1].split("-").pop());
    break;
    case 'u':
    newHeadX = parseInt(snake[snake.length-1].split("-")[0]);
    newHeadY = parseInt(snake[snake.length-1].split("-").pop()) + 1;
    break;
    case 'd':
    newHeadX = parseInt(snake[snake.length-1].split("-")[0]);
    newHeadY = parseInt(snake[snake.length-1].split("-").pop()) - 1;
    break;
  }

  var newHead = (newHeadX + "-" + newHeadY);
  $('#cell' + snake[0]).removeClass('snakeTail');
  $('#cell' + snake[1]).removeClass('snakeBody').addClass('snakeTail');
  $('#cell' + snake[snake.length-1]).removeClass('snakeHead').addClass('snakeBody');
  $('#cell' + newHead).addClass('snakeHead');
  snake.push(newHead);
  snake.shift();
  console.log(snake);
}
setInterval(move, speed);
$(window).keyup(function(e){
  console.log(e.key);
  switch (e.key) {
    case 'ArrowUp':
      if (dir !== 'd'){
        dir = 'u';
      }
      break;
    case 'ArrowDown':
      if (dir !== 'u'){
        dir = 'd';
      }
      break;
    case 'ArrowLeft':
      if (dir !== 'r'){
        dir = 'l';
      }
      break;
    case 'ArrowRight':
      if (dir !== 'l'){
        dir = 'r';
      }
      break;
  }
});
// });
