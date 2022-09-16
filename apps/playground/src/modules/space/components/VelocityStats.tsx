import { Stack, Group,Divider, DefaultMantineColor} from '@mantine/core'
import { useAxisConfigurations, usePlayerVelocity } from '../hooks'
import { StatBadge } from './StatBadge'
import { SpeedIndicator } from './SpeedIndicator'
import { usePlayerService } from '../hooks/use-player-service'

interface IItem<
  T extends string,
  V = Record<T, number>,
  S = Record<T, {max: number}>
> {
  axis: T,
  velocity: V,
  settings: S,
  label: string,
  color: DefaultMantineColor,
  reverse?: boolean
}

const Item = <T extends string>({axis, reverse, velocity, settings,...props}: IItem<T>) => {
  const barValues = (axis: T) => ({value: velocity[axis], max: settings[axis].max })
  return (
    <Group grow position="center" spacing="xs">
      <StatBadge value={velocity[axis]} {...props} reverse={reverse}/>
      <Group grow spacing={0}>
        <SpeedIndicator {...barValues(axis)} reverse={reverse} />
      </Group>
    </Group>
  )
}


export const VelocityStats = () => {
  const player = usePlayerService()
  const velocity = usePlayerVelocity(player)
  const settings = useAxisConfigurations(player)

  return (
    <>
      <Stack>
        <Divider label="Position" labelPosition="center"/>

        <Item settings={settings} velocity={velocity} axis="left" label="X" color="red"/>
        <Item settings={settings} velocity={velocity} axis="up" label="Y" color="green"/>
        <Item settings={settings} velocity={velocity} axis="forward" label="Z" color="blue" reverse />

        <Divider label="Rotation" labelPosition="center"/>

        <Item settings={settings} velocity={velocity} axis="pitch" label="X" color="red" />
        <Item settings={settings} velocity={velocity} axis="yaw" label="Y" color="green" reverse />
        <Item settings={settings} velocity={velocity} axis="roll" label="Z" color="blue" reverse />
      </Stack>
    </>
  )
}
