(function () {
    window.LoustauSprites = window.LoustauSprites || {};
    window.LoustauSprites.Minion = (function () {
  	var canvas = document.getElementById('tutorial');
    var ctx = canvas.getContext('2d');
    ctx.linewidth = 1;
    ctx.save();

    var roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
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

    var drawEyes = function (ctx, options) {
      var colorGlasses = "grey";
      var eyesize = 4;
      ctx.beginPath();
      ctx.arc(195,200,10,0,Math.PI*2);
      ctx.moveTo(225,200);
      ctx.arc(215,200,10,0,Math.PI*2);
      ctx.fillStyle = "white";
      ctx.strokeStyle = colorGlasses;
      ctx.lineWidth = 4;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(197 - eyesize/2,200);
      ctx.arc(197 - eyesize/2,200,eyesize,0,Math.PI*2);
      ctx.moveTo(217 - eyesize/2,200);
      ctx.arc(217 - eyesize/2,200,eyesize,0,Math.PI*2);
      ctx.rect(175,195,8,5);
      ctx.rect(226,195,8,5);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.stroke();    
    }

    var drawMouth = function (ctx, options) {
      ctx.fillStyle = "#F88280";
      var isSad = false;
      if (isSad) {
        ctx.beginPath();
        ctx.arc(205,235,15,0,Math.PI,true);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(205,220,15,0,Math.PI,false);
        ctx.lineTo(220,220);
        ctx.fill();
        ctx.stroke();
        drawTeeth(ctx);
      };
    }

    var drawTeeth = function (ctx, options) {
      ctx.fillStyle = "white";
      var numberOfTeeth = 6;
      var widthOfTeeth = numberOfTeeth * 5;
      for (x=190+((30-widthOfTeeth)/2); x<220-((30-widthOfTeeth)/2); x=x+5) {
        roundRect(ctx, x, 220, 5, 4, 2, true, true);
      }
    }

    var drawOverall = function (ctx, options) {
      var colorOverall = "#146696"; 
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
      ctx.fillStyle = colorOverall;
      ctx.fill();
      ctx.strokeStyle="1f4362";
      ctx.stroke();  
    }
    
    drawArms = function (ctx) {
        var posRight = -1;
        var posLeft = 1;
        ctx.beginPath();
        ctx.fillStyle = "#fcda6d";
        //Right arm
        ctx.moveTo(238,245);
        ctx.lineTo(235,245);
        ctx.lineTo(220,255);
        ctx.lineTo(238,255);
        ctx.moveTo(238,250);
        ctx.moveTo(238,250-(5*posRight));
        ctx.lineTo(238,(250-(5*posRight))-(10*posRight));
        ctx.lineTo(245,(250-(5*posRight))-(10*posRight));
        ctx.lineTo(245,(250+5*posRight));
        ctx.lineTo(238,(250+5*posRight));
        ctx.fill();
        ctx.stroke();
        //Left arm
        ctx.moveTo(172,245);
        ctx.lineTo(175,245);
        ctx.lineTo(190,255);
        ctx.lineTo(172,255);
        ctx.moveTo(172,250);
        ctx.moveTo(172,250-(5*posLeft));
        ctx.lineTo(172,(250-(5*posLeft))-(10*posLeft));
        ctx.lineTo(165,(250-(5*posLeft))-(10*posLeft));
        ctx.lineTo(165,(250+5*posLeft));
        ctx.lineTo(172,(250+5*posLeft));
        ctx.fill();
        ctx.stroke();
        
    }
    var draw = function (ctx, options) {
      drawBody(ctx);
      drawArms(ctx);
      drawEyes(ctx);
      drawMouth(ctx);
      drawOverall(ctx); 
    } 
  })
})