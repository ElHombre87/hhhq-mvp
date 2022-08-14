import { Button } from '@mantine/core';
import { useSelector } from '@xstate/react';
import { useRickAndMortyContext } from '../contexts';

export const FetchButton: React.FC = () => {
  const { service } = useRickAndMortyContext();

  const canFetch = useSelector(service, state => state.can('FETCH'));
  const canRetry = useSelector(service, state => state.can('RETRY'));
  // const canReload = useSelector(service, state => state.can('RELOAD'));

  const isLoading = useSelector(service, state => state.matches('fetching'));

  const { send } = service;

  return (
    <>
    {(canFetch || isLoading) && <Button loading={isLoading} onClick={() => send('FETCH')}>Fetch</Button>}
    {canRetry && <Button color="yellow" onClick={() => send('RETRY')}>Retry</Button>}
    {/* {canReload && <Button color="cyan" onClick={() => send('RELOAD')}>Reload</Button>} */}
    </>
  );
};
