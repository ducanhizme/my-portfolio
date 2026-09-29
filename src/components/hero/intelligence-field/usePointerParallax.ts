import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { MOTION_SETTINGS } from './constants';

export function usePointerParallax() {
  const targetPointer = useRef(new THREE.Vector2(0, 0));
  const smoothPointer = useRef(new THREE.Vector2(0, 0));
  const worldPointer = useRef(new THREE.Vector3(0, 0, 0));
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const raycaster = useRef(new THREE.Raycaster());

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Normalized device coordinates (-1 to +1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetPointer.current.set(nx, ny);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const update = (camera: THREE.Camera, delta: number) => {
    // Smooth cinematic damping
    const factor = Math.min(delta * 3.5, 1);
    smoothPointer.current.lerp(targetPointer.current, factor);

    // Calculate rotation limits (X: ±2°, Y: ±3°)
    const rotX = smoothPointer.current.y * MOTION_SETTINGS.parallaxMaxRotX;
    const rotY = smoothPointer.current.x * MOTION_SETTINGS.parallaxMaxRotY;

    // Unproject to 3D world space
    raycaster.current.setFromCamera(smoothPointer.current, camera);
    const intersect = new THREE.Vector3();
    raycaster.current.ray.intersectPlane(plane.current, intersect);
    if (intersect) {
      worldPointer.current.copy(intersect);
    }

    return { rotX, rotY, worldPos: worldPointer.current };
  };

  return {
    smoothPointer,
    worldPointer,
    update,
  };
}
