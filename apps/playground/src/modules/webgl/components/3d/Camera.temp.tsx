import { MutableRefObject, useEffect, useRef } from "react";
import { Vector3 } from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { refs } from 'modules/webgl/machines'

// import { clamp, lerp } from "three/src/math/MathUtils";
// const CAMERA_MIN_DIST = -7;
// const CAMERA_MAX_DIST = -15;


interface Camera {
}

export const Camera: React.FC<Camera> = ({}) => {
  const ref = useRef<THREE.Camera>(null!);
  const ship = refs.useShip()
  useEffect(() => {
    refs.sendRef('camera', ref);
  }, [ref])

  useFrame(() => {
    if (ref?.current && ship?.current)
      updateFollowCamera(ref?.current, ship?.current);
  });

  return (
    <PerspectiveCamera ref={ref} makeDefault fov={70} near={0.1} far={50000} name="main-camera" />
  )
}


/** updates the active camera transform to follow the 'player' */
function updateFollowCamera(camera: THREE.Camera, target: THREE.Object3D) {
  if (!camera || !target) return;
  // TODO: Provide shipState (Speeds object with actual velocity states)
  // function lerpSpeed(min:number, max: number) {
  //   return lerp(min, max, clamp(shipState.fwd.current / shipState.fwd.max, 0, 1));
  // }
  // const newZ = lerpSpeed(CAMERA_MIN_DIST, CAMERA_MAX_DIST);
  // const newY = lerpSpeed(3, 1)
  const newZ = 5;
  const newY = 2;
  const relativeCameraOffset = new Vector3(0, newY, newZ);
  let offset = relativeCameraOffset.applyMatrix4(target.matrixWorld);
  camera.position.set(offset.x, offset.y, offset.z);
  // console.info(radToDeg(target.rotation.x), radToDeg(camera.rotation.x))
  // camera.position.set(offset.x, offset.y, newZ)
  camera.lookAt(target.position);
  // camera.lookAt(0,0,0)
}
