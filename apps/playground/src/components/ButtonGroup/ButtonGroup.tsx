import React from 'react';
import { createStyles, Group, GroupProps, MantineSize } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme, { radius = 'md' }: { radius: MantineSize }) => ({
  root: {
    // borderRadius: 0,
    // '> *, > * input': {
    //   borderRadius: 0,
    //   // background: 'red',
    // },
    // '> *:not(:first-child), > *:not(:first-child) input': {
    //   borderLeftWidth: 0,
    // },
    // '> *:first-child, > *:first-child input': {
    //   borderTopLeftRadius: typeof radius === 'string' ? theme.radius[radius] : radius,
    //   borderBottomLeftRadius: typeof radius === 'string' ? theme.radius[radius] : radius,
    // },
    // '> *:last-child, > *:last-child input': {
    //   borderTopRightRadius: typeof radius === 'string' ? theme.radius[radius] : radius,
    //   borderBottomRightRadius: typeof radius === 'string' ? theme.radius[radius] : radius,
    // },
  },
  button: {
    borderRadius: 0,
    '&:not(:first-of-type)': {
    // '&:not(:first-of-type), &:not(:first-of-type) .mantine-Button-root': {
      borderLeftWidth: 0,
    },
    '&:first-of-type': {
    // '&:first-of-type, &:first-of-type .mantine-Button-root': {
      borderTopLeftRadius: typeof radius === 'string' ? theme.radius[radius] : radius,
      borderBottomLeftRadius: typeof radius === 'string' ? theme.radius[radius] : radius,
    },

    '&:last-of-type': {
    // '&:last-of-type, &:last-of-type .mantine-Button-root': {
      borderTopRightRadius: typeof radius === 'string' ? theme.radius[radius] : radius,
      borderBottomRightRadius: typeof radius === 'string' ? theme.radius[radius] : radius,
    },
  },
}));

export interface ButtonsGroup extends Omit<GroupProps, 'spacing'> {
  radius?: MantineSize;
  size?: MantineSize;
  children: React.ReactNode;
  disabled?: boolean;
  compact?: boolean;
}
/** Wrapper component to group and style multiple buttons as a button group
 * with a consistent border and styling override.
 */
export const ButtonsGroup = React.forwardRef<any, ButtonsGroup>(({
  radius = 'md',
  children,
  disabled,
  compact,
  ...other
}, ref) => {
    const { classes, cx } = useStyles({ radius });

    // eslint-disable-next-line max-len
    const cloneButton = (element: React.ReactElement, props = {}) =>
      React.cloneElement(element, {
        size: other.size,
        className: cx(classes.button, element.props.className),
        classNames: { input: classes.button },
        compact,
        ...props,
        ...element.props,
      });

    return (
      <Group ref={ref} spacing={-1} {...other} className={cx(classes.root, other.className)}>
        {React.Children.map(children, (maybeLink) => {
          if (!React.isValidElement(maybeLink)) {
            return maybeLink;
          }

          if (maybeLink.type === Link) {
            return React.cloneElement(maybeLink, {
              ...maybeLink.props,
              children: cloneButton(maybeLink.props.children),
            });
          }
          return cloneButton(maybeLink, maybeLink.props);
        })}
      </Group>
    );
  }
);
