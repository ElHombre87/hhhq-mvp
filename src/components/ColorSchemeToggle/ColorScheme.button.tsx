import { ActionIcon, MantineNumberSize, useMantineColorScheme } from '@mantine/core';

import { SunIcon, MoonIcon } from '@modulz/radix-icons';
import { useActionIconSize } from 'hooks/use-action-icon-size';
import useStyles from './ColorScheme.button.styles';

export interface ColorSchemeToggleProps {
  size?: MantineNumberSize;
}

export function ColorSchemeButton({ size = 'xl' }: ColorSchemeToggleProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  const iconSize = useActionIconSize(size);

  return (
    <ActionIcon
      size={size}
      className={classes.icon}
      variant="hover"
      onClick={() => toggleColorScheme()}
    >
      {colorScheme === 'dark' ? (
        <SunIcon width={iconSize} height={iconSize} />
      ) : (
        <MoonIcon width={iconSize} height={iconSize} />
      )}
    </ActionIcon>
  );
}

export default ColorSchemeButton;
