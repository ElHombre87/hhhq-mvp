import { useWindowEvent } from '@mantine/hooks'
import { PerspectiveCamera } from '@react-three/drei'
import { GroupProps, MeshProps, useFrame } from '@react-three/fiber'
import { Ship } from 'modules/space/assets'
import { usePlayerService } from 'modules/space/hooks/use-player-service'
// import { useSelector } from '@xstate/react'
import React from 'react'
import { Group, Mesh, Object3D, Vector3, MathUtils, Euler } from 'three'
import { degToRad } from 'three/src/math/MathUtils'
import { usePlayerVelocity, useStateActions } from '../../hooks'
import { FollowCamera } from './Camera.component'
import { _Debugger } from './_Debugger'
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

function parseTransform(obj: Object3D) {
  const p = obj.position
  const r = obj.rotation
  return { position: p, rotation: r}
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
    mesh.rotation.z = MathUtils.degToRad(10* inputs.left);
    mesh.rotation.x = MathUtils.degToRad(10 * inputs.pitch);
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

export const Player: React.FC<GroupProps> = ((props) => {
  const player = React.useRef<Group>(null!)
  const mesh = React.useRef<Group>(null!)
  // const camera = React.useRef<THREE.Camera>(null!);

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
     * @dev this is a separate call because for now we're pulling
     * the evaluated transform from the scene instead of computing it outside
     * for time constraints reasons
     */
    actions.updateState(parseTransform(player.current));
  })

  return (
    <>
    <group ref={player} {...props} scale={0.25} rotation={[0, 0, 0]}>
      {/* somehow the ship mesh needs to be rotated */}
      <Ship ref={mesh} rotation={[0, Math.PI, 0]}/>
    </group>
    <FollowCamera target={player.current} />
    <_Debugger target={player.current} />
  </>
  )
})
