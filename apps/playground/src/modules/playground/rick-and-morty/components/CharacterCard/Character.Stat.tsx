import { Group, Text } from '@mantine/core';
import type { Icon as TablerIcon } from 'tabler-icons-react';

import { useStyles } from './CharacterCard.style';

// eslint-disable-next-line max-len
export const CharacterStat = ({ icon: Icon, value }: { icon?: TablerIcon, value: React.ReactNode }) => {
  const { classes } = useStyles();
  return (
    <Group noWrap mt="xs" position="apart" align="center">
      {Icon && <Icon size={16} className={classes.icon} />}
      <span className={classes.statDivider} />
      <Text size="xs" color="dimmed" align="right">{value}</Text>
    </Group>
  );
};
