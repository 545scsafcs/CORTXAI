import React, { Component, Suspense, useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useFBX, Preload } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";
import { useNoraPresence } from "../../context/NoraPresenceContext";
import { NoraFacialEngine, aiStateToEmotion } from "./NoraFacialEngine";

// Import Nora FBX Model and Animation Assets
import noraFbx from "../../assets/nora/Nora_Final.fbx?url";
import idleFbxUrl from "../../assets/nora/animations/Idle.fbx?url";
import talkingFbxUrl from "../../assets/nora/animations/Talking.fbx?url";
import thinkFbxUrl from "../../assets/nora/animations/Think.fbx?url";
import waveFbxUrl from "../../assets/nora/animations/Wave.fbx?url";
import pointFbxUrl from "../../assets/nora/animations/Point.fbx?url";
import walkFbxUrl from "../../assets/nora/animations/Walk.fbx?url";

// Preload FBX Assets
useFBX.preload(noraFbx);
useFBX.preload(idleFbxUrl);
useFBX.preload(talkingFbxUrl);
useFBX.preload(thinkFbxUrl);
useFBX.preload(waveFbxUrl);
useFBX.preload(pointFbxUrl);
useFBX.preload(walkFbxUrl);

/**
 * Production Error Boundary for FBX 3D WebGL Canvas
 */
class Nora3DBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Nora FBX 3D WebGL Engine Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-950/90 rounded-2xl border border-rose-500/20 backdrop-blur-md select-none">
          <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-2 font-mono font-bold text-xs">
            3D
          </div>
          <p className="text-xs font-mono text-slate-300 font-semibold mb-1">FBX Render Engine Notice</p>
          <p className="text-[11px] text-slate-400 max-w-[220px] leading-relaxed">
            {this.state.error?.message || "Unable to initialize 3D FBX canvas context."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-3 px-3 py-1 text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg border border-cyan-500/30 transition cursor-pointer"
          >
            Re-initialize 3D
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Suspense loading state for 3D FBX Model
 */
const Nora3DLoader = React.memo(function Nora3DLoader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-transparent select-none">
      <div className="relative w-14 h-14 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping" />
        <div className="w-10 h-10 rounded-full border-2 border-t-cyan-400 border-r-cyan-500/60 border-b-transparent border-l-transparent animate-spin" />
      </div>
      <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-semibold animate-pulse">
        Loading 3D Nora...
      </span>
    </div>
  );
});

/**
 * Dynamic Name-Based Animation Clip Resolver for FBX Clips
 */
function findAnimationClip(clipList, keywords) {
  if (!clipList || clipList.length === 0) return null;
  for (const kw of keywords) {
    const match = clipList.find((c) => c.name && c.name.toLowerCase().includes(kw.toLowerCase()));
    if (match) return match;
  }
  return clipList[0];
}

/**
 * Computes exact GPU Skinned Vertex Bounding Box in world space
 */
function computeGpuSkinnedWorldBounds(mesh) {
  if (!mesh || !mesh.isSkinnedMesh) return new THREE.Box3();

  const geo = mesh.geometry;
  const posAttr = geo.attributes.position;
  const skinIndexAttr = geo.attributes.skinIndex;
  const skinWeightAttr = geo.attributes.skinWeight;

  if (!posAttr || !skinIndexAttr || !skinWeightAttr || !mesh.skeleton) {
    return new THREE.Box3().setFromObject(mesh);
  }

  mesh.skeleton.update();
  const bones = mesh.skeleton.bones;
  const boneInverses = mesh.skeleton.boneInverses;

  const box = new THREE.Box3();
  const v = new THREE.Vector3();
  const skinnedV = new THREE.Vector3();
  const tempMatrix = new THREE.Matrix4();
  const skinMatrix = new THREE.Matrix4();

  const step = 10;
  for (let i = 0; i < posAttr.count; i += step) {
    v.fromBufferAttribute(posAttr, i);

    const sw0 = skinWeightAttr.getX(i);
    const sw1 = skinWeightAttr.getY(i);
    const sw2 = skinWeightAttr.getZ(i);
    const sw3 = skinWeightAttr.getW(i);

    const si0 = skinIndexAttr.getX(i);
    const si1 = skinIndexAttr.getY(i);
    const si2 = skinIndexAttr.getZ(i);
    const si3 = skinIndexAttr.getW(i);

    skinMatrix.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    if (sw0 > 0 && bones[si0] && boneInverses[si0]) {
      tempMatrix.multiplyMatrices(bones[si0].matrixWorld, boneInverses[si0]).multiplyScalar(sw0);
      for (let e = 0; e < 16; e++) skinMatrix.elements[e] += tempMatrix.elements[e];
    }
    if (sw1 > 0 && bones[si1] && boneInverses[si1]) {
      tempMatrix.multiplyMatrices(bones[si1].matrixWorld, boneInverses[si1]).multiplyScalar(sw1);
      for (let e = 0; e < 16; e++) skinMatrix.elements[e] += tempMatrix.elements[e];
    }
    if (sw2 > 0 && bones[si2] && boneInverses[si2]) {
      tempMatrix.multiplyMatrices(bones[si2].matrixWorld, boneInverses[si2]).multiplyScalar(sw2);
      for (let e = 0; e < 16; e++) skinMatrix.elements[e] += tempMatrix.elements[e];
    }
    if (sw3 > 0 && bones[si3] && boneInverses[si3]) {
      tempMatrix.multiplyMatrices(bones[si3].matrixWorld, boneInverses[si3]).multiplyScalar(sw3);
      for (let e = 0; e < 16; e++) skinMatrix.elements[e] += tempMatrix.elements[e];
    }

    skinnedV.copy(v).applyMatrix4(skinMatrix);
    skinnedV.applyMatrix4(mesh.bindMatrix);
    box.expandByPoint(skinnedV);
  }

  return box;
}

