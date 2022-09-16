import { ActionIcon } from "@mantine/core"
import { TableAlias } from "tabler-icons-react"
import { useControlsModal } from '../hooks/use-controls-modal'

export const ControlsModalButton = () => {
  /** TODO: refactor the controls modal with mantine ContextModal API so we can call them `by name` */
  const showControlsModal = useControlsModal()

  return (
    <ActionIcon variant="filled" size="lg" onClick={showControlsModal}>
      <TableAlias/>
    </ActionIcon>
  )
}
