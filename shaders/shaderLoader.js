(function () {
  const ShaderLoader = {
    createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
      }

      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    },

    createProgram(gl, vertexSource, fragmentSource) {
      const vs = this.createShader(gl, gl.VERTEX_SHADER, vertexSource);
      const fs = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

      if (!vs || !fs) return null;

      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return program;
      }

      console.error(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
  };

  // 👇 expose globally
  window.ShaderLoader = ShaderLoader;
})();
