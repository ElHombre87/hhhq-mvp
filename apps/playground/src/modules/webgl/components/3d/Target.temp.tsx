import { showNotification } from "@mantine/notifications";
import { Center, Float, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { refs } from 'modules/webgl/machines'

const WORLD_SCALE = 0.1;

export interface Target {
  onReached: () => void;
}

export const Target: React.FC<Target> = ({ onReached }) => {
  const ref = useRef<THREE.Group>(null!);
  useEffect(() => {
    refs.sendRef('target', ref);
  }, [ref.current])
  const ship = refs.useShip();

  const [inRange, setInRange] = useState<boolean>(false);

  useFrame(() => {
    if (!ship) return;
    setInRange(ref.current?.position.distanceTo(ship?.current.position) < 0.5);
    ref.current.rotation.y += degToRad(.05);
  })

  useEffect(() => {
    if (inRange) {
      onReached();
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
