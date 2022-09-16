import { objEntries } from '../../utils'
import { InputMapping, InputsConfiguration } from '../../configuration'

export function forEachInputConfiguration<
  Axis extends string,
  Actions extends string,
  C extends InputsConfiguration<Axis, Actions> = InputsConfiguration<
    Axis,
    Actions
  >
>(config: C, callback: (input: string, binding: InputMapping) => any) {
  objEntries(config.configs).forEach(([axis, mappings]) => {
    mappings.forEach((input) => callback(axis, input))
  })
}
