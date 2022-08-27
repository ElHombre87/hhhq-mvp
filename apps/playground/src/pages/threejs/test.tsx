import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Center, Float, FlyControls, PerspectiveCamera, Sphere, Stars, Text3D, Trail } from "@react-three/drei";
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
import { ShipControlsModal, ShipMatrixInfo } from "modules/webgl/components";
import { CONTROLS } from "modules/webgl/config";
import { InputController, Speeds, Velocity } from "modules/webgl/helpers/state";

const CAMERA_MIN_DIST = -7;
const CAMERA_MAX_DIST = -12;
const CAMERA_HEIGHT = 2; //-5

const ROTATION_RATE = 150;

// apply to all object3d to match the proper sizing
const WORLD_SCALE = 0.1;

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

  useFrame(({mouse}, delta) => {
    if (!ship.current) return;
    const _ship = ship.current;
    updateShipMovement(inputs.current, mouse, delta, {useMouse: mouseRotation});
    
      axesRef.current.position.set(_ship.position.x, _ship.position.y, _ship.position.z)
      axesRef.current.rotation.set(_ship.rotation.x, _ship.rotation.y, _ship.rotation.z)
  })

  const Player = useShip();
  return (
    <>
    <group ref={ship} scale={WORLD_SCALE} name="ship">
      <Player ref={meshRef}/>
      {/* <Camera /> */}
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

const Camera: React.FC = () => {
  Refs.camera = useRef<THREE.Camera>(null!);
  useFrame(() => {
    updateFollowCamera(Refs.camera?.current, Refs.ship?.current);
  });

  return (
    <PerspectiveCamera ref={Refs.camera} makeDefault fov={70} near={0.1} far={50000} name="main-camera" />
  )
}


const Target: React.FC = () => {
  const ref = useRef<THREE.Group>(null!);
  const [inRange, setInRange] = useState<boolean>(false);
  useFrame(() => {
    if (!Refs.ship || !ref) return;
    setInRange(ref.current?.position.distanceTo(Refs.ship.current.position) < 0.5);
    ref.current.rotation.y += degToRad(.05);
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
  }, [inRange]);

  return (
    <Suspense fallback={null}>
      <group ref={ref} position={[0, 0, 5]} rotation={[0, Math.PI, 0]}>
      <Center>
        <Float floatIntensity={1} speed={2}>
          <Text3D
            font={'/Montserrat_Bold.json'}
            scale={WORLD_SCALE}
            height={0.1}
            bevelEnabled
            bevelSegments={3}
            bevelSize={0.05}
            castShadow
            receiveShadow
          >
            HHHQ
            <meshPhysicalMaterial color="cyan" roughness={0.25} metalness={.25}  />
          </Text3D>
        </Float>
      </Center>
      </group>
    </Suspense>
  )
}

const Scene: React.FC = ({}) => {

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight intensity={1.0} position={[10, 10, 10]} />
      <Camera />
      <Stars radius={500} depth={500} count={50_000}/>
      {/* <Sparkles rotation={[0,0,Math.PI/4]} size={.75} count={10000} opacity={0.5} noise={1} speed={0.025} scale={50} /> */}
      {/* World Center */}
      <Sphere position={[0,0,0]} args={[.05, 12, 12]}>
        <meshBasicMaterial color="hotpink" wireframe/>
      </Sphere>
      <axesHelper position={[0,0,0]} />
      <ShipComponent />
      <Target />
    </>
  )
}

export default function WebGLTestPage() {
  const canvas = useRef<HTMLCanvasElement>(null!)
  const { color } = useCanvasColor();
  const [transform, setTransform] = useState<[THREE.Vector3, THREE.Euler]>([new THREE.Vector3(), new THREE.Euler()])
  useEffect(() => {
    const { ship } = Refs;
    if (ship && ship.current)
      setTransform([ship.current.position, ship.current.rotation])
  }, [Refs.ship?.current])

  return (
    <PageLayout
      pt={0}
      withContainer={false}
      sx={{body: { height: '100%', width: '100%', position: 'absolute'}}}
      sticky={<ShipMatrixInfo position={transform[0]} rotation={transform[1]}/>}
    >
    <Suspense fallback={null}>
      <Canvas
        ref={canvas}
        shadows
        style={{width: '100%', height: '100%'}}
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
  const newZ = lerp(CAMERA_MIN_DIST, CAMERA_MAX_DIST, clamp(shipState.fwd.current / shipState.fwd.max, 0, 1));
  const relativeCameraOffset = new THREE.Vector3(0, CAMERA_HEIGHT, newZ);
  const offset = relativeCameraOffset.applyMatrix4(target.matrixWorld);
  camera.position.set(offset.x, offset.y, offset.z);
  // camera.position.set(offset.x, offset.y, newZ)
  camera.lookAt(target.position);
}

/**
 * binds the InputController (and optionally other inputs) to the dom events
 * through built-in mantine hooks
 */
function useHandleKeyboardInputs(inputs: InputController, setMouseRotation: React.Dispatch<React.SetStateAction<boolean>>) {
  
  useWindowEvent('keydown', inputs.updateKeys);
  useWindowEvent('keyup', inputs.updateKeys);
  useHandleDebugInputs(inputs, setMouseRotation);
}
function useHandleDebugInputs(inputs: InputController, setMouseRotation: React.Dispatch<React.SetStateAction<boolean>>) {

  useWindowEvent('keydown', ({code}) => {
    switch(code) {
      case 'KeyZ':
        Refs.ship!.current.position.set(0,0,0);
        Refs.ship!.current.rotation.set(0,0,0);
        shipState.fwd.current = 0;
        shipState.strafe.current = 0;
        shipState.vertical.current = 0;
        break;
      case 'KeyY':
        setMouseRotation(s => !s); break;
      case 'Numpad4':
        Refs.ship!.current.rotation.set(0,degToRad(90),0); break;
      case 'Numpad8':
        Refs.ship!.current.rotation.set(0,degToRad(0),0); break;
      case 'Numpad6':
        Refs.ship!.current.rotation.set(0,degToRad(-90),0); break;
      case 'Numpad2':
        Refs.ship!.current.rotation.set(0,degToRad(180),0); break;
      default:
        break;
      
    }
  });
}

function getRotation(input: number, rate: number, delta: number, deadzone = 0.05) {
  const _rate = lerp(0, degToRad(rate), Math.abs(input));
  return isNearly(input, 0, deadzone) ? 0 : input * _rate * delta;
  
}
/** updates ship transform to reflect user inputs */
function updateShipMovement(inputs: InputController, mouse: THREE.Vector2, delta: number, opts: {useMouse: boolean}) {
  const ship = Refs.ship?.current;
  if (!ship) return;

  shipState.update(inputs);
  const { fwd, strafe, vertical } = shipState;
  // const MAX_YAW = degToRad(15);
  ship.translateZ(fwd.current * delta);
  ship.translateX(strafe.current * delta);
  ship.translateY(vertical.current * delta);
  ship.rotateZ((degToRad(.5)) * -inputs.roll);

  if (opts.useMouse) {
    ship.rotateX(getRotation(-mouse.y,ROTATION_RATE, delta, 0.005));
    ship.rotateY(getRotation(-mouse.x,ROTATION_RATE*2, delta, 0.005));
  }
}


const useShip = () => {
  const [avatar, setAvatar] = useState(true)
  useWindowEvent('keydown', (e) => {
    if (e.code === 'KeyT') setAvatar(p => !p)
  });
  return useMemo(() => avatar ? Ship : Viper,[avatar])
}
