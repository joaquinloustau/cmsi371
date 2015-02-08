(function () {
  window.LoustauSprites = window.LoustauSprites || {};
  window.LoustauSprites.Seesaw = (function () {
    var DEFAULT_X_FULCRUM = 0;
    var DEFAULT_Y_FULCRUM = 0;
    var DEFAULT_HEIGHT_FULCRUM = 20;
    var DEFAULT_COLOR_FULCRUM = "#4c4c4c"
    var DEFAULT_LENGTH_LEVER = 250;
    var DEFAULT_COLOR_LEVER = "#421010" 
    var DEFAULT_INCLINATION = 1;


    var drawSeesaw = function (canvasID, options) {
        var canvas = document.getElementById(canvasID);
        var ctx = canvas.getContext('2d');
        ctx.linewidth = 1;
        ctx.save();
        var xFulcrum = options.xFulcrum || DEFAULT_X_FULCRUM;
        var yFulcrum = options.yFulcrum || DEFAULT_Y_FULCRUM;
        var heightFulcrum = options.heightFulcrum || DEFAULT_HEIGHT_FULCRUM;
        var colorFulcrum = options.colorFulcrum || DEFAULT_COLOR_FULCRUM;
        var lengthLever = options.lengthLever || DEFAULT_LENGTH_LEVER;
        var inclination = options.inclination || DEFAULT_INCLINATION;
        var colorLever = options.colorLever || DEFAULT_COLOR_LEVER;
        var angle = Math.asin(heightFulcrum/(lengthLever/2));
        var imageObj = new Image();
       
        //draw Fulcrum
        ctx.beginPath();
        ctx.arc(xFulcrum,yFulcrum+heightFulcrum,heightFulcrum,0, Math.PI, true); // JD: 1, 6
        ctx.lineTo(xFulcrum+heightFulcrum,yFulcrum+heightFulcrum); // JD: 1, 6
        ctx.fillStyle = colorFulcrum;
        ctx.fill();
        ctx.stroke();

        //draw Lever
        ctx.beginPath();
        ctx.rotate(angle*inclination);
        ctx.moveTo(xFulcrum - (lengthLever/2), yFulcrum); // JD: 6 ...etc.
        ctx.lineTo(xFulcrum + (lengthLever/2), yFulcrum);
        ctx.lineTo(xFulcrum + (lengthLever/2), yFulcrum-10);
        ctx.lineTo(xFulcrum - (lengthLever/2), yFulcrum-10);
        ctx.lineTo(xFulcrum - (lengthLever/2), yFulcrum);
        ctx.fillStyle = colorLever;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    return {draw: drawSeesaw};
  })();
}());