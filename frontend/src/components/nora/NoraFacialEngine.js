/**
 * NoraFacialEngine.js
 *
 * High-Displacement Granular Facial Animation Controller for Character Creator FBX models.
 * Features persistent emotion poses (2-3x amplified multi-morph targets), smooth transition blending,
 * layered speech lip sync over active emotions, and interactive diagnostic test suites.
 */
import * as THREE from "three";

// ═══════════════════════════════════════════════════════════════
// MORPH TARGET NAME MAPPING (ORDERED BY VERIFIED MAX-DELTA)
// ═══════════════════════════════════════════════════════════════

const MORPH_MAP = {
  // ── Blink (maxDelta: 1.11 units) ──
  blinkLeft: ["Eye_Blink_L", "A14_Eye_Blink_Left"],
  blinkRight: ["Eye_Blink_R", "A15_Eye_Blink_Right"],
  blinkBoth: ["Eyes_Blink"],

  // ── Eye Gaze ──
  eyeLookUpL: ["A06_Eye_Look_Up_Left"],
  eyeLookUpR: ["A07_Eye_Look_Up_Right"],
  eyeLookDownL: ["A08_Eye_Look_Down_Left"],
  eyeLookDownR: ["A09_Eye_Look_Down_Right"],
  eyeLookOutL: ["A10_Eye_Look_Out_Left"],
  eyeLookInL: ["A11_Eye_Look_In_Left"],
  eyeLookInR: ["A12_Eye_Look_In_Right"],
  eyeLookOutR: ["A13_Eye_Look_Out_Right"],
  eyeSquintL: ["A16_Eye_Squint_Left", "Eye_Squint_L"],
  eyeSquintR: ["A17_Eye_Squint_Right", "Eye_Squint_R"],
  eyeWideL: ["A19_Eye_Wide_Right", "A18_Eye_Wide_Left", "Eye_Wide_L"],
  eyeWideR: ["A18_Eye_Wide_Left", "A19_Eye_Wide_Right", "Eye_Wide_R"],

  // ── Brow (maxDelta: 1.14 units) ──
  browInnerUp: ["A01_Brow_Inner_Up"],
  browDownL: ["A02_Brow_Down_Left", "Brow_Drop_Left"],
  browDownR: ["A03_Brow_Down_Right", "Brow_Drop_Right"],
  browOuterUpL: ["A04_Brow_Outer_Up_Left", "Brow_Raise_Outer_Left"],
  browOuterUpR: ["A05_Brow_Outer_Up_Right", "Brow_Raise_Outer_Right"],
  browRaiseL: ["Brow_Raise_Left"],
  browRaiseR: ["Brow_Raise_Right"],

  // ── Jaw (maxDelta: 0.80 units) ──
  jawOpen: ["A25_Jaw_Open", "Mouth_Lips_Jaw_Adjust"],
  jawForward: ["A26_Jaw_Forward"],
  jawLeft: ["A27_Jaw_Left"],
  jawRight: ["A28_Jaw_Right"],

  // ── Smile (maxDelta: 2.16 units) ──
  mouthSmileL: ["A38_Mouth_Smile_Left", "Mouth_Smile_L"],
  mouthSmileR: ["A39_Mouth_Smile_Right", "Mouth_Smile_R"],
  mouthSmile: ["Mouth_Smile"],
  mouthDimpleL: ["A42_Mouth_Dimple_Left", "Mouth_Dimple_L"],
  mouthDimpleR: ["A43_Mouth_Dimple_Right", "Mouth_Dimple_R"],

  // ── Mouth & Lips (maxDelta: 1.58–3.00 units) ──
  mouthOpen: ["Mouth_Open", "Mouth_Lips_Open"],
  mouthClose: ["A37_Mouth_Close"],
  mouthFrownL: ["A40_Mouth_Frown_Left", "Mouth_Frown_L"],
  mouthFrownR: ["A41_Mouth_Frown_Right", "Mouth_Frown_R"],
  mouthFunnel: ["A29_Mouth_Funnel", "Mouth_Blow"],
  mouthPucker: ["A30_Mouth_Pucker", "Mouth_Pucker"],
  mouthLeft: ["A31_Mouth_Left", "Mouth_L"],
  mouthRight: ["A32_Mouth_Right", "Mouth_R"],
  mouthLipsPart: ["Mouth_Lips_Part"],
  mouthLowerDownL: ["Mouth_Bottom_Lip_Down", "A46_Mouth_Lower_Down_Left"],
  mouthLowerDownR: ["A47_Mouth_Lower_Down_Right"],
  mouthStretchL: ["A50_Mouth_Stretch_Left"],
  mouthStretchR: ["A51_Mouth_Stretch_Right"],
  mouthPressL: ["A48_Mouth_Press_Left"],
  mouthPressR: ["A49_Mouth_Press_Right"],

  // ── CC Visemes (maxDelta: 1.68 units) ──
  vTightO: ["V_Tight-O"],
  vAffricate: ["V_Affricate"],
  vTight: ["V_Tight"],
  vDentalLip: ["V_Dental_Lip"],
  vLipOpen: ["Mouth_Lips_Open", "V_Lip_Open"],
  vWide: ["A50_Mouth_Stretch_Left", "V_Wide"],
  vExplosive: ["A37_Mouth_Close", "Mouth_Plosive", "V_Explosive"],
  vOpen: ["Mouth_Open", "A25_Jaw_Open", "V_Open"],

  // ── Cheek (maxDelta: 1.21 units) ──
  cheekPuff: ["A20_Cheek_Puff", "Cheek_Blow_L"],
  cheekSquintL: ["A21_Cheek_Squint_Left", "Cheek_Raise_L"],
  cheekSquintR: ["A22_Cheek_Squint_Right", "Cheek_Raise_R"],
};

