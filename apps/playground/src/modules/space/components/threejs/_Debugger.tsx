import { AxesHelperProps, useFrame } from "@react-three/fiber";
import React from "react";
import { Vector3, Euler } from "three";

export interface DebuggerProps extends AxesHelperProps {
  target: THREE.Object3D, offset?: THREE.Vector3
}
export const _Debugger: React.FC<DebuggerProps> = ({target, offset = new Vector3(), ...props}) => {
  const axes = React.useRef<THREE.AxesHelper>(null!);
  const dummyP = React.useRef<THREE.Vector3>(new Vector3());
  const dummyR = React.useRef<THREE.Euler>(new Euler());

  useFrame(() => {
    if (!target) return;
    const pos = dummyP.current;
    const rot = dummyR.current

    pos.copy(target.position).add(offset)
    rot.copy(target.rotation)
    axes.current.position.set(pos.x, pos.y, pos.z)
    axes.current.rotation.set(rot.x, rot.y, rot.z)
  })
  return (
    <axesHelper ref={axes} {...props}/>
  )
}
