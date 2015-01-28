var Minion = (function () {
	var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
ctx.linewidth = 1;
ctx.save();

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }
}

var drawBody = function (ctx) {
    ctx.fillStyle = "#fcda6d";
    roundRect(ctx, 175, 175, 60, 100, 25, true, true);
};

var drawEyes = function (ctx) {
    //ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    
    ctx.beginPath();
    ctx.arc(195,200,10,0,Math.PI*2,true);
    ctx.moveTo(225,200);
    ctx.arc(215,200,10,0,Math.PI*2,true);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.beginPath();
    ctx.moveTo(200,200);
    ctx.arc(195,200,4,0,Math.PI*2,true);
    ctx.moveTo(220,200);
    ctx.arc(215,200,4,0,Math.PI*2,true);
    ctx.rect(175,195,10,5);
    ctx.rect(225,195,10,5);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();    
}

var drawMouth = function (ctx) {
    ctx.beginPath();
    ctx.arc(205,220,15,0,Math.PI,false);
    ctx.lineTo(220,220);
    ctx.fillStyle = "#F88280";
    ctx.fill();
    ctx.stroke();
}

var drawOverall = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(175,235);
    ctx.lineTo(190,245);
    ctx.lineTo(220,245);
    ctx.lineTo(235,235);
    ctx.lineTo(235,245);
    ctx.lineTo(220,255);
    ctx.lineTo(235,255);
    ctx.quadraticCurveTo(235, 265, 220, 275);
    ctx.lineTo(190,275);
    ctx.quadraticCurveTo(175, 265, 175, 255);
    ctx.lineTo(190,255);
    ctx.lineTo(175,245);
    ctx.lineTo(175,235);
    ctx.fillStyle = "#146696";
    ctx.fill();
    ctx.strokeStyle="1f4362";
    ctx.stroke();  
}

drawBody(ctx);
drawEyes(ctx);
drawMouth(ctx);
drawOverall(ctx); 
})