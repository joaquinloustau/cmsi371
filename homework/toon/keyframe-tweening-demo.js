/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
  var canvas = document.getElementById("canvas"),
    // First, a selection of "drawing functions" from which we
    // can choose.  Their common trait: they all accept a single
    // renderingContext argument.
    square = function (renderingContext) {
        renderingContext.fillStyle = "blue";
        renderingContext.fillRect(-20, -20, 40, 40);
    },

    circle = function (renderingContext) {
        renderingContext.strokeStyle = "red";
        renderingContext.beginPath();
        renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
        renderingContext.stroke();
    },

    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes.
    sprites = [
      {
        draw: LoustauSprites.minion.draw,
        keyframes: [
          {
            frame: 0,
            tx: 150,
            ty: 350,
            colorGlasses: "green",
        
            //ease: KeyframeTweener.linear
          },
          {
            frame: 240,
            tx: 150,
            ty: 350,
            colorGlasses: "green",
          },
          {
            frame: 360,
            tx: 150,
            ty: 300,
          },
          {
            frame: 400,
            tx: 150,
            ty: 350,
          },
          {
            frame: 450,
            tx: 150,
            ty: 300,
          },
          {
            frame: 850,
            tx: 350,
            ty: 300,
          },
          {
            frame: 1020,
            tx: 350,
            ty: 300,
          },
          {
            frame: 1100,
            tx: 350,
            ty: 300,
          },
          {
            frame: 1220,
            tx: 100,
            ty: 120,
          },
          {
            frame: 1320,
            tx: 100,
            ty: 120,
          },
          {
            frame: 1420,
            tx: 100,
            ty: 90,
            rotate: 15,

          },
          {
            frame: 1520,
            tx: 100,
            ty: 60,
          }
        ]
      },

      {
        draw: LoustauSprites.minion.draw,
        keyframes: [
          {
            frame: 0,
            tx: 250,
            ty: 350,
            //ease: KeyframeTweener.linear
          },
          {
            frame: 240,
            tx: 250,
            ty: 300,
          },
          {
            frame: 360,
            tx: 250,
            ty: 350,
          },
          {
            frame: 400,
            tx: 250,
            ty: 300,
          },
          {
            frame: 430,
            tx: 250,
            ty: 300,
          },
          {
            frame: 900,
            tx: 550,
            ty: 300,
          },
          {
            frame: 1020,
            tx: 550,
            ty: 300,
          },
          {
            frame: 1070,
            tx: 550,
            ty: 250,
          },
          {
            frame: 1100,
            tx: 550,
            ty: 300,
          },
          {
            frame: 1120,
            tx: 550,
            ty: 300,
          }
        ]
      },

      {
        draw: LoustauSprites.balloon.draw,
        keyframes: [
          {
            frame: 0,
            tx: 50,
            ty: 350,
            radius: 40,
            rotate: 15,
          },

          {
            frame: 240,
            tx: 60,
            ty: 125,
            radius: 40,
            rotate: -15,
          },
          {
            frame: 360,
            tx: 65,
            ty: 55,
            radius: 40,
            rotate: 15,
          },
          {
            frame: 520,
            tx: 65,
            ty: 75,
            radius: 40,
            rotate: -15,
          },
          {
            frame: 720,
            tx: 70,
            ty: 75,
            radius: 40,
            rotate: 15,
          },
          {
            frame: 900,
            tx: 65,
            ty: 65,
            radius: 40,
            rotate: 8,
          },
          {
            frame: 1320,
            tx: 70,
            ty: 70,
            radius: 40,
            rotate: 8,
          },
          {
            frame: 1420,
            tx: 77,
            ty: 40,
            radius: 40,
            rotate: 23,
          },
          {
            frame: 1520,
            tx: 70,
            ty: 10,
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
            ty: 350,
            inclination: -1,
            //ease: KeyframeTweener.linear
          },
          {
            frame: 240,
            tx: 450,
            ty: 350,
            inclination: -1,
            //ease: KeyframeTweener.linear
          },
          {
            frame: 360,
            tx: 450,
            ty: 350,
            inclination: -1,
          },
          {
            frame: 600,
            tx: 450,
            ty: 350,
            inclination: -1,
          },
          {
            frame: 700,
            tx: 450,
            ty: 350,
            inclination: 0,
          },
          {
            frame: 1120,
            tx: 450,
            ty: 350,
            inclination: 0,
          },
          {
            frame: 1220,
            tx: 450,
            ty: 350,
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
        frameRate: 120,
        sprites: sprites
    });
}());
