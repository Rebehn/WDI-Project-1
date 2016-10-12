
console.log('loaded');

var background = new Audio('../sounds/Fade.mp3');
var guile = new Audio ('../sounds/guile.mp3');
guile.volume = 0.3;
var wilhelm = new Audio('../sounds/wilhelm.wav');

var $btn1 = $('#btn1');
var $btn2 = $('#btn2');

$('.score').hide();
$('.score2').hide();
$('.scoreSolo').hide();

$btn1.on("click", playSolo);
$btn2.on("click", play);
$(document).on('keyup', function(e) {
  if(e.key.toLowerCase() === 'b'){
    $btn1.css('background-color', 'rgba(255,0,0,0.3)');
    setTimeout(function() {
      $btn1.removeAttr('style');
    }, 200);
    playSolo();
  }
  else if (e.key.toLowerCase() === 'a'){
    $btn2.css('background-color', 'rgba(100,255,0,0.3)');
    setTimeout(function() {
      $btn2.removeAttr('style');
    }, 200);
    play();
  }
});

function playSolo(){
  var backInterval = setInterval(function(){
    background.pause();
    background.currentTime = 0;
    background.play();
  }, 2222);
  background.play();
  $btn1.off();
  $btn2.off();
  $(document).off();
  $(document).on('keydown', function(e) {
    if(e.key === 'm'){
      background.volume = 0;
    }
    else if (e.key === 'n'){
      background.volume = 1;
    }
  });
  $('.scoreSolo').show();
  $('#infoBox').hide();
  $(document).keydown(function(f){
    if(f.key === 'ArrowUp'){
      $('#arw1').css('background-color', 'rgba(255,255,255,0.3)');
    }
    else if(f.key === 'ArrowRight'){
      $('#arw2').css('background-color', 'rgba(255,255,255,0.3)');
    }
    else if(f.key === 'ArrowLeft'){
      $('#arw4').css('background-color', 'rgba(255,255,255,0.3)');
    }
    else if(f.key === 'ArrowDown'){
      $('#arw3').css('background-color', 'rgba(255,255,255,0.3)');
    }
  });
  $(document).keyup(function(g){
    if(g.key === 'ArrowUp'){
      $('#arw1').css('background', 'transparent');
    }
    else if(g.key === 'ArrowRight'){
      $('#arw2').css('background', 'transparent');
    }
    else if(g.key === 'ArrowDown'){
      $('#arw3').css('background', 'transparent');
    }
    else if(g.key === 'ArrowLeft'){
      $('#arw4').css('background', 'transparent');
    }
  });
  var speed = 65;
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
    $('#cell' + xPrey + '-' + yPrey).addClass('preySolo');
    preyCell = xPrey + '-' + yPrey;
    if ($('#cell' + preyCell).hasClass('snakeBody1') || $('#cell' + preyCell).hasClass('snakeBody2') || $('#cell' + preyCell).hasClass('snakeBody3') || $('#cell' + preyCell).hasClass('snakeBody4') || $('#cell' + preyCell).hasClass('snakeBody5') || $('#cell' + preyCell).hasClass('snakeBody6') || $('#cell' + preyCell).hasClass('snakeTail1') || $('#cell' + preyCell).hasClass('snakeTail2') || $('#cell' + preyCell).hasClass('snakeTail3') || $('#cell' + preyCell).hasClass('snakeTail4') || $('#cell' + preyCell).hasClass('snakeHead1') || $('#cell' + preyCell).hasClass('snakeHead2') || $('#cell' + preyCell).hasClass('snakeHead3') || $('#cell' + preyCell).hasClass('snakeHead4')){
      $('#cell' + preyCell).removeClass('preySolo');
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
      $('#cell' + preyCell).removeClass('preySolo');
      addPrey();
      click.play();
      click.currentTime = 0;
      $('#scoreSolo').html(parseInt($('#scoreSolo').html())+10);
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
        e.preventDefault();
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
        e.preventDefault();
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
        e.preventDefault();
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
        e.preventDefault();
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
    background.pause();
    clearInterval(backInterval);
    wilhelm.play();
    for(var x=gridHeight;x>=1;x--){
      for(var y=1;y<=gridWidth;y++){
        $('#cell' + y + '-' + x ).fadeOut(1500);
      }
    }
    $('#infoBox').html('Game Over');
    $('#infoBox').css('left', '250px');
    $('#infoBox').css('top', '180px');
    $('#infoBox').css('font-size', '-webkit-xxx-large');
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
    location.reload();
  }
}

