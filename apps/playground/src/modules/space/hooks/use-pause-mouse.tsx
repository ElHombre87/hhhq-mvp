import { useEffect, useMemo, useState } from 'react'

import { useWindowEvent } from '@mantine/hooks'
import { useStateActions } from './actions.hooks'
import { usePlayerService } from './use-player-service'

export const usePauseMouse = (keyCode: string) => {
  const service = usePlayerService()
  const { toggle } = useStateActions(service)

  const [paused, setPause] = useState(false)
  useWindowEvent('keydown', e => {
    if (e.code === keyCode) {
      e.preventDefault()
      setPause(p => !p)
    }
  })

  useEffect(() => { toggle(paused, 'controls', 'mouse') }, [paused])
  
  return useMemo(() => paused, [paused])
}
