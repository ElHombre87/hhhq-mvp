import React from 'react';
import { Switch, Group, useMantineColorScheme, MantineSize } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';
import { useActionIconSize } from 'hooks/use-action-icon-size';
import useStyles from './ColorScheme.switch.styles';

export function ColorSchemeSwitch({ size = 'md' }: { size: MantineSize }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes, cx } = useStyles();
  const iconSize = useActionIconSize(size);

  return (
    <Group position="center" my={30}>
      <div className={classes.root}>
        <Sun className={cx(classes.icon, classes.iconLight)} size={iconSize} />
        <MoonStars className={cx(classes.icon, classes.iconDark)} size={iconSize} />
        <Switch size={size} checked={colorScheme === 'dark'} onChange={() => toggleColorScheme()} />
      </div>
    </Group>
  );
}
