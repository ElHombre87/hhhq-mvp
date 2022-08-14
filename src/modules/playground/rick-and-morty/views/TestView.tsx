/* eslint-disable no-console */
import { Box, Grid, LoadingOverlay } from '@mantine/core';
import { useSelector } from '@xstate/react';
import { RMCharacter } from '../api';
// import api from '../api';
import { CharacterCard } from '../components';
import { useRickAndMortyContext } from '../contexts';

const CharactersGrid: React.FC<{ characters: RMCharacter[] }> = ({ characters }) => (
  <>
  {characters.map(character => (
  <Grid.Col xl={1} span={2} sx={{ minWidth: 275 }} key={character.id}>
    <CharacterCard key={character.id} character={character} sx={{ height: '100%' }} />
  </Grid.Col>
  ))}
  </>
);

export const RickAndMorty: React.FC = () => {
  const { service } = useRickAndMortyContext();

  const loading = useSelector(service, state => state.matches('fetching'));
  const characters = useSelector(service, state => state.context.data) as RMCharacter[] | undefined;

  return (
    <Box sx={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
      <Grid gutter="md" justify="center">
        {characters && <CharactersGrid characters={characters} />}
      </Grid>
    </Box>
  );
};

// export default RickAndMorty;
