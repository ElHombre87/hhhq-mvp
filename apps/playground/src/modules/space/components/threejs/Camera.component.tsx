import { useEffect, useRef } from "react";
import { Object3D, Vector3 } from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { _Debugger } from "./_Debugger";

// import { clamp, lerp } from "three/src/math/MathUtils";
// const CAMERA_MIN_DIST = -7;
// const CAMERA_MAX_DIST = -15;


interface Camera {
  target: Object3D
}
export const FollowCamera: React.FC<Camera> = ({target}) => {
  const ref = useRef<THREE.Camera>(null!);

  useFrame(() => {
    if (ref?.current && target)
      updateFollowCamera(ref?.current, target);
  });

  return (
    <>
      <PerspectiveCamera ref={ref} makeDefault fov={70} near={0.1} far={50000} name="main-camera" />
    </>
  )
}


/** updates the active camera transform to follow the 'player' */
function updateFollowCamera(camera: THREE.Camera, target: THREE.Object3D) {
  if (!camera || !target) return;
  const newZ = 7;
  const newY = 1;
  const relativeCameraOffset = new Vector3(0, newY, newZ);
  let offset = relativeCameraOffset.applyMatrix4(target.matrixWorld);
  // camera.position.set(offset.x, offset.y, offset.z);
  camera.position.lerp(offset, 0.15)
  camera.lookAt(target.position);
  camera.rotation.copy(target.rotation)
}
