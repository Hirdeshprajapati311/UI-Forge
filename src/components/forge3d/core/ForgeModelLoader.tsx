import React, { Suspense } from 'react';
import { Canvas, type CanvasProps } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Loader } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { ACESFilmicToneMapping } from 'three';

export interface ForgeModelLoaderProps extends CanvasProps {
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  showOrbitControls?: boolean;
  showEnvironment?: boolean;
  showShadows?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  cameraPosition?: [number, number, number];
  environmentPreset?: 'studio' | 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'city' | 'park' | 'lobby';
}

export const ForgeModelLoader: React.FC<ForgeModelLoaderProps> = ({
  children,
  loadingFallback = <Loader />,
  showOrbitControls = true,
  showEnvironment = true,
  showShadows = true,
  autoRotate = false,
  autoRotateSpeed = 1,
  cameraPosition = [3, 3, 5],
  environmentPreset = 'studio',
  ...canvasProps
}) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        shadows={showShadows}
        {...canvasProps}
      >
        {/* Background & Environment */}
        {showEnvironment && <Environment preset={environmentPreset} background={false} />}

        {/* Ambient & Key Lights */}
        <ambientLight intensity={0.5} color="#aaccff" />
        <directionalLight
          position={[5, 8, 6]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight
          position={[-4, 3, 5]}
          intensity={0.8}
          color="#ffccaa"
        />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#88ccff" />

        {/* Shadow catcher */}
        {showShadows && (
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={5}
            blur={2}
            far={2}
            color="#000000"
          />
        )}

        {/* Model with Suspense */}
        <Suspense fallback={loadingFallback}>
          {children}
        </Suspense>

        {/* Controls */}
        {showOrbitControls && (
          <OrbitControls
            enablePan={true}
            minDistance={2}
            maxDistance={10}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            target={[0, 0.5, 0]}
          />
        )}
      </Canvas>
    </div>
  );
};

export default ForgeModelLoader;