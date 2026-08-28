import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface RealSpaceRocketProps {
  isDark?: boolean;
}

export const RealSpaceRocket: React.FC<RealSpaceRocketProps> = ({ isDark = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [telemetry, setTelemetry] = useState({
    mach: '1.2',
    thrust: '40%',
    altitude: '180 KM',
    status: 'ORBITAL INSERTION',
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 460;

    // 1. Scene, Camera, Fog & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Studio Space Lighting
    const ambientLight = new THREE.AmbientLight(isDark ? 0x242832 : 0xe2e8f0, isDark ? 1.4 : 1.6);
    scene.add(ambientLight);

    // Main Sunlight (Crisp directional light with soft shadows)
    const sunLight = new THREE.DirectionalLight(0xffffff, isDark ? 3.2 : 2.8);
    sunLight.position.set(6, 10, 8);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Cyan / Cobalt Rim Light (Accents the aerospace silhouette)
    const cyanRim = new THREE.DirectionalLight(isDark ? 0x00d8ff : 0x0284c7, isDark ? 2.4 : 2.2);
    cyanRim.position.set(-8, 2, -4);
    scene.add(cyanRim);

    // Engine Exhaust Backlight
    const engineGlow = new THREE.PointLight(isDark ? 0x00e5ff : 0x0284c7, isDark ? 3.5 : 2.5, 10);
    engineGlow.position.set(0, -2.6, 0);
    scene.add(engineGlow);

    // 3. Procedural Aerospace Textures
    // Generate high-resolution rocket decal & panel texture
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 1024;
    textureCanvas.height = 1024;
    const ctx = textureCanvas.getContext('2d');
    if (ctx) {
      // Base aerospace enamel (light gray-white with high definition)
      ctx.fillStyle = isDark ? '#f8fafc' : '#f1f5f9';
      ctx.fillRect(0, 0, 1024, 1024);

      // Technical panel seams & weld lines (high contrast in light mode)
      ctx.strokeStyle = isDark ? '#cbd5e1' : '#94a3b8';
      ctx.lineWidth = isDark ? 2 : 3;
      for (let y = 100; y < 1024; y += 140) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
      }

      // Vertical panel lines
      for (let x = 128; x < 1024; x += 256) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }

      // Black Interstage Band with vents
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 320, 1024, 110);

      // Vent grates on interstage
      ctx.fillStyle = '#334155';
      for (let x = 30; x < 1024; x += 40) {
        ctx.fillRect(x, 345, 18, 60);
      }

      // Decals: Bold "CHAMINDU" lettering on booster hull
      const renderLogo = (x: number, y: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = '#0f172a';
        ctx.font = '900 52px "Montserrat", sans-serif';
        ctx.letterSpacing = '12px';
        ctx.textAlign = 'center';
        ctx.fillText('CHAMINDU', 0, 0);

        ctx.fillStyle = '#0284c7';
        ctx.font = 'bold 24px monospace';
        ctx.letterSpacing = '6px';
        ctx.fillText('// 01 SYSTEMS', 0, 36);
        ctx.restore();
      };

      renderLogo(256, 700);
      renderLogo(768, 700);

      // Flag & mission patch
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(492, 220, 40, 24);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(492, 230, 40, 4);
    }
    const rocketTexture = new THREE.CanvasTexture(textureCanvas);
    rocketTexture.wrapS = THREE.RepeatWrapping;
    rocketTexture.wrapT = THREE.ClampToEdgeWrapping;

    // Materials
    const hullMaterial = new THREE.MeshStandardMaterial({
      map: rocketTexture,
      roughness: isDark ? 0.22 : 0.32,
      metalness: isDark ? 0.15 : 0.2,
    });

    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.6,
      metalness: 0.8,
    });

    const titaniumNozzleMaterial = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.3,
      metalness: 0.95,
    });

    const cyanAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x00d8ff,
      emissive: 0x00d8ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });

    // 4. Assemble the Real Rocket Model (Falcon 9 / Starship Proportions)
    const rocket = new THREE.Group();
    scene.add(rocket);

    // A. Booster Stage (Main Tall Cylindrical Hull)
    const boosterGeo = new THREE.CylinderGeometry(0.55, 0.55, 3.4, 48);
    const booster = new THREE.Mesh(boosterGeo, hullMaterial);
    booster.position.y = 0.2;
    booster.castShadow = true;
    booster.receiveShadow = true;
    rocket.add(booster);

    // B. Aerodynamic Fairing / Nose Cone (Smooth Ogive Curve)
    const noseGeo = new THREE.ConeGeometry(0.55, 1.4, 48);
    const nose = new THREE.Mesh(noseGeo, hullMaterial);
    nose.position.y = 2.6;
    nose.castShadow = true;
    rocket.add(nose);

    // Thermal Protection Black Nose Tip
    const tipGeo = new THREE.ConeGeometry(0.12, 0.35, 32);
    const tip = new THREE.Mesh(tipGeo, carbonMaterial);
    tip.position.y = 3.25;
    rocket.add(tip);

    // Pitot probe needle
    const needleGeo = new THREE.CylinderGeometry(0.015, 0.025, 0.5, 16);
    const needle = new THREE.Mesh(needleGeo, titaniumNozzleMaterial);
    needle.position.y = 3.55;
    rocket.add(needle);

    // C. Vertical Cable Raceway / Conduit (External aero spine)
    const racewayGeo = new THREE.BoxGeometry(0.06, 3.2, 0.08);
    const raceway = new THREE.Mesh(racewayGeo, carbonMaterial);
    raceway.position.set(0, 0.2, 0.55);
    rocket.add(raceway);

    // D. 4 Deployable Titanium Grid Fins (Steering Fins at top of booster)
    const finGroup = new THREE.Group();
    const finGeo = new THREE.BoxGeometry(0.28, 0.04, 0.32);
    const finFrameGeo = new THREE.BoxGeometry(0.3, 0.05, 0.06);

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const fin = new THREE.Mesh(finGeo, carbonMaterial);
      fin.position.set(Math.cos(angle) * 0.68, 1.7, Math.sin(angle) * 0.68);
      fin.rotation.y = angle;
      fin.rotation.z = Math.PI / 10;
      finGroup.add(fin);

      // Grid fin mount
      const mount = new THREE.Mesh(finFrameGeo, cyanAccentMaterial);
      mount.position.set(Math.cos(angle) * 0.56, 1.7, Math.sin(angle) * 0.56);
      mount.rotation.y = angle;
      finGroup.add(mount);
    }
    rocket.add(finGroup);

    // E. 4 Deployable Landing Legs (Folded flat against booster base)
    const legsGroup = new THREE.Group();
    const legGeo = new THREE.CylinderGeometry(0.04, 0.07, 1.6, 16);

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const leg = new THREE.Mesh(legGeo, carbonMaterial);
      leg.position.set(Math.cos(angle) * 0.58, -0.85, Math.sin(angle) * 0.58);
      leg.rotation.z = Math.cos(angle) * 0.08;
      leg.rotation.x = -Math.sin(angle) * 0.08;
      legsGroup.add(leg);
    }
    rocket.add(legsGroup);

    // F. Octaweb Engine Cluster (9 Realistic Bell Nozzles: 1 center + 8 outer)
    const enginesGroup = new THREE.Group();
    const nozzleGeo = new THREE.CylinderGeometry(0.09, 0.16, 0.42, 24, 1, true);

    // Central Engine Nozzle
    const centerNozzle = new THREE.Mesh(nozzleGeo, titaniumNozzleMaterial);
    centerNozzle.position.set(0, -1.65, 0);
    enginesGroup.add(centerNozzle);

    // 8 Outer Engine Nozzles
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const nozzle = new THREE.Mesh(nozzleGeo, titaniumNozzleMaterial);
      nozzle.position.set(Math.cos(angle) * 0.32, -1.65, Math.sin(angle) * 0.32);
      enginesGroup.add(nozzle);
    }
    rocket.add(enginesGroup);

    // G. Realistic Roaring Rocket Thruster Plasma Exhaust
    // 1. Supersonic Inner White-Hot Flame Cone
    const coreFlameGeo = new THREE.ConeGeometry(0.28, 2.2, 32, 1, true);
    coreFlameGeo.rotateX(Math.PI);
    coreFlameGeo.translate(0, -1.1, 0);

    const coreFlameMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xffffff : 0x38bdf8,
      transparent: true,
      opacity: 0.95,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const coreFlame = new THREE.Mesh(coreFlameGeo, coreFlameMat);
    coreFlame.position.y = -1.8;
    rocket.add(coreFlame);

    // 2. Outer Electric Cyan / Cobalt Plasma Plume with Shock Diamonds
    const outerFlameGeo = new THREE.ConeGeometry(0.55, 3.2, 32, 1, true);
    outerFlameGeo.rotateX(Math.PI);
    outerFlameGeo.translate(0, -1.6, 0);

    const outerFlameMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00d8ff : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.75 : 0.85,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      side: THREE.DoubleSide,
    });
    const outerFlame = new THREE.Mesh(outerFlameGeo, outerFlameMat);
    outerFlame.position.y = -1.8;
    rocket.add(outerFlame);

    // 3. Shock Diamond Rings inside the supersonic plume
    const diamondsGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const diamondGeo = new THREE.OctahedronGeometry(0.12 - i * 0.02, 0);
      const diamondMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0xffffff : 0x0284c7,
        transparent: true,
        opacity: 0.95,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      const diamond = new THREE.Mesh(diamondGeo, diamondMat);
      diamond.position.y = -2.1 - i * 0.45;
      diamondsGroup.add(diamond);
    }
    rocket.add(diamondsGroup);

    // H. Exhaust Spark & Smoke Particle Trail
    const sparkCount = 90;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkVelocities: { x: number; y: number; z: number; life: number }[] = [];

    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3] = (Math.random() - 0.5) * 0.3;
      sparkPositions[i * 3 + 1] = -2.0 - Math.random() * 2.5;
      sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      sparkVelocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: -0.08 - Math.random() * 0.12,
        z: (Math.random() - 0.5) * 0.05,
        life: Math.random() * 40,
      });
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

    const sparkMat = new THREE.PointsMaterial({
      color: isDark ? 0x00d8ff : 0x0284c7,
      size: 0.08,
      transparent: true,
      opacity: isDark ? 0.85 : 0.9,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    rocket.add(sparks);

    // 5. Interactive Flight & Scroll Physics
    let targetRotX = 0;
    let targetRotY = 0;
    let targetScrollY = 0;
    let currentScrollY = 0;
    let scrollVelocity = 0;
    let lastScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 1.6;
      targetRotX = -y * 0.8;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      const delta = Math.abs(targetScrollY - lastScrollY);
      scrollVelocity = Math.min(delta * 0.08, 4.0);
      lastScrollY = targetScrollY;
    };

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW === 0 || newH === 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Damping
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      scrollVelocity *= 0.94;

      // Rocket Flight Pose:
      // Hovering bob + smooth mouse pitch/yaw + scroll climb
      const hoverY = Math.sin(time * 2.2) * 0.08;
      const hoverRoll = Math.cos(time * 1.8) * 0.03;

      rocket.position.y = hoverY - Math.min(currentScrollY * 0.0012, 1.2);
      rocket.position.x = Math.sin(time * 1.2) * 0.04;
      rocket.position.z = Math.min(scrollVelocity * 0.35, 1.0); // Leaps forward when scrolling!

      // Rocket Banking:
      rocket.rotation.y = Math.sin(time * 0.4) * 0.28 + targetRotY * 0.8;
      rocket.rotation.x = targetRotX * 0.5 + Math.min(scrollVelocity * 0.3, 0.6);
      rocket.rotation.z = -targetRotY * 0.3 + hoverRoll;

      // Dynamic Roaring Thruster Flame:
      // When scrolling, the rocket engines burst into full throttle!
      const throttle = 1.0 + Math.sin(time * 30) * 0.1 + scrollVelocity * 1.8;
      coreFlame.scale.set(1.0 + scrollVelocity * 0.25, throttle, 1.0 + scrollVelocity * 0.25);
      outerFlame.scale.set(1.0 + scrollVelocity * 0.35, throttle * 1.15, 1.0 + scrollVelocity * 0.35);

      // Flickering Engine Lighting
      engineGlow.intensity = 2.5 + scrollVelocity * 4.5 + Math.sin(time * 25) * 0.5;

      // Update Sparks
      const pos = sparkGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < sparkCount; i++) {
        const vel = sparkVelocities[i];
        vel.life += 1 + scrollVelocity * 2;
        if (vel.life > 40) {
          vel.life = 0;
          pos[i * 3] = (Math.random() - 0.5) * 0.25;
          pos[i * 3 + 1] = -1.8;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
          vel.y = -0.09 - Math.random() * 0.12 - scrollVelocity * 0.12;
        } else {
          pos[i * 3] += vel.x;
          pos[i * 3 + 1] += vel.y;
          pos[i * 3 + 2] += vel.z;
        }
      }
      sparkGeo.attributes.position.needsUpdate = true;

      // Update live flight telemetry stats
      if (Math.round(time * 60) % 8 === 0) {
        const mach = (1.2 + scrollVelocity * 2.8).toFixed(1);
        const thrust = `${Math.min(100, Math.round(40 + scrollVelocity * 45))}%`;
        const alt = `${Math.round(180 + currentScrollY * 0.6)} KM`;
        const status = scrollVelocity > 0.6 ? 'STAGE 1 BOOST' : 'ORBITAL GLIDE';
        setTelemetry({ mach, thrust, altitude: alt, status });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      boosterGeo.dispose();
      noseGeo.dispose();
      tipGeo.dispose();
      needleGeo.dispose();
      racewayGeo.dispose();
      finGeo.dispose();
      legGeo.dispose();
      nozzleGeo.dispose();
      coreFlameGeo.dispose();
      outerFlameGeo.dispose();
      sparkGeo.dispose();
      rocketTexture.dispose();
    };
  }, [isDark]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-auto select-none">
      {/* 3D WebGL Canvas for the Real Space Rocket */}
      <div
        ref={mountRef}
        className="w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      />

      {/* CAD Flight Telemetry Overlay */}
      <div className="absolute inset-x-2 bottom-1 flex items-center justify-between pointer-events-none font-mono text-[10px] text-[var(--text-secondary)] px-3 py-1.5 bg-[var(--background-card)] backdrop-blur-md border border-[var(--border-primary)] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          <span className="text-[var(--accent-primary)] font-bold">{telemetry.status}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>ALT: <strong className="text-[var(--text-primary)]">{telemetry.altitude}</strong></span>
          <span>THRUST: <strong className="text-[var(--accent-primary)]">{telemetry.thrust}</strong></span>
          <span>MACH: <strong className="text-[var(--text-primary)]">{telemetry.mach}</strong></span>
        </div>
      </div>
    </div>
  );
};
