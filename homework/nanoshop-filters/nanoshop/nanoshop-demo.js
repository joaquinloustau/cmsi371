/*
 * This demo script uses the Nanoshop module to apply a simple
 * filter on a canvas drawing.
 */
(function () {
  var canvas = $("#picture")[0],
      ctx = canvas.getContext('2d');

  ctx.translate(200, 200);
  LoustauSprites.balloon.draw(ctx, {radius: 40, lightColor: "#4c4cff", darkColor: "#000033"});
  ctx.translate(200, 0);
  LoustauSprites.seesaw.draw(ctx, {inclination: 0.5});
  ctx.translate(200, 50);
  LoustauSprites.minion.draw(ctx, {posRight: 1 , posLeft: -1});
  ctx.translate(100, 00);
  LoustauSprites.minion.draw(ctx, {numberOfTeeth: 3, posRight: -1 , posLeft: 1 });

  // Set a little event handler to apply the filter.
  $("#apply-filter-button").click(function () {
    // Filter time.
    ctx.putImageData(
      Nanoshop.applyFilter(
        ctx.getImageData(0, 0, canvas.width, canvas.height),
        // This is a basic "darkener."
        function (x, y, r, g, b, a) {
            return [r / 2, g / 2, b / 2, a];
        }
      ),
      0, 0
    );
  });
}());
