(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS / Node
    module.exports = factory();
  } else {
    // Browser global
    root.TransformController = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  class TransformController {
    constructor(drawCallback) {
      this.drawCallback = drawCallback;

      // initial transformation values
      this.transformation = {
        translate: { tx: 45, ty: 150, tz: 0 },
        rotate: { rx: 40, ry: 25, rz: 325 }, // degrees for GUI
        scale: { sx: 1, sy: 1, sz: 1 },
        color: { r: Math.random(), g: Math.random(), b: Math.random(), a: 1 }
      };

      // create GUI
      this.gui = new lil.GUI();
      this.setupGUI();
    }

    degToRad(angle) {
      return angle * Math.PI / 180;
    }

    // Return transformation in nested JSON format, rotations in radians
    getTransformationJSON() {
      return {
        translate: { 
          tx: this.transformation.translate.tx,
          ty: this.transformation.translate.ty,
          tz: this.transformation.translate.tz
        },
        rotate: {
          rx: this.degToRad(this.transformation.rotate.rx),
          ry: this.degToRad(this.transformation.rotate.ry),
          rz: this.degToRad(this.transformation.rotate.rz)
        },
        scale: {
          sx: this.transformation.scale.sx,
          sy: this.transformation.scale.sy,
          sz: this.transformation.scale.sz
        },
        color: {
          r: this.transformation.color.r,
          g: this.transformation.color.g,
          b: this.transformation.color.b,
          a: this.transformation.color.a
        }
      };
    }

    setupGUI() {
      const tFolder = this.gui.addFolder('Translate');
      tFolder.add(this.transformation.translate, 'tx', 0, 500).onChange(this.drawCallback);
      tFolder.add(this.transformation.translate, 'ty', 0, 500).onChange(this.drawCallback);
      tFolder.add(this.transformation.translate, 'tz', 0, 500).onChange(this.drawCallback);

      const rFolder = this.gui.addFolder('Rotate');
      rFolder.add(this.transformation.rotate, 'rx', 0, 360).onChange(this.drawCallback);
      rFolder.add(this.transformation.rotate, 'ry', 0, 360).onChange(this.drawCallback);
      rFolder.add(this.transformation.rotate, 'rz', 0, 360).onChange(this.drawCallback);

      const sFolder = this.gui.addFolder('Scale');
      sFolder.add(this.transformation.scale, 'sx', 0.1, 10).onChange(this.drawCallback);
      sFolder.add(this.transformation.scale, 'sy', 0.1, 10).onChange(this.drawCallback);
      sFolder.add(this.transformation.scale, 'sz', 0.1, 10).onChange(this.drawCallback);

      this.gui.addColor(this.transformation, 'color').onChange(this.drawCallback);
    }
  }

  return TransformController;
}));
