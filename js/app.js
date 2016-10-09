// $(function(){
console.log('loaded');
$('#gameOver').hide();
var speed = 70;
var gridWidth = 35;
var gridHeight = 20;
for(var x=gridHeight;x>=1;x--){
  for(var y=1;y<=gridWidth;y++){
    $('.game').append("<div class='cell' id='cell" + y + "-"+ x + "'></div>");
  }
}
var snake = ['1-1','2-1','3-1','4-1'];
var dir = 'r';
var click = new Audio('../sounds/click.wav');
addPrey();
addMoveKeys();

$('#cell4-1').addClass('snakeHead');
$('#cell3-1').addClass('snakeBody');
$('#cell2-1').addClass('snakeBody');
$('#cell1-1').addClass('snakeTail');

function addPrey(){
  var xPrey = (Math.floor(Math.random()*gridWidth)+1);
  var yPrey = (Math.floor(Math.random()*gridHeight)+1);
  $('#cell' + xPrey + '-' + yPrey).addClass('prey');
  preyCell = xPrey + '-' + yPrey;
  if ($('#cell' + preyCell).hasClass('snakeBody') || $('#cell' + preyCell).hasClass('snakeTail') || $('#cell' + preyCell).hasClass('snakeHead')){
    $('#cell' + preyCell).removeClass('prey');
    addPrey();
  }
  else {}
  console.log(preyCell);
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

  if (newHeadX === 0 || newHeadY === 0 || newHeadX === gridWidth + 1 || newHeadY === gridHeight + 1){
    console.log('game over');
    clearInterval(refreshSnake);
    gameOver();
  }

  var newHead = (newHeadX + "-" + newHeadY);
  $('#cell' + snake[0]).removeClass('snakeTail');
  $('#cell' + snake[1]).removeClass('snakeBody').addClass('snakeTail');
  $('#cell' + snake[snake.length-1]).removeClass('snakeHead').addClass('snakeBody');
  $('#cell' + newHead).addClass('snakeHead');
  snake.push(newHead);
  if (newHead == preyCell){
    $('#cell' + preyCell).removeClass('prey');
    addPrey();
    click.play();
    click.currentTime = 0;
    $('#score').html(parseInt($('#score').html())+10);
  } else {
    snake.shift();
  }
  if($('#cell' + newHead).hasClass('snakeBody') || $('#cell' + newHead).hasClass('snakeTail')){
    console.log('Game Over');
    clearInterval(refreshSnake);
    gameOver();
  }
}

var refreshSnake = setInterval(move, speed);

function addMoveKeys(){
  $(window).keydown(function(e){
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
}

$(window).keydown(function(e){
  if (e.key == "p"){
    clearInterval(refreshSnake);
  } else if (e.key == "["){
    refreshSnake = setInterval(move, speed);
  }
});

function gameOver(){
  for(var x=gridHeight;x>=1;x--){
    for(var y=1;y<=gridWidth;y++){
      $('#cell' + y + '-' + x ).fadeOut(1500);
    }
  }
  $('#gameOver').show();
  $(window).keydown(function(e){
    if (e.key == 'r'){
      restart();
    }
  });
}

function restart(){
  $(window).off();
  for(var x=gridHeight;x>=1;x--){
    for(var y=1;y<=gridWidth;y++){
      $('#cell' + y + '-' + x ).removeClass('snakeHead').removeClass('snakeTail').removeClass('snakeBody');
      $('#cell' + y + '-' + x ).fadeIn(100);
    }
  }
  $('#gameOver').hide();
  snake = ['1-1','2-1','3-1','4-1'];
  dir = 'r';
  $('#cell' + preyCell).removeClass('prey');
  addPrey();
  addMoveKeys();
  // $(window).keydown(function(e){
  //   if (e.key == "ArrowUp" || e.key == "ArrowRight" || e.key == "ArrowDown" || e.key == "ArrowUp"){
  //     refreshSnake = setInterval(move, speed);
  //   }
  // });
  refreshSnake = setInterval(move, speed);
}
// });
