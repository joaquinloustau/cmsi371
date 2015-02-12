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
                        tx: 50,
                        ty: 500,
                        //ease: KeyframeTweener.linear
                    },

                    {
                        frame: 30,
                        tx: 50,
                        ty: 450,
                        //ease: KeyframeTweener.quadEaseInOut
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 80,
                        tx: 50,
                        ty: 5100,
                        //rotate: 60 // Keyframe.rotate uses degrees.
                    }
                ]
            },

            {
                draw: LoustauSprites.minion.draw,
                keyframes: [
                    {
                        frame: 0,
                        tx: 250,
                        ty: 500,
                        //ease: KeyframeTweener.linear
                    },

                    {
                        frame: 30,
                        tx: 250,
                        ty: 450,
                        //ease: KeyframeTweener.quadEaseInOut
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 80,
                        tx: 450,
                        ty: 500,
                        //rotate: 60 // Keyframe.rotate uses degrees.
                    }
                ]
            },

            {
                draw: LoustauSprites.balloon.draw,
                keyframes: [
                    {
                        frame: 0,
                        tx: 250,
                        ty: 20,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 30,
                        tx: 350,
                        ty: 50,
                        ease: KeyframeTweener.quadEaseInOut
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 80,
                        tx: 350,
                        ty: 500,
                        rotate: 60 // Keyframe.rotate uses degrees.
                    }
                ]
            },
              {
                draw: LoustauSprites.seesaw.draw,
                keyframes: [
                    {
                        frame: 0,
                        tx: 350,
                        ty: 20,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 30,
                        tx: 350,
                        ty: 50,
                        ease: KeyframeTweener.quadEaseInOut
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 80,
                        tx: 350,
                        ty: 500,
                        rotate: 60 // Keyframe.rotate uses degrees.
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
