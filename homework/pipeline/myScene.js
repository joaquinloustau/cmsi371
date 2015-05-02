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
    initialTransform,
    instanceMatrix,
    projectionMatrix,
    vertexPosition,
    vertexColor,

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


  var Earth = Shape.sphere()
              .configure({
                mode: gl.LINES,
                color: { r: 0.0, g: 0.0, b: 1.0 }
              })

  shapesToDraw = new Shape({children: [Earth]})

  console.log(shapesToDraw);
  
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
  instanceMatrix = gl.getUniformLocation(shaderProgram, "instanceMatrix");

  projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");

  // Initialize scale matrix
  gl.uniformMatrix4fv(scaleMatrix, 
      gl.FALSE,
      // JD: 2(b)
      new Float32Array(Matrix3D.getScaleMatrix(0.25, 0.25, 0.25).getElements())
  );

  // Initialize translation matrix
  gl.uniformMatrix4fv(translationMatrix, 
      gl.FALSE, 
      new Float32Array(Matrix3D.getTranslationMatrix(0, 0, 0).getElements())
  );

  // Initialize projection matrix
  gl.uniformMatrix4fv(
    projectionMatrix,
    gl.FALSE, 
    new Float32Array(Matrix3D.getOrthoMatrix(
      -2 * (canvas.width / canvas.height),
      2 * (canvas.width / canvas.height),
      -2,
      2,
      -10,
      10
    ).getColumnMajorOrder().getElements())
  );

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
    shapesToDraw.draw(new Matrix3D(), instanceMatrix, vertexColor, vertexPosition, gl);

    // All done.
    gl.flush();
  };

  // Pass all the vertices to WebGL and draw the initial scene.
  shapesToDraw.getReadyForWebGL(gl);
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