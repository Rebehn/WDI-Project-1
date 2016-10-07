// $(function(){
  console.log('loaded');
  var gridWidth = 20;
  var gridHeight = 20;
  for(var x=gridHeight;x>=1;x--){
    for(var y=1;y<=gridWidth;y++){
      $('.content').append("<div class='cell' id='cell" + y + "-"+ x + "'>(" + y + "," + x + ")</div>");
    }
  }

  $('#cell4-1').addClass('snakeHead');
  $('#cell3-1').addClass('snakeBody');
  $('#cell2-1').addClass('snakeBody');
  $('#cell1-1').addClass('snakeTail');

  function addPrey(){
    var xPrey = Math.floor(Math.random()*gridWidth);
    var yPrey = Math.floor(Math.random()*gridWidth);
    $('#cell' + xPrey + '-' + yPrey).addClass('prey');
  }

  var snake = ['1-1','2-1','3-1','4-1'];
  function move(){
    $('#cell' + snake[0]).removeClass('snakeTail');
    $('#cell' + snake[1]).removeClass('snakeBody').addClass('snakeTail');
    $('#cell' + snake[snake.length-1]).removeClass('snakeHead').addClass('snakeBody');
    var newHeadX = parseInt(snake[snake.length-1].split("-")[0]) + 1;
    var newHeadY = snake[snake.length-1].split("-").pop();
    var newHead = (newHeadX + "-" + newHeadY);
    $('#cell' + newHead).addClass('snakeHead');
    snake.push(newHead);
    snake.shift();
    console.log(snake);
  }

// });
