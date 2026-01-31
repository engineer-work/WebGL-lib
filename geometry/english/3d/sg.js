(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SACRED_GEOMETRY = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const PHI = (1 + Math.sqrt(5)) / 2;

  // ==========================
  // Utilities
  // ==========================

  function normalize(p) {
    for (let i = 0; i < p.length; i += 3) {
      const l = Math.hypot(p[i], p[i+1], p[i+2]);
      p[i] /= l; p[i+1] /= l; p[i+2] /= l;
    }
  }

  function scalePositions(p, s) {
    const out = new Float32Array(p.length);
    for (let i = 0; i < p.length; i++) out[i] = p[i] * s;
    return out;
  }

  function flatNormals(p) {
    const n = new Float32Array(p.length);
    for (let i = 0; i < p.length; i += 9) {
      const ax=p[i], ay=p[i+1], az=p[i+2];
      const bx=p[i+3], by=p[i+4], bz=p[i+5];
      const cx=p[i+6], cy=p[i+7], cz=p[i+8];

      const abx=bx-ax, aby=by-ay, abz=bz-az;
      const acx=cx-ax, acy=cy-ay, acz=cz-az;

      let nx=aby*acz-abz*acy;
      let ny=abz*acx-abx*acz;
      let nz=abx*acy-aby*acx;

      const l=Math.hypot(nx,ny,nz);
      nx/=l; ny/=l; nz/=l;

      for (let j=0;j<9;j+=3){
        n[i+j]=nx; n[i+j+1]=ny; n[i+j+2]=nz;
      }
    }
    return n;
  }

  function build(base, scale) {
    const positions = scalePositions(base, scale);
    return {
      positions,
      normals: flatNormals(positions),
      count: positions.length / 3,
      scale
    };
  }

  // ==========================
  // BASE GEOMETRIES (UNIT SIZE)
  // ==========================

  // AIR — Octahedron
  const airBase = new Float32Array([
    1,0,0, 0,1,0, 0,0,1,
    0,1,0,-1,0,0, 0,0,1,
   -1,0,0, 0,-1,0,0,0,1,
    0,-1,0,1,0,0,0,0,1,

    0,1,0,1,0,0,0,0,-1,
   -1,0,0,0,1,0,0,0,-1,
    0,-1,0,-1,0,0,0,0,-1,
    1,0,0,0,-1,0,0,0,-1
  ]);
  normalize(airBase);

  // FIRE — Tetrahedron
  const fireBase = new Float32Array([
     1, 1, 1,  -1,-1, 1,  -1, 1,-1,
     1, 1, 1,  -1, 1,-1,   1,-1,-1,
     1, 1, 1,   1,-1,-1,  -1,-1, 1,
    -1,-1, 1,   1,-1,-1,  -1, 1,-1
  ]);
  normalize(fireBase);

  // WATER — Icosahedron
  const waterBase = new Float32Array([
    -1, PHI, 0,   1, PHI, 0,   0, 1, PHI,
     0, 1, PHI,   1, PHI, 0,   PHI, 0, 1,
     PHI, 0, 1,   1, PHI, 0,   PHI, 0,-1,
     1, PHI, 0,  -1, PHI, 0,   0, 1,-PHI,

    -1,-PHI, 0,   0,-1,-PHI,   1,-PHI, 0,
     1,-PHI, 0,   0,-1,-PHI,   PHI, 0,-1,
     PHI, 0,-1,   0,-1,-PHI,  -PHI, 0,-1,
    -1,-PHI, 0,  -PHI, 0,-1,   0,-1, PHI
  ]);
  normalize(waterBase);

  // EARTH — Cube
  const earthBase = new Float32Array([
    -1,-1, 1,  1,-1, 1,  1, 1, 1,
    -1,-1, 1,  1, 1, 1, -1, 1, 1,

    -1,-1,-1, -1, 1,-1,  1, 1,-1,
    -1,-1,-1,  1, 1,-1,  1,-1,-1,

    -1, 1,-1, -1, 1, 1,  1, 1, 1,
    -1, 1,-1,  1, 1, 1,  1, 1,-1,

    -1,-1,-1,  1,-1,-1,  1,-1, 1,
    -1,-1,-1,  1,-1, 1, -1,-1, 1,

     1,-1,-1,  1, 1,-1,  1, 1, 1,
     1,-1,-1,  1, 1, 1,  1,-1, 1,

    -1,-1,-1, -1,-1, 1, -1, 1, 1,
    -1,-1,-1, -1, 1, 1, -1, 1,-1
  ]);
  normalize(earthBase);

  // SPACE — Dodecahedron (triangulated, visual-safe)
  const a = 1 / PHI, b = 1;
  const spaceBase = new Float32Array([
    b,b,b,   a,0,PHI,   0,PHI,a,
    b,b,b,   0,PHI,a,   PHI,a,0,
    b,b,b,   PHI,a,0,   a,0,PHI,

    b,b,-b,  0,PHI,-a,  a,0,-PHI,
    b,b,-b,  PHI,a,0,   0,PHI,-a,
    b,b,-b,  a,0,-PHI,  PHI,a,0
  ]);
  normalize(spaceBase);

  // ==========================
  // PUBLIC API
  // ==========================

  return {
    air:   (s=1)=>build(airBase, s),
    fire:  (s=1)=>build(fireBase, s),
    water: (s=1)=>build(waterBase, s),
    earth: (s=1)=>build(earthBase, s),
    space: (s=1)=>build(spaceBase, s)
  };

}));
