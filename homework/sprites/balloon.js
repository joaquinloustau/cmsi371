(function () {
  window.LoustauSprites = window.LoustauSprites || {};
  window.LoustauSprites.balloon = (function () {
    var KAPPA = (4 * (Math.sqrt(2) - 1)) / 3; 
    //Credit to Adam Stanislav: http://www.whizkidtech.redprince.net/bezier/circle/
    var WIDTH_FACTOR = 0.0333;
    var HEIGHT_FACTOR = 0.4;
    var TIE_WIDTH_FACTOR = 0.12;
    var TIE_HEIGHT_FACTOR = 0.10;
    var TIE_CURVE_FACTOR = 0.13;
    var GRADIENT_FACTOR = 0.3;
    var GRADIENT_CIRCLE_RADIUS = 3;
    var DEFAULT_CENTER_X = 0;
    var DEFAULT_CENTER_Y = 0;
    var DEFAULT_RADIUS = 80;
    var DEFAULT_BASE_COLOR = "rgb(229,45,45)";
    var DEFAULT_DARK_COLOR = "rgb(204,0,0)";
    var DEFAULT_LIGHT_COLOR = "rgb(255,76,76)";

    var createShape = function (ctx, options) {
      var centerX = options.centerX || DEFAULT_CENTER_X;
      var centerY = options.centerY || DEFAULT_CENTER_Y;
      var radius = options.radius || DEFAULT_RADIUS;
      var handleLength = KAPPA * radius;
      var widthDiff = radius * WIDTH_FACTOR;
      var heightDiff = radius * HEIGHT_FACTOR;
      var balloonBottomY = centerY + radius + heightDiff;


      // Begin balloon path 
      ctx.beginPath();

      // Top Left Curve 
      var topLeftCurveStartX = centerX - radius;
      var topLeftCurveStartY = centerY;
        
      var topLeftCurveEndX = centerX;
      var topLeftCurveEndY = centerY - radius;
        
      ctx.moveTo(topLeftCurveStartX, topLeftCurveStartY);
      ctx.bezierCurveTo(topLeftCurveStartX, topLeftCurveStartY - handleLength - widthDiff,
                    topLeftCurveEndX - handleLength, topLeftCurveEndY,
                    topLeftCurveEndX, topLeftCurveEndY);
                    
      // Top Right Curve  
      var topRightCurveStartX = centerX;
      var topRightCurveStartY = centerY - radius;
        
      var topRightCurveEndX = centerX + radius;
      var topRightCurveEndY = centerY;
        
      ctx.bezierCurveTo(topRightCurveStartX + handleLength + widthDiff, topRightCurveStartY,
                    topRightCurveEndX, topRightCurveEndY - handleLength,
                    topRightCurveEndX, topRightCurveEndY);
                          
      // Bottom Right Curve  
      var bottomRightCurveStartX = centerX + radius;
      var bottomRightCurveStartY = centerY;
        
      var bottomRightCurveEndX = centerX;
      var bottomRightCurveEndY = balloonBottomY;
        
      ctx.bezierCurveTo(bottomRightCurveStartX, bottomRightCurveStartY + handleLength,
                    bottomRightCurveEndX + handleLength, bottomRightCurveEndY,
                    bottomRightCurveEndX, bottomRightCurveEndY);              
        
      // Bottom Left Curve
      var bottomLeftCurveStartX = centerX;
      var bottomLeftCurveStartY = balloonBottomY;
      
      var bottomLeftCurveEndX = centerX - radius;
      var bottomLeftCurveEndY = centerY;
      
      ctx.bezierCurveTo(bottomLeftCurveStartX - handleLength, bottomLeftCurveStartY,
                  bottomLeftCurveEndX, bottomLeftCurveEndY + handleLength,
                  bottomLeftCurveEndX, bottomLeftCurveEndY);
    }
      

    var colorBalloon = function (ctx, options) {
      var radius = options.radius || DEFAULT_RADIUS;
      var centerX = options.centerX || DEFAULT_CENTER_X;
      var centerY = options.centerY || DEFAULT_CENTER_Y;
      var heightDiff = radius * HEIGHT_FACTOR; 
      var lightColor = options.lightColor || DEFAULT_LIGHT_COLOR;
      var darkColor = options.darkColor || DEFAULT_DARK_COLOR;


      // Create balloon gradient
      var gradientOffset = radius / 3; 
      
      var balloonGradient =
      ctx.createRadialGradient(centerX + gradientOffset, centerY - gradientOffset, GRADIENT_CIRCLE_RADIUS,
                        centerX, centerY, radius + heightDiff);
      balloonGradient.addColorStop(0, lightColor);
      balloonGradient.addColorStop(0.7, darkColor);
      
      ctx.fillStyle = balloonGradient;
      ctx.fill();
   
      //Create and Fill Tie
      var halfTieWidth = (radius * TIE_WIDTH_FACTOR)/2;
      var tieHeight = (radius * TIE_HEIGHT_FACTOR);
      var tieCurveHeight = (radius * TIE_CURVE_FACTOR);
      var balloonBottomY = centerY + radius + heightDiff;

      ctx.beginPath();
      ctx.moveTo(centerX - 1, balloonBottomY);
      ctx.lineTo(centerX - halfTieWidth, balloonBottomY + tieHeight);
      ctx.quadraticCurveTo(centerX, balloonBottomY + tieCurveHeight,
                    centerX + halfTieWidth, balloonBottomY + tieHeight);
      ctx.lineTo(centerX + 1, balloonBottomY);
      ctx.restore();
      ctx.fill();
    }
   
    var drawBalloon = function (ctx, options) {
      createShape(ctx, options);
      colorBalloon(ctx, options);
    } 

    return {draw: drawBalloon};
  })();
}());