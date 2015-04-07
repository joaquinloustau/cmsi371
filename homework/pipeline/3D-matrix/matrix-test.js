/*
 * Unit tests for our vector object.
 */
$(function () {

  // This suite checks instantiation basics.
  test("Creation and Data Access", function () {
    var m1 = new Matrix3D();
    console.log(m1.elements);

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

    var m3 = m1.multiplication([1, 0, 0, 0,
                              0, 1, 0, 0,
                              0, 0, 1, 0,
                              0, 0, 0, 1])
    deepEqual(m3.elements, [1, 1, 1, 1,
                            1, 1, 1, 1,
                            1, 1, 1, 1,
                            1, 1, 1, 1],
              "Multiplication by Identity Matrix")

    var m4 = m1.multiplication([1, 2, 3, 4,
                              5, 6, 7, 8,
                              -8, -7, -6, -5,
                              -4, -3, -2, -1])

    deepEqual(m4.elements, [-6, -2, 2, 6,
                            -6, -2, 2, 6,
                            -6, -2, 2, 6,
                            -6, -2, 2, 6],
              "Multiplication by random Matrix")
  });

  test("Matrix translation", function () {
    var m5 = Matrix3D.getTranslationMatrix(4, -8, 7);
    deepEqual(m5.elements, [1, 0, 0, 4,
                            0, 1, 0, -8,
                            0, 0, 1, 7,
                            0, 0, 0, 1],
              "Translation Test #1")

    var m6 = Matrix3D.getTranslationMatrix(0, 0, 0);
    deepEqual(m6.elements, [1, 0, 0, 0,
                            0, 1, 0, 0,
                            0, 0, 1, 0,
                            0, 0, 0, 1],
              "Translation Test #2")

    var m7 = Matrix3D.getTranslationMatrix(.5, -4, 8);
    deepEqual(m7.elements, [1, 0, 0, 0.5,
                            0, 1, 0, -4,
                            0, 0, 1, 8,
                            0, 0, 0, 1],
              "Translation Test #3")

  })
});
