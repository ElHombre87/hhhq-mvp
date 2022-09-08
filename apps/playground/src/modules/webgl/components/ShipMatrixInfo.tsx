import { Avatar, Badge, Group } from "@mantine/core"
import { Vector3, Euler } from "three";

export interface ShipMatrixInfo {
  position: Vector3;
  rotation: Euler;
}

export const ShipMatrixInfo: React.FC<ShipMatrixInfo> = ({position = new Vector3(), rotation = new Euler()}) => {
  return (
    <Group>
      {position &&
      <Badge sx={{ paddingLeft: 0 }} size="lg" color="teal" leftSection={<Avatar size={24} mx={5}>Pos</Avatar>}>
        {position.x.toFixed(2)}, {position.y.toFixed(2)}, {position.z.toFixed(2)}
      </Badge>
      }
      {rotation &&
      <Badge sx={{ paddingLeft: 0 }} size="lg" color="grape" leftSection={<Avatar size={24} mx={5}>Rot</Avatar>}>
        {rotation.x.toFixed(2)}, {rotation.y.toFixed(2)}, {rotation.z.toFixed(2)}
      </Badge>
      }
      {/* <Badge sx={{ paddingLeft: 0 }} size="lg" color="cyan" leftSection={<Avatar size={24} mx={5}>ACC</Avatar>}>
        {acceleration.toFixed(5)}
      </Badge>
      <Badge sx={{ paddingLeft: 0 }} size="lg" color="teal" leftSection={<Avatar size={24} mx={5}>Spe</Avatar>}>
        {speed.toFixed(5)}
      </Badge> */}
    </Group>
  )
}
