import * as THREE from "three";

export class NoraHologram {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = options;
    this.state = options.initialState || "idle";
    this.micLevel = 0;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;

    // Core WebGL parameters
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.hologramObjects = [];
    this.animationFrameId = null;
    this.clock = new THREE.Clock();

    // Morph configurations
    this.particleCount = 1500;
    this.positions = {
      idle: new Float32Array(this.particleCount * 3),
      listening: new Float32Array(this.particleCount * 3),
      thinking: new Float32Array(this.particleCount * 3),
      speaking: new Float32Array(this.particleCount * 3),
      success: new Float32Array(this.particleCount * 3),
      error: new Float32Array(this.particleCount * 3),
      sleep: new Float32Array(this.particleCount * 3),
    };

    this.colors = {
      idle: new THREE.Color("#22d3ee"),      // Cyan
      listening: new THREE.Color("#60a5fa"), // Light blue
      thinking: new THREE.Color("#8b5cf6"),  // Purple
      speaking: new THREE.Color("#38bdf8"),  // Sky blue
      success: new THREE.Color("#34d399"),   // Green
      error: new THREE.Color("#f87171"),     // Red
      sleep: new THREE.Color("#1e1b4b"),     // Dark navy/purple
    };

    this.currentColors = new Float32Array(this.particleCount * 3);
    this.targetColors = new Float32Array(this.particleCount * 3);

