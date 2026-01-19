(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser global
    root.F_2D = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const positions = new Float32Array([
    // left column
     0,   0,  0,
    30,   0,  0,
     0, 150,  0,
     0, 150,  0,
    30,   0,  0,
    30, 150,  0,

    // top rung
    30,   0,  0,
   100,   0,  0,
    30,  30,  0,
    30,  30,  0,
   100,   0,  0,
   100,  30,  0,

    // middle rung
    30,  60,  0,
    67,  60,  0,
    30,  90,  0,
    30,  90,  0,
    67,  60,  0,
    67,  90,  0,
  ]);

  return {
    positions
  };
}));

