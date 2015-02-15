/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
  var canvas = document.getElementById("canvas"),

  minionDefaultValues = {
    bodyColor: "rgb(252, 218, 109)",
    overallColor: "rgb(20, 102, 150)",
    numberOfTeeth: 6,
    posRight: 1,
    posLeft: 1,
    eyeSize: 4,
    colorGlasses: "rgb(115,115,115)",
    isSad: false,
    minionHeight: 100,
    minionWidth: 60
  },


  // First, a selection of "drawing functions" from which we can choose.
  background = function (renderingContext) {
    var img = new Image();
    img.src = "grass-and-sky-wallpaper-10.jpg"; // Set source path
    renderingContext.drawImage(img, 0, 0, canvas.width, canvas.height);
  },

  roundRect = function (renderingContext, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined" ) {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    renderingContext.beginPath();
    renderingContext.moveTo(x + radius, y);
    renderingContext.lineTo(x + width - radius, y);
    renderingContext.quadraticCurveTo(x + width, y, x + width, y + radius);
    renderingContext.lineTo(x + width, y + height - radius);
    renderingContext.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    renderingContext.lineTo(x + radius, y + height);
    renderingContext.quadraticCurveTo(x, y + height, x, y + height - radius);
    renderingContext.lineTo(x, y + radius);
    renderingContext.quadraticCurveTo(x, y, x + radius, y);
    renderingContext.closePath();
    if (stroke) {
      renderingContext.stroke();
    }
    if (fill) {
      renderingContext.fill();
    }
  }

  drawBody = function (renderingContext, options) {
    renderingContext.fillStyle = options.bodyColor || minionDefaultValues.bodyColor;
    roundRect(renderingContext, -30, -50, minionDefaultValues.minionWidth, minionDefaultValues.minionHeight, 25, true, true);
  };

  drawEyes = function (renderingContext, options) {
    var colorGlasses = options.colorGlasses || minionDefaultValues.colorGlasses;
    var eyesize = options.eyesize || minionDefaultValues.eyeSize;
    renderingContext.beginPath();
    renderingContext.arc(-10, -25, 10, 0, Math.PI * 2); 
    renderingContext.moveTo(20, -25); 
    renderingContext.arc(10, -25, 10, 0, Math.PI * 2); 
    renderingContext.fillStyle = "white";
    renderingContext.strokeStyle = colorGlasses;
    renderingContext.lineWidth = 4;
    renderingContext.fill();
    renderingContext.stroke();
    renderingContext.restore();
    renderingContext.beginPath();
    renderingContext.moveTo(-8 - eyesize / 2, -25);
    renderingContext.arc(-8 - eyesize / 2, -25, eyesize, 0, Math.PI * 2);
    renderingContext.moveTo(12 - eyesize / 2, -25);
    renderingContext.arc(12 - eyesize / 2, -25, eyesize, 0, Math.PI * 2);
    renderingContext.rect(-30, -30, 8, 5);
    renderingContext.rect(21, -30, 8, 5);
    renderingContext.fillStyle = "black";
    renderingContext.fill();
    renderingContext.stroke();    
  }

  drawMouth = function (renderingContext, options) {
    renderingContext.fillStyle = "rgb(248, 130, 128)";
    var isSad = options.sad || minionDefaultValues.isSad;
    if (isSad) {
      renderingContext.beginPath();
      renderingContext.arc(0, 10, 15, 0, Math.PI, true);
      renderingContext.stroke();
    } else {
      renderingContext.beginPath();
      renderingContext.arc(0, -5, 15, 0, Math.PI, false);
      renderingContext.lineTo(15, -5);
      renderingContext.fill();
      renderingContext.stroke();
      drawTeeth(renderingContext, options);
    };
  }

  drawTeeth = function (renderingContext, options) {
    renderingContext.fillStyle = "white";
    var numberOfTeeth = options.numberOfTeeth || minionDefaultValues.numberOfTeeth;
    var widthOfTeeth = numberOfTeeth * 5;
    for (x = -15 + ((30 - widthOfTeeth) / 2); x < 15 - ((30 - widthOfTeeth) / 2); x = x + 5) {
      roundRect(renderingContext, x, -5, 5, 4, 2, true, true);
    }
  }

  drawOverall = function (renderingContext, options) {
    var colorOverall = options.colorOverall || minionDefaultValues.overallColor;
    renderingContext.beginPath();
    renderingContext.moveTo(-30, 10);
    renderingContext.lineTo(-15, 20);
    renderingContext.lineTo(15, 20);
    renderingContext.lineTo(30, 10);
    renderingContext.lineTo(30, 20);
    renderingContext.lineTo(15, 30);
    renderingContext.lineTo(30, 30);
    renderingContext.quadraticCurveTo(30, 40, 15, 50);
    renderingContext.lineTo(-15, 50);
    renderingContext.quadraticCurveTo(-30, 40, -30, 30);
    renderingContext.lineTo(-15, 30);
    renderingContext.lineTo(-30, 20);
    renderingContext.lineTo(-30, 10);
    renderingContext.fillStyle = colorOverall;
    renderingContext.fill();
    renderingContext.strokeStyle = "rgb(31, 67, 98)";
    renderingContext.stroke();  
  }

  drawArms = function (renderingContext, options) {
    var posRight = options.posRight || minionDefaultValues.posRight;
    var posLeft = options.posLeft || minionDefaultValues.posLeft;
    renderingContext.beginPath();
    renderingContext.fillStyle = options.bodyColor || minionDefaultValues.bodyColor;
    renderingContext.strokeStyle = "rgb(31, 67, 98)";
    //Right arm
    renderingContext.moveTo(33, 20);
    renderingContext.lineTo(31, 20);
    renderingContext.lineTo(15, 30);
    renderingContext.lineTo(33, 30);
    renderingContext.moveTo(33, 25);
    renderingContext.moveTo(33, 25 - (5 * posRight));
    renderingContext.lineTo(33, (25 -(5 * posRight)) - (10 * posRight));
    renderingContext.lineTo(40, (25 -(5 * posRight)) - (10 * posRight));
    renderingContext.lineTo(40, (25 + 5 * posRight));
    renderingContext.lineTo(33, (25 + 5 * posRight));
    renderingContext.fill();
    renderingContext.stroke();
    //Left arm
    renderingContext.strokeStyle = "rgb(31, 67, 98)";
    renderingContext.moveTo(-33, 20);
    renderingContext.lineTo(-30, 20);
    renderingContext.lineTo(-15, 30);
    renderingContext.lineTo(-33, 30);
    renderingContext.moveTo(-33, 25);
    renderingContext.moveTo(-33, 25 - (5 * posLeft));
    renderingContext.lineTo(-33, (25 - (5 * posLeft)) - (10 * posLeft));
    renderingContext.lineTo(-40, (25 - (5 * posLeft)) - (10 * posLeft));
    renderingContext.lineTo(-40, (25 + 5 * posLeft));
    renderingContext.lineTo(-33, (25 + 5 * posLeft));
    renderingContext.fill();
    renderingContext.stroke();
  }

  drawMinion = function (renderingContext, options) {
    renderingContext.linewidth = 1;
    renderingContext.save();
    drawBody(renderingContext, options);
    drawArms(renderingContext, options);
    drawEyes(renderingContext, options);
    drawMouth(renderingContext, options);
    drawOverall(renderingContext, options); 
  } 

  balloonDefaultValues = {
    KAPPA: (4 * (Math.sqrt(2) - 1)) / 3,
    //Credit to Adam Stanislav: http://www.whizkidtech.redprince.net/bezier/circle/
    widthFactor: 0.0333,
    heightFactor: 0.4,
    tieWidthFactor: 0.12,
    tieHeightFactor: 0.10,
    tieCurveFactor: 0.13,
    gradientFactor: 0.3,
    gradientCircleRadius: 3,
    centerX: 0,
    centerY: 0,
    radius: 80,
    baseColor: "rgb(229,45,45)",
    darkColor: "rgb(204,0,0)",
    lightColor: "rgb(255,76,76)"
  }

  createShape = function (renderingContext, options) {
    var centerX = options.centerX || balloonDefaultValues.centerX;
    var centerY = options.centerY || balloonDefaultValues.centerY;
    var radius = options.radius || balloonDefaultValues.radius;
    var handleLength = balloonDefaultValues.KAPPA * radius;
    var widthDiff = radius * balloonDefaultValues.widthFactor;
    var heightDiff = radius * balloonDefaultValues.heightFactor;
    var balloonBottomY = centerY + radius + heightDiff;


    // Begin balloon path 
    renderingContext.beginPath();

    // Top Left Curve 
    var topLeftCurveStartX = centerX - radius;
    var topLeftCurveStartY = centerY;
      
    var topLeftCurveEndX = centerX;
    var topLeftCurveEndY = centerY - radius;
      
    renderingContext.moveTo(topLeftCurveStartX, topLeftCurveStartY);
    renderingContext.bezierCurveTo(topLeftCurveStartX, topLeftCurveStartY - handleLength - widthDiff,
      topLeftCurveEndX - handleLength, topLeftCurveEndY,
      topLeftCurveEndX, topLeftCurveEndY);
                  
    // Top Right Curve  
    var topRightCurveStartX = centerX;
    var topRightCurveStartY = centerY - radius;
      
    var topRightCurveEndX = centerX + radius;
    var topRightCurveEndY = centerY;
      
    renderingContext.bezierCurveTo(topRightCurveStartX + handleLength + widthDiff, topRightCurveStartY,
      topRightCurveEndX, topRightCurveEndY - handleLength,
      topRightCurveEndX, topRightCurveEndY);
            
    // Bottom Right Curve  
    var bottomRightCurveStartX = centerX + radius;
    var bottomRightCurveStartY = centerY;
      
    var bottomRightCurveEndX = centerX;
    var bottomRightCurveEndY = balloonBottomY;
      
    renderingContext.bezierCurveTo(bottomRightCurveStartX, bottomRightCurveStartY + handleLength,
      bottomRightCurveEndX + handleLength, bottomRightCurveEndY,
      bottomRightCurveEndX, bottomRightCurveEndY);              
      
    // Bottom Left Curve
    var bottomLeftCurveStartX = centerX;
    var bottomLeftCurveStartY = balloonBottomY;
    
    var bottomLeftCurveEndX = centerX - radius;
    var bottomLeftCurveEndY = centerY;
    
    renderingContext.bezierCurveTo(bottomLeftCurveStartX - handleLength, bottomLeftCurveStartY,
      bottomLeftCurveEndX, bottomLeftCurveEndY + handleLength,
      bottomLeftCurveEndX, bottomLeftCurveEndY);
  }

  colorBalloon = function (renderingContext, options) {
    var radius = options.radius || balloonDefaultValues.radius;
    var centerX = options.centerX || balloonDefaultValues.centerX;
    var centerY = options.centerY || balloonDefaultValues.centerY;
    var heightDiff = radius * balloonDefaultValues.heightFactor; 
    var lightColor = options.lightColor || balloonDefaultValues.lightColor;
    var darkColor = options.darkColor || balloonDefaultValues.darkColor;


    // Create balloon gradient
    var gradientOffset = radius / 3; 
    
    var balloonGradient = renderingContext.createRadialGradient(centerX + gradientOffset,
      centerY - gradientOffset, balloonDefaultValues.gradientCircleRadius,
      centerX, centerY, radius + heightDiff);

    balloonGradient.addColorStop(0, lightColor);
    balloonGradient.addColorStop(0.7, darkColor);
    
    renderingContext.fillStyle = balloonGradient;
    renderingContext.fill();
 
    //Create and Fill Tie
    var halfTieWidth = (radius * balloonDefaultValues.tieWidthFactor)/2;
    var tieHeight = (radius * balloonDefaultValues.tieHeightFactor);
    var tieCurveHeight = (radius * balloonDefaultValues.tieCurveHeight);
    var balloonBottomY = centerY + radius + heightDiff;

    renderingContext.beginPath();
    renderingContext.moveTo(centerX - 1, balloonBottomY);
    renderingContext.lineTo(centerX - halfTieWidth, balloonBottomY + tieHeight);
    renderingContext.quadraticCurveTo(centerX, balloonBottomY + tieCurveHeight,
                  centerX + halfTieWidth, balloonBottomY + tieHeight);
    renderingContext.lineTo(centerX + 1, balloonBottomY);
    renderingContext.restore();
    renderingContext.fill();
  }
 
  drawBalloon = function (renderingContext, options) {
    createShape(renderingContext, options);
    colorBalloon(renderingContext, options);
  } 

  // Now, to actually define the animated sprites.  Each sprite has a drawing function and an array of keyframes.
       sprites = [
      {
        draw: drawMinion,
        keyframes: [
          {
            frame: 0,
            tx: 150,
            ty: 650,
            colorGlasses: "green",
        
            //ease: KeyframeTweener.linear
          },
          {
            frame: 240,
            tx: 150,
            ty: 650,
            colorGlasses: "green",
          },
          {
            frame: 360,
            tx: 150,
            ty: 600,
          },
          {
            frame: 400,
            tx: 150,
            ty: 650,
          },
          {
            frame: 450,
            tx: 150,
            ty: 600,
          },
          {
            frame: 850,
            tx: 350,
            ty: 600,
          },
          {
            frame: 1020,
            tx: 350,
            ty: 600,
          },
          {
            frame: 1100,
            tx: 350,
            ty: 600,
          },
          {
            frame: 1250,
            tx: 100,
            ty: 320,
          },
          {
            frame: 1280,
            tx: 100,
            ty: 290,
            rotate: 15,

          },
          {
            frame: 1300,
            tx: 100,
            ty: 260,
          },
           {
            frame: 1320,
            tx: 100,
            ty: 230,
          },
          {
            frame: 1380,
            tx: 100,
            ty: 140,
          },
          {
            frame: 1500,
            tx: 100,
            ty: -40,
          },

        ]
      },

      {
        draw: drawMinion,
        keyframes: [
          {
            frame: 0,
            tx: 250,
            ty: 650,
            //ease: KeyframeTweener.linear
          },
          {
            frame: 240,
            tx: 250,
            ty: 600,
          },
          {
            frame: 360,
            tx: 250,
            ty: 650,
          },
          {
            frame: 400,
            tx: 250,
            ty: 600,
          },
          {
            frame: 430,
            tx: 250,
            ty: 600,
          },
          {
            frame: 900,
            tx: 550,
            ty: 600,
          },
          {
            frame: 1020,
            tx: 550,
            ty: 600,
          },
          {
            frame: 1070,
            tx: 550,
            ty: 550,
          },
          {
            frame: 1100,
            tx: 550,
            ty: 600,
          },
          {
            frame: 1420,
            tx: 550,
            ty: 600,
          }
        ]
      },

      {
        draw: drawBalloon,
        keyframes: [
          {
            frame: 0,
            tx: 50,
            ty: 550,
            radius: 40,
            rotate: 15,
          },

          {
            frame: 240,
            tx: 60,
            ty: 325,
            radius: 40,
            rotate: -15,
          },
          {
            frame: 360,
            tx: 65,
            ty: 255,
            radius: 40,
            rotate: 15,
          },
          {
            frame: 520,
            tx: 65,
            ty: 275,
            radius: 40,
            rotate: -15,
          },
          {
            frame: 720,
            tx: 70,
            ty: 275,
            radius: 40,
            rotate: 15,
          },
          {
            frame: 900,
            tx: 65,
            ty: 265,
            radius: 40,
            rotate: 8,
          },
          {
            frame: 1250,
            tx: 70,
            ty: 270,
            radius: 40,
            rotate: 8,
          },
          {
            frame: 1280,
            tx: 77,
            ty: 240,
            radius: 40,
            rotate: 23,
          },
          {
            frame: 1300,
            tx: 70,
            ty: 210,
            radius: 40,
            rotate: 8,
          },
           {
            frame: 1320,
            tx: 70,
            ty: 180,
            radius: 40,
            rotate: 8,
          },
           {
            frame: 1380,
            tx: 70,
            ty: 90,
            radius: 40,
            rotate: 8,
          },
          {
            frame: 1500,
            tx: 70,
            ty: -90,
            radius: 40,
            rotate: 8,
          }
        ]
      },

      {
        draw: LoustauSprites.seesaw.draw,
        keyframes: [
          {
            frame: 0,
            tx: 450,
            ty: 650,
            inclination: -1,
            //ease: KeyframeTweener.linear
          },
          {
            frame: 240,
            tx: 450,
            ty: 650,
            inclination: -1,
            //ease: KeyframeTweener.linear
          },
          {
            frame: 360,
            tx: 450,
            ty: 650,
            inclination: -1,
          },
          {
            frame: 600,
            tx: 450,
            ty: 650,
            inclination: -1,
          },
          {
            frame: 700,
            tx: 450,
            ty: 650,
            inclination: 0,
          },
          {
            frame: 1120,
            tx: 450,
            ty: 650,
            inclination: 0,
          },
          {
            frame: 1220,
            tx: 450,
            ty: 650,
            inclination: 0,
          }
        ]
      },
    ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites,
        background: background
    });
}());