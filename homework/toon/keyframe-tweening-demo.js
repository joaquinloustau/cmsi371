/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
  var canvas = document.getElementById("canvas"),

  // First, a selection of "drawing functions" from which we can choose.
  background = function (renderingContext) {
    var img = new Image();
    img.src = "grass-and-sky-wallpaper-10.jpg"; // Set source path
    renderingContext.drawImage(img, 0, 0, canvas.width, canvas.height);
  },

  createJumpKeyframes = function (startFrame, startTx, startTy) {
    var result = [ ];
    for (i = 0; i < 7; i++) {
      result.push(
        {
          frame: startFrame + (60 * i),
          tx: startTx,
          ty: startTy + 50 * Math.pow(-1, i),
          posRight: Math.pow(-1, i) * -1,
          posLeft: Math.pow(-1, i),
          numberOfTeeth: 6,
        }
      );
    }
    return result;
  },

  createFlyKeyframes = function (startFrame, startTx, startTy) {
    var result = [ ];
    for (i = 0; i < 10; i++) {
      result.push(
        {
          frame: startFrame + (150 * i),
          tx: startTx,
          ty: startTy - 100 * i,
        }
      );
    }
    return result;
  },

  createGrandFinale = function () {
    for (m = 0; m < 7; m++) {
       demoMinion.keyframes.push.apply(demoMinion.keyframes, createFlyKeyframes(1750, 30 + (150*m), 600));
    }
  },

  // Now, to actually define the animated sprites.  Each sprite has a drawing function and an array of keyframes.

  demoMinion = {
    draw: LoustauSprites.minion.draw,
    keyframes: [
    ]
  },

  sprites = [
    {
      draw: LoustauSprites.minion.draw,
      keyframes: [
        {
          frame: 360,
          tx: 150,
          ty: 600,
          eyesize: 3,
          numberOfTeeth: 6,
        },
        {
          frame: 400,
          tx: 150,
          ty: 650,
          sad: true,
          eyesize: 3,
        },
        {
          frame: 450,
          tx: 150,
          ty: 600,
          sad: true,
          eyesize: 3,
        },
        {
          frame: 850,
          tx: 350,
          ty: 600,
          eyesize: 4,
          numberOfTeeth: 6,
        },
        {
          frame: 950,
          tx: 350,
          ty: 600,
          eyesize: 4,
          numberOfTeeth: 6,
        },
        {
          frame: 1100,
          tx: 350,
          ty: 610,
          eyesize: 4,
          numberOfTeeth: 6,
        },
        {
          frame: 1250,
          tx: 350,
          ty: 610,
          eyesize: 4,
          numberOfTeeth: 6,
        },
        {
          frame: 1300,
          tx: 350,
          ty: 600,
          numberOfTeeth: 0,
          eyesize: 4.5,
        },
        {
          frame: 1350,
          tx: 300,
          ty: 500,
          numberOfTeeth: 0,
          eyesize: 5,
        },
        {
          frame: 1400,
          tx: 200,
          ty: 350,
          numberOfTeeth: 0,
          eyesize: 6,
        },
        {
          frame: 1450,
          tx: 150,
          ty: 260,
          eyesize: 6.5,
        },
        {
          frame: 1650,
          tx: 100,
          ty: 200,
          eyesize: 6.5,
          sad: true,
        },
        {
          frame: 1750,
          tx: 100,
          ty: 0,
          eyesize: 6.5,
          sad: true,
        },
      ]
    },

  {
    draw: LoustauSprites.minion.draw,
      keyframes: [
        {
          frame: 370,
          tx: 250,
          ty: 650,
          numberOfTeeth: 6,
        },
        {
          frame: 400,
          tx: 250,
          ty: 600,
          numberOfTeeth: 6,
          ease: KeyframeTweener.quadEaseOut,
        },
        {
          frame: 430,
          tx: 250,
          ty: 600,
          sad: false,
          numberOfTeeth: 6,
        },
        {
          frame: 900,
          tx: 550,
          ty: 600,
          numberOfTeeth: 6,
        },
        {
          frame: 950,
          tx: 550,
          ty: 600,
          numberOfTeeth: 6,
        },
        {
          frame: 1250,
          tx: 550,
          ty: 500,
          numberOfTeeth: 6,
        },
        {
          frame: 1300,
          tx: 550,
          ty: 600,
          numberOfTeeth: 6,
        },
        {
          frame: 1350,
          tx: 550,
          ty: 610,
          numberOfTeeth: 6,
        },
        {
          frame: 1520,
          tx: 550,
          ty: 610,
          sad: true,
        },
        {
          frame: 1750,
          tx: 550,
          ty: 610,
          sad: true,
        }
      ]
    },

    {
      draw: LoustauSprites.balloon.draw,
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
          rotate: -15,
        },
        {
          frame: 1250,
          tx: 70,
          ty: 270,
          radius: 40,
        },
        {
          frame: 1280,
          tx: 77,
          ty: 240,
          radius: 40,
        },
        {
          frame: 1300,
          tx: 70,
          ty: 230,
          radius: 40,
        },
         {
          frame: 1450,
          tx: 70,
          ty: 210,
          radius: 40,
        },
        {
          frame: 1650,
          tx: 70,
          ty: 150,
          radius: 40,
        },
        {
          frame: 1750,
          tx: 70,
          ty: -50,
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
        },
        {
          frame: 240,
          tx: 450,
          ty: 650,
          inclination: -1,
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
          frame: 750,
          tx: 450,
          ty: 650,
          inclination: 0,
        },
         {
          frame: 950,
          tx: 450,
          ty: 650,
          inclination: 0,
        },
        {
          frame: 1140,
          tx: 450,
          ty: 650,
          inclination: -1,
        },
        {
          frame: 1250,
          tx: 450,
          ty: 650,
          inclination: -1,
        },
        {
          frame: 1370,
          tx: 450,
          ty: 650,
          inclination: 1,
        },
        {
          frame: 1500,
          tx: 450,
          ty: 650,
          inclination: 1,
        },
        {
          frame: 1750,
          tx: 450,
          ty: 650,
          inclination: 1,
        }
      ]
    },
  ];

  createGrandFinale();
  demoMinion.keyframes.push.apply(demoMinion.keyframes, createJumpKeyframes(0, 150, 625));
  demoMinion.keyframes.push.apply(demoMinion.keyframes, createJumpKeyframes(10, 250, 600));

  console.log(demoMinion);
  sprites.push(demoMinion);

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