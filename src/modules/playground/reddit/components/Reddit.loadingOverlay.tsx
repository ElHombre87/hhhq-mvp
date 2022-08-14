import { Box, LoadingOverlay } from '@mantine/core';

import { useIsLoading } from '../hooks';

export const RedditLoaderOverlay: React.FC<{ relative?: boolean }> = ({ children, relative }) => {
  const isLoading = useIsLoading();

  return (
    <Box style={relative ? { position: 'relative' } : {}}>
      <LoadingOverlay visible={isLoading} />
      {children}
    </Box>
  );
};
