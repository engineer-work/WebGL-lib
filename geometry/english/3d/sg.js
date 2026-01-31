(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SACRED_GEOMETRY = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  var phi = (1 + Math.sqrt(5)) / 2;
  var invPhi = 1 / phi;

  // Helper function to calculate normals
  function calculateNormals(positions) {
    var normals = new Float32Array(positions.length);
    for (var i = 0; i < positions.length; i += 9) {
      var v0 = {x: positions[i], y: positions[i+1], z: positions[i+2]};
      var v1 = {x: positions[i+3], y: positions[i+4], z: positions[i+5]};
      var v2 = {x: positions[i+6], y: positions[i+7], z: positions[i+8]};
      
      var edge1 = {x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z};
      var edge2 = {x: v2.x - v0.x, y: v2.y - v0.y, z: v2.z - v0.z};
      
      var normal = {
        x: edge1.y * edge2.z - edge1.z * edge2.y,
        y: edge1.z * edge2.x - edge1.x * edge2.z,
        z: edge1.x * edge2.y - edge1.y * edge2.x
      };
      
      var length = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
      normal.x /= length;
      normal.y /= length;
      normal.z /= length;
      
      normals[i] = normal.x; normals[i+1] = normal.y; normals[i+2] = normal.z;
      normals[i+3] = normal.x; normals[i+4] = normal.y; normals[i+5] = normal.z;
      normals[i+6] = normal.x; normals[i+7] = normal.y; normals[i+8] = normal.z;
    }
    return normals;
  }

  // AIR - Octahedron (24 vertices)
  var airPositions = new Float32Array([
    0, 1, 0, -1, 0, -1, 1, 0, -1,
    0, 1, 0, 1, 0, -1, 1, 0, 1,
    0, 1, 0, 1, 0, 1, -1, 0, 1,
    0, 1, 0, -1, 0, 1, -1, 0, -1,
    
    0, -1, 0, -1, 0, -1, 1, 0, -1,
    0, -1, 0, 1, 0, -1, 1, 0, 1,
    0, -1, 0, 1, 0, 1, -1, 0, 1,
    0, -1, 0, -1, 0, 1, -1, 0, -1
  ]);
  var airNormals = calculateNormals(airPositions);
  var airCount = 24; // 8 triangles * 3 vertices

  // FIRE - Tetrahedron (12 vertices)
  var firePositions = new Float32Array([
    1, -0.5, -0.5, -1, -0.5, -0.5, 0, -0.5, 1,
    1, -0.5, -0.5, -1, -0.5, -0.5, 0, 1, 0,
    -1, -0.5, -0.5, 0, -0.5, 1, 0, 1, 0,
    0, -0.5, 1, 1, -0.5, -0.5, 0, 1, 0
  ]);
  var fireNormals = calculateNormals(firePositions);
  var fireCount = 12; // 4 triangles * 3 vertices

  // WATER - Icosahedron (60 vertices)
  var waterPositions = new Float32Array([
    0, 1, phi, phi, 0, 1, 1, phi, 0,
    0, 1, phi, 1, phi, 0, 0, 1, -phi,
    0, 1, phi, 0, 1, -phi, -phi, 0, -1,
    0, 1, phi, -phi, 0, -1, -1, phi, 0,
    0, 1, phi, -1, phi, 0, -phi, 0, 1,
    0, 1, phi, -phi, 0, 1, 0, -1, phi,
    
    0, -1, phi, phi, 0, 1, 0, 1, phi,
    0, -1, phi, 1, -phi, 0, phi, 0, 1,
    0, -1, phi, -1, -phi, 0, 1, -phi, 0,
    0, -1, phi, -phi, 0, 1, -1, -phi, 0,
    0, -1, phi, 0, -1, -phi, -phi, 0, -1,
    0, -1, phi, -phi, 0, -1, -phi, 0, 1,
    
    phi, 0, 1, 0, -1, phi, 1, -phi, 0,
    phi, 0, 1, 1, -phi, 0, 1, phi, 0,
    phi, 0, 1, 1, phi, 0, 0, 1, phi,
    
    1, phi, 0, phi, 0, -1, 0, 1, -phi,
    1, phi, 0, 1, -phi, 0, phi, 0, -1,
    
    0, 1, -phi, phi, 0, -1, 0, -1, -phi,
    0, 1, -phi, 0, -1, -phi, -phi, 0, -1,
    
    -phi, 0, -1, 0, -1, -phi, -1, -phi, 0,
    -phi, 0, -1, -1, -phi, 0, -1, phi, 0,
    -phi, 0, -1, -1, phi, 0, 0, 1, -phi,
    
    -1, phi, 0, -phi, 0, 1, 0, 1, phi,
    -1, phi, 0, -1, -phi, 0, -phi, 0, 1
  ]);
  var waterNormals = calculateNormals(waterPositions);
  var waterCount = 60; // 20 triangles * 3 vertices

  // EARTH - Cube (36 vertices)
  var earthPositions = new Float32Array([
    -1, -1, 1, 1, -1, 1, -1, 1, 1,
    -1, 1, 1, 1, -1, 1, 1, 1, 1,
    
    -1, -1, -1, -1, 1, -1, 1, -1, -1,
    1, -1, -1, -1, 1, -1, 1, 1, -1,
    
    -1, 1, -1, -1, 1, 1, 1, 1, -1,
    1, 1, -1, -1, 1, 1, 1, 1, 1,
    
    -1, -1, -1, 1, -1, -1, -1, -1, 1,
    -1, -1, 1, 1, -1, -1, 1, -1, 1,
    
    1, -1, -1, 1, 1, -1, 1, -1, 1,
    1, -1, 1, 1, 1, -1, 1, 1, 1,
    
    -1, -1, -1, -1, -1, 1, -1, 1, -1,
    -1, 1, -1, -1, -1, 1, -1, 1, 1
  ]);
  var earthNormals = calculateNormals(earthPositions);
  var earthCount = 36; // 12 triangles * 3 vertices

  // SPACE - Dodecahedron (108 vertices)
  var spacePositions = new Float32Array([
    // Each pentagon divided into 3 triangles
    1, 1, 1, 0, phi, invPhi, -1, 1, 1,
    1, 1, 1, -1, 1, 1, phi, invPhi, 0,
    1, 1, 1, phi, invPhi, 0, invPhi, 0, phi,
    
    1, 1, -1, 0, phi, -invPhi, -1, 1, -1,
    1, 1, -1, -1, 1, -1, phi, invPhi, 0,
    1, 1, -1, phi, invPhi, 0, invPhi, 0, -phi,
    
    1, -1, 1, 0, -phi, invPhi, -1, -1, 1,
    1, -1, 1, -1, -1, 1, phi, -invPhi, 0,
    1, -1, 1, phi, -invPhi, 0, invPhi, 0, phi,
    
    1, -1, -1, 0, -phi, -invPhi, -1, -1, -1,
    1, -1, -1, -1, -1, -1, phi, -invPhi, 0,
    1, -1, -1, phi, -invPhi, 0, invPhi, 0, -phi,
    
    phi, invPhi, 0, 1, 1, 1, 1, 1, -1,
    phi, invPhi, 0, 1, 1, -1, 1, -1, -1,
    phi, invPhi, 0, 1, -1, -1, 1, -1, 1,
    phi, invPhi, 0, 1, -1, 1, 1, 1, 1,
    
    -phi, invPhi, 0, -1, 1, 1, -1, 1, -1,
    -phi, invPhi, 0, -1, 1, -1, -1, -1, -1,
    -phi, invPhi, 0, -1, -1, -1, -1, -1, 1,
    -phi, invPhi, 0, -1, -1, 1, -1, 1, 1,
    
    // Additional faces to complete 12 pentagons
    invPhi, 0, phi, 1, 1, 1, -1, 1, 1,
    invPhi, 0, phi, -1, 1, 1, -1, -1, 1,
    invPhi, 0, phi, -1, -1, 1, 1, -1, 1,
    
    invPhi, 0, -phi, 1, 1, -1, -1, 1, -1,
    invPhi, 0, -phi, -1, 1, -1, -1, -1, -1,
    invPhi, 0, -phi, -1, -1, -1, 1, -1, -1
  ]);
  var spaceNormals = calculateNormals(spacePositions);
  var spaceCount = 108; // 36 triangles * 3 vertices

  return {
    // Individual elements with counts
    air: { positions: airPositions, normals: airNormals, count: airCount },
    fire: { positions: firePositions, normals: fireNormals, count: fireCount },
    water: { positions: waterPositions, normals: waterNormals, count: waterCount },
    earth: { positions: earthPositions, normals: earthNormals, count: earthCount },
    space: { positions: spacePositions, normals: spaceNormals, count: spaceCount },
    
    // All counts in one place
    counts: {
      air: airCount,
      fire: fireCount,
      water: waterCount,
      earth: earthCount,
      space: spaceCount
    }
  };
}));
