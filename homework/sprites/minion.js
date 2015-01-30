(function () {
  window.LoustauSprites = window.LoustauSprites || {};
  window.LoustauSprites.Minion = (function () {
    var DEFAULT_BODY_COLOR = "#fcda6d";
    var DEFAULT_OVERALL_COLOR = "#146696";
    var DEFAULT_NUMBER_OR_TEETH = 6;
    var DEFAULT_POS_RIGHT = 1;
    var DEFAULT_POS_LEFT = 1;
    var DEFAULT_EYE_SIZE = 4;
    var DEFAULT_COLOR_GLASSES = "#737373";
    var DEFAULT_IS_SAD = false;
    var MINION_HEIGHT = 100;
    var MINION_WIDTH =  60;



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

    var drawBody = function (ctx, options) {
      ctx.fillStyle = options.bodyColor || DEFAULT_BODY_COLOR;
      roundRect(ctx, 0, 0, MINION_WIDTH, MINION_HEIGHT, 25, true, true);
    };

    var drawEyes = function (ctx, options) {
      var colorGlasses = options.colorGlasses || DEFAULT_COLOR_GLASSES;
      var eyesize = options.eyesize || DEFAULT_EYE_SIZE;
      ctx.beginPath();
      ctx.arc(20,25,10,0,Math.PI*2);
      ctx.moveTo(50,25);
      ctx.arc(40,25,10,0,Math.PI*2);
      ctx.fillStyle = "white";
      ctx.strokeStyle = colorGlasses;
      ctx.lineWidth = 4;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(22 - eyesize/2,25);
      ctx.arc(22 - eyesize/2,25,eyesize,0,Math.PI*2);
      ctx.moveTo(42 - eyesize/2,25);
      ctx.arc(42 - eyesize/2,25,eyesize,0,Math.PI*2);
      ctx.rect(0,20,8,5);
      ctx.rect(51,20,8,5);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.stroke();    
    }

    var drawMouth = function (ctx, options) {
      ctx.fillStyle = "#F88280";
      var isSad = options.sad || DEFAULT_IS_SAD;
      if (isSad) {
        ctx.beginPath();
        ctx.arc(30,60,15,0,Math.PI,true);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(30,45,15,0,Math.PI,false);
        ctx.lineTo(45,45);
        ctx.fill();
        ctx.stroke();
        drawTeeth(ctx, options);
      };
    }

    var drawTeeth = function (ctx, options) {
      ctx.fillStyle = "white";
      var numberOfTeeth = options.numberOfTeeth || DEFAULT_NUMBER_OR_TEETH;
      var widthOfTeeth = numberOfTeeth * 5;
      for (x=15+((30-widthOfTeeth)/2); x<45-((30-widthOfTeeth)/2); x=x+5) {
        roundRect(ctx, x, 45, 5, 4, 2, true, true);
      }
    }

    var drawOverall = function (ctx, options) {
      var colorOverall = options.colorOverall || DEFAULT_OVERALL_COLOR;
      ctx.beginPath();
      ctx.moveTo(0,60);
      ctx.lineTo(15, 70);
      ctx.lineTo(45,70);
      ctx.lineTo(60,60);
      ctx.lineTo(60,70);
      ctx.lineTo(45,80);
      ctx.lineTo(60,80);
      ctx.quadraticCurveTo(60, 90, 45, 100);
      ctx.lineTo(15,100);
      ctx.quadraticCurveTo(0, 90, 0, 80);
      ctx.lineTo(15,80);
      ctx.lineTo(0,70);
      ctx.lineTo(0,60);
      ctx.fillStyle = colorOverall;
      ctx.fill();
      ctx.strokeStyle="1f4362";
      ctx.stroke();  
    }

    drawArms = function (ctx, options) {
        var posRight = options.posRight || DEFAULT_POS_RIGHT;
        var posLeft = options.posLeft || DEFAULT_POS_LEFT;
        ctx.beginPath();
        ctx.fillStyle = options.bodyColor || DEFAULT_BODY_COLOR;
        ctx.strokeStyle="1f4362";
        //Right arm
        ctx.moveTo(63,70);
        ctx.lineTo(61,70);
        ctx.lineTo(45,80);
        ctx.lineTo(63,80);
        ctx.moveTo(63,75);
        ctx.moveTo(63,75-(5*posRight));
        ctx.lineTo(63,(75-(5*posRight))-(10*posRight));
        ctx.lineTo(70,(75-(5*posRight))-(10*posRight));
        ctx.lineTo(70,(75+5*posRight));
        ctx.lineTo(63,(75+5*posRight));
        ctx.fill();
        ctx.stroke();
        //Left arm
        ctx.strokeStyle="1f4362";
        ctx.moveTo(-3,70);
        ctx.lineTo(0,70);
        ctx.lineTo(15,80);
        ctx.lineTo(-3,80);
        ctx.moveTo(-3,75);
        ctx.moveTo(-3,75-(5*posLeft));
        ctx.lineTo(-3,(75-(5*posLeft))-(10*posLeft));
        ctx.lineTo(-10,(75-(5*posLeft))-(10*posLeft));
        ctx.lineTo(-10,(75+5*posLeft));
        ctx.lineTo(-3,(75+5*posLeft));
        ctx.fill();
        ctx.stroke();
        
    }
    var drawMinion = function (canvasID, options) {
      var canvas = document.getElementById(canvasID);
      var ctx = canvas.getContext('2d');
      ctx.linewidth = 1;
      ctx.save();
      drawBody(ctx, options);
      drawArms(ctx, options);
      drawEyes(ctx, options);
      drawMouth(ctx, options);
      drawOverall(ctx, options); 
    } 

    return {draw: drawMinion};
  })();
}());