/**
 * The Xila system diagram, rendered as a small WebGL2 topology.
 *
 * Loaded via dynamic import only when the landing-page illustration is
 * actually visible. No Three.js, external dependencies, or network calls.
 */
type Point = readonly [number, number];

const NODES: Point[] = [
  [-0.76, -0.47], // hardware / target drivers
  [-0.33, 0.12], // kernel services
  [0.22, 0.12], // bindings / Wasm runtime
  [0.78, 0.4], // applications
  [0.2, -0.57], // VFS / storage branch
  [-0.28, 0.7], // graphics / LVGL branch
];

const EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [1, 5],
  [4, 2],
  [5, 3],
];

const VERTEX_SOURCE = [
  "#version 300 es",
  "in vec2 a_position;",
  "uniform vec2 u_pointer;",
  "uniform float u_size;",
  "void main() {",
  "  gl_Position = vec4(a_position + u_pointer * vec2(0.012, 0.015), 0.0, 1.0);",
  "  gl_PointSize = u_size;",
  "}",
].join("\n");

const FRAGMENT_SOURCE = [
  "#version 300 es",
  "precision mediump float;",
  "uniform vec4 u_color;",
  "uniform float u_round;",
  "out vec4 out_color;",
  "void main() {",
  "  float alpha = 1.0;",
  "  if (u_round > 0.5) {",
  "    float r = length(gl_PointCoord - vec2(0.5));",
  "    alpha = 1.0 - smoothstep(0.31, 0.5, r);",
  "  }",
  "  out_color = vec4(u_color.rgb, u_color.a * alpha);",
  "}",
].join("\n");

function compileShader(
  gl: WebGL2RenderingContext,
  kind: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(kind);
  if (!shader) throw new Error("WebGL shader allocation failed.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const reason = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(reason || "WebGL shader compilation failed.");
  }
  return shader;
}

export interface TopologyRenderer {
  start(): void;
  stop(): void;
  setPointer(x: number, y: number): void;
  dispose(): void;
}

export function createTopologyRenderer(
  canvas: HTMLCanvasElement,
  onContextLost: () => void,
): TopologyRenderer | null {
  const context = canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!context) return null;
  const gl: WebGL2RenderingContext = context;

  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SOURCE);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SOURCE);
  const program = gl.createProgram();
  if (!program) throw new Error("WebGL program allocation failed.");

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "WebGL linking failed.");
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  if (!buffer) throw new Error("WebGL buffer allocation failed.");
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  const position = gl.getAttribLocation(program, "a_position");
  const color = gl.getUniformLocation(program, "u_color");
  const round = gl.getUniformLocation(program, "u_round");
  const size = gl.getUniformLocation(program, "u_size");
  const mouse = gl.getUniformLocation(program, "u_pointer");

  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.disable(gl.DEPTH_TEST);

  const segments = new Float32Array(
    EDGES.flatMap(([a, b]) => [
      NODES[a][0],
      NODES[a][1],
      NODES[b][0],
      NODES[b][1],
    ]),
  );
  const centers = new Float32Array(NODES.flatMap((node) => [...node]));
  const moving = new Float32Array(EDGES.length * 2);

  let frame = 0;
  let active = false;
  let disposed = false;
  let lastFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  const resizeObserver = new ResizeObserver(resize);

  function resize() {
    if (disposed) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
    const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
  }

  function draw(
    coordinates: Float32Array,
    primitive: number,
    r: number,
    g: number,
    b: number,
    a: number,
    radius: number,
  ) {
    gl.bufferData(gl.ARRAY_BUFFER, coordinates, gl.DYNAMIC_DRAW);
    gl.uniform4f(color, r, g, b, a);
    gl.uniform1f(round, primitive === gl.POINTS ? 1 : 0);
    gl.uniform1f(size, radius);
    gl.drawArrays(primitive, 0, coordinates.length / 2);
  }

  function render(timestamp: number) {
    if (!active || disposed) return;
    frame = requestAnimationFrame(render);

    // Target <= 30 FPS and cap DPR to limit battery and GPU cost.
    if (timestamp - lastFrame < 1000 / 30) return;
    lastFrame = timestamp;

    resize();
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(mouse, pointerX, pointerY);

    const t = timestamp * 0.00022;
    EDGES.forEach(([a, b], i) => {
      const phase = (t + i / EDGES.length) % 1;
      moving[i * 2] = NODES[a][0] + (NODES[b][0] - NODES[a][0]) * phase;
      moving[i * 2 + 1] = NODES[a][1] + (NODES[b][1] - NODES[a][1]) * phase;
    });

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
    draw(segments, gl.LINES, 0.18, 0.66, 0.6, 0.54, 1);
    draw(centers, gl.POINTS, 0.18, 0.72, 0.65, 0.2, 36 * pixelRatio);
    draw(centers, gl.POINTS, 0.38, 0.94, 0.81, 0.95, 11 * pixelRatio);
    draw(moving, gl.POINTS, 0.96, 0.81, 0.51, 0.98, 7 * pixelRatio);
  }

  function onLoss(event: Event) {
    event.preventDefault();
    stop();
    onContextLost();
  }

  function start() {
    if (active || disposed) return;
    active = true;
    resize();
    frame = requestAnimationFrame(render);
  }

  function stop() {
    active = false;
    cancelAnimationFrame(frame);
    frame = 0;
  }

  function dispose() {
    if (disposed) return;
    stop();
    disposed = true;
    resizeObserver.disconnect();
    canvas.removeEventListener("webglcontextlost", onLoss);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
  }

  canvas.addEventListener("webglcontextlost", onLoss, false);
  resizeObserver.observe(canvas);
  resize();

  return {
    start,
    stop,
    setPointer(x, y) {
      pointerX = Math.max(-1, Math.min(1, x));
      pointerY = Math.max(-1, Math.min(1, y));
    },
    dispose,
  };
}
