import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'
import { FlyControls, OrbitControls, PerspectiveCamera, Sparkles, Stars, Trail } from "@react-three/drei";
import { MantineTheme, useMantineTheme } from "@mantine/core";
import { isDarkTheme } from "utils/theme.utils";

import { useWindowEvent } from "@mantine/hooks";
import { Viper } from "modules/webgl/assets/viper";
import { InputController, Speeds, Velocity } from "modules/webgl/helpers/state";
import { clamp, degToRad, lerp } from "three/src/math/MathUtils";
import { Ship } from "modules/webgl/assets/ship";
import { isNearly } from "utils/math";
import { AxesHelper } from "three";


const Refs = new (class RefsContainer {
  ship: React.MutableRefObject<THREE.Group> = null!;
  mesh: React.MutableRefObject<THREE.Group> = null!;
  camera: React.MutableRefObject<THREE.Camera> = null!;
  constructor() {}
})

const shipState = new Speeds(
  new Velocity(5, 5/100, .5),
  new Velocity(2.5, 5/100),
);

const inputController = new InputController({
    fwd: ['KeyW', 'ArrowUp'],
    left: ['KeyA', 'ArrowLeft'],
    back: ['KeyS', 'ArrowDown'],
    right: ['KeyD', 'ArrowRight'],
    boost: 'ShiftLeft',
    break: 'Space',
    turnLeft: 'KeyQ',
    turnRight: 'KeyE',
});
interface RotConfig { max: number, rate: number, amount: number, current: number, limit?: boolean}
function updateRotations(values: RotConfig) {
  const { max, rate, amount, current, limit } = values;
  const deadzone = 0.25;
    let newValue = current + (amount * rate)
    newValue = isNearly(amount, 0, deadzone) ? current : lerp(current, newValue, .1)
    return limit ? clamp(newValue, -max, max) : newValue;
}

function updateMouseInputs(target: THREE.Object3D, pitch: RotConfig, yaw: RotConfig) {
  target.rotation.x = updateRotations({
    limit: true,
    max: pitch.max,
    rate: pitch.rate,
    amount: pitch.amount,
    current: target.rotation.x,
  });
  target.rotation.y = updateRotations({
    max: yaw.max,
    rate: yaw.rate,
    amount: yaw.amount,
    current: target.rotation.y
  });
}

const ShipComponent: React.FC = () => {
  const ship = useRef<THREE.Group>(null!)
  const meshRef= useRef<THREE.Group>(null!);
  const axesRef= useRef<AxesHelper>(null!);

  useEffect(() => {
    Refs.ship = ship;
    Refs.mesh = meshRef;
  }, [ship])
  const inputs = useRef(inputController);
  const [mouseActive, setMouseActive] = useState(true);
  /** hooks proxy to mantine useWindowEvent to bind keydown/up */
  useHandleKeyboardInputs(inputs.current);
  useFrame(({mouse}, delta) => {
    if (!ship.current) return;
    const _ship = ship.current;
    updateShipMovement(delta, inputs.current);
    const MAX_PITCH = degToRad(45);
    const MAX_YAW = degToRad(90);
    const ROTATION_RATE = .1;
    if (mouseActive)
      updateMouseInputs(_ship, {
        limit: true,
        amount: -mouse.y,
        max: MAX_PITCH, rate: ROTATION_RATE,
        current: _ship.rotation.x,
      }, {
        amount: -mouse.x,
        max: MAX_YAW, rate: ROTATION_RATE,
        current: _ship.rotation.y
      });
      axesRef.current.position.set(_ship.position.x, _ship.position.y, _ship.position.z)
      axesRef.current.rotation.set(_ship.rotation.x, _ship.rotation.y, _ship.rotation.z)
  })

  const Player = useShip();
  return (
    <>
    <group ref={ship} scale={0.1} onClick={() => setMouseActive(s => !s)}>
      <Player ref={meshRef}/>
q
    </group>
    <axesHelper ref={axesRef}/>
    <Trail
      width={1} // Width of the line
      color={'#F8D628'} // Color of the line
      length={2} // Length of the line
      decay={0.1} // How fast the line fades away
      local={true} // Wether to use the target's world or local positions
      stride={0} // Min distance between previous and current point
      interval={1} // Number of frames to wait before next calculation
      target={ship} // Optional target. This object will produce the trail.
      attenuation={(width) => width/3 * (shipState.fwd.current / shipState.fwd.max)} // A function to define the width in each point along it.
    />
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
        // position={[0, 0, 0]}
        // rotation={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={5000}
      />
      <Stars radius={1000} depth={75} count={50_000} fade/>
      {/* <Sparkles rotation={[0,0,Math.PI/4]} size={.75} count={10000} opacity={0.5} noise={1} speed={0.025} scale={50} /> */}
     
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
      <Canvas
        ref={canvas}
        shadows
        style={{width: '100%', height: '100vh'}}
        // onCreated={({gl}) => gl.setClearColor(color)}
      >
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


/** updates the active camera transform to follow the 'player' */
function updateFollowCamera(camera: THREE.Camera, target: THREE.Group) {
  if (!camera || !target) return;
  var relativeCameraOffset = new THREE.Vector3(0,5,lerp(-8, -12, clamp(shipState.fwd.current / shipState.fwd.max, 0, 1)));
  var offset = relativeCameraOffset.applyMatrix4(target.matrixWorld);
  camera.position.set(offset.x, offset.y, offset.z)
  camera.lookAt(target.position);
}

/**
 * binds the InputController (and optionally other inputs) to the dom events
 * through built-in mantine hooks
 */
function useHandleKeyboardInputs(inputs: InputController) {
  
  useWindowEvent('keydown', inputs.updateKeys);
  useWindowEvent('keyup', inputs.updateKeys);

  useWindowEvent('keydown', ({code}) => {
    switch(code) {
      case 'KeyZ':
        Refs.ship!.current.position.set(0,0,0);
        Refs.ship!.current.rotation.set(0,0,0);
        break;
      default: return;
    }
  });
}

/** updates ship transform to reflect user inputs */
function updateShipMovement(delta: number, inputs: InputController) {
  const ship = Refs.ship?.current;
  const mesh = Refs.mesh?.current;
  if (!ship || !mesh) return;

  shipState.update(inputs);
  const { fwd, strafe } = shipState;
  const MAX_YAW = degToRad(15);
  ship.translateZ(fwd.current * delta);
  ship.translateX(strafe.current * delta);
  // mesh.position.set(ship.position.x, ship.position.y, ship.position.z);
  // mesh.rotation.set(ship.rotation.x, ship.rotation.y, ship.rotation.z);
  // ship.rotateY((Math.PI / 365 /2) * inputs.turn);
  // Refs.mesh.current.rotation.z = -MAX_YAW * (strafe.current / strafe.max);
}


const useShip = () => {
  const [avatar, setAvatar] = useState(true)
  useWindowEvent('keydown', (e) => {
    if (e.code === 'KeyT') setAvatar(p => !p)
  });
  return useMemo(() => avatar ? Ship : Viper,[avatar])
}
