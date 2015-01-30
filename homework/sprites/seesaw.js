(function () {
  window.LoustauSprites = window.LoustauSprites || {};
  window.LoustauSprites.Seesaw = (function () {
    var leverLength = 5;
    var DEFAULT_X_FULCRUM = 0;
    var DEFAULT_Y_FULCRUM = 0;
    var DEFAULT_HEIGHT_FULCRUM = 20;
    var DEFAULT_LENGTH_LEVER = 250;
    var DEFAULT_INCLINATION = 1;

    var drawSeesaw = function (ctx, options) {
        ctx.linewidth = 1;
        ctx.save();
        var xFulcrum = options.xFulcrum || DEFAULT_X_FULCRUM;
        var yFulcrum = options.yFulcrum || DEFAULT_Y_FULCRUM;
        var heightFulcrum = options.heightFulcrum || DEFAULT_HEIGHT_FULCRUM;
        var lengthLever = options.lengthLever || DEFAULT_LENGTH_LEVER;
        var inclination = options.inclination || DEFAULT_INCLINATION;
        var angle = Math.asin(heightFulcrum/(lengthLever/2));
        var imageObj = new Image();
       
        //draw Fulcrum
        ctx.beginPath();
        ctx.arc(xFulcrum,yFulcrum+heightFulcrum,heightFulcrum,0, Math.PI, true);
        ctx.lineTo(xFulcrum+heightFulcrum,yFulcrum+heightFulcrum);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
        //draw Lever
        ctx.beginPath();
        ctx.rotate(angle*inclination);
        ctx.moveTo(xFulcrum - (lengthLever/2), yFulcrum);
        ctx.lineTo(xFulcrum + (lengthLever/2), yFulcrum);
        ctx.lineTo(xFulcrum + (lengthLever/2), yFulcrum-10);
        ctx.lineTo(xFulcrum - (lengthLever/2), yFulcrum-10);
        ctx.lineTo(xFulcrum - (lengthLever/2), yFulcrum);
        ctx.fillStyle = "brown";
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    return {draw: drawSeesaw};
  })();
}());