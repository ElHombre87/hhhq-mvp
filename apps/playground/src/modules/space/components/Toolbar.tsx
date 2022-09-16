import React from 'react'
import { ActionIcon, Button, Group, Stack } from '@mantine/core'
import { DeviceGamepad2, Keyboard, Mouse, TableAlias } from 'tabler-icons-react'

import type { TControllerType } from '../configuration'

import { useControlsModal } from '../hooks/use-controls-modal'
import { useControllersStatus, useInputsActive, useStateActions } from '../hooks'

import { usePlayerService } from '../hooks/use-player-service'

export const Toolbar: React.FC = () => {
  const service = usePlayerService()
  const active = useInputsActive(service)
  const controllers = useControllersStatus(service)
  const actions = useStateActions(service)

  /** TODO: refactor the controls modal with mantine ContextModal API so we can call them `by name` */
  const showControlsModal = useControlsModal()

  const toggleService = React.useCallback(() => {
    actions.toggle(!active, 'controls')
  }, [active])

  const toggleController = React.useCallback((controller: TControllerType) => {
    actions.toggle(!controllers[controller], 'controls', controller)
  }, [controllers])
  const activeColor = (v?: boolean) => v ? 'green' : 'red'

  return (
    <Stack>
      <Button uppercase leftIcon={<DeviceGamepad2 size={18}/>} onClick={toggleService} color={activeColor(active)}>
        {active ? 'Running' : 'Stopped'}
      </Button>
      <Group position="center" grow>
        <ActionIcon
          disabled={!active}
          size="lg" variant="filled"
          onClick={() => toggleController('keyboard')}
          color={activeColor(controllers.keyboard)}
          >
          <Keyboard />
        </ActionIcon>
        <ActionIcon
          disabled={!active}
          size="lg" variant="filled"
          onClick={() => toggleController('mouse')}
          color={activeColor(controllers.mouse)}>
          <Mouse />
        </ActionIcon>
        <ActionIcon variant="filled" size="lg" onClick={showControlsModal}>
        <TableAlias/>
      </ActionIcon>
      </Group>
    </Stack>
  )
}
