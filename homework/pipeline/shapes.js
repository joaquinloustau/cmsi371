/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shape = (function () {

  //Define the constructor
  var shape = function (options) {
    this.vertices = options.vertices || [];
    this.indices = options.indices || [];
    this.children = options.children || [];
    this.radius = options.radius || 0;
    this.transformations = options.transformations || {};   
    this.textureCoordData = options.textureCoordData || [];
    //this.gl = options.gl || {};

  };

  shape.prototype.configure = function (options) {
    options.transformations = options.transformations || {};

    if (options.children) {
      this.children = options.children;
    }

    this.color = options.color || { r: 1.0, g: 0.0, b: 0.0 };
    this.children = options.children || [];
    this.mode = options.mode;
    this.normals = options.normals || [];
    this.transformations = {};
    this.transformations.tx = options.transformations.tx || 0;
    this.transformations.ty = options.transformations.ty || 0;
    this.transformations.tz = options.transformations.tz || 0;
    this.transformations.sx = options.transformations.sx || 1;
    this.transformations.sy = options.transformations.sy || 1;
    this.transformations.sz = options.transformations.sz || 1;
    this.transformations.angle = options.transformations.angle || 0;
    this.transformations.rx = options.transformations.rx || 1;
    this.transformations.ry = options.transformations.ry || 1;
    this.transformations.rz = options.transformations.rz || 1;
    this.textureId = options.textureId || {};
      
    //Circle properties
    if (options.radius) {
      this.radius = options.radius;
    }

    return this;
  },

  /*
   * Returns the vertices for a small icosahedron.
   */
  shape.icosahedron = function () {
    // These variables are actually "constants" for icosahedron coordinates.
    var X = 0.525731112119133606,
        Z = 0.850650808352039932;
 
    return new shape({vertices: [
        [ -X, 0.0, Z ],
        [ X, 0.0, Z ],
        [ -X, 0.0, -Z ],
        [ X, 0.0, -Z ],
        [ 0.0, Z, X ],
        [ 0.0, Z, -X ],
        [ 0.0, -Z, X ],
        [ 0.0, -Z, -X ],
        [ Z, X, 0.0 ],
        [ -Z, X, 0.0 ],
        [ Z, -X, 0.0 ],
        [ -Z, -X, 0.0 ]
      ],

      indices: [
        [ 1, 4, 0 ],
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
        [ 11, 2, 7 ]
      ]
    });
  },

  shape.cube = function () {
    var X = 0.5,
        Y = 0.5,
        Z = 0.5;

    return new shape({
      vertices: [
        [X, Y, Z],
        [X, Y, -Z],
        [X, -Y, Z],
        [X, -Y, -Z],
        [-X, Y, Z],
        [-X, Y, -Z],
        [-X, -Y, Z],
        [-X, -Y, -Z]
      ],

      indices: [
        [0, 1, 3],
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
        [5, 1, 0]
      ]
    });
  },

  //Used learningwebgl.com Lesson 11 – spheres, rotation matrices, and mouse events
  shape.sphere = function () {
    var radius = 0.8,
        latBelts = 25,
        longBelts = 25,
        vertices = [],
        indices = [],
        textureCoordData = [],
        sphereData = {};

    var entre = 0;
    // This creates the vertices for the circle.
    for (var latNumber = 0; latNumber <= latBelts; latNumber ++) {
        var theta = latNumber * Math.PI / latBelts;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);
        entre++;

        for (var longNumber = 0; longNumber <= longBelts; longNumber ++) {
            var phi = longNumber * 2 * Math.PI / longBelts;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);
            var u = 1 - (longNumber / longBelts);
            var v = 1 - (latNumber / latBelts);

            var x = radius * cosPhi * sinTheta;
            var y = radius * cosTheta;
            var z = radius * sinPhi * sinTheta;
           
            //http://learningwebgl.com/cookbook/index.php/How_to_draw_a_sphere
            textureCoordData.push([u,v]);
            vertices.push([x, y, z]);
        }
    }
    
    for (var latNumber = 0; latNumber < latBelts; latNumber++) {
      for (var longNumber = 0; longNumber < longBelts; longNumber++) {
        var first = (latNumber * (longBelts + 1)) + longNumber;
        var second = first + longBelts + 1;
        indices.push([first, second, first + 1]);
        indices.push([second, second + 1, first + 1]);
      }
    }

    sphereData.vertices = vertices;
    sphereData.indices = indices;
    sphereData.radius = radius;
    sphereData.latBelts = latBelts;
    sphereData.longBelts = longBelts;
    sphereData.textureCoordData = textureCoordData;

    return new shape(sphereData);
  },

  shape.triangularPrism = function () {
    // These variables are actually "constants" for trangular prism coordinates.
    var X = 0.75,
        Y = 0.5,
        Z = -0.75;

    return  new shape({
      vertices: [
          [ X, 0.0, Z ],
          [ -X, 0.0, Z ],
          [ 0.0, Y, Z ],
          [ X, 0.0, -Z ],
          [ -X, 0.0, -Z ],
          [ 0.0, Y, -Z ]
      ],

      indices: [
          [ 0, 1, 2 ],
          [ 0, 2, 3 ], //Rectangle
          [ 3, 2, 5 ],
          [ 3, 5, 4 ],
          [ 4, 5, 1 ],  // Rectangle
          [ 1, 5, 2 ],
          [ 0, 3, 1 ], // Rectangle, bottom
          [ 4, 3, 1 ]
      ]
    });
  },

  /*
   * Utility function for turning indexed vertices into a "raw" coordinate array
   * arranged as triangles.
   */
  shape.prototype.toRawTriangleArray = function () {
    var result = [],
        i,
        j,
        maxi,
        maxj;

    for (i = 0, maxi = this.indices.length; i < maxi; i++) {
      for (j = 0, maxj = this.indices[i].length; j < maxj; j++) {
        result = result.concat(
          this.vertices[
            this.indices[i][j]
          ]
        );
      }
    }
    return result;
  },

  /*
   * Utility function for turning indexed vertices into a "raw" coordinate array
   * arranged as triangles.
   */
  shape.prototype.toRawTextureTriangleArray = function () {
    var result = [],
        i,
        j,
        maxi,
        maxj;

    for (i = 0, maxi = this.indices.length; i < maxi; i++) {
      for (j = 0, maxj = this.indices[i].length; j < maxj; j++) {
        result = result.concat(
          this.textureCoordData[
            this.indices[i][j]
          ]
        );
      }
    }
    return result;
  },


  /*
   * Displays an individual object.
   */
  shape.prototype.draw = function (currentTransform, instanceMatrix, vertexColor, vertexPosition, textureCoordinate, gl) {
    var i,
        instanceMat = new Matrix3D();
        //instanceMat = currentTransform.multiply(instanceMat.getInstanceMatrix(this.transformations));

    if (this.vertices.length != 0) {
      instanceMat = currentTransform.multiply(instanceMat.getInstanceMatrix(this.transformations));

      //Set instance Matrix
      gl.uniformMatrix4fv(instanceMatrix,
                          gl.FALSE,
                          new Float32Array(instanceMat.getColumnMajorOrder().getElements())
      );

      // Set the varying colors.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
      gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

      //Specifiy the texture to map onto the shape.
      gl.bindTexture(gl.TEXTURE_2D, this.textureId);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordinateBuffer);
      gl.vertexAttribPointer(textureCoordinate, 2, gl.FLOAT, false, 0, 0);
     

      // Set the varying vertex coordinates.
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
      gl.drawArrays(this.mode, 0, this.rawVertices.length / 3);
  }
    

    if (this.children) {
      for (i = 0; i < this.children.length; i++) {
        this.children[i].draw(instanceMat, instanceMatrix, vertexColor, vertexPosition, textureCoordinate, gl);
      }
    }
  },

  shape.prototype.getReadyForWebGL = function (gl) {
    var i, j, maxj;
      console.log('entre getReadyForWebGL');
      if (this.vertices.length != 0) {
        this.rawVertices = (this.mode === gl.LINES) ? this.toRawLineArray() : this.toRawTriangleArray();
        this.rawTextures = this.toRawTextureTriangleArray();
        this.buffer = GLSLUtilities.initVertexBuffer(gl,this.rawVertices);

        if (!this.colors) {
          // If we have a single color, we expand that into an array
          // of the same color over and over.
          this.colors = [];
          for (j = 0, maxj = this.rawVertices.length / 3;
              j < maxj; j += 1) {
            this.colors = this.colors.concat(
              this.color.r,
              this.color.g,
              this.color.b
            );
          }
        }
        this.colorBuffer = GLSLUtilities.initVertexBuffer(gl,this.colors);
        this.textureCoordinateBuffer = GLSLUtilities.initVertexBuffer(gl, this.rawTextures);
      }
     
    if (this.children && this.children.length != 0) {
      for (i = 0; i < this.children.length; i++) {
        this.children[i].getReadyForWebGL(gl);
      }
    }
  },

  /*
   * Utility function for turning indexed vertices into a "raw" coordinate array
   * arranged as line segments.
   */

  shape.prototype.toRawLineArray = function () {
    var result = [],  
        i,
        j,
        maxi,
        maxj;

    for (i = 0, maxi = this.indices.length; i < maxi; i += 1) {
      for (j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
        result = result.concat(
          this.vertices[
            this.indices[i][j]
          ],

          this.vertices[
            this.indices[i][(j + 1) % maxj]
          ]
        );
      }
    }
    return result;
  }
  return shape;
})();
