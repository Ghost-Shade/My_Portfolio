import React from "react";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { FloatingObjectProps } from '../../types';

export default function FloatingObject({ mousePosition }: FloatingObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Floating animation
      meshRef.current.position.y = Math.sin(time) * 0.5 + 2;
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      
      // Mouse interaction
      meshRef.current.position.x = mousePosition.x * 2;
      meshRef.current.position.z = mousePosition.y * 2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.8, 32, 32]} position={[0, 2, 0]}>
      <meshStandardMaterial
        color="#7A3EFF"
        emissive="#7A3EFF"
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}