import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const Globe = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      sphereRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#38BDF8" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#FEF08A" />
      
      {/* Core glowing sphere */}
      <Sphere ref={sphereRef} args={[2.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#0f172a"
          emissive="#38BDF8"
          emissiveIntensity={0.2}
          attach="material"
          distort={0.1}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Outer atmosphere halo */}
      <Sphere args={[2.7, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>
    </group>
  );
};
