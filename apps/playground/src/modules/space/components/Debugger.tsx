import { Box, Card, Text } from "@mantine/core"
import { Toolbar } from "./Toolbar"
import { VelocityStats } from "./VelocityStats"

export const Debugger: React.FC = () => {
  return (
    <Box sx={(theme) => ({position: 'absolute', bottom: theme.spacing.lg, right: theme.spacing.lg })}>
      <Card withBorder radius="sm" p="xl">
        <Card.Section p="sm">
          <Toolbar />
        </Card.Section>
        <Card.Section px="sm" pb="lg">
          <VelocityStats />
        </Card.Section>
      </Card>
    </Box>
  )
}
