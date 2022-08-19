import { Box, LoadingOverlay } from '@mantine/core';

import { useIsLoading } from '../hooks';
import { RedditChips } from './Reddit.chips';
import { RedditForm } from './Reddit.form';
import useStyles from './Reddit.styles';

export interface RedditHeader {
  withChips?: boolean;
  withScroll?: boolean;
}

export const RedditHeader: React.FC<RedditHeader> = ({ withChips, withScroll }) => {
  const { classes } = useStyles();
  const isLoading = useIsLoading();

  return (
    <Box className={classes.header}>
      <LoadingOverlay visible={isLoading} />
      <RedditForm />
      {withChips && <RedditChips withScroll={withScroll} />}
    </Box>
  );
};
