import React, { forwardRef } from "react";
import { Box, Divider, Kbd, Table, Text } from "@mantine/core";
import { text } from "utils/format";
import { CONTROLS } from "../config/inputs";

const Cell = forwardRef<HTMLTableCellElement, {children: React.ReactElement}>((props, ref) => (
  <td ref={ref} style={{borderBottom: 'none'}} {...props}/>
))

export const ShipControlsModal: React.FC = () => {
  /** format the action name and keybidings properly to be shown to the user */
  const controls = Object.entries(CONTROLS).reduce((p, [action, bindings]) => {
    // split action from camel case and uppercase it all. turnLeft -> 'TURN LEFT'
    const formattedAction = text.splitCamelCase(action).join(' ').toUpperCase();
    return {
      ...p,
      [formattedAction]: bindings.map(binding => {
        // split key binding from camel case and remove irrelevant parts.
        // KeyA -> 'A'
        const split = text.splitCamelCase(binding);
        if (split[0] === 'Key') return split[1];
        return split.join(' ').toUpperCase();
      })
    };
    }, {} as {[key: string]: string[]});

  return (
    <Box>
    <Table verticalSpacing={4}>
      <tbody>
        {Object.entries(controls).map(([action, bindings]) => (
          <tr key={action}>
            <Cell><Text>{action}</Text></Cell>
            {bindings.map(key => <Cell key={`${action}-${key}`}><Kbd>{key}</Kbd></Cell>)}
          </tr>
        ))}
      </tbody>
    </Table>

    <Divider label="dev tools" my="md" labelPosition="center"/>
    <Table captionSide="bottom">
      <caption>Temporary controls for development purpose</caption>
      <tbody>
      <tr>
        <Cell><Text>RESET SHIP</Text></Cell>
        <Cell><Kbd>Z</Kbd></Cell>
        </tr>
      <tr>
        <Cell><Text>TOGGLE MOUSE</Text></Cell>
        <Cell><Kbd>Y</Kbd></Cell>
      </tr>
      </tbody>
    </Table>

    </Box>
  )
}
