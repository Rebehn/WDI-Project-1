
console.log('loaded');

$('#btn2').click(function play(){
  $('#btn1').off();
  $('#btn2').off();
  console.log('playing');
  $('#infoBox').hide();
  var speed = 100;
  var gridWidth = 35;
  var gridHeight = 20;
  var click = new Audio('../sounds/click.wav');
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

  $('#cell4-1').addClass('snakeHead' + snakeHeadDir);
  $('#cell3-1').addClass('snakeBody' + snakeNextNewHead);
  $('#cell2-1').addClass('snakeBody' + snakeNextNewHead);
  $('#cell1-1').addClass('snakeTail' + snakeTailDir);

  var drake = ['35-20','34-20','33-20','32-20'];
  var drakeNextNewHead = 1;
  var drakeBodyDir = 1;
  var drakeHeadDir = 4;
  var drakeTailDir = 4;
  var drakeDir = 'l';

  $('#cell32-20').addClass('drakeHead' + drakeHeadDir);
  $('#cell33-20').addClass('drakeBody' + drakeNextNewHead);
  $('#cell34-20').addClass('drakeBody' + drakeNextNewHead);
  $('#cell35-20').addClass('drakeTail' + drakeTailDir);


  addPrey();
  snakeAddMoveKeys();
  drakeAddMoveKeys();

  function snakeInit(){
    snake = ['1-1','2-1','3-1','4-1'];
    snakeNextNewHead = 1;
    snakeBodyDir = 1;
    snakeHeadDir = 2;
    snakeTailDir = 2;
    refreshSnake = setInterval(snakeMove, speed);
  }

  function drakeInit(){
    drake = ['35-20','34-20','33-20','32-20'];
    drakeNextNewHead = 1;
    drakeBodyDir = 1;
    drakeHeadDir = 4;
    drakeTailDir = 4;
    refreshDrake = setInterval(drakeMove, speed);
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
      clearInterval(refreshSnake, refreshDrake);
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
    if($('#cell' + snakeNewHead).hasClass('snakeBody1') || $('#cell' + snakeNewHead).hasClass('snakeBody2') || $('#cell' + snakeNewHead).hasClass('snakeBody3') || $('#cell' + snakeNewHead).hasClass('snakeBody4') || $('#cell' + snakeNewHead).hasClass('snakeBody5') || $('#cell' + snakeNewHead).hasClass('snakeBody6') || $('#cell' + snakeNewHead).hasClass('snakeTail1') || $('#cell' + snakeNewHead).hasClass('snakeTail2') || $('#cell' + snakeNewHead).hasClass('snakeTail3') || $('#cell' + snakeNewHead).hasClass('snakeTail4') || $('#cell' + snakeNewHead).hasClass('drakeBody1') || $('#cell' + snakeNewHead).hasClass('drakeBody2') || $('#cell' + snakeNewHead).hasClass('drakeBody3') || $('#cell' + snakeNewHead).hasClass('drakeBody4') || $('#cell' + snakeNewHead).hasClass('drakeBody5') || $('#cell' + snakeNewHead).hasClass('drakeBody6') || $('#cell' + snakeNewHead).hasClass('drakeTail1') || $('#cell' + snakeNewHead).hasClass('drakeTail2') || $('#cell' + snakeNewHead).hasClass('drakeTail3') || $('#cell' + snakeNewHead).hasClass('drakeTail4')){
      console.log('Game Over');
      clearInterval(refreshSnake, refreshDrake);
      gameOver();
    }
  }

  function drakeMove(){
    var drakeNewHeadX = '';
    var drakeNewHeadY = '';

    switch (drakeDir){
      case 'r':
      drakeNewHeadX = parseInt(drake[drake.length-1].split("-")[0]) + 1;
      drakeNewHeadY = parseInt(drake[drake.length-1].split("-").pop());
      break;
      case 'l':
      drakeNewHeadX = parseInt(drake[drake.length-1].split("-")[0]) - 1;
      drakeNewHeadY = parseInt(drake[drake.length-1].split("-").pop());
      break;
      case 'u':
      drakeNewHeadX = parseInt(drake[drake.length-1].split("-")[0]);
      drakeNewHeadY = parseInt(drake[drake.length-1].split("-").pop()) + 1;
      break;
      case 'd':
      drakeNewHeadX = parseInt(drake[drake.length-1].split("-")[0]);
      drakeNewHeadY = parseInt(drake[drake.length-1].split("-").pop()) - 1;
      break;
    }

    if (drakeNewHeadX === 0 || drakeNewHeadY === 0 || drakeNewHeadX === gridWidth + 1 || drakeNewHeadY === gridHeight + 1){
      console.log('game over');
      clearInterval(refreshSnake, refreshDrake);
      gameOver();
    }

    var drakeNewHead = (drakeNewHeadX + "-" + drakeNewHeadY);
    changeDrakeTail();
    $('#cell' + drake[0]).removeClass('drakeTail1').removeClass('drakeTail2').removeClass('drakeTail3').removeClass('drakeTail4');
    $('#cell' + drake[1]).removeClass('drakeBody1').removeClass('drakeBody2').removeClass('drakeBody3').removeClass('drakeBody4').removeClass('drakeBody5').removeClass('drakeBody6').addClass('drakeTail' + drakeTailDir);
    $('#cell' + drake[drake.length-1]).removeClass('drakeHead1').removeClass('drakeHead2').removeClass('drakeHead3').removeClass('drakeHead4').addClass('drakeBody' + drakeNextNewHead);
    $('#cell' + drakeNewHead).addClass('drakeHead' + drakeHeadDir);
    drake.push(drakeNewHead);
    drakeNextNewHead = drakeBodyDir;
    if (drakeNewHead == preyCell){
      $('#cell' + preyCell).removeClass('prey');
      addPrey();
      click.play();
      click.currentTime = 0;
      $('#score2').html(parseInt($('#score2').html())+10);
    } else {
      drake.shift();
    }
    if($('#cell' + drakeNewHead).hasClass('drakeBody1') || $('#cell' + drakeNewHead).hasClass('drakeBody2') || $('#cell' + drakeNewHead).hasClass('drakeBody3') || $('#cell' + drakeNewHead).hasClass('drakeBody4') || $('#cell' + drakeNewHead).hasClass('drakeBody5') || $('#cell' + drakeNewHead).hasClass('drakeBody6') || $('#cell' + drakeNewHead).hasClass('drakeTail1') || $('#cell' + drakeNewHead).hasClass('drakeTail2') || $('#cell' + drakeNewHead).hasClass('drakeTail3') || $('#cell' + drakeNewHead).hasClass('drakeTail4') || $('#cell' + drakeNewHead).hasClass('snakeBody1') || $('#cell' + drakeNewHead).hasClass('snakeBody2') || $('#cell' + drakeNewHead).hasClass('snakeBody3') || $('#cell' + drakeNewHead).hasClass('snakeBody4') || $('#cell' + drakeNewHead).hasClass('snakeBody5') || $('#cell' + drakeNewHead).hasClass('snakeBody6') || $('#cell' + drakeNewHead).hasClass('snakeTail1') || $('#cell' + drakeNewHead).hasClass('snakeTail2') || $('#cell' + drakeNewHead).hasClass('snakeTail3') || $('#cell' + drakeNewHead).hasClass('snakeTail4')){
      console.log('Game Over');
      clearInterval(refreshDrake, refreshSnake);
      gameOver();
    }
  }

  var refreshSnake = setInterval(snakeMove, speed);

  var refreshDrake = setInterval(drakeMove, speed);

  function snakeAddMoveKeys(){
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

  function drakeAddMoveKeys(){
    $(window).keydown(function(g){
      switch (g.key) {
        case 'w':
        if(drakeDir === 'u') return;
        if (drakeDir !== 'd'){
          if (drakeDir == 'r'){
            drakeNextNewHead = 4;
          }
          else {
            drakeNextNewHead = 5;
          }
          drakeBodyDir = 2;
          drakeHeadDir = 1;
          drakeDir = 'u';
        }
        break;
        case 's':
        if(drakeDir === 'd') return;
        if (drakeDir !== 'u'){
          if (drakeDir == 'r'){
            drakeNextNewHead = 3;
          }
          else {
            drakeNextNewHead = 6;
          }
          drakeDir = 'd';
          drakeBodyDir = 2;
          drakeHeadDir = 3;
        }
        break;
        case 'a':
        if(drakeDir === 'l') return;
        if (drakeDir !== 'r'){
          if (drakeDir == 'u'){
            drakeNextNewHead = 3;
          }
          else {
            drakeNextNewHead = 4;
          }
          drakeDir = 'l';
          drakeBodyDir = 1;
          drakeHeadDir = 4;
        }
        break;
        case 'd':
        if(drakeDir === 'r') return;
        if (drakeDir !== 'l'){
          if (drakeDir == 'u'){
            drakeNextNewHead = 6;
          }
          else {
            drakeNextNewHead = 5;
          }
          drakeDir = 'r';
          drakeBodyDir = 1;
          drakeHeadDir = 2;
        }
        break;
      }
    });
  }

  $(window).keydown(function(e){
    if (e.key == "p"){
      clearInterval(refreshSnake);
      clearInterval(refreshDrake);
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
    $('#infoBox').css('left', '250px');
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

  function changeDrakeTail(){
    console.log(parseInt(drake[2].split("-")[1]));
    if ($('#cell' + drake[1]).hasClass('drakeBody3') || $('#cell' + drake[1]).hasClass('drakeBody4') || $('#cell' + drake[1]).hasClass('drakeBody5') || $('#cell' + drake[1]).hasClass('drakeBody6')){
      if (parseInt(drake[2].split("-")[1]) === parseInt(drake[1].split("-")[1]) + 1){
        drakeTailDir = 1;
      }
      else if (parseInt(drake[2].split("-")[1]) === parseInt(drake[1].split("-")[1]) - 1){
        drakeTailDir = 3;
      }
      else if (parseInt(drake[2].split("-")[0]) === parseInt(drake[1].split("-")[0]) + 1){
        drakeTailDir = 2;
      }
      else if (parseInt(drake[2].split("-")[0]) === parseInt(drake[1].split("-")[0]) - 1){
        drakeTailDir = 4;
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
    snakeAddMoveKeys();
  }

});


$('#btn1').click(function playSolo(){
  $('#btn1').off();
  $('#btn2').off();
  console.log('playing solo');
  $('#infoBox').hide();
  var speed = 100;
  var gridWidth = 35;
  var gridHeight = 20;
  var click = new Audio('../sounds/click.wav');
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

  $('#cell4-1').addClass('snakeHead' + snakeHeadDir);
  $('#cell3-1').addClass('snakeBody' + snakeNextNewHead);
  $('#cell2-1').addClass('snakeBody' + snakeNextNewHead);
  $('#cell1-1').addClass('snakeTail' + snakeTailDir);

  addPrey();
  snakeAddMoveKeys();

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
      clearInterval(refreshSnake, refreshDrake);
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

  function snakeAddMoveKeys(){
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
    $('#infoBox').css('left', '250px');
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
    snakeAddMoveKeys();
  }
});