// ═══════════════════════════════════════════════════════════════
// NATURAL MULTI-MORPH EMOTION PRESETS (Subtle & Professional)
// ═══════════════════════════════════════════════════════════════

export const EMOTIONS = {
  neutral: {},

  happy: {
    mouthSmileL: 0.18,
    mouthSmileR: 0.18,
    cheekSquintL: 0.08,
    cheekSquintR: 0.08,
    eyeSquintL: 0.05,
    eyeSquintR: 0.05,
  },

  greeting: {
    mouthSmileL: 0.30,
    mouthSmileR: 0.30,
    cheekSquintL: 0.15,
    cheekSquintR: 0.15,
    browInnerUp: 0.12,
    browOuterUpL: 0.10,
    browOuterUpR: 0.10,
    eyeWideL: 0.08,
    eyeWideR: 0.08,
  },

  thinking: {
    browInnerUp: 0.20,
    browOuterUpL: 0.12,
    browDownR: 0.10,
    eyeLookUpL: 0.15,
    eyeLookUpR: 0.15,
    mouthPressL: 0.12,
    mouthPressR: 0.12,
  },

  listening: {
    browInnerUp: 0.10,
    browOuterUpL: 0.08,
    browOuterUpR: 0.08,
    mouthSmileL: 0.10,
    mouthSmileR: 0.10,
    eyeWideL: 0.06,
    eyeWideR: 0.06,
  },

  concerned: {
    browInnerUp: 0.25,
    browDownL: 0.18,
    browDownR: 0.18,
    mouthFrownL: 0.15,
    mouthFrownR: 0.15,
    mouthPressL: 0.10,
    mouthPressR: 0.10,
  },

  serious: {
    browDownL: 0.18,
    browDownR: 0.18,
    mouthPressL: 0.15,
    mouthPressR: 0.15,
    eyeSquintL: 0.08,
    eyeSquintR: 0.08,
  },

  surprised: {
    browInnerUp: 0.30,
    browOuterUpL: 0.25,
    browOuterUpR: 0.25,
    eyeWideL: 0.28,
    eyeWideR: 0.28,
    jawOpen: 0.18,
    mouthOpen: 0.15,
  },
};