/**
 * FBX Root Transform Normalization Engine
 */
function normalizeFBXModel(model, idleClip, handlesRef) {
  model.updateMatrixWorld(true);

  let skinnedMesh = null;
  let headBone = null;
  let neckBone = null;
  let jawBone = null;

  model.traverse((child) => {
    if (child.isMesh) {
      if (child.isSkinnedMesh && !skinnedMesh) skinnedMesh = child;
      child.visible = true;
      child.frustumCulled = false;
      child.castShadow = true;
      child.receiveShadow = true;

      if (child.material) {
        const origMat = Array.isArray(child.material) ? child.material[0] : child.material;
        const newMat = new THREE.MeshStandardMaterial({
          color:
            origMat && origMat.color && origMat.color.getHex() !== 0x000000
              ? origMat.color
              : new THREE.Color("#e2e8f0"),
          map: origMat && origMat.map ? origMat.map : null,
          roughness: 0.45,
          metalness: 0.1,
          side: THREE.DoubleSide,
          transparent: false,
          opacity: 1.0,
          morphTargets: true,
        });
        newMat.needsUpdate = true;
        child.material = newMat;
      }

      if (child.morphTargetDictionary && child.morphTargetInfluences) {
        if (handlesRef) handlesRef.blendshapeMesh = child;
      }
    }

    if (child.isBone) {
      const nameLower = child.name.toLowerCase();
      if (nameLower.includes("head") && !headBone) headBone = child;
      if (nameLower.includes("neck") && !neckBone) neckBone = child;
      if ((nameLower.includes("jawroot") || nameLower.includes("jaw")) && !jawBone) jawBone = child;
    }
  });

  if (handlesRef) {
    handlesRef.headBone = headBone ?? null;
    handlesRef.neckBone = neckBone ?? null;
    handlesRef.jawBone = jawBone ?? null;
  }

  // FIRST: Apply 1 frame of Idle animation so skeleton is in standing upright pose before measuring bounds!
  if (idleClip) {
    const tempMixer = new THREE.AnimationMixer(model);
    const tempAction = tempMixer.clipAction(idleClip);
    tempAction.play();
    tempMixer.update(0.016);
    model.updateMatrixWorld(true);
    if (skinnedMesh && skinnedMesh.skeleton) {
      skinnedMesh.skeleton.update();
    }
  }

  const targetMesh = skinnedMesh || model;
  let gpuBox = targetMesh.isSkinnedMesh
    ? computeGpuSkinnedWorldBounds(targetMesh)
    : new THREE.Box3().setFromObject(targetMesh);

  let gpuSize = gpuBox.getSize(new THREE.Vector3());
  let gpuCenter = gpuBox.getCenter(new THREE.Vector3());

  const targetHeight = 2.0;
  const currentHeight = gpuSize.y || 1;
  const autoScaleFactor = targetHeight / currentHeight;

  model.scale.set(autoScaleFactor, autoScaleFactor, autoScaleFactor);
  model.updateMatrixWorld(true);

  if (skinnedMesh && skinnedMesh.skeleton) {
    skinnedMesh.skeleton.update();
  }

  gpuBox = targetMesh.isSkinnedMesh
    ? computeGpuSkinnedWorldBounds(targetMesh)
    : new THREE.Box3().setFromObject(targetMesh);
  gpuSize = gpuBox.getSize(new THREE.Vector3());
  gpuCenter = gpuBox.getCenter(new THREE.Vector3());

  model.position.set(-gpuCenter.x, -gpuBox.min.y, -gpuCenter.z);
  model.updateMatrixWorld(true);

  return model;
}

