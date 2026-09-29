import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function usePointerInteraction() {
  const pointerNorm = useRef(new THREE.Vector2(0, 0));
  const pointerSmoothed = useRef(new THREE.Vector2(0, 0));
  const worldPoint = useRef(new THREE.Vector3(0, 0, 0));
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const raycaster = useRef(new THREE.Raycaster());

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      // Normalized Device Coordinates (-1 to +1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerNorm.current.set(nx, ny);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  const update = (camera: THREE.Camera, delta: number) => {
    // Smooth lerp pointer coords to prevent sudden jumps
    const lerpFactor = Math.min(delta * 4.5, 1);
    pointerSmoothed.current.lerp(pointerNorm.current, lerpFactor);

    // Unproject to z=0 world plane for 3D proximity interactions
    raycaster.current.setFromCamera(pointerSmoothed.current, camera);
    const intersectPoint = new THREE.Vector3();
    raycaster.current.ray.intersectPlane(plane.current, intersectPoint);
    if (intersectPoint) {
      worldPoint.current.copy(intersectPoint);
    }
  };

  return {
    pointerNorm,
    pointerSmoothed,
    worldPoint,
    update,
  };
}
