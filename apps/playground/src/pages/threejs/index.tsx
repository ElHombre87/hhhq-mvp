import { Suspense } from "react";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, PerspectiveCamera, Environment, Stats } from '@react-three/drei'
import PageLayout from "layouts/PageLayout";
// import { FlakesTexture } from 'three-stdlib'
import { Avatar, Badge, Group } from '@mantine/core'
import { useWindowEvent } from '@mantine/hooks';
import { ShipProvider,ShipContextProvider , useShipContext } from "modules/webgl/context/webgl.context";
import { useSelector } from "@xstate/react";
import { selectors, inputs, machine } from "modules/webgl/state";
import { interpret } from "xstate";


const service = interpret(machine, { devTools: true }).start();
const clock = new THREE.Clock();

function update(clock: THREE.Clock, ship: THREE.Mesh) {
  const delta = clock.getDelta();


}

const relativeCameraOffset = new THREE.Vector3(0, 0, 0);


const Cube: React.FC = () => {
  // const {shipRef, setRotation, position, service } = useShipContext();
  const { shipRef, cameraRef } = useShipContext();
  const speed = useSelector(service, selectors.speed);
  const position = useSelector(service, selectors.position);
  const rotation = useSelector(service, selectors.rotation);
  const acceleration = useSelector(service, ({context}) => context.acceleration);
  const rotationSpeed = service.state.context.rotationSpeed;

  const SIZE = 1;
  useFrame(() => {
    if (!shipRef) return;
    const ship = shipRef.current;
    update(clock, shipRef.current);
    // shipRef.current!.rotation.x += 0.01;
    ship!.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotationSpeed);
    ship!.translateZ(speed);
    // ship!.position.y = position.y;
    // ship!.position.z = position.z;
    // ship!.rotation.z += 0.0005;
    service.send('SET_TRANSFORM', {
      position: ship!.position,
      // rotation: ship!.rotation
    });
    if (cameraRef) {
      const camera = cameraRef.current;
      // const offset = relativeCameraOffset.applyMatrix4(ship.matrixWorld);
      // camera.position.x = offset.x;
      // camera.position.y = offset.y;
      // camera.position.z = offset.z;

      camera.lookAt(ship.position);

    }
  });

  return (
    <mesh ref={shipRef} castShadow position={[0, SIZE/2, 0]}>
      <boxBufferGeometry args={[SIZE, SIZE, SIZE]} />
      <meshStandardMaterial color="#0391BA" />
    </mesh>
  );
};


const Scene = () => {
  const context = useShipContext();
  const {cameraRef } = context;

  return (
    <ShipContextProvider value={context}>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 15, -15]}
        rotation={[0,45,0]}
        fov={40}
        near={0.1}
        far={1000}
      />

      <Helpers/>
      <OrbitControls />

      <ambientLight intensity={0.2}/>
      <pointLight intensity={1.0} position={[10, 10, 10]} />
      <Stars />
      <Cube />
      <Environment preset="city" />
    </ShipContextProvider>
  )
}


export function Page() {
  
  const context = useShipContext();

  const { shipRef, cameraRef } = context;

  useWindowEvent('keydown', (e) => {
    const action = inputs.handleKeypress(e);
    if (action.type === 'NONE') return;
    if (action.type === 'RESET_POSITION') {
      if (!shipRef) return;
      shipRef.current!.position.x = 0;
      shipRef.current!.position.y = 0.5;
      shipRef.current!.position.z = 0;
      return;
    }
    service.send(action);
  });
  useWindowEvent('keyup', (e) => {
    const action = inputs.handleKeypress(e);
    if (action.type === 'NONE' || action.type === 'RESET_POSITION') return;

    service.send(action);
  });

  return (
    <PageLayout
      // withDevtools
      withContainer={false}
      sx={{body: {paddingTop: 0, maxHeight: '100vh', position: 'relative'}}}
      sticky={<Sticky />}
    >
      <Suspense fallback={null}>
        <Canvas shadows style={{width: '100%', height: '100vh'}}>
          <Scene />
        </Canvas>
      </Suspense>

    </PageLayout>
  )
};

export default function ThreeJSPlayground() {
  return (
    <ShipProvider>
      <Page />
    </ShipProvider>
  )
}

const Helpers = () => {
  return (
    <>
      {/* <Stats /> */}
      <axesHelper/>
      <gridHelper position={[0,0,0]} />
    </>
  )
}


const Sticky = () => {
  const position = useSelector(service, selectors.position);
  const rotation = useSelector(service, selectors.rotation);
  const state = useSelector(service, selectors.currentState);
  const speed = useSelector(service, selectors.speed);
  const acceleration = useSelector(service, ({context}) => context.acceleration);

  return (
    <Group>
      <Badge sx={{ paddingLeft: 0 }} size="lg" color="teal" leftSection={<Avatar size={24} mx={5}>Pos</Avatar>}>
        {position.x.toFixed(2)}, {position.y.toFixed(2)}, {position.z.toFixed(2)}
      </Badge>
      <Badge sx={{ paddingLeft: 0 }} size="lg" color="grape" leftSection={<Avatar size={24} mx={5}>Rot</Avatar>}>
        {rotation.x.toFixed(2)}, {rotation.y.toFixed(2)}, {rotation.z.toFixed(2)}
      </Badge>
      <Badge sx={{ paddingLeft: 0 }} size="lg" color="cyan" leftSection={<Avatar size={24} mx={5}>ACC</Avatar>}>
        {acceleration.toFixed(5)}
      </Badge>
      <Badge sx={{ paddingLeft: 0 }} size="lg" color="teal" leftSection={<Avatar size={24} mx={5}>Spe</Avatar>}>
        {speed.toFixed(5)}
      </Badge>
      <span>{state.toString()}</span>
    </Group>
  )
}
