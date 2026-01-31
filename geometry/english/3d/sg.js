(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser global
    root.SACRED_GEOMETRY = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // AIR - Octahedron (representing intellect, communication)
  const air = new Float32Array([
    // Top pyramid
    0, 1, 0,   -1, 0, -1,   1, 0, -1,
    0, 1, 0,    1, 0, -1,   1, 0, 1,
    0, 1, 0,    1, 0, 1,   -1, 0, 1,
    0, 1, 0,   -1, 0, 1,   -1, 0, -1,
    
    // Bottom pyramid
    0, -1, 0,  -1, 0, -1,   1, 0, -1,
    0, -1, 0,   1, 0, -1,   1, 0, 1,
    0, -1, 0,   1, 0, 1,   -1, 0, 1,
    0, -1, 0,  -1, 0, 1,   -1, 0, -1
  ]);

  // FIRE - Tetrahedron (representing energy, transformation)
  const fire = new Float32Array([
    // Base
    1, -0.5, -0.5,   -1, -0.5, -0.5,   0, -0.5, 1,
    
    // Sides
    1, -0.5, -0.5,   -1, -0.5, -0.5,   0, 1, 0,
    -1, -0.5, -0.5,   0, -0.5, 1,       0, 1, 0,
    0, -0.5, 1,       1, -0.5, -0.5,    0, 1, 0
  ]);

  // WATER - Icosahedron (representing flow, emotion)
  const water = new Float32Array([
    // Golden ratio
    const φ = (1 + Math.sqrt(5)) / 2;
    
    // 12 vertices of icosahedron
    0, 1, φ,     0, -1, φ,     φ, 0, 1,
    0, 1, -φ,    0, -1, -φ,    -φ, 0, 1,
    1, φ, 0,     -1, φ, 0,     1, -φ, 0,
    -1, -φ, 0,   φ, 0, -1,     -φ, 0, -1,
    
    // 20 triangular faces
    0, 1, φ,     φ, 0, 1,     1, φ, 0,
    0, 1, φ,     1, φ, 0,     0, 1, -φ,
    0, 1, φ,     0, 1, -φ,    -φ, 0, -1,
    0, 1, φ,     -φ, 0, -1,   -1, φ, 0,
    0, 1, φ,     -1, φ, 0,    -φ, 0, 1,
    0, 1, φ,     -φ, 0, 1,    0, -1, φ,
    
    0, -1, φ,    φ, 0, 1,     0, 1, φ,
    0, -1, φ,    1, -φ, 0,    φ, 0, 1,
    0, -1, φ,    -1, -φ, 0,   1, -φ, 0,
    0, -1, φ,    -φ, 0, 1,    -1, -φ, 0,
    0, -1, φ,    0, -1, -φ,   -φ, 0, -1,
    0, -1, φ,    -φ, 0, -1,   -φ, 0, 1,
    
    φ, 0, 1,     0, -1, φ,     1, -φ, 0,
    φ, 0, 1,     1, -φ, 0,     1, φ, 0,
    φ, 0, 1,     1, φ, 0,     0, 1, φ,
    
    1, φ, 0,     φ, 0, -1,     0, 1, -φ,
    1, φ, 0,     1, -φ, 0,     φ, 0, -1,
    
    0, 1, -φ,    φ, 0, -1,     0, -1, -φ,
    0, 1, -φ,    0, -1, -φ,    -φ, 0, -1,
    
    -φ, 0, -1,   0, -1, -φ,    -1, -φ, 0,
    -φ, 0, -1,   -1, -φ, 0,    -1, φ, 0,
    -φ, 0, -1,   -1, φ, 0,     0, 1, -φ,
    
    -1, φ, 0,    -φ, 0, 1,     0, 1, φ,
    -1, φ, 0,    -1, -φ, 0,    -φ, 0, 1
  ]);

  // EARTH - Cube (representing stability, foundation)
  const earth = new Float32Array([
    // Front face
    -1, -1, 1,   1, -1, 1,   -1, 1, 1,
    -1, 1, 1,    1, -1, 1,   1, 1, 1,
    
    // Back face
    -1, -1, -1,  -1, 1, -1,   1, -1, -1,
    1, -1, -1,   -1, 1, -1,   1, 1, -1,
    
    // Top face
    -1, 1, -1,   -1, 1, 1,    1, 1, -1,
    1, 1, -1,    -1, 1, 1,    1, 1, 1,
    
    // Bottom face
    -1, -1, -1,  1, -1, -1,   -1, -1, 1,
    -1, -1, 1,   1, -1, -1,   1, -1, 1,
    
    // Right face
    1, -1, -1,   1, 1, -1,    1, -1, 1,
    1, -1, 1,    1, 1, -1,    1, 1, 1,
    
    // Left face
    -1, -1, -1,  -1, -1, 1,   -1, 1, -1,
    -1, 1, -1,   -1, -1, 1,   -1, 1, 1
  ]);

  // SPACE/ETHER - Dodecahedron (representing consciousness, the void)
  const space = new Float32Array([
    // Golden ratio
    const φ = (1 + Math.sqrt(5)) / 2;
    const invφ = 1 / φ;
    
    // Vertices
    (±1, ±1, ±1),
    (0, ±φ, ±invφ),
    (±invφ, 0, ±φ),
    (±φ, ±invφ, 0),
    
    // 12 pentagonal faces (simplified as triangles)
    // Each pentagon divided into 3 triangles from center
    0, φ, invφ,   1, 1, 1,     φ, invφ, 0,
    0, φ, invφ,   φ, invφ, 0,   invφ, 0, φ,
    0, φ, invφ,   invφ, 0, φ,   -1, 1, 1,
    
    0, φ, -invφ,  1, 1, -1,    φ, invφ, 0,
    0, φ, -invφ,  φ, invφ, 0,  invφ, 0, -φ,
    0, φ, -invφ,  invφ, 0, -φ, -1, 1, -1,
    
    0, -φ, invφ,  1, -1, 1,    φ, -invφ, 0,
    0, -φ, invφ,  φ, -invφ, 0, invφ, 0, φ,
    0, -φ, invφ,  invφ, 0, φ,  -1, -1, 1,
    
    0, -φ, -invφ, 1, -1, -1,   φ, -invφ, 0,
    0, -φ, -invφ, φ, -invφ, 0, invφ, 0, -φ,
    0, -φ, -invφ, invφ, 0, -φ, -1, -1, -1,
    
    φ, invφ, 0,   1, 1, 1,     1, 1, -1,
    φ, invφ, 0,   1, 1, -1,    1, -1, -1,
    φ, invφ, 0,   1, -1, -1,   1, -1, 1,
    φ, invφ, 0,   1, -1, 1,    1, 1, 1,
    
    -φ, invφ, 0,  -1, 1, 1,    -1, 1, -1,
    -φ, invφ, 0,  -1, 1, -1,   -1, -1, -1,
    -φ, invφ, 0,  -1, -1, -1,  -1, -1, 1,
    -φ, invφ, 0,  -1, -1, 1,   -1, 1, 1
  ]);

  // METATRON'S CUBE - Sacred geometry pattern (optional bonus)
  const metatronsCube = new Float32Array([
    // Central sphere points (13 circles of Fruit of Life)
    // Simplified as points on spheres
    0, 0, 0,    1, 0, 0,    -1, 0, 0,
    0, 1, 0,    0, -1, 0,   0, 0, 1,
    0, 0, -1,   0.707, 0.707, 0,   -0.707, 0.707, 0,
    0.707, -0.707, 0,   -0.707, -0.707, 0,
    0, 0.707, 0.707,   0, 0.707, -0.707,
    0, -0.707, 0.707,  0, -0.707, -0.707,
    0.707, 0, 0.707,   -0.707, 0, 0.707,
    0.707, 0, -0.707,  -0.707, 0, -0.707
  ]);

  return {
    air,
    fire,
    water,
    earth,
    space,
    metatronsCube
  };
}));
