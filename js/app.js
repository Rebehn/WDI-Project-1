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
  var snakeNextNewHead = 1;
  var snakeBodyDir = 1;
  var snakeHeadDir = 2;
  var snakeTailDir = 2;
  var snakeDir = 'r';
  var click = new Audio('../sounds/click.wav');
  addPrey();
  addMoveKeys();

  $('#cell4-1').addClass('snakeHead' + snakeHeadDir);
  $('#cell3-1').addClass('snakeBody' + snakeNextNewHead);
  $('#cell2-1').addClass('snakeBody' + snakeNextNewHead);
  $('#cell1-1').addClass('snakeTail' + snakeTailDir);

  function snakeInit(){
    snake = ['1-1','2-1','3-1','4-1'];
    snakeNextNewHead = 1;
    snakeBodyDir = 1;
    snakeHeadDir = 2;
    snakeTailDir = 2;
    refreshSnake = setInterval(snakeMove, speed);
  }

  function addPrey(){
    var xPrey = (Math.floor(Math.random()*gridWidth)+1);
    var yPrey = (Math.floor(Math.random()*gridHeight)+1);
    $('#cell' + xPrey + '-' + yPrey).addClass('prey');
    preyCell = xPrey + '-' + yPrey;
    if ($('#cell' + preyCell).hasClass('snakeBody' + snakeNextNewHead) || $('#cell' + preyCell).hasClass('snakeTail' + snakeTailDir) || $('#cell' + preyCell).hasClass('snakeHead')){
      $('#cell' + preyCell).removeClass('prey');
      addPrey();
    }
  }

  function snakeMove(){
    var snakeNewHeadX = '';
    var snakeNewHeadY = '';

    switch (snakeDir){
      case 'r':
      snakeNewHeadX = parseInt(snake[snake.length-1].split("-")[0]) + 1;
      snakeNewHeadY = parseInt(snake[snake.length-1].split("-").pop());
      break;
      case 'l':
      snakeNewHeadX = parseInt(snake[snake.length-1].split("-")[0]) - 1;
      snakeNewHeadY = parseInt(snake[snake.length-1].split("-").pop());
      break;
      case 'u':
      snakeNewHeadX = parseInt(snake[snake.length-1].split("-")[0]);
      snakeNewHeadY = parseInt(snake[snake.length-1].split("-").pop()) + 1;
      break;
      case 'd':
      snakeNewHeadX = parseInt(snake[snake.length-1].split("-")[0]);
      snakeNewHeadY = parseInt(snake[snake.length-1].split("-").pop()) - 1;
      break;
    }

    if (snakeNewHeadX === 0 || snakeNewHeadY === 0 || snakeNewHeadX === gridWidth + 1 || snakeNewHeadY === gridHeight + 1){
      console.log('game over');
      clearInterval(refreshSnake);
      gameOver();
    }

    var snakeNewHead = (snakeNewHeadX + "-" + snakeNewHeadY);
    changeSnakeTail();
    $('#cell' + snake[0]).removeClass('snakeTail1').removeClass('snakeTail2').removeClass('snakeTail3').removeClass('snakeTail4');
    $('#cell' + snake[1]).removeClass('snakeBody1').removeClass('snakeBody2').removeClass('snakeBody3').removeClass('snakeBody4').removeClass('snakeBody5').removeClass('snakeBody6').addClass('snakeTail' + snakeTailDir);
    $('#cell' + snake[snake.length-1]).removeClass('snakeHead1').removeClass('snakeHead2').removeClass('snakeHead3').removeClass('snakeHead4').addClass('snakeBody' + snakeNextNewHead);
    $('#cell' + snakeNewHead).addClass('snakeHead' + snakeHeadDir);
    snake.push(snakeNewHead);
    snakeNextNewHead = snakeBodyDir;
    if (snakeNewHead == preyCell){
      $('#cell' + preyCell).removeClass('prey');
      addPrey();
      click.play();
      click.currentTime = 0;
      $('#score').html(parseInt($('#score').html())+10);
    } else {
      snake.shift();
    }
    if($('#cell' + snakeNewHead).hasClass('snakeBody1') || $('#cell' + snakeNewHead).hasClass('snakeBody2') || $('#cell' + snakeNewHead).hasClass('snakeBody3') || $('#cell' + snakeNewHead).hasClass('snakeBody4') || $('#cell' + snakeNewHead).hasClass('snakeBody5') || $('#cell' + snakeNewHead).hasClass('snakeBody6') || $('#cell' + snakeNewHead).hasClass('snakeTail1') || $('#cell' + snakeNewHead).hasClass('snakeTail2') || $('#cell' + snakeNewHead).hasClass('snakeTail3') || $('#cell' + snakeNewHead).hasClass('snakeTail4')){
      console.log('Game Over');
      clearInterval(refreshSnake);
      gameOver();
    }
  }

  var refreshSnake = setInterval(snakeMove, speed);

  function addMoveKeys(){
    $(window).keydown(function(e){
      switch (e.key) {
        case 'ArrowUp':
        if(snakeDir === 'u') return;
        if (snakeDir !== 'd'){
          if (snakeDir == 'r'){
            snakeNextNewHead = 4;
          }
          else {
            snakeNextNewHead = 5;
          }
          snakeBodyDir = 2;
          snakeHeadDir = 1;
          snakeDir = 'u';
        }
        break;
        case 'ArrowDown':
        if(snakeDir === 'd') return;
        if (snakeDir !== 'u'){
          if (snakeDir == 'r'){
            snakeNextNewHead = 3;
          }
          else {
            snakeNextNewHead = 6;
          }
          snakeDir = 'd';
          snakeBodyDir = 2;
          snakeHeadDir = 3;
        }
        break;
        case 'ArrowLeft':
        if(snakeDir === 'l') return;
        if (snakeDir !== 'r'){
          if (snakeDir == 'u'){
            snakeNextNewHead = 3;
          }
          else {
            snakeNextNewHead = 4;
          }
          snakeDir = 'l';
          snakeBodyDir = 1;
          snakeHeadDir = 4;
        }
        break;
        case 'ArrowRight':
        if(snakeDir === 'r') return;
        if (snakeDir !== 'l'){
          if (snakeDir == 'u'){
            snakeNextNewHead = 6;
          }
          else {
            snakeNextNewHead = 5;
          }
          snakeDir = 'r';
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
      refreshSnake = setInterval(snakeMove, speed);
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

  function changeSnakeTail(){
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
        $('#cell' + y + '-' + x ).removeClass('snakeHead').removeClass('snakeTail').removeClass('snakeBody' + snakeNextNewHead);
        $('#cell' + y + '-' + x ).fadeIn(100);
      }
    }
    $('#infoBox').hide();
    snakeInit();
    $('#cell' + preyCell).removeClass('prey');
    addPrey();
    addMoveKeys();
  }

}

$(window).one().keydown(function(e){
  console.log(e.key);
  $(window).off();
  play();
});
// });