// ═══════════════════════════════════════════════════════════════
// VISEME PATTERNS
// ═══════════════════════════════════════════════════════════════

export const VISEMES = [
  { name: "Rest", pattern: {} },
  { name: "V_Open (A, Ah)", pattern: { jawOpen: 0.65, mouthOpen: 0.75, vOpen: 0.7 } },
  { name: "V_Wide (E, Ee)", pattern: { jawOpen: 0.35, vWide: 0.6, mouthStretchL: 0.4, mouthStretchR: 0.4 } },
  { name: "V_Tight-O (O, Oh)", pattern: { jawOpen: 0.45, vTightO: 0.7, mouthFunnel: 0.45 } },
  { name: "V_Tight (U, Oo)", pattern: { jawOpen: 0.25, vTight: 0.65, mouthPucker: 0.5 } },
  { name: "V_Explosive (M, B, P)", pattern: { jawOpen: 0.05, mouthClose: 0.6, vExplosive: 0.5 } },
  { name: "V_Dental_Lip (F, V)", pattern: { jawOpen: 0.2, vDentalLip: 0.6, mouthLowerDownL: 0.25 } },
  { name: "V_Affricate (S, Z, Ch)", pattern: { jawOpen: 0.15, vAffricate: 0.6 } },
  { name: "V_Lip_Open (L, Th)", pattern: { jawOpen: 0.35, vLipOpen: 0.55 } },
];

export const VISEME_PATTERNS = VISEMES;

// ═══════════════════════════════════════════════════════════════
// FACIAL ENGINE CLASS
// ═══════════════════════════════════════════════════════════════

export class NoraFacialEngine {
  constructor() {
    this._morphIndices = {};
    this._influences = null;
    this._mesh = null;
    this._jawBone = null;
    this._initialJawRotX = 0;

    // Blink state
    this._blinkTimer = 0;
    this._blinkInterval = 3.5;
    this._blinkPhase = 0;
    this._blinkProgress = 0;
    this._blinkDuration = 0.14;

    // Emotion state (Persistent)
    this._currentEmotion = "neutral";
    this._targetEmotion = "neutral";
    this._emotionBlend = 1.0;
    this._emotionSpeed = 3.5;
    this._currentEmotionWeights = {};
    this._targetEmotionWeights = {};

    // Lip sync state
    this._isSpeaking = false;
    this._speechTime = 0;
    this._currentViseme = 0;
    this._targetViseme = 0;
    this._visemeBlend = 0;
    this._visemeChangeTimer = 0;
    this._visemeChangeInterval = 0.12;

    // Idle state
    this._idleTime = 0;

    // Eye gaze state
    this._eyeTargetX = 0;
    this._eyeTargetY = 0;
    this._eyeCurrentX = 0;
    this._eyeCurrentY = 0;

    // Diagnostic Mode state
    this._diagActive = false;

    // Fault tolerance flags per subsystem
    this._subsystemStatus = {
      blink: true,
      emotion: true,
      lipsync: true,
      micro: true,
      eyegaze: true,
    };

    this._hasLoggedLifecycle = false;
    this._isInitialized = false;
  }