    this.init();
  }

  init() {
    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 100);
    this.camera.position.z = 8;

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(this.width, this.height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Generate Particle Formations
    this.generateFormations();

    // 5. Create Particle Geometry & Material
    const geometry = new THREE.BufferGeometry();
    // Start with idle positions
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(this.positions.idle), 3));

    // Set initial colors
    const initialColor = this.colors.idle;
    for (let i = 0; i < this.particleCount; i++) {
      const idx = i * 3;
      this.currentColors[idx] = initialColor.r;
      this.currentColors[idx + 1] = initialColor.g;
      this.currentColors[idx + 2] = initialColor.b;

      this.targetColors[idx] = initialColor.r;
      this.targetColors[idx + 1] = initialColor.g;
      this.targetColors[idx + 2] = initialColor.b;
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(this.currentColors, 3));

    // Custom shader material for smooth premium particles (round, glowing, soft edge)
    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Create custom texture for glowing points programmatically
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const ctx = pCanvas.getContext("2d");
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.3, "rgba(255,255,255,0.8)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const pTexture = new THREE.CanvasTexture(pCanvas);
    material.map = pTexture;
    material.size = 0.12;

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // 6. Add Hologram Dials and Enterprise Dashboard Grid
    this.createHolograms();

    // 7. Event listeners
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.canvas.parentElement);

    // 8. Start Loop
    this.animate();
  }

  generateFormations() {
    const r = 3.5;
    for (let i = 0; i < this.particleCount; i++) {
      const idx = i * 3;

      // --- 1. IDLE: Rhythmic Halo / Sphere ---
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const rad = r * (0.85 + Math.random() * 0.15);
      this.positions.idle[idx] = rad * Math.sin(phi) * Math.cos(theta);
      this.positions.idle[idx + 1] = rad * Math.sin(phi) * Math.sin(theta) * 0.8;
      this.positions.idle[idx + 2] = rad * Math.cos(phi) * 0.8;

      // --- 2. LISTENING: Floating Ring Wave ---
      const angle = (i / this.particleCount) * Math.PI * 2;
      const ringRad = r * (1.1 + Math.random() * 0.1);
      this.positions.listening[idx] = ringRad * Math.cos(angle);
      this.positions.listening[idx + 1] = (Math.random() - 0.5) * 1.5;
      this.positions.listening[idx + 2] = ringRad * Math.sin(angle) * 0.7;

      // --- 3. THINKING: Concentrated Cylinder / Neural Network ---
      const cyHeight = 4.0;
      const cyRad = r * 0.45;
      const cyAngle = Math.random() * Math.PI * 2;
      const h = (Math.random() - 0.5) * cyHeight;
      this.positions.thinking[idx] = cyRad * Math.cos(cyAngle);
      this.positions.thinking[idx + 1] = h;
      this.positions.thinking[idx + 2] = cyRad * Math.sin(cyAngle);

      // --- 4. SPEAKING: Expandable Audio Bursts ---
      const sAngle = Math.random() * Math.PI * 2;
      const sElevation = Math.acos((Math.random() * 2) - 1);
      const dist = r * 1.8 * Math.random();
      this.positions.speaking[idx] = dist * Math.sin(sElevation) * Math.cos(sAngle);
      this.positions.speaking[idx + 1] = dist * Math.sin(sElevation) * Math.sin(sAngle) * 0.7;
      this.positions.speaking[idx + 2] = dist * Math.cos(sElevation);

      // --- 5. SUCCESS: Concentric Orbit Rings ---
      const sRingIdx = i % 3;
      const sAngleOffset = Math.random() * Math.PI * 2;
      const sRadius = r * (0.5 + sRingIdx * 0.6);
      this.positions.success[idx] = sRadius * Math.cos(sAngleOffset);
      this.positions.success[idx + 1] = (Math.random() - 0.5) * 0.5;
      this.positions.success[idx + 2] = sRadius * Math.sin(sAngleOffset);

      // --- 6. ERROR: Jittery Star Burst ---
      const errAngle = Math.random() * Math.PI * 2;
      const errRad = r * (0.2 + Math.random() * 2.0);
      this.positions.error[idx] = errRad * Math.cos(errAngle);
      this.positions.error[idx + 1] = errRad * Math.sin(errAngle);
      this.positions.error[idx + 2] = (Math.random() - 0.5) * 2;

      // --- 7. SLEEP: Slow Fading horizontal wave ---
      const sVal = (i / this.particleCount) * 8 - 4;
      this.positions.sleep[idx] = sVal;
      this.positions.sleep[idx + 1] = Math.sin(sVal * 2.5) * 0.4 + (Math.random() - 0.5) * 0.3;
      this.positions.sleep[idx + 2] = (Math.random() - 0.5) * 1.5;
    }
  }

  createHolograms() {
    this.hologramGroup = new THREE.Group();
    this.scene.add(this.hologramGroup);

    // 1. Thin wireframe dashboard ring
    const ringGeo = new THREE.RingGeometry(3.0, 3.05, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    this.hologramGroup.add(ring);
    this.hologramObjects.push({ mesh: ring, speedX: 0.05, speedY: 0.03, type: "ring" });

    // 2. Faint revolving grid lines
    const gridHelper = new THREE.GridHelper(6, 12, 0x22d3ee, 0x22d3ee);
    gridHelper.position.y = -1.8;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.08;
    this.hologramGroup.add(gridHelper);
    this.hologramObjects.push({ mesh: gridHelper, speedY: 0.02, type: "grid" });

    // 3. Central glowing nucleus rings
    const sphereGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    this.hologramGroup.add(sphere);
    this.hologramObjects.push({ mesh: sphere, speedX: -0.05, speedY: 0.08, type: "nucleus" });
  }

  setState(newState) {
    if (newState === this.state) return;
    this.state = newState;

    // Update target colors based on the state
    const targetColor = this.colors[newState] || this.colors.idle;
    for (let i = 0; i < this.particleCount; i++) {
      const idx = i * 3;
      // Introduce slight color variations for premium depth
      const offset = (Math.random() - 0.5) * 0.15;
      this.targetColors[idx] = Math.max(0, Math.min(1, targetColor.r + offset));
      this.targetColors[idx + 1] = Math.max(0, Math.min(1, targetColor.g + offset));
      this.targetColors[idx + 2] = Math.max(0, Math.min(1, targetColor.b + offset));
    }

    // Adapt hologram colors
    const hexColor = parseInt(targetColor.getHexString(), 16);
    this.hologramObjects.forEach(({ mesh }) => {
      if (mesh.material) {
        mesh.material.color.setHex(hexColor);
      }
    });
  }

  setMicLevel(level) {
    // Expected level between 0.0 and 1.0
    this.micLevel = level;
  }

  onResize() {
    if (!this.canvas) return;
    this.width = this.canvas.parentElement.clientWidth;
    this.height = this.canvas.parentElement.clientHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height, false);
  }

  animate() {
    if (!this.renderer) return;

    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    const posAttr = this.particles.geometry.attributes.position;
    const colAttr = this.particles.geometry.attributes.color;

    // State-based source coordinates
    const targetPositions = this.positions[this.state] || this.positions.idle;
    const lerpSpeed = this.state === "error" ? 8.0 : this.state === "success" ? 6.0 : 3.0; // Higher lerp speed for instant react

    // 1. Update particles (morph + physics)
    for (let i = 0; i < this.particleCount; i++) {
      const idx = i * 3;

      // Smooth Morphing Position
      let tx = targetPositions[idx];
      let ty = targetPositions[idx + 1];
      let tz = targetPositions[idx + 2];

      // Add state-specific micro-behaviors/physics
      if (this.state === "idle") {
        // Rhythmic breathing offset
        const scale = 1.0 + Math.sin(time * 1.5 + i * 0.01) * 0.05;
        tx *= scale;
        ty *= scale;
        tz *= scale;
      } else if (this.state === "listening") {
        // Waviness + sound reactive amplitude
        const wave = Math.sin(time * 4.0 + tx * 1.5) * (0.1 + this.micLevel * 1.2);
        ty += wave;
        // Expand ring with mic level
        const scale = 1.0 + this.micLevel * 0.3;
        tx *= scale;
        tz *= scale;
      } else if (this.state === "thinking") {
        // Rapid orbit swirl
        const theta = time * 2.0 + i * 0.005;
        const currentRadius = Math.sqrt(tx * tx + tz * tz);
        tx = currentRadius * Math.cos(theta);
        tz = currentRadius * Math.sin(theta);
      } else if (this.state === "speaking") {
        // Expands on mouth syllables (micLevel mapping here representing vocal audio output)
        const burst = 1.0 + Math.sin(time * 8.0 + i) * (0.05 + this.micLevel * 0.4);
        tx *= burst;
        ty *= burst;
        tz *= burst;
      } else if (this.state === "error") {
        // Erratic vibration
        tx += (Math.random() - 0.5) * 0.12;
        ty += (Math.random() - 0.5) * 0.12;
        tz += (Math.random() - 0.5) * 0.12;
      } else if (this.state === "sleep") {
        // Slow vertical drift
        ty += Math.sin(time * 0.5 + tx) * 0.02;
      }

      // Linear Interpolation for morphing
      posAttr.array[idx] += (tx - posAttr.array[idx]) * lerpSpeed * delta;
      posAttr.array[idx + 1] += (ty - posAttr.array[idx + 1]) * lerpSpeed * delta;
      posAttr.array[idx + 2] += (tz - posAttr.array[idx + 2]) * lerpSpeed * delta;

      // Morph colors
      this.currentColors[idx] += (this.targetColors[idx] - this.currentColors[idx]) * 4.0 * delta;
      this.currentColors[idx + 1] += (this.targetColors[idx + 1] - this.currentColors[idx + 1]) * 4.0 * delta;
      this.currentColors[idx + 2] += (this.targetColors[idx + 2] - this.currentColors[idx + 2]) * 4.0 * delta;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // 2. Animate Faint Holograms
    this.hologramObjects.forEach((holo) => {
      if (holo.type === "ring") {
        holo.mesh.rotation.z += holo.speedY * delta;
        // Pulse ring based on state
        const pulse = 1.0 + Math.sin(time * 2.0) * 0.02;
        holo.mesh.scale.set(pulse, pulse, pulse);
        holo.mesh.material.opacity = this.state === "thinking" ? 0.3 : 0.15;
      } else if (holo.type === "nucleus") {
        holo.mesh.rotation.x += holo.speedX * delta;
        holo.mesh.rotation.y += holo.speedY * delta;
        holo.mesh.material.opacity = this.state === "thinking" ? 0.25 : 0.08;
      } else if (holo.type === "grid") {
        holo.mesh.rotation.y += holo.speedY * delta;
      }
    });

    // Make holograms follow camera rotation subtly
    this.hologramGroup.rotation.y = time * 0.03;

    // Render Scene
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    // Cancel animation loop
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // Clean listeners
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    // Dispose Three.js objects
    if (this.particles) {
      this.particles.geometry.dispose();
      this.particles.material.dispose();
    }

    this.hologramObjects.forEach(({ mesh }) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });

    if (this.renderer) {
      this.renderer.dispose();
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.hologramObjects = [];
  }
}
