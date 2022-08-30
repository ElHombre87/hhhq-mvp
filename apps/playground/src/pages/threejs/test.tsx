import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Center, Float, FlyControls, PerspectiveCamera, Sphere, Stars, Text3D, Trail } from "@react-three/drei";
import { Canvas, useFrame } from '@react-three/fiber';
import { clamp, damp, degToRad, lerp } from "three/src/math/MathUtils";
import * as THREE from 'three';

import { MantineTheme, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useWindowEvent } from "@mantine/hooks";
import { openModal } from "@mantine/modals";

import PageLayout from "layouts/PageLayout";
import { isDarkTheme } from "utils/theme.utils";
import { isNearly } from "utils/math";

import { Ship, Viper } from "modules/webgl/assets";
import { ControlsUI, ShipControlsModal } from "modules/webgl/components";
import { CONTROLS } from "modules/webgl/config";
import { InputController, Speeds, Velocity } from "modules/webgl/helpers/state";
import { GamePadController } from "modules/webgl/helpers/gamepad.controller";
import { controllers } from "modules/webgl";
import { interpret } from "xstate";
import { useSelector } from "@xstate/react";

const CAMERA_MIN_DIST = -7;
const CAMERA_MAX_DIST = -15;

const ROTATION_RATE = 150;

// apply to all object3d to match the proper sizing
const WORLD_SCALE = 0.1;

const AxisX = new THREE.Vector3(1,0,0);
const AxisY = new THREE.Vector3(0,1,0);
const AxisZ = new THREE.Vector3(0,0,1);

const Refs = new (class RefsContainer {
  ship: React.MutableRefObject<THREE.Group> = null!;
  mesh: React.MutableRefObject<THREE.Group> = null!;
  camera: React.MutableRefObject<THREE.Camera> = null!;
  gamepad: React.MutableRefObject<GamePadController> = null!;
  constructor() {}
})

const shipState = new Speeds(
  new Velocity(5, 2.5/100, .5),
  new Velocity(2.5, 5/100),
  new Velocity(1.5, 1/100),
  {
    breakOnForward: true,
  }
  );

const inputController = new InputController(CONTROLS);
// const gamepadController = new GamePadController();

const CONTROLLERS = interpret(controllers.machine).start();

