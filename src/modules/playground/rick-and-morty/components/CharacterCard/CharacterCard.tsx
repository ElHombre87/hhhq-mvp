/* eslint-disable @typescript-eslint/no-use-before-define */
import { Card, Group, Title, CardProps, Divider, Image, Overlay, Badge } from '@mantine/core';
import { Cross, DeviceTv, Eye, GenderGenderfluid, Planet, Users } from 'tabler-icons-react';
import { isDarkTheme } from 'utils/theme.utils';

import type { RMCharacter } from '../../api/rest';

import { CharacterStat } from './Character.Stat';
import { CharacterAvatar } from '../CharacterAvatar';
import { useStyles } from './CharacterCard.style';

export interface CharacterCard extends Omit<CardProps<'div'>, 'children'> {
  character: RMCharacter;
}

type Location = { name: string, dimension?: string };

export const CharacterCard: React.FC<CharacterCard> = ({ character, ...props }) => {
  const { image } = character;
  const { classes, theme } = useStyles();

  const StatusBadge = (
    <Badge size="xs" radius="xs" color={color(character.status)} mr={-4}>
      {character.status}
    </Badge>
  );
  const { origin, location }: { origin: Location, location: Location } = character;
  return (
    <Card withBorder radius="md" shadow="md" {...props}>
      <Card.Section className={classes.header}>
        <Overlay opacity={0.75} blur={3} color={isDarkTheme(theme) ? '#111' : '#eee'} zIndex={1} />
        <Image src={image} alt={character.name} className={classes.image} />
      </Card.Section>
      <Group direction="column" align="center" mt={-64} spacing={0}>
        <CharacterAvatar src={image} />
        <Title order={4} mt="xs" align="center">{character.name}</Title>
      </Group>
      <Card.Section>
        <Divider my="xs" size="xs" variant="dotted" />
      </Card.Section>
      <Card.Section p="xs">
      {/* <Group noWrap spacing={1} align="stretch" direction="column"> */}
        <CharacterStat icon={Cross} value={StatusBadge} />
        <CharacterStat icon={Users} value={character.species} />
        <CharacterStat icon={GenderGenderfluid} value={character.gender} />
        {/* <Divider label="origin" labelPosition="center" variant="dotted" /> */}
        {/* <CharacterStat icon={Planet} value={character.origin.name} /> */}
        <CharacterStat icon={Planet} value={character.origin.name.split('(')[0]} />
        {origin.dimension && <CharacterStat value={origin.dimension} />}
        {/* <Divider label="last seen" labelPosition="center" variant="dotted" /> */}
        <CharacterStat icon={Eye} value={location.name.split('(')[0]} />
        {location.dimension && <CharacterStat value={location.dimension} />}
        <CharacterStat icon={DeviceTv} value={`${character.episode.length} episodes`} />
      {/* </Group> */}
      </Card.Section>
    </Card>
  );
};

// Helper functions

type Status = RMCharacter['status'];

// can be Alive, Dead, or Unknown
const isAlive = (status: Status) => status === 'Alive';
const isDead = (status: Status) => !isAlive(status) && status === 'Dead';

const color = (status: Status) => (
  isAlive(status) ? 'green' : isDead(status) ? 'red' : 'yellow'
);
