import { Box } from '@mantine/core';
import { Welcome } from 'components/Welcome';

export default function HomePage() {
  return (
    <Box sx={{ height: '100%', display: 'grid', alignContent: 'center', justifyContent: 'center' }}>
        <Welcome />
    </Box>
  );
}
