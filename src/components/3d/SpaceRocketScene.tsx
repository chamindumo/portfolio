import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SpaceRocketSceneProps {
  isDark?: boolean;
}

export const SpaceRocketScene: React.FC<SpaceRocketSceneProps> = ({ isDark = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [telemetry, setTelemetry] = useState({
    thrust: 45,
    altitude: 120,
    velocity: 2.4,
    status: 'ORBITAL GLIDE',
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 6.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.4);
    scene.add(ambientLight);

    const primaryLight = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x0284c7, 3.5);
    primaryLight.position.set(5, 8, 5);
    scene.add(primaryLight);

    const rimLight = new THREE.PointLight(isDark ? 0xa855f7 : 0xec4899, 3, 15);
    rimLight.position.set(-5, -4, -3);
    scene.add(rimLight);

    const thrusterGlowLight = new THREE.PointLight(0x00d8ff, 4, 8);
    thrusterGlowLight.position.set(0, -2.2, 0);
    scene.add(thrusterGlowLight);

    // 3. Rocket Craft Assembly Group
    const rocketGroup = new THREE.Group();
    scene.add(rocketGroup);

    // Materials
    const hullColor = isDark ? 0x1f242d : 0xe2e8f0;
    const accentColor = isDark ? 0x38bdf8 : 0x0284c7;
    const darkMetal = isDark ? 0x0f172a : 0x334155;

    const hullMaterial = new THREE.MeshStandardMaterial({
      color: hullColor,
      metalness: 0.85,
      roughness: 0.2,
      envMapIntensity: 1.5,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: accentColor,
      metalness: 0.9,
      roughness: 0.15,
      emissive: accentColor,
      emissiveIntensity: 0.25,
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: darkMetal,
      metalness: 0.9,
      roughness: 0.35,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
    });

    // Wireframe Blueprint Material overlay
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.14 : 0.18,
    });

    // A. Main Fuselage Body
    const bodyGeo = new THREE.CylinderGeometry(0.52, 0.65, 2.6, 32);
    const bodyMesh = new THREE.Mesh(bodyGeo, hullMaterial);
    bodyMesh.position.y = 0.2;
    rocketGroup.add(bodyMesh);

    const bodyWireframe = new THREE.Mesh(bodyGeo.clone(), wireframeMat);
    bodyWireframe.position.y = 0.2;
    bodyWireframe.scale.setScalar(1.002);
    rocketGroup.add(bodyWireframe);

    // B. Staging / Decal Accent Rings
    const ringGeo = new THREE.TorusGeometry(0.55, 0.035, 16, 32);
    const ring1 = new THREE.Mesh(ringGeo, accentMaterial);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = 1.0;
    rocketGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, accentMaterial);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = -0.4;
    rocketGroup.add(ring2);

    // C. Nose Cone (Aerodynamic Top)
    const noseGeo = new THREE.ConeGeometry(0.52, 1.3, 32);
    const noseMesh = new THREE.Mesh(noseGeo, hullMaterial);
    noseMesh.position.y = 2.15;
    rocketGroup.add(noseMesh);

    const noseWireframe = new THREE.Mesh(noseGeo.clone(), wireframeMat);
    noseWireframe.position.y = 2.15;
    noseWireframe.scale.setScalar(1.002);
    rocketGroup.add(noseWireframe);

    // Nose Tip needle
    const needleGeo = new THREE.CylinderGeometry(0.02, 0.06, 0.6, 16);
    const needle = new THREE.Mesh(needleGeo, accentMaterial);
    needle.position.y = 2.95;
    rocketGroup.add(needle);

    // D. Cockpit Visor / Canopy
    const visorGeo = new THREE.SphereGeometry(0.24, 16, 16, 0, Math.PI);
    const visor = new THREE.Mesh(visorGeo, glassMaterial);
    visor.rotation.x = -Math.PI / 2;
    visor.position.set(0, 1.4, 0.46);
    rocketGroup.add(visor);

    // E. Engine Bell Nozzle
    const engineGeo = new THREE.CylinderGeometry(0.42, 0.6, 0.6, 32, 1, true);
    const engineMesh = new THREE.Mesh(engineGeo, darkMetalMaterial);
    engineMesh.position.y = -1.35;
    rocketGroup.add(engineMesh);

    // Inner engine glow ring
    const engineInnerGeo = new THREE.RingGeometry(0.1, 0.38, 32);
    const engineInnerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
    });
    const engineInner = new THREE.Mesh(engineInnerGeo, engineInnerMat);
    engineInner.rotation.x = Math.PI / 2;
    engineInner.position.y = -1.25;
    rocketGroup.add(engineInner);

    // F. Stabilizer Wings / Aerodynamic Delta Fins (4 fins at 90 deg)
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(0.75, -0.6);
    finShape.lineTo(0.75, -1.1);
    finShape.lineTo(0, -0.9);
    finShape.closePath();

    const extrudeSettings = { depth: 0.05, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
    const finGeo = new THREE.ExtrudeGeometry(finShape, extrudeSettings);

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const fin = new THREE.Mesh(finGeo, accentMaterial);
      fin.position.y = -0.35;
      fin.rotation.y = angle;
      fin.position.x = Math.cos(angle) * 0.48;
      fin.position.z = -Math.sin(angle) * 0.48;
      rocketGroup.add(fin);
    }

    // G. Marvelous Thruster Plasma Flame
    const flameGeo = new THREE.ConeGeometry(0.38, 2.2, 32, 1, true);
    // Invert cone so tip points down
    flameGeo.rotateX(Math.PI);
    flameGeo.translate(0, -1.1, 0);

    const flameMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = -1.55;
    rocketGroup.add(flame);

    // Inner bright plasma core
    const coreFlameGeo = new THREE.ConeGeometry(0.18, 1.4, 16, 1, true);
    coreFlameGeo.rotateX(Math.PI);
    coreFlameGeo.translate(0, -0.7, 0);

    const coreFlameMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const coreFlame = new THREE.Mesh(coreFlameGeo, coreFlameMat);
    coreFlame.position.y = -1.55;
    rocketGroup.add(coreFlame);

    // H. Particle Exhaust Trail System (Sparks & Embers)
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number; life: number; maxLife: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 0.2;
      particlePositions[i * 3 + 1] = -1.6 - Math.random() * 2.0;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: -0.06 - Math.random() * 0.08,
        z: (Math.random() - 0.5) * 0.04,
        life: Math.random() * 60,
        maxLife: 60 + Math.random() * 30,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.065,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const exhaustParticles = new THREE.Points(particleGeo, particleMat);
    rocketGroup.add(exhaustParticles);

    // I. Cosmic Starfield / Space Dust (Streaking on scroll)
    const starCount = 180;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 14;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMat = new THREE.PointsMaterial({
      color: isDark ? 0xffffff : 0x0284c7,
      size: 0.04,
      transparent: true,
      opacity: isDark ? 0.6 : 0.45,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // J. CAD Orbit Target Ring
    const orbitRingGeo = new THREE.RingGeometry(2.3, 2.315, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 3;
    scene.add(orbitRing);

    // 4. Mouse & Scroll Interaction Physics
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let targetScrollY = 0;
    let currentScrollY = 0;
    let scrollVelocity = 0;
    let lastScrollPos = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 2.2;
      targetY = -y * 1.8;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      const delta = Math.abs(targetScrollY - lastScrollPos);
      scrollVelocity = Math.min(delta * 0.08, 4.0);
      lastScrollPos = targetScrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW === 0 || newH === 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 5. Render & Marvelous Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse aim damping
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      // Scroll interpolation and velocity decay
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      scrollVelocity *= 0.93; // Exponential deceleration

      // Dynamic Rocket Flight Pose:
      // Banking, pitching, and slight aerodynamic yaw
      const baseHoverY = Math.sin(elapsedTime * 1.8) * 0.12;
      const baseHoverRoll = Math.cos(elapsedTime * 1.4) * 0.04;

      // Scroll-induced thrust flight angle:
      // When scrolling down, rocket pitches upward with thruster burst!
      const scrollPitch = Math.min(scrollVelocity * 0.35, 0.8);
      const scrollDriftX = Math.sin(currentScrollY * 0.002) * 0.4;
      const scrollDriftY = -Math.min(currentScrollY * 0.0015, 1.2);

      rocketGroup.position.x = scrollDriftX + mouseX * 0.3;
      rocketGroup.position.y = baseHoverY + scrollDriftY + mouseY * 0.3;
      rocketGroup.position.z = Math.min(scrollVelocity * 0.4, 1.2); // Leaps forward when scrolling!

      // Banking rotation: aiming with mouse + roll on banking
      rocketGroup.rotation.z = -mouseX * 0.4 + baseHoverRoll + (scrollDriftX * -0.2);
      rocketGroup.rotation.x = -mouseY * 0.4 + scrollPitch * 0.6;
      rocketGroup.rotation.y = elapsedTime * 0.35 + (mouseX * 0.5);

      // Marvelous Thruster Dynamics:
      // Flame expands dramatically with scroll velocity!
      const thrustLevel = 1.0 + Math.sin(elapsedTime * 25) * 0.15 + (scrollVelocity * 2.2);
      flame.scale.set(1.0 + scrollVelocity * 0.4, thrustLevel, 1.0 + scrollVelocity * 0.4);
      coreFlame.scale.set(1.0 + scrollVelocity * 0.3, thrustLevel * 1.1, 1.0 + scrollVelocity * 0.3);

      // Color shift on extreme thrust: cyan to deep plasma blue/white
      flameMat.color.setHSL(0.52 - Math.min(scrollVelocity * 0.06, 0.12), 1, 0.55);
      thrusterGlowLight.intensity = 3 + scrollVelocity * 6;

      // Update Exhaust Particle Sparks
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const vel = particleVelocities[i];
        vel.life += 1 + scrollVelocity * 2;

        if (vel.life >= vel.maxLife) {
          // Respawn at rocket engine nozzle
          vel.life = 0;
          positions[i * 3] = (Math.random() - 0.5) * 0.25;
          positions[i * 3 + 1] = -1.55;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.25;

          vel.y = -0.08 - Math.random() * 0.12 - (scrollVelocity * 0.15);
        } else {
          positions[i * 3] += vel.x;
          positions[i * 3 + 1] += vel.y;
          positions[i * 3 + 2] += vel.z;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Starfield cosmic streak effect on scroll
      const starPos = starGeo.attributes.position.array as Float32Array;
      const starSpeed = 0.02 + scrollVelocity * 0.22;
      for (let i = 0; i < starCount; i++) {
        starPos[i * 3 + 1] -= starSpeed;
        if (starPos[i * 3 + 1] < -7) {
          starPos[i * 3 + 1] = 7;
        }
      }
      starGeo.attributes.position.needsUpdate = true;

      // Orbit Target CAD Ring rotation
      orbitRing.rotation.z = -elapsedTime * 0.2;
      orbitRing.rotation.y = elapsedTime * 0.1;

      // Update live telemetry stats every 8 frames
      if (Math.round(elapsedTime * 60) % 8 === 0) {
        const calculatedThrust = Math.min(100, Math.round(45 + scrollVelocity * 38));
        const calculatedAlt = Math.round(120 + currentScrollY * 0.8);
        const calculatedVel = (2.4 + scrollVelocity * 2.1).toFixed(1);
        setTelemetry({
          thrust: calculatedThrust,
          altitude: calculatedAlt,
          velocity: parseFloat(calculatedVel),
          status: scrollVelocity > 0.5 ? 'HYPERDRIVE ENGAGED' : 'ORBITAL GLIDE',
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bodyGeo.dispose();
      noseGeo.dispose();
      engineGeo.dispose();
      finGeo.dispose();
      flameGeo.dispose();
      coreFlameGeo.dispose();
      particleGeo.dispose();
      starGeo.dispose();
      orbitRingGeo.dispose();
    };
  }, [isDark]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-auto select-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full max-w-[440px] max-h-[440px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing"
      />

      {/* CAD Rocket Flight Telemetry HUD Overlay (vanlent.dev style) */}
      <div className="absolute inset-x-2 bottom-0 flex items-center justify-between pointer-events-none font-mono text-[10px] text-[var(--text-tertiary)] pb-1 px-2 border-b border-[var(--border-secondary)] bg-[var(--background-primary)]/70 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-ping" />
          <span className="text-[var(--accent-primary)] font-bold">{telemetry.status}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>ALT: <strong className="text-[var(--text-primary)]">{telemetry.altitude} KM</strong></span>
          <span>THRUST: <strong className="text-[var(--accent-primary)]">{telemetry.thrust}%</strong></span>
          <span className="hidden sm:inline">VEL: <strong className="text-[var(--text-primary)]">M{telemetry.velocity}</strong></span>
        </div>
      </div>
    </div>
  );
};
