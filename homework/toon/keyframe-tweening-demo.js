/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        backgroundColors = {
            bottom: "#D4D4D4",
            middle: "#A9A9A9",
            top: "#656565",
            colorStop1: 0.5,
            colorStop2: 0.6,
            colorStop3: 0.7
        },
        // First, a selection of "drawing functions" from which we
        // can choose.
        background = function (renderingContext) {
            //console.log('hola');
            var img = new Image();
            img.src = "grass-and-sky-wallpaper-10.jpg"; // Set source path
   // Create new img element
            renderingContext.drawImage(img, 0, 0, canvas.width, canvas.height);
        },

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
       sprites = [
      {
        draw: LoustauSprites.minion.draw,
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
        draw: LoustauSprites.minion.draw,
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