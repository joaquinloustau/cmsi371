var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
ctx.linewidth = 1;
ctx.save();

var drawPivot = function (ctx) {
    ctx.beginPath();
    ctx.arc(195,200,25,0, Math.PI, true);
    ctx.lineTo(220,200);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

var drawPivot = function (ctx) {
    ctx.beginPath();
    ctx.arc(195,200,25,0, Math.PI, true);
    ctx.lineTo(220,200);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

drawPivot(ctx);
