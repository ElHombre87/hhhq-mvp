import { useEffect, useMemo, useState } from 'react'

import { useWindowEvent } from '@mantine/hooks'
import { useStateActions } from './actions.hooks'

export const usePauseControls = (keyCode: string, hold: boolean = false) => {
  const { toggle } = useStateActions()

  const [active, setActive] = useState(false)
  useWindowEvent('keydown', e => {
    if (e.code === keyCode) {
      e.preventDefault()
      if (hold) return setActive(false)
      setActive(p => !p)
    }
  })
  useWindowEvent('keyup', e => {
    if (!hold) return;
    if (e.code === keyCode) setActive(true)
  })

  useEffect(() => { toggle(active, 'controls') }, [active])
  
  return useMemo(() => active, [active])
}
