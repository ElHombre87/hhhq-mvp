// import { createControlsMachine } from './machines/Controls'
import { createLocalPlayerMachine } from './machines'
import { inputs, AXIS, ACTIONS, axisSettings } from './config'
import { interpret } from 'xstate'

const machine = createLocalPlayerMachine( AXIS, ACTIONS, inputs, axisSettings)

export const service = interpret(machine).start()

export default service
