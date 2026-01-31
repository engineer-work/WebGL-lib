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

  // Helper function to calculate normals with consistent winding order
  function calculateNormals(positions) {
    var normals = new Float32Array(positions.length);
    
    for (var i = 0; i < positions.length; i += 9) {
      var v0 = {x: positions[i], y: positions[i+1], z: positions[i+2]};
      var v1 = {x: positions[i+3], y: positions[i+4], z: positions[i+5]};
      var v2 = {x: positions[i+6], y: positions[i+7], z: positions[i+8]};
      
      // Calculate edges (assuming CCW winding for front faces)
      var edge1 = {x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z};
      var edge2 = {x: v2.x - v0.x, y: v2.y - v0.y, z: v2.z - v0.z};
      
      // Calculate face normal using cross product (edge1 × edge2)
      var normal = {
        x: edge1.y * edge2.z - edge1.z * edge2.y,
        y: edge1.z * edge2.x - edge1.x * edge2.z,
        z: edge1.x * edge2.y - edge1.y * edge2.x
      };
      
      // Normalize
      var length = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
      if (length > 0.00001) {
        normal.x /= length;
        normal.y /= length;
        normal.z /= length;
      }
      
      // Assign the same normal to all three vertices of the triangle
      normals[i] = normal.x; normals[i+1] = normal.y; normals[i+2] = normal.z;
      normals[i+3] = normal.x; normals[i+4] = normal.y; normals[i+5] = normal.z;
      normals[i+6] = normal.x; normals[i+7] = normal.y; normals[i+8] = normal.z;
    }
    
    return normals;
  }

  // Fix winding order for all geometries (CCW for front faces)
  
  // AIR - Octahedron with corrected winding order
  var airPositions = new Float32Array([
    // Top pyramid (CCW)
    0, 1, 0, -1, 0, -1, 1, 0, -1,     // CCW
    0, 1, 0, 1, 0, 1, -1, 0, 1,        // CCW
    0, 1, 0, -1, 0, 1, -1, 0, -1,      // CCW
    0, 1, 0, 1, 0, -1, 1, 0, 1,        // CCW
    
    // Bottom pyramid (CCW when viewed from outside)
    0, -1, 0, 1, 0, -1, -1, 0, -1,     // CCW
    0, -1, 0, -1, 0, 1, 1, 0, 1,       // CCW
    0, -1, 0, -1, 0, -1, -1, 0, 1,     // CCW
    0, -1, 0, 1, 0, 1, 1, 0, -1        // CCW
  ]);
  var airNormals = calculateNormals(airPositions);
  var airCount = 24;

  // FIRE - Tetrahedron with corrected winding order
  var firePositions = new Float32Array([
    // Base (CCW when viewed from below)
    1, -0.5, -0.5, -1, -0.5, -0.5, 0, -0.5, 1,  // CCW
    
    // Sides (CCW when viewed from outside)
    1, -0.5, -0.5, 0, 1, 0, -1, -0.5, -0.5,      // CCW
    -1, -0.5, -0.5, 0, 1, 0, 0, -0.5, 1,         // CCW
    0, -0.5, 1, 0, 1, 0, 1, -0.5, -0.5           // CCW
  ]);
  var fireNormals = calculateNormals(firePositions);
  var fireCount = 12;

  // WATER - Icosahedron with corrected winding order
  var waterPositions = new Float32Array([
    // All triangles in CCW order
    0, 1, phi, 1, phi, 0, phi, 0, 1,
    0, 1, phi, -phi, 0, -1, 0, 1, -phi,
    0, 1, phi, -1, phi, 0, -phi, 0, -1,
    0, 1, phi, -phi, 0, 1, -1, phi, 0,
    0, 1, phi, 0, -1, phi, -phi, 0, 1,
    0, 1, phi, phi, 0, 1, 0, -1, phi,
    
    0, -1, phi, 0, 1, phi, phi, 0, 1,
    0, -1, phi, phi, 0, 1, 1, -phi, 0,
    0, -1, phi, 1, -phi, 0, -1, -phi, 0,
    0, -1, phi, -1, -phi, 0, -phi, 0, 1,
    0, -1, phi, -phi, 0, 1, 0, 1, phi,
    0, -1, phi, -phi, 0, -1, 0, -1, -phi,
    
    phi, 0, 1, 0, 1, phi, 1, phi, 0,
    phi, 0, 1, 1, phi, 0, 1, -phi, 0,
    phi, 0, 1, 1, -phi, 0, 0, -1, phi,
    
    1, phi, 0, 0, 1, -phi, phi, 0, -1,
    1, phi, 0, phi, 0, -1, 1, -phi, 0,
    
    0, 1, -phi, -phi, 0, -1, 0, -1, -phi,
    0, 1, -phi, 0, -1, -phi, phi, 0, -1,
    
    -phi, 0, -1, -1, phi, 0, 0, 1, -phi,
    -phi, 0, -1, -1, -phi, 0, -1, phi, 0,
    -phi, 0, -1, 0, -1, -phi, -1, -phi, 0,
    
    -1, phi, 0, 0, 1, phi, -phi, 0, 1,
    -1, phi, 0, -phi, 0, 1, -1, -phi, 0
  ]);
  var waterNormals = calculateNormals(waterPositions);
  var waterCount = 60;

  // EARTH - Cube with corrected winding order (CCW for all outward faces)
  var earthPositions = new Float32Array([
    // Front face (z = 1) - CCW
    -1, -1, 1, -1, 1, 1, 1, -1, 1,
    -1, 1, 1, 1, 1, 1, 1, -1, 1,
    
    // Back face (z = -1) - CCW when viewed from back
    1, -1, -1, 1, 1, -1, -1, -1, -1,
    1, 1, -1, -1, 1, -1, -1, -1, -1,
    
    // Top face (y = 1) - CCW
    -1, 1, -1, -1, 1, 1, 1, 1, -1,
    1, 1, -1, -1, 1, 1, 1, 1, 1,
    
    // Bottom face (y = -1) - CCW when viewed from below
    -1, -1, 1, -1, -1, -1, 1, -1, 1,
    1, -1, 1, -1, -1, -1, 1, -1, -1,
    
    // Right face (x = 1) - CCW
    1, -1, -1, 1, -1, 1, 1, 1, -1,
    1, 1, -1, 1, -1, 1, 1, 1, 1,
    
    // Left face (x = -1) - CCW when viewed from left
    -1, -1, 1, -1, -1, -1, -1, 1, 1,
    -1, 1, 1, -1, -1, -1, -1, 1, -1
  ]);
  var earthNormals = calculateNormals(earthPositions);
  var earthCount = 36;

  // SPACE - Dodecahedron with corrected winding order
  var spacePositions = new Float32Array([
    // All faces CCW
    1, 1, 1, -1, 1, 1, 0, phi, invPhi,
    1, 1, 1, phi, invPhi, 0, -1, 1, 1,
    1, 1, 1, invPhi, 0, phi, phi, invPhi, 0,
    
    1, 1, -1, -1, 1, -1, 0, phi, -invPhi,
    1, 1, -1, phi, invPhi, 0, -1, 1, -1,
    1, 1, -1, invPhi, 0, -phi, phi, invPhi, 0,
    
    1, -1, 1, -1, -1, 1, 0, -phi, invPhi,
    1, -1, 1, phi, -invPhi, 0, -1, -1, 1,
    1, -1, 1, invPhi, 0, phi, phi, -invPhi, 0,
    
    1, -1, -1, -1, -1, -1, 0, -phi, -invPhi,
    1, -1, -1, phi, -invPhi, 0, -1, -1, -1,
    1, -1, -1, invPhi, 0, -phi, phi, -invPhi, 0,
    
    phi, invPhi, 0, 1, 1, -1, 1, 1, 1,
    phi, invPhi, 0, 1, -1, -1, 1, 1, -1,
    phi, invPhi, 0, 1, -1, 1, 1, -1, -1,
    phi, invPhi, 0, 1, 1, 1, 1, -1, 1,
    
    -phi, invPhi, 0, -1, 1, 1, -1, 1, -1,
    -phi, invPhi, 0, -1, -1, 1, -1, 1, 1,
    -phi, invPhi, 0, -1, -1, -1, -1, -1, 1,
    -phi, invPhi, 0, -1, 1, -1, -1, -1, -1,
    
    invPhi, 0, phi, -1, 1, 1, 1, 1, 1,
    invPhi, 0, phi, -1, -1, 1, -1, 1, 1,
    invPhi, 0, phi, 1, -1, 1, -1, -1, 1,
    
    invPhi, 0, -phi, -1, 1, -1, 1, 1, -1,
    invPhi, 0, -phi, -1, -1, -1, -1, 1, -1,
    invPhi, 0, -phi, 1, -1, -1, -1, -1, -1
  ]);
  var spaceNormals = calculateNormals(spacePositions);
  var spaceCount = 108;

  return {
    // Individual elements
    air: { positions: airPositions, normals: airNormals, count: airCount },
    fire: { positions: firePositions, normals: fireNormals, count: fireCount },
    water: { positions: waterPositions, normals: waterNormals, count: waterCount },
    earth: { positions: earthPositions, normals: earthNormals, count: earthCount },
    space: { positions: spacePositions, normals: spaceNormals, count: spaceCount }
  };
}));
