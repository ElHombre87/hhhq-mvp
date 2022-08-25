import React, { forwardRef, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, FlyControls, OrbitControls, PerspectiveCamera, Stars, useGLTF} from "@react-three/drei";
import { MantineTheme, useMantineTheme } from "@mantine/core";
import { isDarkTheme } from "utils/theme.utils";

import { useWindowEvent } from "@mantine/hooks";
import { Viper } from "modules/webgl/assets/viper";
import { Speeds, Velocity } from "modules/webgl/helpers/state";
import type { Movements } from "modules/webgl/helpers/state";
import { degToRad } from "three/src/math/MathUtils";
import { Ship } from "modules/webgl/assets/ship";

const Refs = new (class RefsContainer {
  ship: React.MutableRefObject<THREE.Group> = null!;
  mesh: React.MutableRefObject<THREE.Group> = null!;
  camera: React.MutableRefObject<THREE.Camera> = null!;
  constructor() {}
})

const ShipComponent: React.FC = () => {
  const ship = useRef<THREE.Group>(null!)
  const meshRef= useRef<THREE.Group>(null!);
  useEffect(() => {
    Refs.ship = ship;
    Refs.mesh = meshRef;
  }, [ship])
  const moves = useRef<Movements>({ fwd: 0, strafe: 0, multiplier: 1, break: false });
  const SIZE = 2;
  
  useHandleInputs(moves.current);
  useFrame((_, delta) => {
    if (!ship.current) return;
    updateShipMovement(delta, moves.current);
  })

  const [avatar, setAvatar] = useState(true)
  useWindowEvent('keydown', (e) => {
    if (e.code === 'KeyT') setAvatar(p => !p)
  });
  const Player = useMemo(() => avatar ? Ship : Viper,[avatar])
  // return (
  //   <group ref={ship} scale={0.1}>
  //     <Ship ref={meshRef}/>
  //   </group>
  // )
  return (
    <>
    <group ref={ship} scale={0.05}>
      <Player meshRef={meshRef}/>
    </group>
    </>
  )
}

const Target: React.FC = () => {
  return (
    <mesh position={[0, 0, 5]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial wireframe />
    </mesh>
  )
}


const Scene: React.FC = ({}) => {
  Refs.camera = useRef<THREE.Camera>(null!);
  useFrame(() => {
    updateFollowCamera(Refs.camera?.current, Refs.ship?.current);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight intensity={1.0} position={[10, 10, 10]} />
      
      <PerspectiveCamera
        makeDefault
        ref={Refs.camera}
        position={[0, 500, -100]}
        rotation={[0, Math.PI / 2, 0]}
        fov={90}
        near={0.1}
        far={5000}
      />
      <Stars radius={1000} depth={75} count={50_000} fade/>
      <ShipComponent />
      <Target />
    </>
  )
}

export default function WebGLTestPage() {
  const canvas = useRef<HTMLCanvasElement>(null!)
  const { color } = useCanvasColor();

  return (
    <Suspense fallback={null}>
      <Canvas ref={canvas} shadows style={{width: '100%', height: '100vh'}} onCreated={({gl}) => gl.setClearColor(color)}>
        <gridHelper />
        <FlyControls movementSpeed={1} />
        <OrbitControls />
        <Scene />
      </Canvas>
    </Suspense>
  )
};

const useCanvasColor = (theme?: MantineTheme) => {
  const _theme = theme || useMantineTheme()
  const color = isDarkTheme(_theme) ? '#2a2a2a' : '#fafafa';
  return { theme, color }
  
}

// FUNCTIONS //////////////////////////////////////////////////////////////////


function updateFollowCamera(camera: THREE.Camera, target: THREE.Group) {
  if (!camera || !target) return;
  var relativeCameraOffset = new THREE.Vector3(0,12,-15);
  var offset = relativeCameraOffset.applyMatrix4(target.matrixWorld);
  camera.position.set(offset.x, offset.y, offset.z)
  camera.lookAt(target.position);
}

function useHandleInputs(moves: Movements) {
  
  useWindowEvent('keydown', ({code}) => {
    switch(code) {
      case 'KeyW':
        moves.fwd = 1; break;
      case 'KeyS':
        moves.fwd = -1; break;
      case 'KeyA':
        moves.strafe = 1; break;
      case 'KeyD':
        moves.strafe = -1; break;
      case 'ShiftLeft':
        moves.multiplier = 2; break;
      case 'Space':
        moves.break = true; break;
      case 'KeyZ':
        Refs.ship!.current.position.set(0,0,0); break;
      default: return;
    }
  });

  useWindowEvent('keyup', ({code}) => {
    switch(code) {
      case 'KeyW':
      case 'KeyS':
        moves.fwd = 0; break;
      case 'KeyA':
      case 'KeyD':
        moves.strafe = 0; break;
      case 'ShiftLeft':
        moves.multiplier = 1; break;
      case 'Space':
        moves.break = false;
      default: return;
    }
  });

}

const SPEED = new Speeds(
  // new Velocity(0.05),
  // new Velocity(0.025, 0.05/100, 2),
  new Velocity(5, 5/100, .5),
  new Velocity(2.5, 5/100),
)
// function updateShipMovement(delta: number, ship: THREE.Group, moves: Movements) {
function updateShipMovement(delta: number, moves: Movements) {
  const ship = Refs.ship?.current;
  const mesh = Refs.mesh?.current;
  if (!ship || !mesh) return;

  SPEED.update(moves);
  const { fwd, strafe } = SPEED;
  const MAX_YAW = degToRad(5);
  ship.translateZ(fwd.current * delta);
  ship.translateX(strafe.current * delta);
  Refs.mesh.current.rotation.z = -MAX_YAW * (strafe.current / strafe.max);
}
