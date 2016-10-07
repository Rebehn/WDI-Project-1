// $(function(){
  console.log('loaded');
  var gridWidth = 20;
  var gridHeight = 20;
  for(var x=gridHeight;x>=1;x--){
    for(var y=1;y<=gridWidth;y++){
      $('.content').append("<div class='cell' id='cell" + y + "-"+ x + "'>(" + y + "," + x + ")</div>");
    }
  }

  console.log($('#cell3-1'));
  $('#cell3-1').addClass('snakeHead');
  $('#cell2-1').addClass('snakeBody');
  $('#cell1-1').addClass('snakeTail');

  function addPrey(){
    var xPrey = Math.floor(Math.random()*gridWidth);
    var yPrey = Math.floor(Math.random()*gridWidth);
    $('#cell' + xPrey + '-' + yPrey).addClass('prey');
  }
// });
