import { ActionIcon, Badge, BadgeProps, Box, Button, Card, Collapse, Divider, Group, Stack, Text } from "@mantine/core"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "tabler-icons-react"
import { usePlayerTransform } from "../hooks"
import { usePlayerService } from "../hooks/use-player-service"
import { StatBadge } from "./StatBadge"
import { Toolbar } from "./Toolbar"
import { VelocityStats } from "./VelocityStats"

interface SectionButton {
  text: string;
  active: boolean;
  onClick: () => void;
}
const SectionButton: React.FC<SectionButton> = ({text, active, onClick}) => (
  <Button
    rightIcon={active ? <ChevronDown/> : <ChevronUp/>}
    onClick={onClick}
    variant="default"
    uppercase
    fullWidth
    styles={{ inner: {justifyContent: 'space-between'}}}
    >
      {text}
    </Button>
)

interface TransformBadge {
  axis: 'x'|'y'|'z'
  value: number
}
const TransformBadge: React.FC<TransformBadge & BadgeProps> = ({axis, value, ...props}) => {
  const color = axis === 'x' ? 'red' : axis === 'y' ? 'green' : 'blue'
  return (
    <Badge color={color} variant="dot" radius="sm" size="lg" leftSection={axis} {...props}>
      {value.toFixed(6)}
    </Badge>
  )
}

export const Debugger: React.FC = () => {
  const [ showVelocity, setShowVelocity ] = useState(true)
  const [ showTransform, setShowTransform ] = useState(true)
  const service = usePlayerService()
  const transform = usePlayerTransform(service)
  return (
    <Box sx={(theme) => ({position: 'absolute', bottom: theme.spacing.lg, right: theme.spacing.lg })}>
      <Card withBorder radius="sm" p={0} pb="md">
        <Card.Section p="sm">
          <Toolbar />
        </Card.Section>

        <Divider/>

        <Card.Section px="xs" py="xs">
        <SectionButton active={showVelocity} onClick={() => setShowVelocity(p => !p)} text="relative velocities"/>
          <Collapse in={showVelocity}>
            <VelocityStats />
          </Collapse>
        </Card.Section>

        <Divider/>
        <Card.Section px="xs" py="xs">
          <SectionButton active={showTransform} onClick={() => setShowTransform(p => !p)} text="Transform"/>
          <Collapse in={showTransform}>
            <Stack>
              <Divider label="Position" labelPosition="center"/>
              <Stack spacing="xs">
                <TransformBadge value={transform.position[0]} axis="x" />
                <TransformBadge value={transform.position[1]} axis="y" />
                <TransformBadge value={transform.position[2]} axis="z" />
              </Stack>
              <Divider label="Rotation" labelPosition="center"/>
              <Stack spacing="xs">
                <TransformBadge value={transform.rotation[0]} axis="x" />
                <TransformBadge value={transform.rotation[1]} axis="y" />
                <TransformBadge value={transform.rotation[2]} axis="z" />
              </Stack>
            </Stack>
          </Collapse>
        </Card.Section>
      </Card>
    </Box>
  )
}
