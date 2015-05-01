/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
// JD: 4(b)
var Matrix3D = (function () {
  // Define the constructor.
  var matrix3D = function () {
    this.elements = arguments.length ? [].slice.call(arguments) :
                    // identity matrix
                    [1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1];
  };

  matrix3D.prototype.multiply = function (matrix2) {
    var matrixResult = [],
        row, col, sum;

    for (row = 0; row < 4; row++) {
      for (col = 0; col < 4; col++) {
        // reset the individual sum each iteration
        sum = 0;
        for (i = 0; i < 4; i++) {
          sum += this.elements[row * 4 + i] * matrix2.elements[i * 4 + col];
      }
      matrixResult[row * 4 + col] = sum;
      }
    }

    return new Matrix3D(
      matrixResult[0],
      matrixResult[1],
      matrixResult[2],
      matrixResult[3],

      matrixResult[4],
      matrixResult[5],
      matrixResult[6],
      matrixResult[7],

      matrixResult[8],
      matrixResult[9],
      matrixResult[10],
      matrixResult[11],

      matrixResult[12],
      matrixResult[13],
      matrixResult[14],
      matrixResult[15]
    );
  };

  //http://myweb.lmu.edu/dondi/share/cg/transforms-v02.pdf
  matrix3D.getTranslationMatrix = function (tx, ty, tz) {
    return new Matrix3D(
      1, 0, 0, tx,
      0, 1, 0, ty,
      0, 0, 1, tz,
      0, 0, 0, 1
    );
  };


  //http://myweb.lmu.edu/dondi/share/cg/transforms-v02.pdf
  matrix3D.getScaleMatrix = function (sx, sy, sz) {
    return new Matrix3D(
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, sz, 0,
      0, 0, 0, 1
    );
  };

  /*
   * Based on the original glRotate reference:
   *     http://www.opengl.org/sdk/docs/man/xhtml/glRotate.xml
   */
  matrix3D.getRotationMatrix = function (angle, rx, ry, rz) {
    // In production code, this function should be associated
    // with a matrix object with associated functions.
    var axisLength = Math.sqrt((rx * rx) + (ry * ry) + (rz * rz)),
      s = Math.sin(angle * Math.PI / 180.0),
      c = Math.cos(angle * Math.PI / 180.0),
      oneMinusC = 1.0 - c,

      // We can't calculate this until we have normalized
      // the axis vector of rotation.
      x2, // "2" for "squared."
      y2,
      z2,
      xy,
      yz,
      xz,
      xs,
      ys,
      zs;

    // Normalize the axis vector of rotation.
    rx /= axisLength;
    ry /= axisLength;
    rz /= axisLength;

    // *Now* we can calculate the other terms.
    x2 = rx * rx;
    y2 = ry * ry;
    z2 = rz * rz;
    xy = rx * ry;
    yz = ry * rz;
    xz = rx * rz;
    xs = rx * s;
    ys = ry * s;
    zs = rz * s;

    // Return result matrix.
    return new Matrix3D(
      (x2 * oneMinusC) + c,
      (xy * oneMinusC) - zs,
      (xz * oneMinusC) + ys,
      0.0,

      (xy * oneMinusC) + zs,
      (y2 * oneMinusC) + c,
      (yz * oneMinusC) - xs,
      0.0,

      (xz * oneMinusC) - ys,
      (yz * oneMinusC) + xs,
      (z2 * oneMinusC) + c,
      0.0,

      0.0,
      0.0,
      0.0,
      1.0
    );
  };

  // JD: 5(b)
  matrix3D.getOrthoMatrix = function (left, right, bottom, top, zNear, zFar) {
    var width = right - left,
      height = top - bottom,
      depth = zFar - zNear;

    return new Matrix3D(
      2.0 / width,
      0.0,
      0.0,
      -(right + left) / width,

      0.0,
      2.0 / height,
      0.0,
      -(top + bottom) / height,

      0.0,
      0.0,
      -2.0 / depth,
      -(zFar + zNear) / depth,

       
      0.0,
      0.0,
      0.0,
      1.0
    );
  };

  matrix3D.getFrustumMatrix = function (left, right, bottom, top, zNear, zFar) {
    var width = right - left,
      height = top - bottom,
      depth = zFar - zNear;

    return new Matrix3D(
      2.0 * zNear / width,
      0.0,
      (right + left) / width,
      0.0,

      0.0,
      2.0 * zNear / height,
      (top + bottom) / height,
      0.0,

      0.0,
      0.0,
      -(zFar + zNear) / depth,
      -2.0 * zFar * zNear / depth,

      0.0,
      0.0,
      -1.0,
      0.0
    );
  };

  matrix3D.prototype.getInstanceMatrix = function (transformations) {
    return (this.multiply(Matrix3D.getTranslationMatrix(
      transformations.tx, transformations.ty, transformations.tz)
      ).multiply(Matrix3D.getScaleMatrix(
        transformations.sx, transformations.sy, transformations.sz)
      ).multiply(Matrix3D.getRotationMatrix(
        transformations.angle, transformations.rx, transformations.ry, transformations.rz))
    );
  };

  matrix3D.prototype.getColumnMajorOrder = function () {
    return new Matrix3D(
        this.elements[0],
        this.elements[4],
        this.elements[8],
        this.elements[12],

        this.elements[1],
        this.elements[5],
        this.elements[9],
        this.elements[13],

        this.elements[2],
        this.elements[6],
        this.elements[10],
        this.elements[14],

        this.elements[3],
        this.elements[7],
        this.elements[11],
        this.elements[15]
    );
  };

  matrix3D.prototype.getElements = function () {
    return this.elements;
  };

  return matrix3D;
})();
