import { useWindowEvent } from '@mantine/hooks'
import { PerspectiveCamera } from '@react-three/drei'
import { GroupProps, MeshProps, useFrame } from '@react-three/fiber'
import { Ship } from 'modules/space/assets'
import { usePlayerService } from 'modules/space/hooks/use-player-service'
// import { useSelector } from '@xstate/react'
import React from 'react'
import { Group, Mesh, Object3D, Vector3, MathUtils } from 'three'
import { usePlayerVelocity, useStateActions } from '../../hooks'
interface Values {
  yaw: number;
  pitch: number;
  roll: number;
  forward: number;
  left: number;
  up: number;
}

const AX = new Vector3(1, 0, 0)
const AY = new Vector3(0, 1, 0)
const AZ = new Vector3(0, 0, 1)

// export const initialRotation = new Euler(degToRad(45), 0, degToRad(45));
function parseTransform(obj: Object3D): {position: [number, number, number], rotation: [number, number, number]} {
  const p = obj.position
  const r = obj.rotation
  return { position: [p.x, p.y, p.z], rotation: [r.x, r.y, r.z] }
}

function updateObjectTransform(object: Object3D, mesh: Object3D, inputs: Values, dt: number) {
  if (!object) return
  object.rotateOnAxis(AY, inputs.yaw * dt)
  object.rotateOnAxis(AX, inputs.pitch * dt)
  object.rotateOnAxis(AZ, (Math.PI / 2) * inputs.roll * dt)
  object.translateX(inputs.left * dt)
  object.translateY(inputs.up * dt)
  object.translateZ(inputs.forward * dt)
  if (mesh) {
    mesh.rotation.z = MathUtils.degToRad(5* -inputs.left);
    mesh.rotation.x = MathUtils.degToRad(5 * inputs.pitch);
  }
}
function centerObject(object: Object3D) {
  if (!object) return
  object.position.x = 0
  object.position.y = 0
  object.position.z = 0
  object.rotation.x = 0
  object.rotation.y = 0
  object.rotation.z = 0
}

/** updates the active camera transform to follow the 'player' */
function updateFollowCamera(camera: THREE.Camera, target: THREE.Object3D) {
  if (!camera || !target) return;
  const newZ = -7;
  const newY = 2;
  const relativeCameraOffset = new Vector3(0, newY, newZ);
  let offset = relativeCameraOffset.applyMatrix4(target.matrixWorld);
  camera.position.set(offset.x, offset.y, offset.z);
  camera.lookAt(target.position);
}


export const Player: React.FC<GroupProps> = ((props) => {
  const player = React.useRef<Group>(null!)
  const mesh = React.useRef<Group>(null!)
  const camera = React.useRef<THREE.Camera>(null!);

  const service = usePlayerService()
  const velocity = usePlayerVelocity(service)
  const actions = useStateActions()

  /** @debug event listener for debugging and bug fixing */
  useWindowEvent('keypress', (e) => {
    if (e.code === 'KeyT') {
      centerObject(player!.current)
      actions.resetState()
    }
  })

  // useFrame(() => player.send('UPDATE'))
  useFrame(() => actions.update())

  useFrame((_, dt) => {
    if (!player.current || !mesh.current) return
    updateObjectTransform(player.current, mesh.current, velocity, dt)
    /**
     * @dev this is a separate object because for now we're pulling
     * the evaluated transform from the scene instead of computing it outside
     * for time constraints reasons
     */
    actions.updateState(parseTransform(player.current));
    if (camera?.current && player?.current)
      updateFollowCamera(camera?.current, player?.current);
  })

  return (
    <>
    <group ref={player} {...props} scale={0.25} rotation={[0, 0, 0]}>
      <Ship ref={mesh}/>
    </group>
    <PerspectiveCamera ref={camera} makeDefault fov={70} near={0.1} far={50000} name="main-camera" />
    <Debugger target={player.current} />
  </>
  )
})

const Debugger: React.FC<{target: THREE.Object3D}> = ({target}) => {
  const axes = React.useRef<THREE.AxesHelper>(null!);
  useFrame(({}) => {
    if (!target) return;
    axes.current.position.set(target.position.x, target.position.y, target.position.z)
    axes.current.rotation.set(target.rotation.x, target.rotation.y, target.rotation.z)
  })
  return (
    <axesHelper ref={axes}/>
  )
}
