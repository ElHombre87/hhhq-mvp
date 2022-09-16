import { useCallback } from "react"
import { TControllerType } from "modules/space/configuration";
import { usePlayerService } from "modules/space/hooks/use-player-service";
import { useControllersStatus, useStateActions } from "modules/space/hooks";
import { Keyboard, Mouse } from "tabler-icons-react";
import { ActionIcon } from "@mantine/core";

const Icons = { keyboard: Keyboard, mouse: Mouse }

export const ControlButton: React.FC<{control: TControllerType}> =({control}) => {
  const service = usePlayerService()
  /** @dev this hook needs to be fixed and put into context */
  const actions = useStateActions()
  const controllers = useControllersStatus(service)
  const toggleController = useCallback(() => {
    actions.toggle(!controllers[control], 'controls', control)
  }, [controllers])
  const activeColor = (v?: boolean) => v ? 'green' : 'red'

  const Icon = Icons[control]

  return (
    <ActionIcon
      size="lg" variant="filled"
      onClick={toggleController}
      color={activeColor(controllers[control])}
      >
      <Icon />
    </ActionIcon>
  )
}
