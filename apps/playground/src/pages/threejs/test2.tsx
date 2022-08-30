import { Suspense, useCallback, useRef, useEffect, useMemo } from "react";
import { showNotification } from "@mantine/notifications";
import { FlyControls, Sphere, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import PageLayout from "layouts/PageLayout";

import { Target } from "modules/webgl/components/3d/Target.temp";
import { useInputManager } from "modules/webgl/hooks/useInputManager";
import { PlayerShip } from "modules/webgl/components/3d/Ship.temp";
import { refs } from 'modules/webgl/machines'
import { openModal } from "@mantine/modals";
import { IInputsManager } from "modules/webgl";
import { ConfigTable } from "modules/webgl/components/ConfigTable";
// import { degToRad } from "three/src/math/MathUtils";
// import { useWindowEvent } from "@mantine/hooks";

const Scene: React.FC = ({}) => {
  const inputs = useInputManager();
  useFrame(() => {
    inputs.update();
  })
  const targetReached = useCallback(() => {
    showNotification({
      color: 'green',
      title: 'Target Reached!',
      message: 'You reached your destination',
      id: '3d__target-status',
      autoClose: 2000,
    });
  }, [])

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
      <PlayerShip />
      <Target onReached={targetReached} />
    </>
  )
}

export function openControlsModal(inputs: IInputsManager) {
  inputs.stop();
  openModal({
    size: "xl",
    trapFocus: false,
    children: <ConfigTable config={inputs.config} />,
    onClose: () => inputs.start(),
    withCloseButton: false
  });
}

export default function WebGLTestPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  useEffect(() => {
    refs.sendRef('canvas', canvasRef);
  }, [canvasRef])
  const inputs = useInputManager();
  useWindowEvent('keydown', ({code}) => {
    switch(code) {
      case 'KeyP':
        return openPauseModal(inputs);
      case 'KeyO':
        return inputs.running ? inputs.stop() : inputs.start();
    }
  })
  const color = '#2a2a2a';

  return (
    <PageLayout
      pt={0}
      withContainer={false}
      sx={{body: { height: '100%', width: '100%', position: 'absolute'}}}
    >
      <Suspense fallback={<div>Loading</div>}>
        <Canvas
          ref={canvasRef}
          shadows
          style={{ width: '100%', height: '100%' }}
          onCreated={({gl}) => {
            gl.setClearColor(color);
            openControlsModal(inputs);
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


// function useHandleDebugInputs(shipRef: ReturnType<typeof refs.useShip>) {
//   const ship = useMemo(() => shipRef?.current, [shipRef?.current])
//   useWindowEvent('keydown', ({code}) => {
//     if (!ship) return;
//     switch(code) {
//       case 'KeyZ':
//         ship.position.set(0,0,0);
//         ship.rotation.set(0,0,0);
//         // shipState.fwd.current = 0;
//         // shipState.strafe.current = 0;
//         // shipState.vertical.current = 0;
//         break;
//       case 'KeyY':
//         // setMouseRotation(); break;
//         // CONTROLLERS.send('TOGGLE_MOUSE'); break;
//       case 'Numpad4':
//         ship.rotation.set(0,degToRad(90),0); break;
//       case 'Numpad8':
//         ship.rotation.set(0,degToRad(0),0); break;
//       case 'Numpad6':
//         ship.rotation.set(0,degToRad(-90),0); break;
//       case 'Numpad2':
//         ship.rotation.set(0,degToRad(180),0); break;
//       default:
//         break;
      
//     }
//   });
// }
