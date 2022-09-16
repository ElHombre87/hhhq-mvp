import PageLayout from "layouts/PageLayout"
import { Suspense } from "react"
import dynamic from "next/dynamic";
import { Group } from "@mantine/core";
import { ControlsModalButton } from "modules/space/components";
import { Debugger } from "modules/space/components/Debugger";

const Scene = dynamic(import('modules/space/components/threejs/Canvas'), { ssr: false })

const DEBUG_MODE = true

export const SpaceScenePage = () => {
  return (
    <PageLayout
      pt={0}
      withContainer={false}
      sx={{body: { height: 'calc(100% - 32px)', width: '100%', position: 'absolute'}}}
      sticky={(
        <Group position="right">
          <ControlsModalButton />
        </Group>
      )}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      {DEBUG_MODE && <Debugger/>}
    </PageLayout>
  )
}

export default SpaceScenePage
