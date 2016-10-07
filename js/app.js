$(function(){
  console.log('loaded');
  var gridWidth = 20;
  var gridHeight = 20;
  for(var x=1;x<=gridWidth;x++){
    for(var y=1;y<=gridHeight;y++){
      $('.content').append("<div class='cell' id='cell(" + x + ","+ y + ")'>(" + x + "," + y + ")</div>");
      console.log("<div class='cell' id='cell(" + x + ","+ y + ")'>(" + x + "," + y + ")</div>");
    }
  }
});
