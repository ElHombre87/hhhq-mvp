import { Group, ActionIcon, Select, Tooltip, Divider, Text } from "@mantine/core"
import { useMemo } from "react";
import { DeviceGamepad2, Mouse, MouseOff } from "tabler-icons-react"

export interface ControlsUI {
  mouse: boolean;
  toggleMouse: () => void;
  gamepad: boolean;
  gamepads: string[]
  active: string;
  toggleGamepad: () => void;
}

export  const ControlsUI: React.FC<ControlsUI> = ({
  mouse,
  gamepad,
  active="",
  gamepads=[],
  toggleMouse,
  toggleGamepad,
}) => {
  const MouseIcon = mouse ? Mouse : MouseOff;
  const color = (value:boolean) => value ? 'green' : 'red';
  const _gamepads = useMemo(() => gamepads.map((name) => ({
    // removes technical id from label
    value: name, label: name.split('(')[0]
  })), [gamepads])
  return (
    <Group>
      <Text color="dimmed">Input selection</Text>
      <Tooltip label="toggle mouse" position="bottom-start">
        <ActionIcon
          size="md"
          variant="filled"
          color={color(mouse)}
          onClick={toggleMouse}
        >
          <MouseIcon/>
        </ActionIcon>
      </Tooltip>
      <Tooltip label="toggle gamepad -- disabled" position="bottom-start">
        <ActionIcon
          size="md"
          disabled
          variant="filled"
          color={color(gamepad)}
          onClick={toggleGamepad}
        >
          <DeviceGamepad2 />
        </ActionIcon>
      </Tooltip>

      <Divider orientation="vertical" />
      <div style={{flexGrow: 2}} />
      <Divider orientation="vertical" />
      <Tooltip label="select gamepad" position="bottom-start">
        <Select
          disabled
          value={active}
          data={_gamepads}
          icon={<DeviceGamepad2 />}
          placeholder="Gamepad select"
        />
      </Tooltip>
    </Group>
  )
}
