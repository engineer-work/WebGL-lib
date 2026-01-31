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

  // Golden ratio constant
  var phi = (1 + Math.sqrt(5)) / 2;
  var invPhi = 1 / phi;

  // AIR - Octahedron (representing intellect, communication)
  var airPositions = new Float32Array([
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

  var airNormals = new Float32Array([
    // Top pyramid normals
    0.577, 0.577, -0.577,  0.577, 0.577, -0.577,  0.577, 0.577, -0.577,
    -0.577, 0.577, -0.577,  -0.577, 0.577, -0.577,  -0.577, 0.577, -0.577,
    -0.577, 0.577, 0.577,  -0.577, 0.577, 0.577,  -0.577, 0.577, 0.577,
    0.577, 0.577, 0.577,  0.577, 0.577, 0.577,  0.577, 0.577, 0.577,
    
    // Bottom pyramid normals
    0.577, -0.577, -0.577,  0.577, -0.577, -0.577,  0.577, -0.577, -0.577,
    -0.577, -0.577, -0.577,  -0.577, -0.577, -0.577,  -0.577, -0.577, -0.577,
    -0.577, -0.577, 0.577,  -0.577, -0.577, 0.577,  -0.577, -0.577, 0.577,
    0.577, -0.577, 0.577,  0.577, -0.577, 0.577,  0.577, -0.577, 0.577
  ]);

  // FIRE - Tetrahedron (representing energy, transformation)
  var firePositions = new Float32Array([
    // Base
    1, -0.5, -0.5,   -1, -0.5, -0.5,   0, -0.5, 1,
    
    // Sides
    1, -0.5, -0.5,   -1, -0.5, -0.5,   0, 1, 0,
    -1, -0.5, -0.5,   0, -0.5, 1,       0, 1, 0,
    0, -0.5, 1,       1, -0.5, -0.5,    0, 1, 0
  ]);

  var fireNormals = new Float32Array([
    // Base normal (down)
    0, -1, 0,  0, -1, 0,  0, -1, 0,
    
    // Side normals
    0.333, 0.667, -0.667,  0.333, 0.667, -0.667,  0.333, 0.667, -0.667,
    -0.667, 0.667, 0.333,  -0.667, 0.667, 0.333,  -0.667, 0.667, 0.333,
    0.333, 0.667, 0.667,  0.333, 0.667, 0.667,  0.333, 0.667, 0.667
  ]);

  // WATER - Icosahedron (representing flow, emotion)
  var waterPositions = new Float32Array([
    // 20 triangular faces
    0, 1, phi,     phi, 0, 1,     1, phi, 0,
    0, 1, phi,     1, phi, 0,     0, 1, -phi,
    0, 1, phi,     0, 1, -phi,    -phi, 0, -1,
    0, 1, phi,     -phi, 0, -1,   -1, phi, 0,
    0, 1, phi,     -1, phi, 0,    -phi, 0, 1,
    0, 1, phi,     -phi, 0, 1,    0, -1, phi,
    
    0, -1, phi,    phi, 0, 1,     0, 1, phi,
    0, -1, phi,    1, -phi, 0,    phi, 0, 1,
    0, -1, phi,    -1, -phi, 0,   1, -phi, 0,
    0, -1, phi,    -phi, 0, 1,    -1, -phi, 0,
    0, -1, phi,    0, -1, -phi,   -phi, 0, -1,
    0, -1, phi,    -phi, 0, -1,   -phi, 0, 1,
    
    phi, 0, 1,     0, -1, phi,     1, -phi, 0,
    phi, 0, 1,     1, -phi, 0,     1, phi, 0,
    phi, 0, 1,     1, phi, 0,     0, 1, phi,
    
    1, phi, 0,     phi, 0, -1,     0, 1, -phi,
    1, phi, 0,     1, -phi, 0,     phi, 0, -1,
    
    0, 1, -phi,    phi, 0, -1,     0, -1, -phi,
    0, 1, -phi,    0, -1, -phi,    -phi, 0, -1,
    
    -phi, 0, -1,   0, -1, -phi,    -1, -phi, 0,
    -phi, 0, -1,   -1, -phi, 0,    -1, phi, 0,
    -phi, 0, -1,   -1, phi, 0,     0, 1, -phi,
    
    -1, phi, 0,    -phi, 0, 1,     0, 1, phi,
    -1, phi, 0,    -1, -phi, 0,    -phi, 0, 1
  ]);

  var waterNormals = (function() {
    // Generate normals for water (icosahedron)
    var normals = new Float32Array(waterPositions.length);
    for (var i = 0; i < waterPositions.length; i += 9) {
      var v0 = {x: waterPositions[i], y: waterPositions[i+1], z: waterPositions[i+2]};
      var v1 = {x: waterPositions[i+3], y: waterPositions[i+4], z: waterPositions[i+5]};
      var v2 = {x: waterPositions[i+6], y: waterPositions[i+7], z: waterPositions[i+8]};
      
      // Calculate edges
      var edge1 = {x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z};
      var edge2 = {x: v2.x - v0.x, y: v2.y - v0.y, z: v2.z - v0.z};
      
      // Calculate normal
      var normal = {
        x: edge1.y * edge2.z - edge1.z * edge2.y,
        y: edge1.z * edge2.x - edge1.x * edge2.z,
        z: edge1.x * edge2.y - edge1.y * edge2.x
      };
      
      // Normalize
      var length = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
      normal.x /= length;
      normal.y /= length;
      normal.z /= length;
      
      // Assign to all 3 vertices of the triangle
      normals[i] = normal.x; normals[i+1] = normal.y; normals[i+2] = normal.z;
      normals[i+3] = normal.x; normals[i+4] = normal.y; normals[i+5] = normal.z;
      normals[i+6] = normal.x; normals[i+7] = normal.y; normals[i+8] = normal.z;
    }
    return normals;
  })();

  // EARTH - Cube (representing stability, foundation)
  var earthPositions = new Float32Array([
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

  var earthNormals = new Float32Array([
    // Front face normals (z = 1)
    0, 0, 1, 0, 0, 1, 0, 0, 1,
    0, 0, 1, 0, 0, 1, 0, 0, 1,
    
    // Back face normals (z = -1)
    0, 0, -1, 0, 0, -1, 0, 0, -1,
    0, 0, -1, 0, 0, -1, 0, 0, -1,
    
    // Top face normals (y = 1)
    0, 1, 0, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0,
    
    // Bottom face normals (y = -1)
    0, -1, 0, 0, -1, 0, 0, -1, 0,
    0, -1, 0, 0, -1, 0, 0, -1, 0,
    
    // Right face normals (x = 1)
    1, 0, 0, 1, 0, 0, 1, 0, 0,
    1, 0, 0, 1, 0, 0, 1, 0, 0,
    
    // Left face normals (x = -1)
    -1, 0, 0, -1, 0, 0, -1, 0, 0,
    -1, 0, 0, -1, 0, 0, -1, 0, 0
  ]);

  // SPACE/ETHER - Dodecahedron (representing consciousness, the void)
  var spacePositions = new Float32Array([
    // Each pentagon face divided into triangles
    // Face 1
    1, 1, 1,    0, phi, invPhi,    -1, 1, 1,
    1, 1, 1,    -1, 1, 1,          phi, invPhi, 0,
    1, 1, 1,    phi, invPhi, 0,    invPhi, 0, phi,
    
    // Face 2
    1, 1, -1,   0, phi, -invPhi,   -1, 1, -1,
    1, 1, -1,   -1, 1, -1,         phi, invPhi, 0,
    1, 1, -1,   phi, invPhi, 0,    invPhi, 0, -phi,
    
    // Face 3
    1, -1, 1,   0, -phi, invPhi,   -1, -1, 1,
    1, -1, 1,   -1, -1, 1,         phi, -invPhi, 0,
    1, -1, 1,   phi, -invPhi, 0,   invPhi, 0, phi,
    
    // Face 4
    1, -1, -1,  0, -phi, -invPhi,  -1, -1, -1,
    1, -1, -1,  -1, -1, -1,        phi, -invPhi, 0,
    1, -1, -1,  phi, -invPhi, 0,   invPhi, 0, -phi,
    
    // More faces...
    phi, invPhi, 0,   1, 1, 1,     1, 1, -1,
    phi, invPhi, 0,   1, 1, -1,    1, -1, -1,
    phi, invPhi, 0,   1, -1, -1,   1, -1, 1,
    phi, invPhi, 0,   1, -1, 1,    1, 1, 1,
    
    -phi, invPhi, 0,  -1, 1, 1,    -1, 1, -1,
    -phi, invPhi, 0,  -1, 1, -1,   -1, -1, -1,
    -phi, invPhi, 0,  -1, -1, -1,  -1, -1, 1,
    -phi, invPhi, 0,  -1, -1, 1,   -1, 1, 1
  ]);

  var spaceNormals = (function() {
    // Generate normals for space (dodecahedron)
    var normals = new Float32Array(spacePositions.length);
    for (var i = 0; i < spacePositions.length; i += 9) {
      var v0 = {x: spacePositions[i], y: spacePositions[i+1], z: spacePositions[i+2]};
      var v1 = {x: spacePositions[i+3], y: spacePositions[i+4], z: spacePositions[i+5]};
      var v2 = {x: spacePositions[i+6], y: spacePositions[i+7], z: spacePositions[i+8]};
      
      // Calculate edges
      var edge1 = {x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z};
      var edge2 = {x: v2.x - v0.x, y: v2.y - v0.y, z: v2.z - v0.z};
      
      // Calculate normal
      var normal = {
        x: edge1.y * edge2.z - edge1.z * edge2.y,
        y: edge1.z * edge2.x - edge1.x * edge2.z,
        z: edge1.x * edge2.y - edge1.y * edge2.x
      };
      
      // Normalize
      var length = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
      normal.x /= length;
      normal.y /= length;
      normal.z /= length;
      
      // Assign to all 3 vertices of the triangle
      normals[i] = normal.x; normals[i+1] = normal.y; normals[i+2] = normal.z;
      normals[i+3] = normal.x; normals[i+4] = normal.y; normals[i+5] = normal.z;
      normals[i+6] = normal.x; normals[i+7] = normal.y; normals[i+8] = normal.z;
    }
    return normals;
  })();

  return {
    // Air (Octahedron)
    airPositions: airPositions,
    airNormals: airNormals,
    
    // Fire (Tetrahedron)
    firePositions: firePositions,
    fireNormals: fireNormals,
    
    // Water (Icosahedron)
    waterPositions: waterPositions,
    waterNormals: waterNormals,
    
    // Earth (Cube)
    earthPositions: earthPositions,
    earthNormals: earthNormals,
    
    // Space/Ether (Dodecahedron)
    spacePositions: spacePositions,
    spaceNormals: spaceNormals,
    
    // Optional: All elements in one object
    elements: {
      air: { positions: airPositions, normals: airNormals },
      fire: { positions: firePositions, normals: fireNormals },
      water: { positions: waterPositions, normals: waterNormals },
      earth: { positions: earthPositions, normals: earthNormals },
      space: { positions: spacePositions, normals: spaceNormals }
    }
  };
}));
