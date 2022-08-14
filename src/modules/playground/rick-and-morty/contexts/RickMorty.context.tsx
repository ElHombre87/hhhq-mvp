import { useMantineTheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useInterpret } from '@xstate/react';
import utils from 'utils';
import { InterpreterFrom } from 'xstate';
// import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { rickAndMortyFetcherMachine } from '../machines';
import * as services from '../services';

// import { client } from '../api';

export interface TRickMortyContext {
  service: InterpreterFrom<typeof rickAndMortyFetcherMachine>;
  // api: ApolloClient<NormalizedCacheObject>
}

// eslint-disable-next-line max-len
const [Provider, useRickAndMortyContext] = utils.createUseContext<TRickMortyContext>({} as TRickMortyContext);

export const RickAndMortyProvider:React.FC = ({ children }) => {
  const theme = useMantineTheme();
  const service = useInterpret(rickAndMortyFetcherMachine, {
    devTools: true,
    services: {
      fetchData: ({ query }) => services.getAllCharacters(query),
    },
    actions: {
      notifyError(_, event) {
        showNotification({
          title: `Error while Splooshing data ${(event.data as Error).name}`,
          message: (event.data as Error).message,
          color: utils.theme.getColor(theme, 'error'),
        });
      },
      notifyTimeout: () => {
        showNotification({
          title: 'Splooshing timed out',
          message: 'Try again later',
          color: utils.theme.getColor(theme, 'warning'),
        });
      },
    },
  });

  return (
    <Provider value={{ service }}>{children}</Provider>
  );
};

export { useRickAndMortyContext };

export function useRickAndMortyService() {
  const { service } = useRickAndMortyContext();
  return service;
}
// export function useRickAndMortyApi() {
//   const { api } = useRickAndMortyContext();
//   return api;
// }
