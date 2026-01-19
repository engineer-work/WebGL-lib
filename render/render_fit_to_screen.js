(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function() { return factory.call(root); });
  } else if (typeof module === 'object' && module.exports) {
    // Node / CommonJS
    module.exports = factory.call(root);
  } else {
    // Browser global
    root.RenderFitToScreen = factory.call(root);
  }
}(typeof self !== 'undefined' ? self
  : typeof window !== 'undefined' ? window
  : typeof global !== 'undefined' ? global
  : this, function() {

  "use strict";

  const topWindow = this;

  /**
   * Resize a canvas to match its displayed size for rendering
   * @param {HTMLCanvasElement} canvas 
   * @param {number} [multiplier=1] Scale factor, e.g., window.devicePixelRatio
   * @returns {boolean} True if the canvas size was updated
   */
  function resize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

  return resize;
}));
