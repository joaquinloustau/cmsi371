/*
 * This demo script uses the NanoshopNeighborhood module to apply a
 * "pixel neighborhood" filter on a canvas drawing.
 */
(function () {
  var canvas = $("#picture")[0],
      ctx = canvas.getContext("2d"),
      gradient;

  ctx.translate(200, 200);
  LoustauSprites.balloon.draw(ctx, {radius: 40, lightColor: "#4c4cff", darkColor: "#000033"});
  ctx.translate(200, 0);
  LoustauSprites.seesaw.draw(ctx, {inclination: 0.5});
  ctx.translate(200, 50);
  LoustauSprites.minion.draw(ctx, {posRight: 1 , posLeft: -1});
  ctx.translate(100, 00);
  LoustauSprites.minion.draw(ctx, {numberOfTeeth: 3, posRight: -1 , posLeft: 1 });

  // Set a little event handler to apply the filter.
  $("#apply-filter-darken").click(function () {
    ctx.putImageData(
      NanoshopNeighborhood.applyFilter(
        ctx,
        ctx.getImageData(0, 0, canvas.width, canvas.height),
        NanoshopNeighborhood.neighborDarkener
      ),
      0, 0
    );
  });

  $("#apply-filter-average").click(function () {
    ctx.putImageData(
      NanoshopNeighborhood.applyFilter(
        ctx,
        ctx.getImageData(0, 0, canvas.width, canvas.height),
        NanoshopNeighborhood.neighborAverager
      ),
      0, 0
    );
  });

  $("#apply-filter-maximum").click(function () {
    ctx.putImageData(
      NanoshopNeighborhood.applyFilter(
        ctx,
        ctx.getImageData(0, 0, canvas.width, canvas.height),
        NanoshopNeighborhood.neighborMaximum
      ),
      0, 0
    );
  });

  $("#apply-filter-difference").click(function () {
    ctx.putImageData(
      NanoshopNeighborhood.applyFilter(
        ctx,
        ctx.getImageData(0, 0, canvas.width, canvas.height),
        NanoshopNeighborhood.neighborDifference
      ),
      0, 0
    );
  });
}());