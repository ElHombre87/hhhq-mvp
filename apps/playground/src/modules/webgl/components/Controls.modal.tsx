import { Box, Divider, Kbd, Table, Text } from "@mantine/core";
import { text } from "utils/format";
import { CONTROLS } from "../config/inputs";

export const ShipControlsModal: React.FC = () => {

  return (
    <Box>
    <Table>
      {Object.entries(CONTROLS).map(([k,v]) => {
        const keys = v.map(binding => {
          const split = text.splitCamelCase(binding);
          if (split[0] === 'Key') return split[1]
          return split.join(' ');
        });
        return (
          <tr>
            <td><Text key={k}>{text.splitCamelCase(k).join(' ').toUpperCase()}</Text></td>
            {keys.map(key => <td key={`${k}-${key}`}><Kbd>{key}</Kbd></td>)}
          </tr>
        )
      })}
    </Table>
    <Divider label="dev tools" my="md" labelPosition="center"/>
    <Table>
      <tr>
        <td><Text>RESET SHIP</Text></td>
        <td><Kbd>Z</Kbd></td>
        </tr>
      <tr>
        <td><Text>TOGGLE MOUSE</Text></td>
        <td><Kbd>Y</Kbd></td>
      </tr>
    </Table>
    </Box>
  )
}
