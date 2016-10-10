// $(function(){

console.log('loaded');

function play(){
  console.log('playing');
  $('#infoBox').hide();
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
  var nextNewHead = 1;
  var snakeBodyDir = 1;
  var snakeHeadDir = 2;
  var snakeTailDir = 2;

  $('#cell4-1').addClass('snakeHead' + snakeHeadDir);
  $('#cell3-1').addClass('snakeBody' + nextNewHead);
  $('#cell2-1').addClass('snakeBody' + nextNewHead);
  $('#cell1-1').addClass('snakeTail' + snakeTailDir);

  function addPrey(){
    var xPrey = (Math.floor(Math.random()*gridWidth)+1);
    var yPrey = (Math.floor(Math.random()*gridHeight)+1);
    $('#cell' + xPrey + '-' + yPrey).addClass('prey');
    preyCell = xPrey + '-' + yPrey;
    if ($('#cell' + preyCell).hasClass('snakeBody' + nextNewHead) || $('#cell' + preyCell).hasClass('snakeTail' + snakeTailDir) || $('#cell' + preyCell).hasClass('snakeHead')){
      $('#cell' + preyCell).removeClass('prey');
      addPrey();
    }
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
    changeTail();
    $('#cell' + snake[0]).removeClass('snakeTail1').removeClass('snakeTail2').removeClass('snakeTail3').removeClass('snakeTail4');
    $('#cell' + snake[1]).removeClass('snakeBody1').removeClass('snakeBody2').removeClass('snakeBody3').removeClass('snakeBody4').removeClass('snakeBody5').removeClass('snakeBody6').addClass('snakeTail' + snakeTailDir);
    $('#cell' + snake[snake.length-1]).removeClass('snakeHead1').removeClass('snakeHead2').removeClass('snakeHead3').removeClass('snakeHead4').addClass('snakeBody' + nextNewHead);
    $('#cell' + newHead).addClass('snakeHead' + snakeHeadDir);
    snake.push(newHead);
    nextNewHead = snakeBodyDir;
    if (newHead == preyCell){
      $('#cell' + preyCell).removeClass('prey');
      addPrey();
      click.play();
      click.currentTime = 0;
      $('#score').html(parseInt($('#score').html())+10);
    } else {
      snake.shift();
    }
    if($('#cell' + newHead).hasClass('snakeBody1') || $('#cell' + newHead).hasClass('snakeBody2') || $('#cell' + newHead).hasClass('snakeBody3') || $('#cell' + newHead).hasClass('snakeBody4') || $('#cell' + newHead).hasClass('snakeBody5') || $('#cell' + newHead).hasClass('snakeBody6') || $('#cell' + newHead).hasClass('snakeTail1') || $('#cell' + newHead).hasClass('snakeTail2') || $('#cell' + newHead).hasClass('snakeTail3') || $('#cell' + newHead).hasClass('snakeTail4')){
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
        if(dir === 'u') return;
        if (dir !== 'd'){
          if (dir == 'r'){
            nextNewHead = 4;
          }
          else {
            nextNewHead = 5;
          }
          snakeBodyDir = 2;
          snakeHeadDir = 1;
          dir = 'u';
        }
        break;
        case 'ArrowDown':
        if(dir === 'd') return;
        if (dir !== 'u'){
          if (dir == 'r'){
            nextNewHead = 3;
          }
          else {
            nextNewHead = 6;
          }
          dir = 'd';
          snakeBodyDir = 2;
          snakeHeadDir = 3;
        }
        break;
        case 'ArrowLeft':
        if(dir === 'l') return;
        if (dir !== 'r'){
          if (dir == 'u'){
            nextNewHead = 3;
          }
          else {
            nextNewHead = 4;
          }
          dir = 'l';
          snakeBodyDir = 1;
          snakeHeadDir = 4;
        }
        break;
        case 'ArrowRight':
        if(dir === 'r') return;
        if (dir !== 'l'){
          if (dir == 'u'){
            nextNewHead = 6;
          }
          else {
            nextNewHead = 5;
          }
          dir = 'r';
          snakeBodyDir = 1;
          snakeHeadDir = 2;
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
    $('#infoBox').html('Game Over');
    $('#infoBox').show();
    $(window).keydown(function(e){
      if (e.key == 'r'){
        restart();
      }
    });
  }

  function changeTail(){
    if ($('#cell' + snake[1]).hasClass('snakeBody3') || $('#cell' + snake[1]).hasClass('snakeBody4') || $('#cell' + snake[1]).hasClass('snakeBody5') || $('#cell' + snake[1]).hasClass('snakeBody6')){
      if (parseInt(snake[2].split("-")[1]) === parseInt(snake[1].split("-")[1]) + 1){
        snakeTailDir = 1;
      }
      else if (parseInt(snake[2].split("-")[1]) === parseInt(snake[1].split("-")[1]) - 1){
        snakeTailDir = 3;
      }
      else if (parseInt(snake[2].split("-")[0]) === parseInt(snake[1].split("-")[0]) + 1){
        snakeTailDir = 2;
      }
      else if (parseInt(snake[2].split("-")[0]) === parseInt(snake[1].split("-")[0]) - 1){
        snakeTailDir = 4;
      }
    }
  }

  function restart(){
    $(window).off();
    for(var x=gridHeight;x>=1;x--){
      for(var y=1;y<=gridWidth;y++){
        $('#cell' + y + '-' + x ).removeClass('snakeHead').removeClass('snakeTail').removeClass('snakeBody' + nextNewHead);
        $('#cell' + y + '-' + x ).fadeIn(100);
      }
    }
    $('#infoBox').hide();
    snake = ['1-1','2-1','3-1','4-1'];
    dir = 'r';
    $('#cell' + preyCell).removeClass('prey');
    addPrey();
    addMoveKeys();

    refreshSnake = setInterval(move, speed);
  }

}

$(window).one().keydown(function(e){
  console.log(e.key);
  $(window).off();
  if (e.key == " "){
    play();
  }
});
// });
