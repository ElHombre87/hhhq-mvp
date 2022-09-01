import { useRef, useEffect } from "react";
import { Trail } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils";

import { isNearly } from "utils/math";

import { Ship } from "modules/webgl/assets";
// import { Speeds, Velocity } from "modules/webgl/helpers/state";
import type { IInputsManager } from "modules/webgl/controllers/InputController";
import { useInputManager } from "modules/webgl/hooks/use-inputs-manager";
import { Camera } from "./Camera.temp";
import { refs } from 'modules/webgl/machines'
import { PlayerController } from "modules/webgl/controllers/PlayerController";
import { useWindowEvent } from "@mantine/hooks";

const ROTATION_RATE = 150;

const AxisX = new Vector3(1,0,0);
const AxisY = new Vector3(0,1,0);
const AxisZ = new Vector3(0,0,1);


// const state = new Speeds(
//   new Velocity(5, 2.5/100, .5),
//   new Velocity(2.5, 5/100),
//   new Velocity(1.5, 1/100),
//   {
//     breakOnForward: true,
//   }
//   );


export const PlayerShip: React.FC = () => {
  const ship = useRef<THREE.Group>(null!)
  const mesh = useRef<THREE.Group>(null!);
  const axes = useRef<THREE.AxesHelper>(null!);
  useEffect(() => {
    refs.sendRef('ship', ship);
    refs.sendRef('mesh', mesh);
  }, [ship.current, mesh.current])
  

  const inputs = useInputManager();
  const PC = useRef(new PlayerController(inputs, {
    forward: [5, 5/100, 0.0005],
    left: [2.5, 1/100, 1],
    up: [1.5, 1/100],
    yaw: [],
    pitch: [],
    roll: [],
  }))

  useWindowEvent('keydown', (e) => {
    if (e.code !== 'Tab') return
    console.info(PC.current)
    console.info('forward', PC.current.state.forward)
    console.info('left', PC.current.state.left)
    console.info('up', PC.current.state.up)
    console.info('pitch', PC.current.state.pitch)
    console.info('yaw', PC.current.state.yaw)
    console.info('roll', PC.current.state.roll)
  })

  useFrame(({}, delta) => {
    if (!ship.current) return;
    const _ship = ship.current;
    PC.current.update();
    // updateShipMovement(ship.current, mesh.current, inputs.current, mouse, delta, {useMouse, useGamepad});
    updateShipMovement(ship.current, mesh.current, PC.current, delta);
    
    axes.current.position.set(_ship.position.x, _ship.position.y, _ship.position.z)
    axes.current.rotation.set(_ship.rotation.x, _ship.rotation.y, _ship.rotation.z)
  })

  return (
    <>
    <group ref={ship} scale={0.1} name="ship">
      <Ship ref={mesh}/>
    </group>
    <axesHelper ref={axes}/>
    <Camera />
    {/* <axesHelper ref={axesRef}/> */}
    {/* <Trail
      width={1} // Width of the line
      color={'#F8D628'} // Color of the line
      length={2} // Length of the line
      decay={0.1} // How fast the line fades away
      local={true} // Wether to use the target's world or local positions
      stride={0} // Min distance between previous and current point
      interval={1} // Number of frames to wait before next calculation
      target={ship} // Optional target. This object will produce the trail.
      attenuation={(width) => width/3 * (state.fwd.current / state.fwd.max)} // A function to define the width in each point along it.
    /> */}
    </>
  )
}

function getRotation(input: number, rate: number, delta: number, deadzone = 0.05) {
  const _rate = lerp(0, degToRad(rate), Math.abs(input));
  return isNearly(input, 0, deadzone) ? 0 : input * _rate * delta;
  
}

/** updates ship transform to reflect user inputs */
function updateShipMovement(
  ship: THREE.Object3D,
  mesh: THREE.Object3D,
  // inputs: InputsManager,
  pc: PlayerController<IInputsManager>,
  dt: number,
) {
  // console.info('is mouse active ', inputs.getController('mouse')?.active ? 'yes' : 'no')
  // console.info('inputs running ', inputs?.running ? 'yes' : 'no')

  // if (!ship || !inputs?.running) return;
  if (!ship) return;

  // state.update(inputs) //, opts.useGamepad ? gamepadController : undefined);

  // const { values } = inputs;
  // const { fwd, strafe, vertical } = state;
  // const MAX_YAW = degToRad(15);
  // ship.translateZ(fwd.current * dt);
  ship.translateZ(pc.get('forward') * dt);
  // ship.translateX(strafe.current * dt);
  ship.translateX(pc.get('left') * dt);
  // ship.translateY(vertical.current * dt);
  ship.translateY(pc.get('up') * dt);
  // ship.rotateOnAxis(AxisZ, degToRad(.5) * -pc.get('roll'));
  ship.rotateOnAxis(AxisZ, degToRad(.5) * -pc.inputs.values.roll);

  if (pc.inputs.getController('mouse')?.active) {
    // ship.rotateOnAxis(AxisX, getRotation(-pc.get('pitch'), ROTATION_RATE, dt, 0.005));
    // ship.rotateOnAxis(AxisY, -getRotation(pc.get('yaw'), ROTATION_RATE*2, dt, 0.005));
    ship.rotateOnAxis(AxisX, getRotation(-pc.inputs.values.pitch, ROTATION_RATE, dt, 0.005));
    ship.rotateOnAxis(AxisY, -getRotation(pc.inputs.values.yaw, ROTATION_RATE*2, dt, 0.005));
    if (mesh) {
      // mesh.rotation.z = degToRad(15) * pc.get('yaw');
      mesh.rotation.z = degToRad(15) * pc.inputs.values.yaw;
      // mesh.rotation.x = degToRad(15) * -pc.get('pitch');
      mesh.rotation.x = degToRad(15) * -pc.inputs.values.pitch;
    }
  }
}