const ShipComponent: React.FC = () => {
  const ship = useRef<THREE.Group>(null!)
  const meshRef= useRef<THREE.Group>(null!);
  const axesRef= useRef<THREE.AxesHelper>(null!);

  useEffect(() => {
    Refs.ship = ship;
    Refs.mesh = meshRef;
  }, [ship])
  const inputs = useRef(inputController);
  const useMouse = useSelector(CONTROLLERS, controllers.selectors.useMouse);
  const useGamepad = useSelector(CONTROLLERS, controllers.selectors.useGamepad);
  useInputControls(inputs.current);

  useFrame(({mouse}, delta) => {
    if (!ship.current) return;
    const _ship = ship.current;
    updateShipMovement(inputs.current, mouse, delta, {useMouse, useGamepad});
    
    axesRef.current.position.set(_ship.position.x, _ship.position.y, _ship.position.z)
    axesRef.current.rotation.set(_ship.rotation.x, _ship.rotation.y, _ship.rotation.z)
  })

  const Player = useShip();
  return (
    <>
    <group ref={ship} scale={WORLD_SCALE} name="ship">
      <Player ref={meshRef}/>
    </group>
    <axesHelper ref={axesRef}/>
    <Camera />
    {/* <axesHelper ref={axesRef}/> */}
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
  useFrame(() => {
    Refs.gamepad?.current?.update();
  })
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight intensity={1.0} position={[10, 10, 10]} />
      {/* <Camera /> */}
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
  Refs.gamepad = useRef<GamePadController>(null!);

  useEffect(() => {
    CONTROLLERS.send('GAMEPADS_CHANGED', { gamepads: Refs.gamepad?.current?.gamepads ?? [] })
  }, [Refs.gamepad?.current?.gamepads]);
  useEffect(() => {
    CONTROLLERS.send('SET_GAMEPAD', { name: Refs.gamepad?.current?.activeGamepad })
  }, [Refs.gamepad?.current?.activeGamepad]);


  const useMouse = useSelector(CONTROLLERS, controllers.selectors.useMouse);
  const useGamepad = useSelector(CONTROLLERS, controllers.selectors.useGamepad);
  const gamepads = useSelector(CONTROLLERS, controllers.selectors.gamepads);
  const activeGamepad = useSelector(CONTROLLERS, controllers.selectors.activePad);
    const toggleMouse = useCallback(() => CONTROLLERS.send('TOGGLE_MOUSE'), [])
  const toggleGamepad = useCallback(() => CONTROLLERS.send('TOGGLE_GAMEPAD'), [])

  return (
    <PageLayout
      pt={0}
      withContainer={false}
      sx={{body: { height: '100%', width: '100%', position: 'absolute'}}}
      sticky={
        <ControlsUI
          mouse={useMouse}
          gamepad={useGamepad}
          toggleMouse={toggleMouse}
          toggleGamepad={toggleGamepad}
          gamepads={gamepads}
          active={activeGamepad}
        />}
      // sticky={<ShipMatrixInfo position={transform.position} rotation={transform.rotation}/>}
    >
    <Suspense fallback={<div>Loading</div>}>
      <Canvas
        ref={canvas}
        shadows
        style={{
          width: '100%',
          height: '100%',
          // cursor: 'none',
        }}
        onCreated={({gl}) => {
          gl.setClearColor(color);
          openModal({
            title: 'Controls',
            children: <ShipControlsModal />
          });
        }}
      >
        <gridHelper position={[0, -1, 0]} scale={10}  />
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
  function lerpSpeed(min:number, max: number) {
    return lerp(min, max, clamp(shipState.fwd.current / shipState.fwd.max, 0, 1));
  }
  const newZ = lerpSpeed(CAMERA_MIN_DIST, CAMERA_MAX_DIST);
  const newY = lerpSpeed(3, 1)
  const relativeCameraOffset = new THREE.Vector3(0, newY, newZ);
  let offset = relativeCameraOffset.applyMatrix4(target.matrixWorld);
  camera.position.set(offset.x, offset.y, offset.z);
  // console.info(radToDeg(target.rotation.x), radToDeg(camera.rotation.x))
  // camera.position.set(offset.x, offset.y, newZ)
  camera.lookAt(target.position);
  // camera.lookAt(0,0,0)

}

/**
 * binds the InputController (and optionally other inputs) to the dom events
 * through built-in mantine hooks
 */
function useInputControls(inputs: InputController) {
  
  useWindowEvent('keydown', inputs.update);
  useWindowEvent('keyup', inputs.update);
  useHandleDebugInputs(inputs);
}
function useHandleDebugInputs(_: InputController) {

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
        // setMouseRotation(); break;
        CONTROLLERS.send('TOGGLE_MOUSE'); break;
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

type ShipMovementOptions = {useMouse?: boolean, useGamepad?:boolean};
/** updates ship transform to reflect user inputs */
function updateShipMovement(inputs: InputController, mouse: THREE.Vector2, dt: number, opts: ShipMovementOptions) {
  const ship = Refs.ship?.current;
  if (!ship) return;

  shipState.update(inputs) //, opts.useGamepad ? gamepadController : undefined);

  const { fwd, strafe, vertical } = shipState;
  // const MAX_YAW = degToRad(15);
  ship.translateZ(fwd.current * dt);
  ship.translateX(strafe.current * dt);
  ship.translateY(vertical.current * dt);
  ship.rotateOnAxis(AxisZ, degToRad(.5) * -inputs.roll);
  // console.info(gamepadController.pan.y)
  // ship.translateZ(5* gamepadController.pan.y * delta);

  if (opts.useMouse) {
    // ship.rotateOnAxis(AxisZ, getRotation(mouse.x, ROTATION_RATE/4, dt, 0.005));
    ship.rotateOnAxis(AxisX, getRotation(-mouse.y, ROTATION_RATE, dt, 0.005));
    ship.rotateOnAxis(AxisY, -getRotation(mouse.x,ROTATION_RATE*2, dt, 0.005));
    if (Refs?.mesh?.current) {
      // Refs.mesh.current.rotation.z = degToRad(5) * strafe.current;
      Refs.mesh.current.rotation.z = degToRad(15) * mouse.x;
      Refs.mesh.current.rotation.x = degToRad(15) * -mouse.y;
    }
  }
}


const useShip = () => {
  const [avatar, setAvatar] = useState(true)
  useWindowEvent('keydown', (e) => {
    if (e.code === 'KeyT') setAvatar(p => !p)
  });
  return useMemo(() => avatar ? Ship : Viper,[avatar])
}
