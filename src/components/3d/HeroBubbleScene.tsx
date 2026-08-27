import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroBubbleSceneProps {
  isDark?: boolean;
}

export const HeroBubbleScene: React.FC<HeroBubbleSceneProps> = ({ isDark = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry: high subdivision icosahedron
    const geometry = new THREE.IcosahedronGeometry(1.5, 32);
    const originalPositions = new Float32Array(geometry.attributes.position.array);

    // Dynamic Material: Physical iridescent glass
    const material = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x223344 : 0xecf6ff,
      emissive: isDark ? 0x051525 : 0xf0f7ff,
      roughness: 0.12,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.45,
      thickness: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      wireframe: false,
    });

    // Wireframe overlay for technical blueprint CAD aesthetic
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.18 : 0.22,
    });

    const mesh = new THREE.Mesh(geometry, material);
    const wireframeMesh = new THREE.Mesh(geometry.clone(), wireframeMaterial);
    wireframeMesh.scale.setScalar(1.002);
    mesh.add(wireframeMesh);
    scene.add(mesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.8 : 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(isDark ? 0x38bdf8 : 0x0284c7, 3, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(isDark ? 0xec4899 : 0x8b5cf6, 2.5, 10);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    // Outer halo ring (CAD visual target)
    const ringGeo = new THREE.RingGeometry(1.9, 1.91, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ringMesh);

    // Interactive Mouse & Scroll tracking
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
      targetX = x * 1.5;
      targetY = -y * 1.5;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      const delta = Math.abs(targetScrollY - lastScrollPos);
      scrollVelocity = Math.min(delta * 0.04, 3.0);
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

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Smooth scroll interpolation
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      scrollVelocity *= 0.94; // Decay velocity

      // Scroll-linked rotation and parallax drift
      const scrollRotationBoost = currentScrollY * 0.003;
      mesh.rotation.y = elapsedTime * 0.25 + mouseX + scrollRotationBoost;
      mesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2 + mouseY + scrollVelocity * 0.2;
      mesh.rotation.z = Math.cos(elapsedTime * 0.15) * 0.15 + (currentScrollY * 0.001);

      // Subtle scale breathing & scroll compression
      const scaleEffect = Math.max(0.7, 1 - (currentScrollY * 0.0004));
      mesh.scale.setScalar(scaleEffect);

      ringMesh.rotation.z = -elapsedTime * 0.1 - scrollRotationBoost * 0.5;
      ringMesh.scale.setScalar(scaleEffect);

      // Liquid vertex perturbation enhanced during scroll movement
      const positions = geometry.attributes.position;
      const posArray = positions.array as Float32Array;
      const waveExcitement = 1.0 + scrollVelocity * 1.5;

      for (let i = 0; i < posArray.length; i += 3) {
        const u = originalPositions[i];
        const v = originalPositions[i + 1];
        const w = originalPositions[i + 2];

        const wave = 
          (Math.sin(u * 2.5 + elapsedTime * 1.8) * 0.06 +
           Math.cos(v * 2.8 + elapsedTime * 1.5) * 0.06 +
           Math.sin(w * 3.1 + elapsedTime * 2.0) * 0.04) * waveExcitement;

        posArray[i] = u * (1 + wave);
        posArray[i + 1] = v * (1 + wave);
        posArray[i + 2] = w * (1 + wave);
      }

      positions.needsUpdate = true;
      geometry.computeVertexNormals();

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      wireframeMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
      <div 
        ref={mountRef} 
        className="w-full h-full max-w-[420px] max-h-[420px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};
