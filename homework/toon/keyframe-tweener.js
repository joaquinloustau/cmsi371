/*
 * A simple keyframe-tweening animation module for 2D
 * canvas elements.
 */
(function () {
  // The big one: animation initialization.  The settings parameter
  // is expected to be a JavaScript object with the following
  // properties:
  //
  // - renderingContext: the 2D canvas rendering context to use
  // - width: the width of the canvas element
  // - height: the height of the canvas element
  // - sprites: the array of sprites to animate
  // - frameRate: number of frames per second (default 24)
  //
  // In turn, each sprite is a JavaScript object with the following
  // properties:
  //
  // - draw: the function that draws the sprite
  // - keyframes: the array of keyframes that the sprite should follow
  //
  // Finally, each keyframe is a JavaScript object with the following
  // properties.  Unlike the other objects, defaults are provided in
  // case a property is not present:
  //
  // - frame: the global animation frame number in which this keyframe
  //          it to appear
  // - ease: the easing function to use (default is KeyframeTweener.linear)
  // - tx, ty: the location of the sprite (default is 0, 0)
  // - sx, sy: the scale factor of the sprite (default is 1, 1)
  // - rotate: the rotation angle of the sprite (default is 0)

  var initializeAnimation = function (settings) {
    // We need to keep track of the current frame.
    var currentFrame = 0,

    // Avoid having to go through settings to get to the
    // rendering context and sprites.
    renderingContext = settings.renderingContext,
    width = settings.width,
    height = settings.height,
    sprites = settings.sprites,
    background = settings.background,

    previousTimestamp = null,
    nextFrame = function (timestamp) {
      // Bail-out #1: We just started.
      if (!previousTimestamp) {
        previousTimestamp = timestamp;
        window.requestAnimationFrame(nextFrame);
        return;
      }

      // Bail-out #2: Too soon.
      if (timestamp - previousTimestamp < (1000 / (settings.frameRate || 1200))) {
        window.requestAnimationFrame(nextFrame);
        return;
      }

      // Clear the canvas.
      renderingContext.clearRect(0, 0, width, height);

      // For every sprite, go to the current pair of keyframes.
      // Then, draw the sprite based on the current frame.
      background(renderingContext);
      for (var i = 0, maxI = sprites.length; i < maxI; i += 1) {
        for (var j = 0, maxJ = sprites[i].keyframes.length - 1; j < maxJ; j += 1) {

          // We look for keyframe pairs such that the current
          // frame is between their frame numbers.
          if ((sprites[i].keyframes[j].frame <= currentFrame) &&
              (currentFrame <= sprites[i].keyframes[j + 1].frame)) {

            // Point to the start and end keyframes.
            var startKeyframe = sprites[i].keyframes[j],
                endKeyframe = sprites[i].keyframes[j + 1];

            // Save the rendering context state.
            renderingContext.save();

            // Set up our start and distance values, using defaults
            // if necessary.
            var ease = startKeyframe.ease || KeyframeTweener.linear,
              txStart = startKeyframe.tx || 0,
              txDistance = (endKeyframe.tx || 0) - txStart,

              tyStart = startKeyframe.ty || 0,
              tyDistance = (endKeyframe.ty || 0) - tyStart,

              sxStart = startKeyframe.sx || 1,
              sxDistance = (endKeyframe.sx || 1) - sxStart,

              syStart = startKeyframe.sy || 1,
              syDistance = (endKeyframe.sy || 1) - syStart,

              radiusStart  = startKeyframe.radius || 0,
              radiusDistance = (endKeyframe.radius || 0) - radiusStart,

              // JD: 2
              inclinationStart  = startKeyframe.inclination || 0,
              inclinationDistance = (endKeyframe.inclination || 0) - inclinationStart,

              eyesizeStart  = startKeyframe.eyesize || 0,
              eyesizeDistance = (endKeyframe.eyesize || 0) - eyesizeStart,

              rotateStart = (startKeyframe.rotate || 0) * Math.PI / 180,
              rotateDistance = (endKeyframe.rotate || 0) * Math.PI / 180 - rotateStart;

            var currentTweenFrame = currentFrame - startKeyframe.frame,
                duration = endKeyframe.frame - startKeyframe.frame + 1;

            // Build our transform according to where we should be.
            renderingContext.translate(
              ease(currentTweenFrame, txStart, txDistance, duration),
              ease(currentTweenFrame, tyStart, tyDistance, duration)
            );

            renderingContext.scale(
              ease(currentTweenFrame, sxStart, sxDistance, duration),
              ease(currentTweenFrame, syStart, syDistance, duration)
            );

            renderingContext.rotate(
              ease(currentTweenFrame, rotateStart, rotateDistance, duration)
            );


            // Draw the sprite.
            sprites[i].draw(renderingContext, {
              radius: ease(currentTweenFrame, radiusStart, radiusDistance, duration),
              inclination: ease(currentTweenFrame, inclinationStart, inclinationDistance, duration),
              sad: sprites[i].keyframes[j].sad,
              darkColor: sprites[i].keyframes[j].darkColor,
              lightColor: sprites[i].keyframes[j].lightColor,
              posRight: sprites[i].keyframes[j].posRight,
              posLeft: sprites[i].keyframes[j].posLeft,
              numberOfTeeth: sprites[i].keyframes[j].numberOfTeeth,
              eyesize: ease(currentTweenFrame, eyesizeStart, eyesizeDistance, duration),
            });

            // Clean up.
            renderingContext.restore();
            } // JD: 3
          }
        }

        // Move to the next frame.
        currentFrame += 1;
        previousTimestamp = timestamp;
        window.requestAnimationFrame(nextFrame);
      };
    window.requestAnimationFrame(nextFrame);
  };

  window.KeyframeTweener = {
    // The module comes with a library of common easing functions.
    linear: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return distance * percentComplete + start;
    },

    quadEaseIn: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return distance * percentComplete * percentComplete + start;
    },

    quadEaseOut: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return -distance * percentComplete * (percentComplete - 2) + start;
    },

    quadEaseInAndOut: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / (duration / 2);
        return (percentComplete < 1) ?
                (distance / 2) * percentComplete * percentComplete + start :
                (-distance / 2) * ((percentComplete - 1) * (percentComplete - 3) - 1) + start;
    },

    // Generated by Groleau's easing function generator
    inQuintic: function (currentTime, start, distance, duration) {
      var ts =(currentTime /= duration) * currentTime; // JD: 5
      var tc = ts * currentTime;
      return start + distance * (tc * ts);
    },

    outElastic: function (currentTime, start, distance, duration) {   
      var ts = (currentTime /= duration) * currentTime;
      var tc = ts * currentTime;
      return start + distance * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67* ts + 15* currentTime); // JD: 5
    },

    initialize: initializeAnimation
  };
}());
