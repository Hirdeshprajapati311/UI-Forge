import type { RefObject } from "react";
import type * as THREE from "three";
import type { MeshPhysicalMaterialProps, GroupProps } from "@react-three/fiber";

export interface BottleColorScheme {
  body: string;
  bodyOpacity?: number;
  cap: string;
  neck: string;
  nozzle: string;
  nozzleTip: string;
  ring: string;
  accent: string;
  label: string;
}

export interface BottleProps extends GroupProps {
  height?: number;
  radius?: number;
  colorScheme?: BottleColorScheme;
  glassMaterial?: MeshPhysicalMaterialProps;
  showLabel?: boolean;
  labelText?: string;
  animate?: boolean;
  interactive?: boolean;
  reducedMotion?: boolean;
  floatingHeight?: number;
  rotationSpeed?: number;
}

export interface BottleRef {
  groupRef: RefObject<THREE.Group | null>;
  animateTo: (props: Partial<BottleProps>) => void;
}
