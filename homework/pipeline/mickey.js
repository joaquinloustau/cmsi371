/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

  // Because many of these variables are best initialized then immediately
  // used in context, we merely name them here.  Read on to see how they
  // are used.
  var gl, // The WebGL context.

    // This variable stores 3D model information.
    shapesToDraw,

    //Function that passes the shape vertices to WebGL
    passVertices,

    // The shader program to use.
    shaderProgram,

    // Utility variable indicating whether some fatal has occurred.
    abort = false,

    // Important state variables.
    currentRotation = 0.0,
    currentInterval,
    rotationMatrix,
    scaleMatrix,
    translationMatrix,
    vertexPosition,
    vertexColor,

    // An individual "draw object" function.
    drawObject,

    // The big "draw scene" function.
    drawScene,

  // Grab the WebGL rendering context.
  gl = GLSLUtilities.getGL(canvas);
  if (!gl) {
    alert("No WebGL context found...sorry.");

    // No WebGL, no use going on...
    return;
  }

  // Set up settings that will not change.  This is not "canned" into a
  // utility function because these settings really can vary from program
  // to program.
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.viewport(0, 0, canvas.width, canvas.height);
  var sphere1 = new Shape ({
               color: { r: 0.0, g: 1.0, b: 0.0 },
               vertices: Shape.sphere().toRawLineArray(),
               mode: gl.LINES
              });
  var cube1 = new Shape ({
               color: { r: 0.0, g: 0.0, b: 1.0 },
               vertices: Shape.cube().toRawTriangleArray(),
               mode: gl.TRIANGLES,
               transformations: {sx: 0.1, sy: 0.1, sz: 0.1}
              });

  var shape3 = new Shape({
              color: { r: 0.0, g: 0.0, b: 1.0 },
              vertices: Shape.icosahedron().toRawLineArray(),
              mode: gl.LINES,
              children: [ new Shape ({
                color: {r: 1.0, g: 0.0, b: 0.0},
                vertices: Shape.triangularPrism().toRawTriangleArray(),
                mode: gl.TRIANGLES
                })]
              });

 
  // Build the objects to display.
  shapesToDraw = [sphere1, cube1, shape3];
  
  // Pass the vertices to WebGL.
  passVertices = function (shapesToDraw) {
    var i, maxi, j, maxj;

    for (i = 0, maxi = shapesToDraw.length; i < maxi; i += 1) {
      shapesToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
          shapesToDraw[i].vertices);

      if (!shapesToDraw[i].colors) {
        // If we have a single color, we expand that into an array
        // of the same color over and over.
        shapesToDraw[i].colors = [];
        for (j = 0, maxj = shapesToDraw[i].vertices.length / 3;
            j < maxj; j += 1) {
          shapesToDraw[i].colors = shapesToDraw[i].colors.concat(
            shapesToDraw[i].color.r,
            shapesToDraw[i].color.g,
            shapesToDraw[i].color.b
          );
        }
      }
      shapesToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
          shapesToDraw[i].colors);

      // Look for nested shapesToDraw' vertices to pass. Also checks to make
      // sure the children array isn't empty
      if (shapesToDraw[i].children && shapesToDraw[i].children.length !== 0) {
        passVertices(shapesToDraw[i].children);
      }
    }
  }
  

  // Initialize the shaders.
  shaderProgram = GLSLUtilities.initSimpleShaderProgram(
    gl,
    $("#vertex-shader").text(),
    $("#fragment-shader").text(),

    // Very cursory error-checking here...
    function (shader) {
      abort = true;
      alert("Shader problem: " + gl.getShaderInfoLog(shader));
    },

    // Another simplistic error check: we don't even access the faulty
    // shader program.
    function (shaderProgram) {
      abort = true;
      alert("Could not link shaders...sorry.");
    }
  );

  // If the abort variable is true here, we can't continue.
  if (abort) {
    alert("Fatal errors encountered; we cannot continue.");
    return;
  }

  // All done --- tell WebGL to use the shader program from now on.
  gl.useProgram(shaderProgram);

  // Hold on to the important variables within the shaders.
  vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
  gl.enableVertexAttribArray(vertexPosition);
  vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
  gl.enableVertexAttribArray(vertexColor);
  rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
  translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
  scaleMatrix = gl.getUniformLocation(shaderProgram, "scaleMatrix");

  /*
   * Displays an individual object.
   */
  drawObject = function (object) {
    var i;
    var instanceMatrix = new Matrix3D();
    instanceMatrix = instanceMatrix.getInstanceMatrix(object.transformations);

    //Set instance Matrix
    gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "instanceMatrix"),
                        gl.FALSE,
                        new Float32Array(instanceMatrix.getElements())
    );

    // Set the varying colors.
    gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
    gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

    // Set the varying vertex coordinates.
    gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
    gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(object.mode, 0, object.vertices.length / 3);

    if (object.children) {
      for (i = 0; i < object.children.length; i++) {
        drawObject(object.children[i]);
      }
    }
  };

  /*
   * Displays the scene.
   */
  drawScene = function () {
    var i, maxi;
    // Clear the display.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Set up the rotation matrix.
    gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(Matrix3D.getRotationMatrix(currentRotation, 0, 1, 0).getElements()));

    // Display the objects.
    for (i = 0, maxi = shapesToDraw.length; i < maxi; i += 1) {
      drawObject(shapesToDraw[i]);
    }

    // All done.
    gl.flush();
  };

  // Draw the initial scene.
  passVertices(shapesToDraw);
  drawScene();

  // Set up the rotation toggle: clicking on the canvas does it.
  $(canvas).click(function () {
    if (currentInterval) {
      clearInterval(currentInterval);
      currentInterval = null;
    } else {
      currentInterval = setInterval(function () {
        currentRotation += 1.0;
        drawScene();
        if (currentRotation >= 360.0) {
          currentRotation -= 360.0;
        }
      }, 30);
    }
  });
}(document.getElementById("hello-webgl")));