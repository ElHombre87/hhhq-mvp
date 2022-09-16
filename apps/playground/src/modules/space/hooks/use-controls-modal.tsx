import { openModal } from '@mantine/modals'
import { useCallback } from 'react'

import { ConfigTable } from '../components/ConfigTable'
import { useStateActions } from './actions.hooks'
import { useInputsConfiguration } from './configurations.hooks'
import { usePlayerService } from './use-player-service'


const _options = { pause: true, resume: true }

export const useControlsModal = (options = _options) => {
  const opts = { ...options, _options }
  const service = usePlayerService()
  const config = useInputsConfiguration(service)
  const actions = useStateActions()

  const pauseFn = useCallback(() => actions.pause('controls'), [opts.pause])
  const startFn = useCallback(() => opts.resume && actions.start('controls'), [opts.resume])

  return () => {
    if (opts.pause) pauseFn()

    openModal({
      onClose: startFn,
      size: 'xl',
      trapFocus: false,
      children: <ConfigTable config={config} />,
      withCloseButton: false,
      centered: true
    })
  }
}
