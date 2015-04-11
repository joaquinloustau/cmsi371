/*
 * Unit tests for our shape object.
 */
$(function () {

  // This suite checks instantiation basics.
  test("Creation and Data Access", function () {
    var m1 = new Matrix3D();

    deepEqual(m1.elements, [1, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1],
          "Default matrix constructor");
  });

  test("Matrix Multiplicaton", function () {
    var m1 = new Matrix3D(1, 1, 1, 1,
                          1, 1, 1, 1,
                          1, 1, 1, 1,
                          1, 1, 1, 1)

    var m2 = m1.multiplication([0, 0, 0, 0,
                              0, 0, 0, 0,
                              0, 0, 0, 0,
                              0, 0, 0, 0])

    deepEqual(m2.elements, [0, 0, 0, 0,
                            0, 0, 0, 0,
                            0, 0, 0, 0,
                            0, 0, 0, 0],
              "Multiplication by Matrix Zero")

    m2 = m1.multiplication([1, 0, 0, 0,
                              0, 1, 0, 0,
                              0, 0, 1, 0,
                              0, 0, 0, 1])
    deepEqual(m2.elements, [1, 1, 1, 1,
                            1, 1, 1, 1,
                            1, 1, 1, 1,
                            1, 1, 1, 1],
              "Multiplication by Identity Matrix")

    m2 = m1.multiplication([1, 2, 3, 4,
                              5, 6, 7, 8,
                              -8, -7, -6, -5,
                              -4, -3, -2, -1])

    deepEqual(m2.elements, [-6, -2, 2, 6,
                            -6, -2, 2, 6,
                            -6, -2, 2, 6,
                            -6, -2, 2, 6],
              "Multiplication by random Matrix")
  });

  test("Matrix Translation", function () {
    var m3 = Matrix3D.getTranslationMatrix(4, -8, 7);
    deepEqual(m3.elements, [1, 0, 0, 4,
                            0, 1, 0, -8,
                            0, 0, 1, 7,
                            0, 0, 0, 1],
              "Translation Test #1")

    m3 = Matrix3D.getTranslationMatrix(0, 0, 0);
    deepEqual(m3.elements, [1, 0, 0, 0,
                            0, 1, 0, 0,
                            0, 0, 1, 0,
                            0, 0, 0, 1],
              "Translation Test #2")

    m3 = Matrix3D.getTranslationMatrix(.5, -4, 8);
    deepEqual(m3.elements, [1, 0, 0, 0.5,
                            0, 1, 0, -4,
                            0, 0, 1, 8,
                            0, 0, 0, 1],
              "Translation Test #3")

  })

  test("Matrix Scaling", function () {
    var m4 = Matrix3D.getScaleMatrix(-37, -28, 57);
    deepEqual(m4.elements, [-37, 0, 0, 0,
                            0, -28, 0, 0,
                            0, 0, 57, 0,
                            0, 0, 0, 1],
              "Scaling Test #1")

    m4 = Matrix3D.getScaleMatrix(0, 0, 0);
    deepEqual(m4.elements, [0, 0, 0, 0,
                            0, 0, 0, 0,
                            0, 0, 0, 0,
                            0, 0, 0, 1],
              "Scaling Test #2")

    m4 = Matrix3D.getScaleMatrix(-1, 1.1, 1);
    deepEqual(m4.elements, [-1, 0, 0, 0,
                            0, 1.1, 0, 0,
                            0, 0, 1, 0,
                            0, 0, 0, 1],
              "Scaling Test #3")

  })

  test("Matrix Rotation", function () {
    var m5 = Matrix3D.getRotationMatrix(0, 0, 0, 1);
    deepEqual(m5.elements, [1, 0, 0, 0,
                            0, 1, 0, 0,
                            0, 0, 1, 0,
                            0, 0, 0, 1],
              "Rotation Test #1")

    m5 = Matrix3D.getRotationMatrix(1, 0, 1, 0);
    deepEqual(m5.elements, [Math.cos(Math.PI / 180.0), 0, Math.sin(Math.PI / 180.0), 0,
                            0, 1, 0, 0,
                            (-1 * Math.sin(Math.PI / 180.0)), 0, Math.cos(Math.PI / 180.0), 0,
                            0, 0, 0, 1],
              "Rotation Test #2")

    m5 = Matrix3D.getRotationMatrix(320, 1, 1, 1);
    var axisLength = Math.sqrt(3),
        x = 1 / axisLength,
        y = 1 / axisLength,
        z = 1 / axisLength,
        cosine = Math.cos(320 * Math.PI / 180.0),
        sine = Math.sin(320 * Math.PI / 180.0);

    deepEqual(m5.elements,
              [(x * x * (1 - cosine) + cosine), (x * y * (1 - cosine) - z * sine), (x * z * (1 - cosine) + y * sine), 0,
              (x * y * (1 - cosine) + z * sine), (y * y * (1 - cosine) + cosine), (y * z * (1 - cosine) - x * sine), 0,
              (x * z * (1 - cosine) - y * sine), (y * z * (1 - cosine) + x * sine), (z * z * (1 - cosine) + cosine), 0,
              0, 0, 0, 1],
              "Rotation Test #3");

    m5 = Matrix3D.getRotationMatrix(-1, 4, -11, 0.3);
    axisLength = Math.sqrt(4 * 4 + -11 * -11 + 0.3 * 0.3);
    x = 4 / axisLength;
    y = -11 / axisLength;
    z = 0.3 / axisLength;
    cosine = Math.cos(-1 * Math.PI / 180.0);
    sine = Math.sin(-1 * Math.PI / 180.0);

    deepEqual(m5.elements,
              [(x * x * (1 - cosine) + cosine), (x * y * (1 - cosine) - z * sine), (x * z * (1 - cosine) + y * sine), 0,
              (x * y * (1 - cosine) + z * sine), (y * y * (1 - cosine) + cosine), (y * z * (1 - cosine) - x * sine), 0,
              (x * z * (1 - cosine) - y * sine), (y * z * (1 - cosine) + x * sine), (z * z * (1 - cosine) + cosine), 0,
              0, 0, 0, 1],
              "Rotation Test #4");

    m5 = Matrix3D.getRotationMatrix(2.6, 0, 0, 1);
    x = 0;
    y = 0;
    z = 1;
    cosine = Math.cos(2.6 * Math.PI / 180.0);
    sine = Math.sin(2.6 * Math.PI / 180.0);

    deepEqual(m5.elements,
            [cosine, (-1 * z * sine), 0, 0,
            (z * sine), cosine, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1],
            "Rotation Test #5");
  })

  test("Matrix Orthographic Projection", function () {
    var m6 = Matrix3D.getOrthoMatrix(-3, 5, -1, 6, -8, 8)
        width = 5 - (-3),
        height = 6 - (-1),
        depth = 8 - (-8);

    deepEqual (m6.elements, [2.0 / width, 0.0, 0.0, -(5 + (-3)) / width,
                            0.0, 2.0 / height, 0.0, -(6 + (-1)) / height,
                            0.0, 0.0, -2.0 / depth, -(8 + (-8)) / depth,
                            0.0, 0.0, 0.0, 1.0],
                            "Orthographic Projection #1");

    var m6 = Matrix3D.getOrthoMatrix(0, 2, 0, 2, 0, 2)
        width = 2 - 0,
        height = 2 - 0,
        depth = 2 - 0;

    deepEqual (m6.elements, [2.0 / width, 0.0, 0.0, -(2 + 0) / width,
                            0.0, 2.0 / height, 0.0, -(2 + 0) / height,
                            0.0, 0.0, -2.0 / depth, -(2 + 0) / depth,
                            0.0, 0.0, 0.0, 1.0],
                            "Orthographic Projection #2");

    var m6 = Matrix3D.getOrthoMatrix(-1, 1, -1, 1, -1, 1)
        width = 1 - (-1),
        height = 1 - (-1),
        depth = 1 - (-1);

    deepEqual (m6.elements, [2.0 / width, 0.0, 0.0, -(1 + (-1)) / width,
                            0.0, 2.0 / height, 0.0, -(1 + (-1)) / height,
                            0.0, 0.0, -2.0 / depth, -(1 + (-1)) / depth,
                            0.0, 0.0, 0.0, 1.0],
                            "Orthographic Projection #3");
  })
  
  test("Matrix Perspective Projection", function () {
    var m7 = Matrix3D.getFrustumMatrix(-4, 4, -2, 2, -10, 10);
        width = 4 + 4;
        height = 2 + 2;
        depth = 10 + 10;
        
    deepEqual(m7.elements, [2 * -10 / width, 0, 0, 0,
                            0, -5, 0, 0,
                            0, 0, 0, 10,
                            0, 0, -1, 0],
              "Perspective Projection Test #1");

    m7 = Matrix3D.getFrustumMatrix(-1, 1, -1, 1, -1, 1);
    width = 1 + 1;
    height = 1 + 1;
    depth = 1 + 1;
    deepEqual(m7.elements, [-1, 0, 0, 0,
                            0, -1, 0, 0,
                            0, 0, 0, 1,
                            0, 0, -1, 0],
              "Perspective Projection Test #2");

    m7 = Matrix3D.getFrustumMatrix(0, 1, 0, 1, 0, 1);
    width = 1;
    height = 1;
    depth = 1;
    deepEqual(m7.elements, [0, 0, 1, 0,
                            0, 0, 1, 0,
                            0, 0, -1, 0,
                            0, 0, -1, 0],
              "Perspective Projection Test #3");
  })
});
