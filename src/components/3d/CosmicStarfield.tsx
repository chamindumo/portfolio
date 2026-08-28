import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CosmicStarfieldProps {
  isDark?: boolean;
}

export const CosmicStarfield: React.FC<CosmicStarfieldProps> = ({ isDark = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene, Camera & Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark ? 0x121214 : 0xf8fafc, isDark ? 0.025 : 0.018);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 80);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Deep Cosmic Starfield (inspired by dungyov.com uS component)
    const starCount = 2400;
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const originalZ = new Float32Array(starCount);
    const speeds = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = z;
      originalZ[i] = z;
      speeds[i] = 0.02 + Math.random() * 0.05;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starMaterial = new THREE.PointsMaterial({
      color: isDark ? 0x7dd3fc : 0x0284c7,
      size: isDark ? 0.07 : 0.09,
      transparent: true,
      opacity: isDark ? 0.65 : 0.65,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    // Scroll & Mouse Tracking
    let targetScrollY = 0;
    let currentScrollY = 0;
    let scrollVelocity = 0;
    let lastScrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      const delta = Math.abs(targetScrollY - lastScrollY);
      scrollVelocity = Math.min(delta * 0.06, 3.5);
      lastScrollY = targetScrollY;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      currentScrollY += (targetScrollY - currentScrollY) * 0.06;
      scrollVelocity *= 0.94;

      // Parallax camera rotation
      camera.position.x = mouseX * 1.5;
      camera.position.y = -mouseY * 1.2;
      camera.lookAt(0, 0, 0);

      // Star drift & warp on scroll
      const posArray = starGeo.attributes.position.array as Float32Array;
      const velocityBoost = 1 + scrollVelocity * 4.5;

      for (let i = 0; i < starCount; i++) {
        const idx = i * 3;
        posArray[idx + 2] += speeds[i] * velocityBoost;

        // Wrap around when passing camera
        if (posArray[idx + 2] > 15) {
          posArray[idx + 2] = -45;
        }
      }

      starGeo.attributes.position.needsUpdate = true;
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
      starGeo.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
};
