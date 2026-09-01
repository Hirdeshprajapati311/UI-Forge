import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere, Torus } from '@react-three/drei';
import type { MeshPhysicalMaterialProps } from '@react-three/fiber';
import type { BottleProps, BottleColorScheme } from './Bottle.types';

const DEFAULT_COLORS: BottleColorScheme = {
  body: '#4fa9c9',
  bodyOpacity: 0.75,
  cap: '#1a7a9c',
  neck: '#2c3e50',
  nozzle: '#2c3e50',
  nozzleTip: '#34495e',
  ring: '#2a9bc9',
  accent: '#3a5a7a',
  label: '#b8e2f0',
};

export const Bottle: React.FC<BottleProps> = ({
  height = 3.0,
  radius = 0.5,
  colorScheme = DEFAULT_COLORS,
  glassMaterial = {},
  showLabel = true,
  labelText = 'ASHAMPOO',
  animate = true,
  interactive = true,
  reducedMotion = false,
  floatingHeight = 0.05,
  rotationSpeed = 0.15,
  ...props
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (animate && groupRef.current) {
      const motion = reducedMotion ? 0 : 1;
      const pointerRotation = interactive ? state.pointer.x * 0.12 : 0;
      const targetRotationX = interactive ? state.pointer.y * 0.08 : 0;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * rotationSpeed) * 0.3 * motion + pointerRotation * motion;
      groupRef.current.rotation.x += (targetRotationX * motion - groupRef.current.rotation.x) * delta * 2;

      if (floatingHeight > 0) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * floatingHeight * motion;
      }
    }
  });

  const glassMaterialProps: MeshPhysicalMaterialProps = {
    metalness: 0.1,
    roughness: 0.15,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
    transparent: true,
    opacity: colorScheme.bodyOpacity,
    envMapIntensity: 1.2,
    side: THREE.DoubleSide,
    ...glassMaterial,
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]} {...props}>
      <Cylinder args={[radius, radius, height * 0.85, 48, 1]} position={[0, 0, 0]}>
        <meshPhysicalMaterial color={colorScheme.body} {...glassMaterialProps} />
      </Cylinder>

      <Cylinder args={[radius, radius, 0.08, 32]} position={[0, -height * 0.425, 0]}>
        <meshPhysicalMaterial color={colorScheme.cap} metalness={0.3} roughness={0.4} />
      </Cylinder>

      <Cylinder args={[radius * 0.75, radius, 0.2, 32]} position={[0, height * 0.425, 0]}>
        <meshPhysicalMaterial color={colorScheme.cap} metalness={0.2} roughness={0.3} />
      </Cylinder>

      <Sphere args={[radius * 0.7, 24, 16, 0, Math.PI * 2, 0, Math.PI / 3]} position={[0, height * 0.46, 0]} scale={[1, 0.7, 1]}>
        <meshPhysicalMaterial color={colorScheme.cap} metalness={0.1} roughness={0.2} />
      </Sphere>

      <Cylinder args={[0.28, 0.32, 0.5, 24]} position={[0, height * 0.55, 0]}>
        <meshPhysicalMaterial color={colorScheme.neck} metalness={0.6} roughness={0.3} />
      </Cylinder>

      <group position={[0, height * 0.75, 0]}>
        <Cylinder args={[0.22, 0.28, 0.25, 20]}>
          <meshPhysicalMaterial color={colorScheme.nozzle} metalness={0.7} roughness={0.25} />
        </Cylinder>
        <Cylinder args={[0.18, 0.22, 0.2, 20]} position={[0, 0.2, 0]}>
          <meshPhysicalMaterial color={colorScheme.nozzleTip} metalness={0.5} roughness={0.3} />
        </Cylinder>
        <Torus args={[0.1, 0.03, 12, 20]} position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial color={colorScheme.nozzleTip} metalness={0.8} roughness={0.2} />
        </Torus>
      </group>

      <Torus args={[radius * 0.85, 0.04, 16, 48]} position={[0, height * 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial color={colorScheme.ring} metalness={0.1} roughness={0.3} emissive="#0a4a6a" emissiveIntensity={0.2} />
      </Torus>
      <Torus args={[radius * 0.85, 0.04, 16, 48]} position={[0, -height * 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial color={colorScheme.ring} metalness={0.1} roughness={0.3} emissive="#0a4a6a" emissiveIntensity={0.15} />
      </Torus>
      <Torus args={[0.35, 0.04, 12, 28]} position={[0, height * 0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial color={colorScheme.accent} metalness={0.3} roughness={0.4} />
      </Torus>

    </group>
  );
};

export default Bottle;
