import React from 'react'
import { Button, Divider, Group } from '@mantine/core'
import { DeviceGamepad2 } from 'tabler-icons-react'

import { useInputsActive, useStateActions } from '../hooks'

import { usePlayerService } from '../hooks/use-player-service'
import { ControlButton } from './ControllerToggle.Button'
import { ControlsModalButton } from './ControlsModal.Button'

export const Toolbar: React.FC = () => {
  const service = usePlayerService()
  const active = useInputsActive(service)
  const actions = useStateActions()

  const toggleService = React.useCallback(() => { actions.toggle(!active, 'controls') }, [active])
  const activeColor = (v?: boolean) => v ? 'green' : 'red'

  return (
    <Group>
      <Button uppercase leftIcon={<DeviceGamepad2 size={18}/>} onClick={toggleService} color={activeColor(active)}>
        Controls
      </Button>
      <Divider orientation='vertical' />
      <Group position="center" grow>
        <ControlButton control='keyboard' />
        <ControlButton control='mouse' />
        <ControlsModalButton />
      </Group>
    </Group>
  )
}
