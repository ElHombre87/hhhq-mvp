import type { BoxProps } from "@mantine/core";
import { Text, Box } from "@mantine/core";

import type { THints } from "../types";
import { useHintsStyles } from "./Grid.picross.styles";

export interface Hints extends BoxProps<'div'> {
  hints: THints;
  horizontal?: boolean;
}
export const Hints: React.FC<Hints> = ({ hints, horizontal = false, ...props }) => {
  const { classes, cx } = useHintsStyles({ horizontal });
  const sectionCls = cx(classes.section, { rows: horizontal, cols: !horizontal });
  const wrapperCls = cx(classes.wrapper, props.className, { rows: horizontal, cols: !horizontal });
  return (
    <Box className={wrapperCls}>
      {hints.map((section, i) => (
        <Box key={i} className={sectionCls} {...props}>
          {section.map((hint, j) =>
            <Text key={`${i}-${j}`} size="xs" className="item">{hint}</Text>
          )}
        </Box>

      ))}
    </Box>
  );
}

