import { Suspense, useRef } from "react";
import * as THREE from 'three';
import { Canvas, useFrame, applyProps } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, OrbitControls, Environment, FlyControls, Plane, PerspectiveCamera } from '@react-three/drei'
// import { FlakesTexture } from 'three-stdlib'


const Cube: React.FC = () => {
  const cube = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    cube.current!.rotation.x += 0.01;
    cube.current!.rotation.y += 0.005;
  });

  return (
    <mesh ref={cube} castShadow position={[0, 3, 0]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0391BA" />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5}/>
      <pointLight intensity={1.0} position={[10, 10, 10]} />
      <Cube />
      <Environment preset="city" />
      <Plane args={[100,100,1,1]} position={[0, 0, 0]} rotation={[0, 90, 0]} receiveShadow />
    </>
  );
};

const Renderer = () => (
  <Canvas
    shadows
    // camera={{ fov: 75, near: 0.1, far: 1000, position: [0,-25,1], rotation: [0, 0, -15] }}
    // onCreated={({ gl }) => gl.setClearColor("#252934")}
    style={{ height: '100%', background: '#ffa500' }}
  >
    <PerspectiveCamera makeDefault={true} position={[0, 5, 5]} />
    {/* <Stats /> */}
    <axesHelper />
    <gridHelper />
    <OrbitControls />
    {/* <FlyControls /> */}
    <Suspense fallback={null}>
      <Scene />
      {/* <AccumulativeShadows temporal frames={100} color="orange" colorBlend={2} toneMapped={true} alphaTest={0.9} opacity={2} scale={12} position={[0, -0.5, 0]}>
        <RandomizedLight amount={8} radius={4} ambient={0.5} intensity={1} position={[5, 5, -10]} bias={0.001} />
      </AccumulativeShadows> */}
    </Suspense>
  </Canvas>
)

export default function ThreeJSPlayground() {
  return <Renderer />
};