/**
 * Automatic Production Camera Framing Controller
 * Frames Nora's full body (head-to-feet) matching the reference image.
 */
function AutoCameraFraming({ modelGroupRef }) {
  const { camera } = useThree();
  const framedRef = useRef(false);
  const frameCountRef = useRef(0);

  useFrame(() => {
    if (!modelGroupRef.current) return;
    if (framedRef.current) return;

    frameCountRef.current++;
    if (frameCountRef.current < 3) return;

    let skinnedMesh = null;

    modelGroupRef.current.traverse((child) => {
      if (child.isSkinnedMesh && !skinnedMesh) skinnedMesh = child;
    });

    if (!skinnedMesh) return;

    const gpuBox = computeGpuSkinnedWorldBounds(skinnedMesh);
    const size = gpuBox.getSize(new THREE.Vector3());
    const center = gpuBox.getCenter(new THREE.Vector3());

    if (size.y <= 0) return;

    // Waist-to-head framing with camera safety margin (Head -> Shoulders -> Chest -> Waist)
    // Shift camera target to size.y * 0.80 to position Nora ~4% lower in canvas for top headroom
    const feetY = gpuBox.min.y;
    const targetY = feetY + size.y * 0.80;
    const targetVec = new THREE.Vector3(center.x, targetY, center.z);

    // Zoomed upper body height (~44% of total height, zoom preserved, 6% top safety gap)
    const fovRad = (camera.fov * Math.PI) / 180;
    const framedHeight = size.y * 0.44;
    const calcDistance = ((framedHeight / 2) / Math.tan(fovRad / 2)) * 1.02;

    camera.position.set(center.x, targetY, center.z + calcDistance);
    camera.lookAt(targetVec);
    camera.updateProjectionMatrix();

    framedRef.current = true;
  });

  return null;
}

// Feature Flags for Granular Subsystem Isolation
const FEATURE_FLAGS = {
  ENABLE_RENDERER: true,
  ENABLE_ANIMATION: true,
  ENABLE_HEAD_TRACKING: true,
  ENABLE_FACIAL_ENGINE: true,
  ENABLE_LIPSYNC: true,
  ENABLE_BLINK: true,
  ENABLE_EMOTION: true,
  ENABLE_EYE_TRACKING: true,
  ENABLE_NECK: true,
  ENABLE_JAW: true,
  ENABLE_MICRO: true,
};

/**
 * 3D Nora FBX Character Model & Animation Component
 */
