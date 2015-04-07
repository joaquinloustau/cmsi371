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

    var m2 = m1.multiplication(0, 0, 0, 0,
                              0, 0, 0, 0,
                              0, 0, 0, 0,
                              0, 0, 0, 0)

    deepEqual(m2.elements, [0, 0, 0, 0,
                            0, 0, 0, 0,
                            0, 0, 0, 0,
                            0, 0, 0, 0],
              "Multiplication by Matrix Zero")

    var m3 = m1.multiplication(1, 0, 0, 0,
                              0, 1, 0, 0,
                              0, 0, 1, 0,
                              0, 0, 0, 1)
    deepEqual(m3.elements, [1, 1, 1, 1,
                            1, 1, 1, 1,
                            1, 1, 1, 1,
                            1, 1, 1, 1],
              "Multiplication by Identity Matrix")

    var m4 = m1.multiplication(1, 2, 3, 4,
                              5, 6, 7, 8,
                              -8, -7, -6, -5,
                              -4, -3, -2, -1)

    deepEqual(m4.elements, [-6, -2, 2, 6,
                            -6, -2, 2, 6,
                            -6, -2, 2, 6,
                            -6, -2, 2, 6],
              "Multiplication by random Matrix")
  });
});
