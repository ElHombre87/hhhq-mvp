import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useSelector } from '@xstate/react'
import { Sphere, Stars } from '@react-three/drei'
import { closeAllModals } from '@mantine/modals'

// import { rotateOnWorldAxisWithInputs } from "../../functions/three";

import { Player } from './Player.component'
import { useControlsModal, usePauseControls, useStateActions } from '../../hooks'

import { usePlayerService } from 'modules/space/hooks/use-player-service'
import { useWindowEvent } from '@mantine/hooks'

interface Marker {
  axis: 'x'|'y'|'z'
}
const Marker: React.FC<Marker> = ({axis}) => {
  const color = axis === 'x' ? 'orange' : axis === 'y' ? 'green' : 'blue'
  const x = axis === 'x' ? 1 : 0
  const y = axis === 'y' ? 1 : 0
  const z = axis === 'z' ? 1 : 0
  return (
    <Sphere scale={[0.1, 0.1, 0.1]} position={[x, y, z]}>
      <meshBasicMaterial color={color}/>
    </Sphere>
  )
}


function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight intensity={1.0} position={[10, 10, 10]} />
      <Stars radius={500} depth={500} count={50_000}/>
      <Player position={[0,1,-1]} />
      <Marker axis="x"/>
      <Marker axis="y"/>
      <Marker axis="z"/>
      
    </>
  )
}

export const CanvasRoot: React.FC = () => {
  const player = usePlayerService()
  const actions = useStateActions()

  const inputs = useSelector(player, ({ context }) => context.inputs)

  const showControlsModal = useControlsModal(inputs as any)

  React.useEffect(() => {
    actions.start()
    return () => {
      closeAllModals()
      actions.pause()
    }
  }, [])
  usePauseControls('Escape')
  // temporary pause
  usePauseControls('KeyG', true)

  return (
    <Canvas
      camera={{ position: [0, 1, 3] }}
      style={{
        width: '100%',
        height: '100%',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000')
        showControlsModal()
      }}
    >
      <gridHelper position={[0, 0, 0]} scale={5} />
      <axesHelper />
      <Scene />
    </Canvas>
  )
}

export default CanvasRoot

/** Demo for remote player client receiving transform.
 * In this example the position is evaluated directly from the player's inputs
 * plus some shift. In a real context the values are received through websocket,
 * either directly in the component or through a state service (clientsMachine?)
 * and handled with a player/client id as a ref.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OtherPlayer = () => {
  const player = React.useRef<Mesh>(null!)
  const service = usePlayerService()
  const state = useSelector(service, ({ context }) => context.values)
  const { position, rotation } = useSelector(state, ({ context }) => context.transform)
  useFrame(() => {
    const obj = player.current
    if (!obj) return
    obj.position.x = position[0]
    obj.position.y = position[1] + 0.5
    obj.position.z = position[2] + 1
    obj.rotation.x = rotation[0]
    obj.rotation.y = rotation[1]
    obj.rotation.z = rotation[2]
  })
  return (
    <mesh ref={player} position={[0,0,0]} scale={0.5}>
      <boxGeometry />
      <meshBasicMaterial color="#33ffff"/>
    </mesh>
  )
}