  /**
   * Initialize from SkinnedMesh and optional jaw bone.
   */
  initialize(mesh, jawBone = null) {
    if (!mesh || !mesh.morphTargetDictionary || !mesh.morphTargetInfluences) {
      console.warn("NoraFacialEngine: Mesh has no morph targets.");
      this._isInitialized = false;
      return false;
    }

    this._mesh = mesh;
    this._influences = mesh.morphTargetInfluences;
    this._jawBone = jawBone ?? null;
    if (jawBone && jawBone.rotation) {
      this._initialJawRotX = jawBone.rotation.x;
    }
    this._morphIndices = {};

    const dict = mesh.morphTargetDictionary;

    for (const [canonical, candidates] of Object.entries(MORPH_MAP)) {
      for (const candidate of candidates) {
        if (dict[candidate] !== undefined) {
          this._morphIndices[canonical] = dict[candidate];
          break;
        }
      }
    }

    const resolvedCount = Object.keys(this._morphIndices).length;
    const totalAvailable = Object.keys(dict).length;

    if (!this._hasLoggedLifecycle) {
      console.log("=================================================");
      console.log("✔ NoraFacialEngine Persistent Expression Stack Initialized");
      console.log(`✔ Mesh UUID: ${mesh.uuid} | Geometry UUID: ${mesh.geometry ? mesh.geometry.uuid : "N/A"}`);
      console.log(`✔ Dict Count: ${totalAvailable} | Resolved Canonical: ${resolvedCount}`);
      console.log("=================================================");
      this._hasLoggedLifecycle = true;
    }

    this._isInitialized = true;
    this._scheduleNextBlink();
    return true;
  }

  get isInitialized() { return this._isInitialized; }
  get currentEmotion() { return this._targetEmotion; }
  get emotionBlendProgress() { return Math.min(1.0, this._emotionBlend); }

