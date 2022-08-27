import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { FlyControls, OrbitControls, PerspectiveCamera, Stars, Trail } from "@react-three/drei";
import { Canvas, useFrame } from '@react-three/fiber';
import { clamp, degToRad, lerp } from "three/src/math/MathUtils";
import * as THREE from 'three';

import { MantineTheme, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useWindowEvent } from "@mantine/hooks";
import { openModal } from "@mantine/modals";

import PageLayout from "layouts/PageLayout";
import { isDarkTheme } from "utils/theme.utils";
import { isNearly } from "utils/math";

import { Ship, Viper } from "modules/webgl/assets";
import { ShipControlsModal } from "modules/webgl/components";
import { CONTROLS } from "modules/webgl/config";
import { InputController, Speeds, Velocity } from "modules/webgl/helpers/state";

const Refs = new (class RefsContainer {
  ship: React.MutableRefObject<THREE.Group> = null!;
  mesh: React.MutableRefObject<THREE.Group> = null!;
  camera: React.MutableRefObject<THREE.Camera> = null!;
  constructor() {}
})

const shipState = new Speeds(
  new Velocity(5, 5/100, .5),
  new Velocity(2.5, 5/100),
  new Velocity(2.5, 5/100),
);

const inputController = new InputController(CONTROLS);

interface RotConfig { max: number, rate: number, input: number, current: number, limit?: boolean}
function updateRotations(values: RotConfig) {
  const { max, rate, input: amount, current, limit } = values;
  const deadzone = 0.05;
    let newValue = current + (amount * rate)
    newValue = isNearly(amount, 0, deadzone) ? current : lerp(current, newValue, .1);
    // if (Math.abs(newValue) >= degToRad(89.9)) newValue *= -1;
    return limit ? clamp(newValue, -max, max) : newValue;
}

function updateMouseInputs(target: THREE.Object3D, pitch: RotConfig, yaw: RotConfig) {
  // const newRot = new THREE.Matrix4()
  const newRot_x = updateRotations({...pitch, current: target.rotation.x, limit: true });
  const newRot_y = updateRotations({...yaw, current: target.rotation.y });
  target.rotateOnAxis(new THREE.Vector3(1,0,0), newRot_x - target.rotation.x)
  target.rotateOnAxis(new THREE.Vector3(0,1,0), newRot_y - target.rotation.y)
  // target.rotation.x = newRot_x;
  // // target.rotateY(yaw.input * yaw.rate);
  // target.rotation.y = newRot_y;

}

const ShipComponent: React.FC = () => {
  const ship = useRef<THREE.Group>(null!)
  const meshRef= useRef<THREE.Group>(null!);
  const axesRef= useRef<THREE.AxesHelper>(null!);

  useEffect(() => {
    Refs.ship = ship;
    Refs.mesh = meshRef;
  }, [ship])
  const inputs = useRef(inputController);
  const [mouseRotation, setMouseRotation] = useState(true);
  /** hooks proxy to mantine useWindowEvent to bind keydown/up */
  useHandleKeyboardInputs(inputs.current, setMouseRotation);
  const MAX_PITCH = degToRad(45);
  const MAX_YAW = degToRad(180);
  const ROTATION_RATE = .1;
  useFrame(({mouse}, delta) => {
    if (!ship.current) return;
    const _ship = ship.current;
    updateShipMovement(delta, inputs.current);
    if (mouseRotation)
      updateMouseInputs(_ship, {
        limit: true, input: -mouse.y,
        max: MAX_PITCH, rate: ROTATION_RATE,
        current: _ship.rotation.x,
      }, {
        input: -mouse.x,
        max: MAX_YAW, rate: ROTATION_RATE,
        current: _ship.rotation.y
      });
      axesRef.current.position.set(_ship.position.x, _ship.position.y, _ship.position.z)
      axesRef.current.rotation.set(_ship.rotation.x, _ship.rotation.y, _ship.rotation.z)
  })

  const Player = useShip();
  return (
    <>
    <group ref={ship} scale={0.1}>
      <Player ref={meshRef}/>
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
  const ref = useRef<THREE.Mesh>(null!);
  const [inRange, setInRange] = useState<boolean>(false);
  useFrame(() => {
    if (!Refs.ship) return;
    setInRange(ref.current.position.distanceTo(Refs.ship.current.position) < 0.5);
  })
  useEffect(() => {
    if (inRange) {
      showNotification({
        color: 'green',
        title: 'Target Reached!',
        message: 'You reached your destination',
        id: '3d__target-status',
        autoClose: 2000,
      });
    }
  }, [inRange])
  return (
    <mesh ref={ref} position={[0, 0, 5]}>
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
    <PageLayout pt={0} withContainer={false} sx={{body: { height: '100%', width: '100%', position: 'absolute'}}}>
    <Suspense fallback={null}>
      <Canvas
        ref={canvas}
        shadows
        style={{width: '100%', height: '100%',}}
        onCreated={({gl}) => {
          gl.setClearColor(color);
          openModal({
            title: 'Controls',
            children: <ShipControlsModal />
          });
        }}
      >
        <gridHelper position={[0, -1, 0]} />
        <FlyControls movementSpeed={1} />
        <OrbitControls />
        <Scene />
      </Canvas>
    </Suspense>
    </PageLayout>
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
function useHandleKeyboardInputs(inputs: InputController, setMouseRotation: React.Dispatch<React.SetStateAction<boolean>>) {
  
  useWindowEvent('keydown', inputs.updateKeys);
  useWindowEvent('keyup', inputs.updateKeys);

  useWindowEvent('keydown', ({code}) => {
    switch(code) {
      case 'KeyZ':
        Refs.ship!.current.position.set(0,0,0);
        Refs.ship!.current.rotation.set(0,0,0);
        shipState.fwd.current = 0;
        shipState.strafe.current = 0;
        break;
      case 'KeyY':
        setMouseRotation(s => !s); break;
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
  const { fwd, strafe, vertical } = shipState;
  const MAX_YAW = degToRad(15);
  ship.translateZ(fwd.current * delta);
  ship.translateX(strafe.current * delta);
  ship.translateY(vertical.current * delta);
  // mesh.position.set(ship.position.x, ship.position.y, ship.position.z);
  // mesh.rotation.set(ship.rotation.x, ship.rotation.y, ship.rotation.z);
  // ship.rotateY((Math.PI / 365 /2) * inputs.turn);
  ship.rotateZ((degToRad(.5)) * -inputs.roll);

  // Refs.mesh.current.rotation.z = -MAX_YAW * (strafe.current / strafe.max);
}


const useShip = () => {
  const [avatar, setAvatar] = useState(true)
  useWindowEvent('keydown', (e) => {
    if (e.code === 'KeyT') setAvatar(p => !p)
  });
  return useMemo(() => avatar ? Ship : Viper,[avatar])
}