function play(){
  var guileInterval = setInterval(function(){
    guile.pause();
    guile.currentTime = 4500;
    guile.play();
  }, 245616);
  guile.currentTime = 4500;
  guile.play();
  $('#btn1').off();
  $('#btn2').off();
  $(document).off();
  $(document).on('keyup', function(e) {
    if(e.key === 'm'){
      guile.pause();
    }
    else if(e.key){
      guile.play();
    }
  });
  $('.score').show();
  $('.score2').show();
  $('#infoBox').hide();
  var speed = 70;
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
    if ($('#cell' + preyCell).hasClass('snakeBody1') || $('#cell' + preyCell).hasClass('snakeBody2') || $('#cell' + preyCell).hasClass('snakeBody3') || $('#cell' + preyCell).hasClass('snakeBody4') || $('#cell' + preyCell).hasClass('snakeBody5') || $('#cell' + preyCell).hasClass('snakeBody6') || $('#cell' + preyCell).hasClass('snakeTail1') || $('#cell' + preyCell).hasClass('snakeTail2') || $('#cell' + preyCell).hasClass('snakeTail3') || $('#cell' + preyCell).hasClass('snakeTail4') || $('#cell' + preyCell).hasClass('snakeHead1') || $('#cell' + preyCell).hasClass('snakeHead2') || $('#cell' + preyCell).hasClass('snakeHead3') || $('#cell' + preyCell).hasClass('snakeHead4') || $('#cell' + preyCell).hasClass('drakeBody1') || $('#cell' + preyCell).hasClass('drakeBody2') || $('#cell' + preyCell).hasClass('drakeBody3') || $('#cell' + preyCell).hasClass('drakeBody4') || $('#cell' + preyCell).hasClass('drakeBody5') || $('#cell' + preyCell).hasClass('drakeBody6') || $('#cell' + preyCell).hasClass('drakeTail1') || $('#cell' + preyCell).hasClass('drakeTail2') || $('#cell' + preyCell).hasClass('drakeTail3') || $('#cell' + preyCell).hasClass('drakeTail4') || $('#cell' + preyCell).hasClass('drakeHead1') || $('#cell' + preyCell).hasClass('drakeHead2') || $('#cell' + preyCell).hasClass('drakeHead3') || $('#cell' + preyCell).hasClass('drakeHead4')){
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
    if($('#cell' + snakeNewHead).hasClass('snakeBody1') || $('#cell' + snakeNewHead).hasClass('snakeBody2') || $('#cell' + snakeNewHead).hasClass('snakeBody3') || $('#cell' + snakeNewHead).hasClass('snakeBody4') || $('#cell' + snakeNewHead).hasClass('snakeBody5') || $('#cell' + snakeNewHead).hasClass('snakeBody6') || $('#cell' + snakeNewHead).hasClass('snakeTail1') || $('#cell' + snakeNewHead).hasClass('snakeTail2') || $('#cell' + snakeNewHead).hasClass('snakeTail3') || $('#cell' + snakeNewHead).hasClass('snakeTail4') || $('#cell' + snakeNewHead).hasClass('drakeBody1') || $('#cell' + snakeNewHead).hasClass('drakeBody2') || $('#cell' + snakeNewHead).hasClass('drakeBody3') || $('#cell' + snakeNewHead).hasClass('drakeBody4') || $('#cell' + snakeNewHead).hasClass('drakeBody5') || $('#cell' + snakeNewHead).hasClass('drakeBody6') || $('#cell' + snakeNewHead).hasClass('drakeTail1') || $('#cell' + snakeNewHead).hasClass('drakeTail2') || $('#cell' + snakeNewHead).hasClass('drakeTail3') || $('#cell' + snakeNewHead).hasClass('drakeTail4') || $('#cell' + drakeNewHead).hasClass('snakeHead1') || $('#cell' + drakeNewHead).hasClass('snakeHead2') || $('#cell' + drakeNewHead).hasClass('snakeHead3') || $('#cell' + drakeNewHead).hasClass('snakeHead4')){
      console.log('Game Over');
      clearInterval(refreshSnake);
      clearInterval(refreshDrake);
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
      clearInterval(refreshSnake);
      clearInterval(refreshDrake);
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
    if($('#cell' + drakeNewHead).hasClass('drakeBody1') || $('#cell' + drakeNewHead).hasClass('drakeBody2') || $('#cell' + drakeNewHead).hasClass('drakeBody3') || $('#cell' + drakeNewHead).hasClass('drakeBody4') || $('#cell' + drakeNewHead).hasClass('drakeBody5') || $('#cell' + drakeNewHead).hasClass('drakeBody6') || $('#cell' + drakeNewHead).hasClass('drakeTail1') || $('#cell' + drakeNewHead).hasClass('drakeTail2') || $('#cell' + drakeNewHead).hasClass('drakeTail3') || $('#cell' + drakeNewHead).hasClass('drakeTail4') || $('#cell' + drakeNewHead).hasClass('snakeBody1') || $('#cell' + drakeNewHead).hasClass('snakeBody2') || $('#cell' + drakeNewHead).hasClass('snakeBody3') || $('#cell' + drakeNewHead).hasClass('snakeBody4') || $('#cell' + drakeNewHead).hasClass('snakeBody5') || $('#cell' + drakeNewHead).hasClass('snakeBody6') || $('#cell' + drakeNewHead).hasClass('snakeTail1') || $('#cell' + drakeNewHead).hasClass('snakeTail2') || $('#cell' + drakeNewHead).hasClass('snakeTail3') || $('#cell' + drakeNewHead).hasClass('snakeTail4') || $('#cell' + drakeNewHead).hasClass('snakeHead1') || $('#cell' + drakeNewHead).hasClass('snakeHead2') || $('#cell' + drakeNewHead).hasClass('snakeHead3') || $('#cell' + drakeNewHead).hasClass('snakeHead4')){
      console.log('Game Over');
      clearInterval(refreshSnake);
      clearInterval(refreshDrake);
      gameOver();
    }
    for(var x=gridHeight;x>=1;x--){
      for(var y=1;y<=gridWidth;y++){
        if(('$cell' + x + '-' + y).hasClass('snakeHead1')){
          if(('$cell' + x + '-' + y).hasClass('drakeHead1') || ('$cell' + x + '-' + y).hasClass('drakeHead3') || ('$cell' + x + '-' + y).hasClass('drakeHead3') || ('$cell' + x + '-' + y).hasClass('drakeHead4')){
            console.log('Game Over');
            clearInterval(refreshSnake);
            clearInterval(refreshDrake);
            gameOver();
          }
        }
        else if(('$cell' + x + '-' + y).hasClass('snakeHead2')){
          if(('$cell' + x + '-' + y).hasClass('drakeHead1') || ('$cell' + x + '-' + y).hasClass('drakeHead3') || ('$cell' + x + '-' + y).hasClass('drakeHead3') || ('$cell' + x + '-' + y).hasClass('drakeHead4')){
            console.log('Game Over');
            clearInterval(refreshSnake);
            clearInterval(refreshDrake);
            gameOver();
          }
        }
        else if(('$cell' + x + '-' + y).hasClass('snakeHead3')){
          if(('$cell' + x + '-' + y).hasClass('drakeHead1') || ('$cell' + x + '-' + y).hasClass('drakeHead3') || ('$cell' + x + '-' + y).hasClass('drakeHead3') || ('$cell' + x + '-' + y).hasClass('drakeHead4')){
            console.log('Game Over');
            clearInterval(refreshSnake);
            clearInterval(refreshDrake);
            gameOver();
          }
        }
        else if(('$cell' + x + '-' + y).hasClass('snakeHead4')){
          if(('$cell' + x + '-' + y).hasClass('drakeHead1') || ('$cell' + x + '-' + y).hasClass('drakeHead3') || ('$cell' + x + '-' + y).hasClass('drakeHead3') || ('$cell' + x + '-' + y).hasClass('drakeHead4')){
            console.log('Game Over');
            clearInterval(refreshSnake);
            clearInterval(refreshDrake);
            gameOver();
          }
        }
      }
    }
  }

  var refreshSnake = setInterval(snakeMove, speed);

  var refreshDrake = setInterval(drakeMove, speed);

  function snakeAddMoveKeys(){
    $(window).keydown(function(e){
      switch (e.key) {
        case 'ArrowUp':
        e.preventDefault();
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
        e.preventDefault();
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
        e.preventDefault();
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
        e.preventDefault();
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
        g.preventDefault();
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
        g.preventDefault();
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
        g.preventDefault();
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
        g.preventDefault();
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
    guile.pause();
    clearInterval(guileInterval);
    wilhelm.play();
    for(var x=gridHeight;x>=1;x--){
      for(var y=1;y<=gridWidth;y++){
        $('#cell' + y + '-' + x ).fadeOut(1500);
      }
    }
    $('#infoBox').html('Game Over');
    $('#infoBox').css('left', '250px');
    $('#infoBox').css('top', '180px');
    $('#infoBox').css('font-size', '-webkit-xxx-large');
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
    location.reload();
  }

}
