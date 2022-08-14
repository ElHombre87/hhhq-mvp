import { Center, TextInput, ActionIcon, Tooltip, Code } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Search, Recycle } from 'tabler-icons-react';
import { useActions, useIsLoading } from '../hooks';

export const RedditForm: React.FC<{ withReset?: boolean }> = ({ withReset }) => {
  const actions = useActions();

  const form = useForm({
    initialValues: {
      subreddit: '',
    },
    validate: {
      subreddit: (value: string) => (value.length > 0 ? undefined : 'Subreddit is required'),
    },
  });

  const handleSubmit = ({ subreddit }: typeof form.values) => {
    actions.selectSubreddit(subreddit);
  };
  const reset = () => {
    actions.selectSubreddit('');
    form.setFieldValue('subreddit', '');
  };
  const isLoading = useIsLoading();
  const btnDisabled = isLoading || !form.values.subreddit;

  const SendButton = (
    // <Tooltip label="Search" withArrow openDelay={750} zIndex={3000}>
    <ActionIcon
      type="submit"
      color="primary"
      variant="filled"
      component="button"
      disabled={btnDisabled}
    >
      <Search size={16} />
    </ActionIcon>
    // </Tooltip>
  );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Center>
        <TextInput
          disabled={isLoading}
          // variant="filled"
          icon={<Code>r/</Code>}
          rightSection={SendButton}
          placeholder="type your subreddit"
          autoComplete="off"
          {...form.getInputProps('subreddit')}
        />
        {withReset && (
          <Tooltip withArrow label="reset" position="bottom" openDelay={750} zIndex={3000}>
            <ActionIcon
              color="red"
              size="md"
              ml="md"
              variant="light"
              onClick={reset}
              disabled={isLoading || !form.values.subreddit}
            >
              <Recycle size={18} />
            </ActionIcon>
          </Tooltip>
        )}
      </Center>
    </form>
  );
};
