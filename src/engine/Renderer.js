const vertexShaderSource = `#version 300 es
layout(location = 0) in vec2 a_position;
layout(location = 1) in vec2 a_texCoord;
uniform mat3 u_matrix;
out vec2 v_texCoord;
void main() {
  vec2 position = (u_matrix * vec3(a_position, 1.0)).xy;
  gl_Position = vec4(position, 0.0, 1.0);
  v_texCoord = a_texCoord;
}
`;

// Speedlines procedural shader
const speedlineFragSource = `#version 300 es
precision highp float;
in vec2 v_texCoord;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_color;
uniform float u_intensity;
uniform float u_speed;
out vec4 outColor;

// 1D Random
float rand(float n){return fract(sin(n) * 43758.5453123);}

void main() {
  vec2 uv = v_texCoord - 0.5; // Center is 0,0
  float angle = atan(uv.y, uv.x);
  float radius = length(uv);
  
  // Angle mapped to 0-1 for noise
  float angleNorm = (angle / 3.14159) * 0.5 + 0.5;
  
  // Discrete rays
  float rays = 100.0;
  float id = floor(angleNorm * rays);
  
  // Randomness per ray
  float r = rand(id);
  
  // Animate the rays inwards based on speed
  float t = fract(u_time * (u_speed / 100.0) * r);
  
  // Inner gap (radius where lines stop)
  float innerGap = 0.2 + r * 0.1;
  
  float lineAlpha = smoothstep(innerGap, innerGap + 0.1, radius) * smoothstep(0.9, 0.1, abs(fract(angleNorm * rays) - 0.5) * 2.0);
  
  // Flash effect
  float flash = step(0.5, fract(u_time * 10.0 + r));
  
  float alpha = lineAlpha * flash * (u_intensity / 100.0);
  
  if (alpha < 0.01) discard;
  
  outColor = vec4(u_color.rgb, alpha);
}
`;

