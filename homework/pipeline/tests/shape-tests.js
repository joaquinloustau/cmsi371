/*
 * Unit tests for our shape object.
 */
$(function () {

  // This suite checks instantiation basics.
  test("Creation and properties", function () {
    var s1 = new Shape({});

    deepEqual(s1.vertices, [],
          "Default vertices value");

    deepEqual(s1.indices, [],
          "Default indices value");

    deepEqual(s1.color, { r: 1.0, g: 0.0, b: 0.0 },
          "Default color values");   

    var translationDefault = [s1.transformations.tx, s1.transformations.ty, s1.transformations.tz];
    deepEqual(translationDefault, [0, 0, 0],
          "Default translation values");   

    var scalingDefault = [s1.transformations.sx, s1.transformations.sy, s1.transformations.sz];
    deepEqual(scalingDefault, [1, 1, 1],
          "Default scaling values");   

    var rotationDefault = [s1.transformations.angle, s1.transformations.rx, s1.transformations.ry, s1.transformations.rz];
    deepEqual(rotationDefault, [0, 1, 1, 1],
          "Default rotation value");       
  });

  test("Icosahedron", function () {
    var s2 = new Shape({
              color: { r: 0.0, g: 0.0, b: 1.0 },
              vertices: Shape.icosahedron().vertices,
              indices: Shape.icosahedron().indices,
              mode: 1,
              transformations: { tx: 2.0, ty: 2.0, tz: 0.0 },
            });

    deepEqual(s2.vertices,[[ -0.525731112119133606, 0.0, 0.850650808352039932 ],
                          [ 0.525731112119133606, 0.0, 0.850650808352039932 ],
                          [ -0.525731112119133606, 0.0, -0.850650808352039932 ],
                          [ 0.525731112119133606, 0.0, -0.850650808352039932 ],
                          [ 0.0, 0.850650808352039932, 0.525731112119133606 ],
                          [ 0.0, 0.850650808352039932, -0.525731112119133606 ],
                          [ 0.0, -0.850650808352039932, 0.525731112119133606 ],
                          [ 0.0, -0.850650808352039932, -0.525731112119133606 ],
                          [ 0.850650808352039932, 0.525731112119133606, 0.0 ],
                          [ -0.850650808352039932, 0.525731112119133606, 0.0 ],
                          [ 0.850650808352039932, -0.525731112119133606, 0.0 ],
                          [ -0.850650808352039932, -0.525731112119133606, 0.0 ]],
            "Icosahedron vertices values");

    deepEqual(s2.indices, [[ 1, 4, 0 ],
                          [ 4, 9, 0 ],
                          [ 4, 5, 9 ],
                          [ 8, 5, 4 ],
                          [ 1, 8, 4 ],
                          [ 1, 10, 8 ],
                          [ 10, 3, 8 ],
                          [ 8, 3, 5 ],
                          [ 3, 2, 5 ],
                          [ 3, 7, 2 ],
                          [ 3, 10, 7 ],
                          [ 10, 6, 7 ],
                          [ 6, 11, 7 ],
                          [ 6, 0, 11 ],
                          [ 6, 1, 0 ],
                          [ 10, 1, 6 ],
                          [ 11, 0, 9 ],
                          [ 2, 11, 9 ],
                          [ 5, 2, 9 ],
                          [ 11, 2, 7 ]],
            "Icosahedron indices values");
  });

  test("Cube", function () {
    var s3 = new Shape({
              color: { r: 0.0, g: 0.0, b: 1.0 },
              vertices: Shape.cube().vertices,
              indices: Shape.cube().indices,
              mode: 1,
              transformations: { tx: 2.0, ty: 2.0, tz: 0.0 },
            });

    deepEqual(s3.vertices, [[0.5, 0.5, 0.5],
                          [0.5, 0.5, -0.5],
                          [0.5, -0.5, 0.5],
                          [0.5, -0.5, -0.5],
                          [-0.5, 0.5, 0.5],
                          [-0.5, 0.5, -0.5],
                          [-0.5, -0.5, 0.5],
                          [-0.5, -0.5, -0.5]],
          "Cube vertices values");

    deepEqual(s3.indices, [[0, 1, 3],
                          [2, 0, 3],
                          [7, 2, 3],
                          [6, 7, 2],
                          [4, 0, 2],
                          [6, 4, 2],
                          [5, 1, 7],
                          [1, 3, 7],
                          [4, 5, 7],
                          [6, 4, 7],
                          [4, 5, 0],
                          [5, 1, 0]],
              "Cube indices values");
  });

  test("Triangular Prism", function () {
    var s4 = new Shape({
              color: { r: 0.0, g: 0.0, b: 1.0 },
              vertices: Shape.triangularPrism().vertices,
              indices: Shape.triangularPrism().indices,
              mode: 1,
              transformations: { tx: 2.0, ty: 2.0, tz: 0.0 },
            });

    deepEqual(s4.vertices, [[ 0.75, 0.0, -0.75 ],
                            [ -0.75, 0.0, -0.75 ],
                            [ 0.0, 0.5, -0.75 ],
                            [ 0.75, 0.0, 0.75 ],
                            [ -0.75, 0.0, 0.75 ],
                            [ 0.0, 0.5, 0.75 ]],
          "Triangular Prism vertices values");

    deepEqual(s4.indices, [[ 0, 1, 2 ],
                          [ 0, 2, 3 ], 
                          [ 3, 2, 5 ],
                          [ 3, 5, 4 ],
                          [ 4, 5, 1 ],  
                          [ 1, 5, 2 ],
                          [ 0, 3, 1 ], 
                          [ 4, 3, 1 ]],
          "Triangular Prism indices values");     
  });

  test("Sphere", function () {
    var s5 = new Shape({
              color: { r: 0.0, g: 0.0, b: 1.0 },
              vertices: Shape.sphere().vertices,
              indices: Shape.sphere().indices,
              radius: Shape.sphere().radius,
              mode: 1,
              transformations: { tx: 2.0, ty: 2.0, tz: 0.0 },
            });

    deepEqual(s5.radius, 0.8,
          "Sphere radius value");
  });

  test("Composite or group objects", function () {
    var s6  = new Shape({
              color: { r: 0.0, g: 0.0, b: 1.0 },
              vertices: Shape.triangularPrism().vertices,
              indices: Shape.triangularPrism().indices,
              mode: 1,
              transformations: { tx: 2.0, ty: 2.0, tz: 0.0 },
              children: [ new Shape({
                color: { r: 1.0, g: 0.0, b: 0.0 },
                vertices: Shape.cube().vertices,
                mode: 1,
                transformations: { sx: 1, sy: 1, sz: 1, tx: 0, ty: -2.5, tz: 0, angle: 40, rx: 1, ry: 2 , rz: 1 },
                children: [ new Shape({
                color: { r: 0.0, g: 0.0, b: 0.0 },
                vertices: Shape.triangularPrism().toRawTriangleArray(),
                mode: 1,
                transformations: { sx: 2, sy: 1, sz: 1, tx: 0, ty: -2.5, tz: 0, angle: 40, rx: 1, ry: 2 , rz: 1 }
                })]
              })]
            });

    deepEqual(s6.children[0].vertices, [[0.5, 0.5, 0.5],
                                        [0.5, 0.5, -0.5],
                                        [0.5, -0.5, 0.5],
                                        [0.5, -0.5, -0.5],
                                        [-0.5, 0.5, 0.5],
                                        [-0.5, 0.5, -0.5],
                                        [-0.5, -0.5, 0.5],
                                        [-0.5, -0.5, -0.5]],
          "Child vertices values");

    deepEqual(s6.children[0].children[0].color.r, 0.0,
          "Children's child color value"); 

    deepEqual(s6.children[0].children[0].transformations.sx, 2,
          "Children's child scaling transformation value");      
  });

});
