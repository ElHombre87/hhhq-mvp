import { Suspense, useCallback, useRef, useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import { FlyControls, Sphere, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import PageLayout from "layouts/PageLayout";

import { Target } from "modules/webgl/components/3d/Target.temp";
import { useInputManager } from "modules/webgl/hooks/use-inputs-manager";
import { PlayerShip } from "modules/webgl/components/3d/Ship.temp";
import { refs } from 'modules/webgl/machines'
// import { degToRad } from "three/src/math/MathUtils";
import { useWindowEvent } from "@mantine/hooks";
import { usePauseSystem } from "modules/webgl/hooks/use-pause-system";
import { useShip } from "modules/webgl/machines/refs.machine";

const Scene: React.FC = ({}) => {

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

export default function WebGLTestPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  useEffect(() => refs.sendRef('canvas', canvasRef), [canvasRef]);

  const ship = useShip();
  const inputs = useInputManager();
  const { togglePause, setPause } = usePauseSystem();

  // TODO: (most of) These should be moved as Actions in the inputs bindings
  // and handled with the rest of them.
  useWindowEvent('keydown', ({code}) => {
    switch(code) {
      case 'KeyP':
        return togglePause();
      case 'KeyO':
        return inputs.running ? inputs.stop() : inputs.start();
      case 'KeyL':
        if (!ship?.current) console.info('⚠️ ship ref is missing');
        ship.current!.position.x = 0;
        ship.current!.position.y = 0;
        ship.current!.position.z = 0;
        ship.current!.rotation.x = 0;
        ship.current!.rotation.y = 0;
        ship.current!.rotation.z = 0;
    }
  })

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
            console.info('🎲⚠️ canvas ready')
            gl.setClearColor('#2a2a2a');
            setPause(true);
          }}
        >
          <gridHelper position={[0, -1, 0]} scale={5} />
          <FlyControls movementSpeed={1} />
          <Scene />
        </Canvas>
      </Suspense>
    </PageLayout>
  )
};
