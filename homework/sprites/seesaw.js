(function () {
  window.LoustauSprites = window.LoustauSprites || {};
  window.LoustauSprites.Seesaw = (function () {
    var leverLength = 5;
    var inclination = 0;
    var DEFAULT_X_FULCRUM = 0;
    var DEFAULT_Y_FULCRUM = 0;
    var DEFAULT_HEIGHT_FULCRUM = 20;
    var DEFAULT_LENGTH_LEVER = 250;
    var DEFAULT_INCLINATION = 0

var drawSeesaw = function (ctx, options) {
    ctx.linewidth = 1;
    ctx.save();
    ctx.translate(200,200);
    var xFulcrum = options.xFulcrum || DEFAULT_X_FULCRUM;
    var yFulcrum = options.yFulcrum || DEFAULT_Y_FULCRUM;
    var heightFulcrum = options.heightFulcrum || DEFAULT_HEIGHT_FULCRUM;
    var lengthLever = options.lengthLever || DEFAULT_LENGTH_LEVER;
    var inclination = options.inclination || DEFAULT_INCLINATION;
    var angle = Math.asin(heightFulcrum/(lengthLever/2));
    var inclination = 0;
    ctx.beginPath();
    ctx.arc(xFulcrum,yFulcrum+heightFulcrum,heightFulcrum,0, Math.PI, true);
    ctx.lineTo(xFulcrum+heightFulcrum,yFulcrum+heightFulcrum);
    ctx.stroke();
    //draw Lever
    ctx.beginPath();
    ctx.rotate(angle*inclination);
    ctx.moveTo(xFulcrum - (lengthLever/2), yFulcrum);
    ctx.lineTo(xFulcrum + (lengthLever/2), yFulcrum);
    ctx.rotate(1*heightFulcrum/(lengthLever/2));
    ctx.stroke();
}

    return {draw: drawSeesaw};
  })();
}());