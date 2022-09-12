import React from "react";
import { createStyles, Table, Text } from "@mantine/core";


import type { TConfiguration } from "modules/webgl/libs/types";
import {  getMaxInputsCount } from "./helpers";
import { AxisRows } from "./AxisRows";

const useStyles = createStyles((theme) => ({
  table: {
    thead: {
      borderBottom: `1px solid ${theme.colors.dark[5]}`
    },
    "tbody tr td:not(:last-of-type)": {
      borderRight: `1px solid ${theme.colors.dark[5]}`
    }
  }
}));

export const ConfigTable: React.FC<{ config: TConfiguration}> = ({
  config
}) => {
  const { classes } = useStyles();
  // max number of inputs on any axis configured. value used to determine col span of table cells
  // when the count is less than the max, to properly render the table
  const maxCount = React.useMemo(() => getMaxInputsCount(config), [config]);
  return (
    <Table highlightOnHover className={classes.table}>
      <caption>
        <Text transform="uppercase" color="dimmed">
          Input mappings
        </Text>
        <Text color="dimmed">These are your set inputs.</Text>
        <Text span>Click outside of this window to continue.</Text>
      </caption>

      <tbody>
        {Object.entries(config).map(([axis, controls]) => (
          <AxisRows
            key={axis}
            controls={controls}
            axis={axis}
            maxCount={maxCount}
          />
        ))}
      </tbody>
    </Table>
  );
};