// Fragment shader that supports tinting grayscale textures (Color Masking)
const fragmentShaderSource = `#version 300 es
precision highp float;
in vec2 v_texCoord;
uniform sampler2D u_texture;
uniform vec4 u_tintColor; // Used for hair/eye color
uniform bool u_useTint;
out vec4 outColor;

void main() {
  vec4 texColor = texture(u_texture, v_texCoord);
  if (texColor.a < 0.01) discard;

  if (u_useTint) {
    // If the pixel is grayscale, we multiply it by the tint color to preserve shadows
    // Grayscale assumption: R, G, B are roughly equal.
    float lum = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 tinted = u_tintColor.rgb * (lum * 1.5); // Boost slightly
    
    // Preserve original alpha
    outColor = vec4(mix(texColor.rgb, tinted, 0.8), texColor.a);
  } else {
    outColor = texColor;
  }
}
`;

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false });
    if (!this.gl) throw new Error("WebGL 2 not supported");
    
    this.initShaders();
    this.initVfxShaders();
    this.textures = new Map();
    this.projectionMatrix = this.createProjection(canvas.width, canvas.height);
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
    this.projectionMatrix = this.createProjection(width, height);
  }

  createProjection(width, height) {
    // 2D Projection: 0,0 at top-left, width,height at bottom-right
    return [
      2 / width, 0, 0,
      0, -2 / height, 0,
      -1, 1, 1
    ];
  }

  initShaders() {
    const gl = this.gl;
    
    // Compile Vert
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexShaderSource);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(vs));

    // Compile Frag
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentShaderSource);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(fs));

    // Link Program
    this.program = gl.createProgram();
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(this.program));

    gl.useProgram(this.program);

    // Quad Buffer
    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1,
    ]), gl.STATIC_DRAW);

    this.texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1,
    ]), gl.STATIC_DRAW);

    // Uniforms
    this.locMatrix = gl.getUniformLocation(this.program, "u_matrix");
    this.locTexture = gl.getUniformLocation(this.program, "u_texture");
    this.locTintColor = gl.getUniformLocation(this.program, "u_tintColor");
    this.locUseTint = gl.getUniformLocation(this.program, "u_useTint");
  }

  initVfxShaders() {
    const gl = this.gl;
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexShaderSource);
    gl.compileShader(vs);

    const fsSpeed = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fsSpeed, speedlineFragSource);
    gl.compileShader(fsSpeed);
    if (!gl.getShaderParameter(fsSpeed, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(fsSpeed));

    this.vfxSpeedProgram = gl.createProgram();
    gl.attachShader(this.vfxSpeedProgram, vs);
    gl.attachShader(this.vfxSpeedProgram, fsSpeed);
    gl.linkProgram(this.vfxSpeedProgram);
    
    this.locVfxSpeedMatrix = gl.getUniformLocation(this.vfxSpeedProgram, "u_matrix");
    this.locVfxSpeedTime = gl.getUniformLocation(this.vfxSpeedProgram, "u_time");
    this.locVfxSpeedRes = gl.getUniformLocation(this.vfxSpeedProgram, "u_resolution");
    this.locVfxSpeedColor = gl.getUniformLocation(this.vfxSpeedProgram, "u_color");
    this.locVfxSpeedIntensity = gl.getUniformLocation(this.vfxSpeedProgram, "u_intensity");
    this.locVfxSpeedSpeed = gl.getUniformLocation(this.vfxSpeedProgram, "u_speed");
  }

  createTexture(id, image) {
    const gl = this.gl;
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    
    // Do not flip Y for our 2D Top-Left projection
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    
    // Settings for 2D sprites (pixel art or smooth vectors)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    this.textures.set(id, { tex, width: image.width, height: image.height });
  }

  hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b, 1.0];
  }

  clear() {
    const gl = this.gl;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Enable Alpha Blending for Layers
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  // Multiply matrices
  multiplyMatrix(a, b) {
    let c = new Float32Array(9);
    for(let i=0; i<3; ++i) {
      for(let j=0; j<3; ++j) {
        c[j*3+i] = a[i]*b[j*3+0] + a[3+i]*b[j*3+1] + a[6+i]*b[j*3+2];
      }
    }
    return c;
  }

  drawSprite(textureId, x, y, scaleX = 1, scaleY = 1, tintHex = null, rotation = 0) {
    const gl = this.gl;
    const texObj = this.textures.get(textureId);
    if (!texObj) return;

    gl.useProgram(this.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

    // Compute matrix: Projection * Translation * [Rotation around center] * Scale
    let matrix = [...this.projectionMatrix];
    
    // Translation matrix (to final screen pos)
    let translationMat = [
      1, 0, 0,
      0, 1, 0,
      x, y, 1
    ];
    matrix = this.multiplyMatrix(matrix, translationMat);

    // Rotation around center
    if (rotation !== 0) {
      const w = texObj.width * scaleX;
      const h = texObj.height * scaleY;
      const px = w / 2;
      const py = h / 2;
      
      const c = Math.cos(rotation);
      const s = Math.sin(rotation);
      let rotMat = [
        c, s, 0,
        -s, c, 0,
        0, 0, 1
      ];
      
      let pMat = [1,0,0, 0,1,0, px,py,1];
      let pInvMat = [1,0,0, 0,1,0, -px,-py,1];
      
      matrix = this.multiplyMatrix(matrix, pMat);
      matrix = this.multiplyMatrix(matrix, rotMat);
      matrix = this.multiplyMatrix(matrix, pInvMat);
    }
    
    // Scale matrix
    let scaleMat = [
      texObj.width * scaleX, 0, 0,
      0, texObj.height * scaleY, 0,
      0, 0, 1
    ];

    matrix = this.multiplyMatrix(matrix, scaleMat);

    gl.uniformMatrix3fv(this.locMatrix, false, matrix);

    if (tintHex) {
      gl.uniform1i(this.locUseTint, 1);
      gl.uniform4fv(this.locTintColor, this.hexToRgb(tintHex));
    } else {
      gl.uniform1i(this.locUseTint, 0);
    }

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texObj.tex);
    gl.uniform1i(this.locTexture, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawSpeedlines(width, height, time, hexColor, intensity, speed) {
    const gl = this.gl;
    gl.useProgram(this.vfxSpeedProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

    // Matrix to cover entire screen
    let matrix = [...this.projectionMatrix];
    let scaleMat = [
      width, 0, 0,
      0, height, 0,
      0, 0, 1
    ];
    matrix = this.multiplyMatrix(matrix, scaleMat);

    gl.uniformMatrix3fv(this.locVfxSpeedMatrix, false, matrix);
    gl.uniform1f(this.locVfxSpeedTime, time);
    gl.uniform2f(this.locVfxSpeedRes, width, height);
    gl.uniform4fv(this.locVfxSpeedColor, this.hexToRgb(hexColor));
    gl.uniform1f(this.locVfxSpeedIntensity, intensity);
    gl.uniform1f(this.locVfxSpeedSpeed, speed);

    // Additive blending for VFX
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // Restore
  }
}
