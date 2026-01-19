(function () {
  const ShaderLoader = {
    createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    },

    createProgram(gl, vertexSource, fragmentSource) {
      const vs = ShaderLoader.createShader(gl, gl.VERTEX_SHADER, vertexSource);
      const fs = ShaderLoader.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

      if (!vs || !fs) return null;

      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }

      // Optional: detach and delete shaders after linking to free memory
      gl.detachShader(program, vs);
      gl.detachShader(program, fs);
      gl.deleteShader(vs);
      gl.deleteShader(fs);

      return program;
    }
  };

  // 👇 expose globally
  window.ShaderLoader = ShaderLoader;
})();
