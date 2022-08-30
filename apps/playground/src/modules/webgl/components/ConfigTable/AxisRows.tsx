import React from "react";
import { Center, Kbd, Text } from "@mantine/core";
import type { TControlConfig } from "modules/webgl/controllers/InputController/types";
import { getIcon, formatInputValue } from "./helpers";
import { deviceIcons } from "./icons";


export const AxisControl: React.FC<{ control: TControlConfig; maxCount: number }> = ({
  control,
  maxCount = 1
}) => {
  const { controller, inputs, name } = control;
  const Logo = getIcon(controller, deviceIcons);

  const length = React.useMemo(() => Array(maxCount).fill(null), [maxCount]);
  const controls = React.useMemo(
    () =>
      length.map((_, i) => {
        const key = inputs[i];
        return key ? (
          <td key={key}>
            <Text transform="uppercase" align="center" pr="xs">
              <Kbd>{formatInputValue(key, control)}</Kbd>
            </Text>
          </td>
        ) : (
          // empty cells if needed
          <td key={i}>
            <span />
          </td>
        );
      }),
    [inputs, length, control]
  );

  return (
    <tr>
      <td>
        <Text align="right" transform="uppercase">
          {name}
        </Text>
      </td>
      <td>
        <Center>
          <Logo />
        </Center>
      </td>
      {controls}
    </tr>
  );
};

export const AxisRows: React.FC<{
  axis: string;
  controls: TControlConfig[];
  maxCount: number;
}> = ({ axis, controls, maxCount }) => {
  return (
    <>
      {controls.map((control) => {
        const key = `${axis}-${control.controller}-${control.inputs.join("_")}`;
        return <AxisControl key={key} control={control} maxCount={maxCount} />;
      })}
    </>
  );
};
