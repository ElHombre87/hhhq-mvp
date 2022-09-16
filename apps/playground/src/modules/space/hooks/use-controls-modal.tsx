import { openModal } from '@mantine/modals'
import { useCallback } from 'react'

import { ConfigTable } from '../components/ConfigTable'
import { useInputsConfiguration } from './configurations.hooks'
import { usePlayerService } from './use-player-service'


const _options = { pause: true, resume: true }

export const useControlsModal = (options = _options) => {
  const opts = { ...options, _options }
  const service = usePlayerService()
  const config = useInputsConfiguration(service)

  const pauseFn = useCallback(() => service.send('INPUTS_STOP'), [opts.pause])
  const startFn = useCallback(() => opts.resume && service.send('INPUTS_START'), [opts.resume])

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