const NoraFBXModel = React.memo(function NoraFBXModel({ groupRef, onEngineReady }) {
  const fbxModel = useFBX(noraFbx);

  const idleFbx = useFBX(idleFbxUrl);
  const talkingFbx = useFBX(talkingFbxUrl);
  const thinkFbx = useFBX(thinkFbxUrl);
  const waveFbx = useFBX(waveFbxUrl);
  const pointFbx = useFBX(pointFbxUrl);
  const walkFbx = useFBX(walkFbxUrl);

  const { aiState, cursorOffset, mouthOpen } = useNoraPresence();

  const mixerRef = useRef(null);
  const actionsMapRef = useRef({});
  const activeActionRef = useRef(null);
  const handlesRef = useRef({ headBone: null, neckBone: null, blendshapeMesh: null, jawBone: null });
  const facialEngineRef = useRef(null);
  const idleTimerRef = useRef(0);
  const [isMixerReady, setIsMixerReady] = useState(false);

  const allClips = useMemo(() => {
    const clips = [...(fbxModel.animations || [])];

    const addClipFromFbx = (fbxObj, fallbackName) => {
      if (fbxObj && fbxObj.animations && fbxObj.animations.length > 0) {
        const clip = fbxObj.animations[0].clone();
        clip.name = fallbackName;
        clips.push(clip);
      }
    };

    addClipFromFbx(idleFbx, "Idle");
    addClipFromFbx(talkingFbx, "Talking");
    addClipFromFbx(thinkFbx, "Think");
    addClipFromFbx(waveFbx, "Wave");
    addClipFromFbx(pointFbx, "Point");
    addClipFromFbx(walkFbx, "Walk");

    return clips;
  }, [fbxModel, idleFbx, talkingFbx, thinkFbx, waveFbx, pointFbx, walkFbx]);

  const scene = useMemo(() => {
    const cloned = SkeletonUtils.clone(fbxModel);
    const idleClip = findAnimationClip(allClips, ["idle"]) || allClips[0];
    return normalizeFBXModel(cloned, idleClip, handlesRef.current);
  }, [fbxModel, allClips]);

  useEffect(() => {
    if (!scene || allClips.length === 0) return;

    const mixer = new THREE.AnimationMixer(scene);
    mixerRef.current = mixer;
    actionsMapRef.current = {};

    allClips.forEach((clip) => {
      const action = mixer.clipAction(clip);
      actionsMapRef.current[clip.name] = action;
    });

    // Authoritative Mesh Discovery directly from the rendered scene object
    let blendshapeMesh = null;
    let jawBone = null;
    let headBone = null;
    let neckBone = null;

    scene.traverse((child) => {
      if (child.isSkinnedMesh && child.morphTargetDictionary && child.morphTargetInfluences) {
        blendshapeMesh = child;
      }
      if (child.isBone) {
        const nameLower = child.name.toLowerCase();
        if (nameLower.includes("head") && !headBone) headBone = child;
        if (nameLower.includes("neck") && !neckBone) neckBone = child;
        if ((nameLower.includes("jawroot") || nameLower.includes("jaw")) && !jawBone) jawBone = child;
      }
    });

    handlesRef.current = { headBone, neckBone, blendshapeMesh, jawBone };

    console.log("=================================================");
    console.log("✔ [PHASE 1 - FBX ANIMATION AUDIT]");
    allClips.forEach((clip, idx) => {
      console.log(`  Clip [${idx}]: Name="${clip.name}" | Duration=${clip.duration.toFixed(2)}s | UUID=${clip.uuid}`);
    });

    console.log("✔ [PHASE 2 - ANIMATION ACTION AUDIT]");
    Object.entries(actionsMapRef.current).forEach(([name, action]) => {
      console.log(`  Action "${name}": Exists=${Boolean(action)} | Weight=${action.getEffectiveWeight()} | Loop=${action.loop}`);
    });
    console.log("=================================================");

    if (blendshapeMesh) {
      const engine = new NoraFacialEngine();
      engine.initialize(blendshapeMesh, jawBone);
      facialEngineRef.current = engine;
      if (onEngineReady) {
        onEngineReady(engine);
      }
    }

    setIsMixerReady(true);

    return () => {
      setIsMixerReady(false);
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
    };
  }, [scene, allClips, onEngineReady]);

  const resolvedAnimNames = useMemo(() => {
    const idleClip = findAnimationClip(allClips, ["idle"]);
    const talkingClip = findAnimationClip(allClips, ["talking", "talk", "speak", "speaking"]);
    const thinkClip = findAnimationClip(allClips, ["think", "thinking"]);
    const waveClip = findAnimationClip(allClips, ["wave", "greeting", "point"]);

    return {
      idle: idleClip ? idleClip.name : allClips[0]?.name,
      talking: talkingClip ? talkingClip.name : idleClip ? idleClip.name : allClips[0]?.name,
      think: thinkClip ? thinkClip.name : talkingClip ? talkingClip.name : allClips[0]?.name,
      wave: waveClip ? waveClip.name : idleClip ? idleClip.name : allClips[0]?.name,
    };
  }, [allClips]);

  // Track whether the one-time greeting wave has been played this session
  const greetingPlayedRef = useRef(false);

  useEffect(() => {
    if (!isMixerReady || !actionsMapRef.current || Object.keys(actionsMapRef.current).length === 0) return;
    if (!mixerRef.current) return;

    // ── GREETING STATE: Wave (1 time) → Talking (during remaining speech) → Idle ──
    if (aiState === "GREETING") {
      if (!greetingPlayedRef.current) {
        greetingPlayedRef.current = true;

        const waveAction = actionsMapRef.current[resolvedAnimNames.wave];
        const talkingAction = actionsMapRef.current[resolvedAnimNames.talking];
        const idleAction = actionsMapRef.current[resolvedAnimNames.idle];

        console.log("=================================================");
        console.log("✔ [PHASE 5 - LOG]: Greeting Triggered -> Wave Started");
        console.log(`  Wave Action: Exists=${Boolean(waveAction)} | Enabled=${waveAction.enabled} | Weight=${waveAction.getEffectiveWeight()} | LoopMode=${waveAction.loop} | TimeScale=${waveAction.getEffectiveTimeScale()} | IsRunning=${waveAction.isRunning()}`);
        console.log("=================================================");

        // Configure Wave animation to play continuously for 3 repetitions (~6.6s)
        waveAction.setLoop(THREE.LoopRepeat, 3);
        waveAction.clampWhenFinished = true;

        // Cross-fade from current animation to Wave
        if (activeActionRef.current && activeActionRef.current !== waveAction) {
          activeActionRef.current.fadeOut(0.4);
        }
        waveAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.4).play();
        activeActionRef.current = waveAction;
        idleTimerRef.current = 0;

        // Apply gentle smile on facial engine & enable lip sync
        if (facialEngineRef.current) {
          facialEngineRef.current.setEmotion(aiStateToEmotion("GREETING"));
          facialEngineRef.current.setSpeaking(true);
        }

        // When Wave finishes, transition to Talking animation if speech is active, or Idle
        const onWaveFinished = (e) => {
          if (e.action === waveAction) {
            mixerRef.current?.removeEventListener("finished", onWaveFinished);
            console.log("✔ [PHASE 5 - LOG]: Wave Finished Event Fired");

            if (talkingAction) {
              console.log("✔ [PHASE 5 - LOG]: Talking Animation Started");
              waveAction.fadeOut(0.4);
              talkingAction.setLoop(THREE.LoopRepeat);
              talkingAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.4).play();
              activeActionRef.current = talkingAction;
            } else if (idleAction) {
              console.log("✔ [PHASE 5 - LOG]: Idle Animation Started");
              waveAction.fadeOut(0.4);
              idleAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.4).play();
              activeActionRef.current = idleAction;
            }
          }
        };

        mixerRef.current.addEventListener("finished", onWaveFinished);

        return () => {
          mixerRef.current?.removeEventListener("finished", onWaveFinished);
        };
      }
      return;
    }

    // Reset greetingPlayedRef when transitioning away from GREETING
    greetingPlayedRef.current = false;

    // ── NORMAL ANIMATION SELECTION (non-greeting states) ──
    let targetName = resolvedAnimNames.idle;
    if (aiState === "SPEAKING") {
      targetName = resolvedAnimNames.talking;
    } else if (aiState === "THINKING" || aiState === "UNDERSTANDING" || aiState === "GENERATING") {
      targetName = resolvedAnimNames.think;
    } else if (aiState === "SUCCESS") {
      targetName = resolvedAnimNames.wave;
    } else {
      targetName = resolvedAnimNames.idle;
    }

    const targetAction = actionsMapRef.current[targetName] || actionsMapRef.current[resolvedAnimNames.idle];
    if (!targetAction) return;

    if (activeActionRef.current !== targetAction) {
      if (activeActionRef.current) activeActionRef.current.fadeOut(0.4);

      // Reset loop mode back to default for non-greeting animations
      targetAction.setLoop(THREE.LoopRepeat);
      targetAction.clampWhenFinished = false;

      targetAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.4).play();
      activeActionRef.current = targetAction;
      idleTimerRef.current = 0; // Reset idle timer on animation transition
    }

    if (facialEngineRef.current) {
      facialEngineRef.current.setEmotion(aiStateToEmotion(aiState));
      facialEngineRef.current.setSpeaking(aiState === "SPEAKING");
    }
  }, [aiState, resolvedAnimNames, isMixerReady]);

  useFrame((state, delta) => {
    // Track idle elapsed time for animation stabilization
    idleTimerRef.current += delta;

    if (FEATURE_FLAGS.ENABLE_ANIMATION && mixerRef.current) {
      try {
        // After 10 seconds of idle, dampen the animation mixer to near-still
        const idleElapsed = idleTimerRef.current;
        if (idleElapsed > 10 && activeActionRef.current) {
          const currentWeight = activeActionRef.current.getEffectiveWeight();
          const targetWeight = 0.08; // Nearly still, just enough for subtle breathing
          if (currentWeight > targetWeight + 0.005) {
            activeActionRef.current.setEffectiveWeight(
              THREE.MathUtils.lerp(currentWeight, targetWeight, delta * 0.5)
            );
          }
        }
        mixerRef.current.update(delta);
      } catch (err) {
        console.error("AnimationMixer update error:", err);
      }
    }

    // Ensure FacialEngine is bound to the active rendered SkinnedMesh
    if (scene && facialEngineRef.current) {
      const renderedMesh = handlesRef.current?.blendshapeMesh;
      if (renderedMesh && facialEngineRef.current._mesh !== renderedMesh) {
        facialEngineRef.current.initialize(renderedMesh, handlesRef.current?.jawBone);
      }
    }

    if (FEATURE_FLAGS.ENABLE_HEAD_TRACKING && handlesRef.current) {
      try {
        // Subtle head tracking — reduced intensity for calm professional look
        const targetHeadY = (cursorOffset?.x ?? 0) * 0.10;
        const targetHeadX = (cursorOffset?.y ?? 0) * 0.06;

        const headBone = handlesRef.current.headBone ?? null;
        const neckBone = handlesRef.current.neckBone ?? null;

        if (headBone && headBone.rotation) {
          headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, targetHeadY, delta * 3);
          headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, targetHeadX, delta * 3);
        } else if (neckBone && neckBone.rotation) {
          neckBone.rotation.y = THREE.MathUtils.lerp(neckBone.rotation.y, targetHeadY * 0.5, delta * 3);
        } else if (groupRef.current && groupRef.current.rotation) {
          groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetHeadY * 0.08, delta * 2);
        }
      } catch (err) {
        console.error("Head tracking error:", err);
      }
    }

    if (FEATURE_FLAGS.ENABLE_FACIAL_ENGINE && facialEngineRef.current) {
      try {
        facialEngineRef.current.setEyeTarget(cursorOffset?.x ?? 0, cursorOffset?.y ?? 0);
        facialEngineRef.current.setSpeaking(aiState === "SPEAKING" || aiState === "GREETING" || Boolean(mouthOpen));
        facialEngineRef.current.update(delta, FEATURE_FLAGS);
      } catch (err) {
        console.error("FacialEngine update error:", err);
      }
    }
  });

  useEffect(() => {
    return () => {
      if (scene) {
        scene.traverse((child) => {
          if (child.isMesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((m) => m.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [scene]);

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
});

/**
 * Studio Lighting Pipeline for FBX Model (Day / Night Modes)
 */
const NoraLighting = React.memo(function NoraLighting({ isNightMode = false }) {
  return (
    <>
      <ambientLight intensity={isNightMode ? 0.45 : 0.85} />
      <hemisphereLight
        skyColor={isNightMode ? "#1e1b4b" : "#e0f2fe"}
        groundColor={isNightMode ? "#020617" : "#0f172a"}
        intensity={isNightMode ? 0.45 : 0.65}
      />
      <directionalLight
        position={[2, 3.5, 2.5]}
        intensity={isNightMode ? 1.1 : 1.3}
        color={isNightMode ? "#f0f9ff" : "#ffffff"}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-2.5, 3, -2]}
        intensity={isNightMode ? 2.2 : 1.6}
        color={isNightMode ? "#06b6d4" : "#38bdf8"}
      />
      <pointLight
        position={[0, 0.8, 1.5]}
        intensity={isNightMode ? 0.8 : 0.5}
        color={isNightMode ? "#38bdf8" : "#ffffff"}
      />
    </>
  );
});

/**
 * Main 3D Nora Canvas Container Component
 */
export default React.memo(function Nora3DCanvas({ isNightMode = false }) {
  const modelGroupRef = useRef();

  const handleEngineReady = useCallback(() => { }, []);

  return (
    <div className="relative w-full h-full select-none overflow-hidden flex items-center justify-center">
      <Nora3DBoundary>
        <Suspense fallback={<Nora3DLoader />}>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 1.0, 3.5], fov: 42 }}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.0,
            }}
            className="w-full h-full pointer-events-none"
            style={{ background: "transparent" }}
          >
            <NoraLighting isNightMode={isNightMode} />
            <NoraFBXModel groupRef={modelGroupRef} onEngineReady={handleEngineReady} />
            <AutoCameraFraming modelGroupRef={modelGroupRef} />
            <Preload all />
          </Canvas>
        </Suspense>
      </Nora3DBoundary>
    </div>
  );
});
