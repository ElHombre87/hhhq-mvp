import { Suspense, useEffect, useRef } from "react";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, FlyControls, OrbitControls, PerspectiveCamera, Stars, Text } from "@react-three/drei";
import { MantineTheme, useMantineTheme } from "@mantine/core";
import { isDarkTheme } from "utils/theme.utils";

import { useWindowEvent } from "@mantine/hooks";
import { Viper } from "modules/webgl/assets/viper";

const Refs = new (class RefsContainer {
  ship: React.MutableRefObject<THREE.Group> = null!;
  camera: React.MutableRefObject<THREE.Camera> = null!;
  constructor() {}
})
enum MoveOptions {
  STOP=0,
  POS=1,
  NEG=-1,
}
interface Movements {
  fwd: MoveOptions
  strafe: MoveOptions
  multiplier: number
  break: boolean

}

const Ship: React.FC = () => {
  const ship = useRef<THREE.Group>(null!)
  useEffect(() => { Refs.ship = ship }, [ship])
  const moves = useRef<Movements>({ fwd: 0, strafe: 0, multiplier: 1, break: false });
  const SIZE = 2;
  
  useHandleInputs(moves.current);
  useFrame((state) => {
    // const {clock, controls} = state;
    if (!ship.current) return;
    updateShipMovement(ship.current, moves.current);
  })

  return (
    <>
    <group ref={ship} scale={0.05}>
      <Viper />
    {/* <mesh ref={ship} position={[0, SIZE/2, 0]}>
      <boxBufferGeometry args={[SIZE, SIZE, SIZE]} />
      <meshStandardMaterial color="#0391BA" />
    </mesh> */}
    </group>
    </>
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
        far={1000}
      />
      <Stars />
      <Ship />
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
  var relativeCameraOffset = new THREE.Vector3(0,15,-20);
  var cameraOffset = relativeCameraOffset.applyMatrix4(target.matrixWorld);
  camera.position.x = cameraOffset.x;
  camera.position.y = cameraOffset.y;
  camera.position.z = cameraOffset.z;
  camera.rotation.z = 0;
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
        moves.break = true;
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
    }
  });

}

const MAX_SPEED = 0.0525;
const ACCELERATION = 0.005;
const SPEED = {
  fwd: 0,
  strafe: 0
}
function getSpeed(moves: Movements): {fwd:number, strafe: number} {
  function compute(curr: number, mod: number) {
    return Math.min(MAX_SPEED, Math.max(curr + (ACCELERATION * mod), -MAX_SPEED))
  }
  function breaks(speed: number) {
    if (!moves.break) return 0;
    if (isNearly(speed, 0, ACCELERATION)) return -speed;
    return speed > 0 ? -ACCELERATION : ACCELERATION;
  }
  SPEED.fwd = compute(SPEED.fwd, moves.fwd) + breaks(SPEED.fwd);
  SPEED.strafe = compute(SPEED.strafe, moves.strafe) + breaks(SPEED.strafe);
  return SPEED;
}

function updateShipMovement(ship: THREE.Group, moves: Movements) {
  // const delta = clock.getDelta(); // seconds.
  // const moveDistance = 500 * delta; // 200 pixels per second
  // const rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 degrees) per second
  const speed = getSpeed(moves);
  ship.translateZ(speed.fwd);
  ship.translateX(speed.strafe);
  // ship.rotation.z = Math.PI / 16
}

function isNearly(value: number, match: number, precision = 0.05) {
  return (match - precision) <= value && value <= (match + precision);
}
