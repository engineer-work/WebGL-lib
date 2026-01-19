(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function() { return factory(root); });
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(root);
  } else {
    // Browser global
    root.webglUtils = factory(root);
  }
})(
  // Robust global detection
  (typeof self !== 'undefined') ? self
    : (typeof window !== 'undefined') ? window
    : (typeof global !== 'undefined') ? global
    : (typeof globalThis !== 'undefined') ? globalThis
    : {},
  function (root) {
    "use strict";

    const topWindow = root;

    function error(msg) {
      if (topWindow && topWindow.console) {
        if (topWindow.console.error) {
          topWindow.console.error(msg);
        } else if (topWindow.console.log) {
          topWindow.console.log(msg);
        }
      }
    }

    const errorRE = /ERROR:\s*\d+:(\d+)/gi;
    function addLineNumbersWithError(src, log = '') {
      const matches = [...log.matchAll(errorRE)];
      const lineNoToErrorMap = new Map(matches.map((m, ndx) => {
        const lineNo = parseInt(m[1]);
        const next = matches[ndx + 1];
        const end = next ? next.index : log.length;
        const msg = log.substring(m.index, end);
        return [lineNo - 1, msg];
      }));
      return src.split('\n').map((line, lineNo) => {
        const err = lineNoToErrorMap.get(lineNo);
        return `${lineNo + 1}: ${line}${err ? `\n\n^^^ ${err}` : ''}`;
      }).join('\n');
    }

    function createShader(gl, shaderSource, shaderType, opt_errorCallback) {
      const errFn = opt_errorCallback || error;
      const shader = gl.createShader(shaderType);
      gl.shaderSource(shader, shaderSource);
      gl.compileShader(shader);

      if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
      }

      const lastError = gl.getShaderInfoLog(shader);
      errFn(`Error compiling shader:\n${lastError}\n${addLineNumbersWithError(shaderSource, lastError)}`);
      gl.deleteShader(shader);
      return null;
    }

    function createProgram(gl, vertexShader, fragmentShader, opt_errorCallback) {
      const errFn = opt_errorCallback || error;
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return program;
      }

      const lastError = gl.getProgramInfoLog(program);
      errFn(`Error linking program:\n${lastError}`);
      gl.deleteProgram(program);
      return null;
    }

    return {
      createShader,
      createProgram,
    };
  }
);
