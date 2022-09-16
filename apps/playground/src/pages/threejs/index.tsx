import PageLayout from "layouts/PageLayout"
import { Suspense } from "react"
import dynamic from "next/dynamic";
import { Group } from "@mantine/core";
import { ControlButton } from "modules/space/components";

const Scene = dynamic(import('modules/space/components/threejs/Canvas'), { ssr: false })

export const SpaceScenePage = () => {
  return (
    <PageLayout
      pt={0}
      withContainer={false}
      sx={{body: { height: '100%', width: '100%', position: 'absolute'}}}
      sticky={(
        <>
          <Group>
            <ControlButton control="keyboard" />
            <ControlButton control="mouse" />
          </Group>
        </>
      )}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </PageLayout>
  )
}

export default SpaceScenePage