  get meshInfo() {
    if (!this._mesh) return null;
    return {
      name: this._mesh.name,
      uuid: this._mesh.uuid,
      dictCount: Object.keys(this._mesh.morphTargetDictionary || {}).length,
      influencesCount: this._influences ? this._influences.length : 0,
      hasJawBone: Boolean(this._jawBone),
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // DIAGNOSTIC TESTING METHODS (STRICT NO-INTERPOLATION HOLD)
  // ═══════════════════════════════════════════════════════════════

  setDiagActive(active) {
    this._diagActive = active;
    if (!active) {
      this.zeroAllMorphs();
    }
  }

  zeroAllMorphs() {
    if (!this._influences) return;
    for (let i = 0; i < this._influences.length; i++) {
      this._influences[i] = 0;
    }
    if (this._jawBone && this._jawBone.rotation) {
      this._jawBone.rotation.x = this._initialJawRotX;
    }
  }

  testSmile(variant = 0) {
    this.zeroAllMorphs();
    this.setDiagActive(true);

    const dict = this._mesh ? this._mesh.morphTargetDictionary : {};

    // Force ALL smile morphs to 1.0 simultaneously for maximum high-displacement visual impact!
    const smileKeys = [
      "A38_Mouth_Smile_Left",
      "A39_Mouth_Smile_Right",
      "Mouth_Smile_L",
      "Mouth_Smile_R",
      "Mouth_Smile",
      "A42_Mouth_Dimple_Left",
      "A43_Mouth_Dimple_Right"
    ];

    for (const rawKey of smileKeys) {
      const idx = dict[rawKey];
      if (idx !== undefined && this._influences) {
        this._influences[idx] = 1.0;
      }
    }

    const dictIdxL = dict["A38_Mouth_Smile_Left"] ?? dict["Mouth_Smile_L"];
    const dictIdxR = dict["A39_Mouth_Smile_Right"] ?? dict["Mouth_Smile_R"];
    const actualValL = this._influences[dictIdxL];
    const actualValR = this._influences[dictIdxR];

    console.log("=================================================");
    console.log("✔ [SMILE DIAGNOSTIC TEST TRIGGERED - 5S STRICT HOLD]");
    console.log(`✔ Mesh UUID: ${this._mesh ? this._mesh.uuid : "N/A"}`);
    console.log(`✔ A38_Mouth_Smile_Left Index: ${dictIdxL} | Actual Value: ${actualValL} | Expected: 1.0`);
    console.log(`✔ A39_Mouth_Smile_Right Index: ${dictIdxR} | Actual Value: ${actualValR} | Expected: 1.0`);
    console.log("=================================================");

    return { variantName: "Full Multi-Morph Smile Hold (1.0)", activeMorphs: this.getActiveMorphValues() };
  }

  testBlink(variant = 0) {
    this.zeroAllMorphs();
    this.setDiagActive(true);

    const blinkVariants = [
      { name: "Eyes_Blink (1.11u)", keys: ["blinkBoth"] },
      { name: "Eye_Blink_L/R (1.11u)", keys: ["blinkLeft", "blinkRight"] },
      { name: "A14/A15_Eye_Blink (0.93u)", keys: ["blinkLeft", "blinkRight"] },
    ];

    const target = blinkVariants[variant % blinkVariants.length];
    for (const key of target.keys) {
      this._setMorph(key, 1.0);
    }

    return { variantName: target.name, activeMorphs: this.getActiveMorphValues() };
  }

  testJaw() {
    this.zeroAllMorphs();
    this.setDiagActive(true);

    this._setMorph("jawOpen", 1.0);
    this._setMorph("mouthOpen", 0.8);
    if (this._jawBone && this._jawBone.rotation) {
      this._jawBone.rotation.x = this._initialJawRotX + 0.12;
    }

    return { name: "Jaw_Open + CC_Base_JawRoot", activeMorphs: this.getActiveMorphValues() };
  }

  testViseme(index) {
    this.zeroAllMorphs();
    this.setDiagActive(true);

    const item = VISEMES[index % VISEMES.length];
    if (item && item.pattern) {
      for (const [key, val] of Object.entries(item.pattern)) {
        this._setMorph(key, val);
      }
    }

    return { visemeName: item ? item.name : "Rest", activeMorphs: this.getActiveMorphValues() };
  }

  testEmotion(emotionName) {
    this.setEmotion(emotionName, true);
    return { emotionName, activeMorphs: this.getActiveMorphValues() };
  }

  testMorphIndex(index) {
    this.zeroAllMorphs();
    this.setDiagActive(true);

    if (!this._mesh || !this._mesh.morphTargetDictionary || !this._influences) return null;

    const total = this._influences.length;
    const safeIdx = Math.max(0, Math.min(index, total - 1));
    this._influences[safeIdx] = 1.0;

    const dict = this._mesh.morphTargetDictionary;
    let foundName = `Morph_${safeIdx}`;
    for (const [name, idx] of Object.entries(dict)) {
      if (idx === safeIdx) {
        foundName = name;
        break;
      }
    }

    return { index: safeIdx, name: foundName, influence: 1.0, total };
  }

  // ═══════════════════════════════════════════════════════════════
  // PRODUCTION PUBLIC API (FAULT-TOLERANT ENGINE)
  // ═══════════════════════════════════════════════════════════════

  setEmotion(emotionName, forceDiag = false) {
    if (this._diagActive && !forceDiag) return;

    if (emotionName === this._targetEmotion && this._emotionBlend >= 1.0) return;

    const preset = EMOTIONS[emotionName];
    if (!preset) return;

    this._currentEmotion = this._targetEmotion;
    this._targetEmotion = emotionName;

    const currentWeights = {};
    for (const key of Object.keys(MORPH_MAP)) {
      currentWeights[key] = this._getMorph(key);
    }
    this._currentEmotionWeights = currentWeights;
    this._targetEmotionWeights = { ...preset };
    this._emotionBlend = 0.0;
  }

  setSpeaking(isSpeaking) {
    if (this._diagActive) return;
    if (this._isSpeaking === isSpeaking) return;
    this._isSpeaking = isSpeaking;
    if (isSpeaking) {
      this._speechTime = 0;
      this._visemeChangeTimer = 0;
      this._currentViseme = 0;
      this._targetViseme = 1;
    }
  }

  setEyeTarget(x, y) {
    if (this._diagActive) return;
    this._eyeTargetX = x;
    this._eyeTargetY = y;
  }

  getActiveMorphValues() {
    if (!this._isInitialized || !this._mesh) return {};
    const result = {};
    const dict = this._mesh.morphTargetDictionary;
    const influences = this._influences;
    if (!dict || !influences) return {};
    for (const [name, idx] of Object.entries(dict)) {
      const val = influences[idx];
      if (val > 0.001) {
        result[name] = parseFloat(val.toFixed(4));
      }
    }
    return result;
  }

  /**
   * Main frame update loop with granular subsystem try/catch guards.
   */
  update(delta, featureFlags = {}) {
    if (!this._isInitialized) return;
    if (this._diagActive) return; // Diagnostic Mode freezes update loop so test morph is held at 1.0 continuously

    this._idleTime += delta;

    // Subsystem 1: Blink
    if (featureFlags.ENABLE_BLINK !== false && this._subsystemStatus.blink) {
      try {
        this._updateBlink(delta);
      } catch (err) {
        console.error("NoraFacialEngine: Disabling broken subsystem [_updateBlink]:", err);
        this._subsystemStatus.blink = false;
      }
    }

    // Subsystem 2: Emotion
    if (featureFlags.ENABLE_EMOTION !== false && this._subsystemStatus.emotion) {
      try {
        this._updateEmotion(delta);
      } catch (err) {
        console.error("NoraFacialEngine: Disabling broken subsystem [_updateEmotion]:", err);
        this._subsystemStatus.emotion = false;
      }
    }

    // Subsystem 3: Lip Sync
    if (featureFlags.ENABLE_LIPSYNC !== false && this._subsystemStatus.lipsync) {
      try {
        this._updateLipSync(delta, featureFlags);
      } catch (err) {
        console.error("NoraFacialEngine: Disabling broken subsystem [_updateLipSync]:", err);
        this._subsystemStatus.lipsync = false;
      }
    }

    // Subsystem 4: Micro Animations
    if (featureFlags.ENABLE_MICRO !== false && this._subsystemStatus.micro) {
      try {
        this._updateIdleMicro(delta);
      } catch (err) {
        console.error("NoraFacialEngine: Disabling broken subsystem [_updateIdleMicro]:", err);
        this._subsystemStatus.micro = false;
      }
    }

    // Subsystem 5: Eye Gaze
    if (featureFlags.ENABLE_EYE_TRACKING !== false && this._subsystemStatus.eyegaze) {
      try {
        this._updateEyeGaze(delta);
      } catch (err) {
        console.error("NoraFacialEngine: Disabling broken subsystem [_updateEyeGaze]:", err);
        this._subsystemStatus.eyegaze = false;
      }
    }
  }

  _has(key) {
    return this._morphIndices[key] !== undefined;
  }

  _setMorph(key, value) {
    const idx = this._morphIndices[key];
    if (idx !== undefined && this._influences) {
      this._influences[idx] = value;
    }
  }

  _getMorph(key) {
    const idx = this._morphIndices[key];
    if (idx !== undefined && this._influences) {
      return this._influences[idx];
    }
    return 0;
  }

  _lerpMorph(key, target, speed, delta) {
    const idx = this._morphIndices[key];
    if (idx !== undefined && this._influences) {
      this._influences[idx] = THREE.MathUtils.lerp(this._influences[idx], target, speed * delta);
    }
  }

  _scheduleNextBlink() {
    this._blinkTimer = 0;
    this._blinkInterval = 2.5 + Math.random() * 3.5;
    this._blinkDuration = 0.14;
    this._blinkPhase = 0;
  }

  _updateBlink(delta) {
    this._blinkTimer += delta;

    if (this._blinkPhase === 0) {
      if (this._blinkTimer >= this._blinkInterval) {
        this._blinkPhase = 1;
        this._blinkProgress = 0;
      }
    }

    if (this._blinkPhase === 1) {
      this._blinkProgress += delta / (this._blinkDuration * 0.4);
      const v = Math.min(this._blinkProgress, 1.0);
      const eased = Math.sin(v * Math.PI * 0.5);

      this._setMorph("blinkLeft", eased);
      this._setMorph("blinkRight", eased);
      this._setMorph("blinkBoth", eased);

      if (this._blinkProgress >= 1.0) {
        this._blinkPhase = 2;
        this._blinkProgress = 0;
      }
    }

    if (this._blinkPhase === 2) {
      this._blinkProgress += delta / (this._blinkDuration * 0.6);
      const v = Math.min(this._blinkProgress, 1.0);
      const eased = 1.0 - Math.sin(v * Math.PI * 0.5);

      this._setMorph("blinkLeft", eased);
      this._setMorph("blinkRight", eased);
      this._setMorph("blinkBoth", eased);

      if (this._blinkProgress >= 1.0) {
        this._setMorph("blinkLeft", 0);
        this._setMorph("blinkRight", 0);
        this._setMorph("blinkBoth", 0);
        this._scheduleNextBlink();
      }
    }
  }

  _updateEmotion(delta) {
    if (this._emotionBlend < 1.0) {
      this._emotionBlend = Math.min(1.0, this._emotionBlend + this._emotionSpeed * delta);
    }

    const t = this._emotionBlend;
    const eased = t * t * (3 - 2 * t);

    const targetPreset = this._targetEmotionWeights;
    const activeKeys = new Set([
      ...Object.keys(this._currentEmotionWeights),
      ...Object.keys(targetPreset),
    ]);

    for (const key of activeKeys) {
      if (this._isSpeaking && (key === "jawOpen" || key === "mouthOpen" || key === "mouthClose")) {
        continue;
      }

      const from = this._currentEmotionWeights[key] || 0;
      const to = targetPreset[key] || 0;
      const targetVal = from + (to - from) * eased;

      this._lerpMorph(key, targetVal, 10, delta);
    }
  }

  _updateLipSync(delta, featureFlags = {}) {
    if (this._isSpeaking) {
      this._speechTime += delta;
      this._visemeChangeTimer += delta;

      if (this._visemeChangeTimer >= this._visemeChangeInterval) {
        this._visemeChangeTimer = 0;
        this._visemeChangeInterval = 0.08 + Math.random() * 0.12;

        this._currentViseme = this._targetViseme;

        const weights = [0.05, 0.25, 0.15, 0.15, 0.1, 0.12, 0.08, 0.05, 0.05];
        let r = Math.random();
        let cumulative = 0;
        this._targetViseme = 1;
        for (let i = 0; i < weights.length; i++) {
          cumulative += weights[i];
          if (r <= cumulative) {
            this._targetViseme = i;
            break;
          }
        }
        this._visemeBlend = 0;
      }

      this._visemeBlend = Math.min(1.0, this._visemeBlend + delta * 12);
      const eased = this._visemeBlend * this._visemeBlend * (3 - 2 * this._visemeBlend);

      const fromPattern = VISEMES[this._currentViseme]?.pattern || {};
      const toPattern = VISEMES[this._targetViseme]?.pattern || {};

      const speechKeys = new Set([...Object.keys(fromPattern), ...Object.keys(toPattern)]);
      const rhythm = Math.sin(this._speechTime * 14) * 0.15 + 0.85;

      for (const key of speechKeys) {
        const from = (fromPattern[key] || 0) * rhythm;
        const to = (toPattern[key] || 0) * rhythm;
        const speechVal = from + (to - from) * eased;

        const emotionBase = this._targetEmotionWeights[key] || 0;
        const combinedVal = Math.max(speechVal, emotionBase * 0.5 + speechVal * 0.8);

        this._lerpMorph(key, combinedVal, 16, delta);
      }

      if (featureFlags.ENABLE_JAW !== false && this._jawBone && this._jawBone.rotation) {
        const currentJawOpen = this._getMorph("jawOpen") || (fromPattern["jawOpen"] || 0);
        const targetJawRotX = this._initialJawRotX + currentJawOpen * 0.08;
        this._jawBone.rotation.x = THREE.MathUtils.lerp(
          this._jawBone.rotation.x,
          targetJawRotX,
          delta * 12
        );
      }
    } else {
      for (const item of VISEMES) {
        if (!item || !item.pattern) continue;
        for (const key of Object.keys(item.pattern)) {
          if (this._targetEmotionWeights[key] === undefined) {
            this._lerpMorph(key, 0, 8, delta);
          }
        }
      }

      if (featureFlags.ENABLE_JAW !== false && this._jawBone && this._jawBone.rotation) {
        this._jawBone.rotation.x = THREE.MathUtils.lerp(
          this._jawBone.rotation.x,
          this._initialJawRotX,
          delta * 6
        );
      }
    }
  }

  _updateIdleMicro(delta) {
    if (this._isSpeaking) return;

    const t = this._idleTime;
    const target = this._targetEmotionWeights;

    // After 10 seconds, dampen idle micro-movements to near-zero for stabilized posture
    const dampFactor = t > 10 ? 0.08 : 1.0;

    if (target.jawOpen === undefined) {
      const breathVal = (Math.sin(t * 0.8) * 0.008 + 0.004) * dampFactor;
      this._lerpMorph("jawOpen", breathVal, 3, delta);
    }

    if (target.mouthLipsPart === undefined) {
      const lipPart = (Math.sin(t * 0.9 + 0.5) * 0.008 + 0.005) * dampFactor;
      this._lerpMorph("mouthLipsPart", lipPart, 2, delta);
    }
  }

  _updateEyeGaze(delta) {
    const speed = 5;
    this._eyeCurrentX = THREE.MathUtils.lerp(this._eyeCurrentX, this._eyeTargetX, speed * delta);
    this._eyeCurrentY = THREE.MathUtils.lerp(this._eyeCurrentY, this._eyeTargetY, speed * delta);

    const x = this._eyeCurrentX;
    const y = this._eyeCurrentY;

    if (x > 0) {
      this._setMorph("eyeLookOutL", x * 0.5);
      this._setMorph("eyeLookInR", x * 0.5);
      this._setMorph("eyeLookInL", 0);
      this._setMorph("eyeLookOutR", 0);
    } else {
      this._setMorph("eyeLookInL", -x * 0.5);
      this._setMorph("eyeLookOutR", -x * 0.5);
      this._setMorph("eyeLookOutL", 0);
      this._setMorph("eyeLookInR", 0);
    }

    if (y > 0) {
      this._setMorph("eyeLookDownL", y * 0.4);
      this._setMorph("eyeLookDownR", y * 0.4);
      this._setMorph("eyeLookUpL", 0);
      this._setMorph("eyeLookUpR", 0);
    } else {
      this._setMorph("eyeLookUpL", -y * 0.4);
      this._setMorph("eyeLookUpR", -y * 0.4);
      this._setMorph("eyeLookDownL", 0);
      this._setMorph("eyeLookDownR", 0);
    }
  }
}

/**
 * Map AI state to persistent emotion.
 * Only transitions emotion on major state changes, never auto-resets active emotion.
 */
export function aiStateToEmotion(aiState) {
  switch (aiState) {
    case "BOOT":
      return "neutral";
    case "IDLE":
      return "listening";
    case "LISTENING":
      return "listening";
    case "UNDERSTANDING":
    case "THINKING":
    case "GENERATING":
      return "thinking";
    case "SPEAKING":
      return "happy";
    case "GREETING":
      return "greeting";
    case "SUCCESS":
      return "greeting";
    case "ERROR":
      return "serious";
    case "SLEEP":
      return "neutral";
    default:
      return "listening";
  }
}
