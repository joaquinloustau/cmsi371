(function () {
  window.LoustauSprites = window.LoustauSprites || {};
  window.LoustauSprites.minion = (function () {
    var DEFAULT_BODY_COLOR = "rgb(252, 218, 109)";
    var DEFAULT_OVERALL_COLOR = "rgb(20, 102, 150)";
    var DEFAULT_NUMBER_OR_TEETH = 6;
    var DEFAULT_POS_RIGHT = 1;
    var DEFAULT_POS_LEFT = 1;
    var DEFAULT_EYE_SIZE = 4;
    var DEFAULT_COLOR_GLASSES = "rgb(115,115,115)";
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
      roundRect(ctx, -30, -50, MINION_WIDTH, MINION_HEIGHT, 25, true, true);
    };

    var drawEyes = function (ctx, options) {
      var colorGlasses = options.colorGlasses || DEFAULT_COLOR_GLASSES;
      var eyesize = options.eyesize || DEFAULT_EYE_SIZE;
      ctx.beginPath();
      ctx.arc(-10, -25, 10, 0, Math.PI * 2); 
      ctx.moveTo(20, -25); 
      ctx.arc(10, -25, 10, 0, Math.PI * 2); 
      ctx.fillStyle = "white";
      ctx.strokeStyle = colorGlasses;
      ctx.lineWidth = 4;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(-8 - eyesize / 2, -25);
      ctx.arc(-8 - eyesize / 2, -25, eyesize, 0, Math.PI * 2);
      ctx.moveTo(12 - eyesize / 2, -25);
      ctx.arc(12 - eyesize / 2, -25, eyesize, 0, Math.PI * 2);
      ctx.rect(-30, -30, 8, 5);
      ctx.rect(21, -30, 8, 5);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.stroke();    
    }

    var drawMouth = function (ctx, options) {
      ctx.fillStyle = "rgb(248, 130, 128)";
      var isSad = options.sad || DEFAULT_IS_SAD;
      if (isSad) {
        ctx.beginPath();
        ctx.arc(0, 10, 15, 0, Math.PI, true);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(0, -5, 15, 0, Math.PI, false);
        ctx.lineTo(15, -5);
        ctx.fill();
        ctx.stroke();
        drawTeeth(ctx, options);
      };
    }

    var drawTeeth = function (ctx, options) {
      ctx.fillStyle = "white";
      var numberOfTeeth = options.numberOfTeeth || DEFAULT_NUMBER_OR_TEETH;
      var widthOfTeeth = numberOfTeeth * 5;
      for (x = -15 + ((30 - widthOfTeeth) / 2); x < 15 - ((30 - widthOfTeeth) / 2); x = x + 5) {
        roundRect(ctx, x, -5, 5, 4, 2, true, true);
      }
    }

    var drawOverall = function (ctx, options) {
      var colorOverall = options.colorOverall || DEFAULT_OVERALL_COLOR;
      ctx.beginPath();
      ctx.moveTo(-30, 10);
      ctx.lineTo(-15, 20);
      ctx.lineTo(15, 20);
      ctx.lineTo(30, 10);
      ctx.lineTo(30, 20);
      ctx.lineTo(15, 30);
      ctx.lineTo(30, 30);
      ctx.quadraticCurveTo(30, 40, 15, 50);
      ctx.lineTo(-15, 50);
      ctx.quadraticCurveTo(-30, 40, -30, 30);
      ctx.lineTo(-15, 30);
      ctx.lineTo(-30, 20);
      ctx.lineTo(-30, 10);
      ctx.fillStyle = colorOverall;
      ctx.fill();
      ctx.strokeStyle = "rgb(31, 67, 98)";
      ctx.stroke();  
    }

    drawArms = function (ctx, options) {
        var posRight = options.posRight || DEFAULT_POS_RIGHT;
        var posLeft = options.posLeft || DEFAULT_POS_LEFT;
        ctx.beginPath();
        ctx.fillStyle = options.bodyColor || DEFAULT_BODY_COLOR;
        ctx.strokeStyle = "rgb(31, 67, 98)";
        //Right arm
        ctx.moveTo(33, 20);
        ctx.lineTo(31, 20);
        ctx.lineTo(15, 30);
        ctx.lineTo(33, 30);
        ctx.moveTo(33, 25);
        ctx.moveTo(33, 25 - (5 * posRight));
        ctx.lineTo(33, (25 -(5 * posRight)) - (10 * posRight));
        ctx.lineTo(40, (25 -(5 * posRight)) - (10 * posRight));
        ctx.lineTo(40, (25 + 5 * posRight));
        ctx.lineTo(33, (25 + 5 * posRight));
        ctx.fill();
        ctx.stroke();
        //Left arm
        ctx.strokeStyle = "rgb(31, 67, 98)";
        ctx.moveTo(-33, 20);
        ctx.lineTo(-30, 20);
        ctx.lineTo(-15, 30);
        ctx.lineTo(-33, 30);
        ctx.moveTo(-33, 25);
        ctx.moveTo(-33, 25 - (5 * posLeft));
        ctx.lineTo(-33, (25 - (5 * posLeft)) - (10 * posLeft));
        ctx.lineTo(-40, (25 - (5 * posLeft)) - (10 * posLeft));
        ctx.lineTo(-40, (25 + 5 * posLeft));
        ctx.lineTo(-33, (25 + 5 * posLeft));
        ctx.fill();
        ctx.stroke();
        
    }
    var drawMinion = function (ctx, options) {
      console.log('got called');
      console.log(ctx);
      console.log(options);
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