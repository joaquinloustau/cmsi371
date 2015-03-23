/*
 * This is a very simple module that demonstrates rudimentary,
 * pixel-level image processing.
 */
var Nanoshop = {

  /*
   * Applies the given filter to the given ImageData object,
   * then modifies its pixels according to the given filter.
   *
   * A filter is a function (x, y, r, g, b, a) that returns another
   * pixel as a 4-element array representing an RGBA value.
   */

  applyFilter: function (imageData, filter) {
    // For every pixel, replace with something determined by the filter.
    var pixelArray = imageData.data;

    for (var i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {

        var pixel = filter(
            pixelArray[i], pixelArray[i + 1], pixelArray[i + 2], pixelArray[i + 3]
        );

        for (var j = 0; j < 4; j += 1) {
            pixelArray[i + j] = pixel[j];
        }
    }
    return imageData;
  },

  //Options of filters to choose from:

  basicDarkener: function (r,g,b,a) {
    return [r / 2, g / 2, b / 2, a];
  },

  grayScaler: function (r,g,b,a) { // JD: 1
    var grayscaleValue = 0.21 * r + 0.72 * g + 0.07 * b; // JD: 2
    // Credit for luminosity formula: http://www.johndcook.com/blog/2009/08/24/algorithms-convert-color-grayscale/
    return [grayscaleValue, grayscaleValue, grayscaleValue, a];
  },

  sepia: function (r,g,b,a) {
    // JD: 3...compare to:
    /*

    var outputRed = (r * .393) + (g *.769) + (b * .189);
    var outputGreen = (r * .349) + (g *.686) + (b * .168);
    var outputBlue = (r * .272) + (g *.534) + (b * .131);
    var clampTo255 = function (colorComponent) {
          return colorComponent > 255 ? 255 : colorComponent;
        };

    return [ clampTo255(outputRed), clampTo255(outputGreen), clampTo255(outputBlue), a];

    */
    // ^^^^^ No repeated computations, no repeated code.
    var outputRed = (r * .393) + (g *.769) + (b * .189) < 255 ? (r * .393) + (g *.769) + (b * .189) : 255;
    var outputGreen = (r * .349) + (g *.686) + (b * .168) < 255 ? (r * .349) + (g *.686) + (b * .168) : 255;
    var outputBlue = (r * .272) + (g *.534) + (b * .131) < 255 ? (r * .272) + (g *.534) + (b * .131) : 255;
    //Credit for Sepia toning: http://www.techrepublic.com/blog/how-do-i/how-do-i-convert-images-to-grayscale-and-sepia-tone-using-c/

    return [outputRed, outputGreen, outputBlue, a];
  }
};
