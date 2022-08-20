import { useInterpret, useSelector } from "@xstate/react";
import PageLayout from "layouts/PageLayout";
import { assign, createMachine } from "xstate";

import rick from 'modules/playground/rick-and-morty/api/rest'
import { Button } from "@mantine/core";
import { useEffect } from "react";

const machine = createMachine({
  id: 'test-fetch-service',
  initial: 'idle',
  context: {
    data: undefined as { name: string }|undefined,
  },
  schema: {
    events: {} as {type: 'fetch'} | {type: 'done', data: { name: string }},
    services: {} as { fetch: { data: any }},
  },
  tsTypes: {} as import("./test.typegen").Typegen0,
  states: {
    idle: {
      on: {
        fetch: 'fetching'
      },
    },
    fetching: {
      invoke: {
        id: 'fetch-data',
        src: 'fetch',
        onError: 'idle',
      },
      on: {
        done: {
          target: 'ready',
          actions: 'assignToContext'
        },
      },
    },
    ready: {
      // type: 'final',
    },
  }
}, {
  actions: {
    assignToContext: assign({ data: (ctx, evt) => evt.data })
  }
})

export default function TestPage() {
  const service = useInterpret(machine, {
    devTools: true,
    services: {
      fetch: () => async (send) => {
        const response = await rick.get.character({ id: 1 });
        const data: {name: string} = await response.json();
        await new Promise(res => setTimeout(res, 1000))
        send({type: 'done', data });
      }
    }
  });

  const text = 'fetch';
  const disabled = useSelector(service, state => state.matches('fetching') || state.matches('ready') ? true : false);
  const data = useSelector(service, ({context}) => context.data)
  const loading = useSelector(service, state => state.matches('fetching'))

  const fetch = () => service.send('fetch');

  return (
    <PageLayout>
      <Button onClick={fetch} disabled={disabled} loading={loading}>{text}</Button>
      {/* {data && <p>{data.name}</p>} */}
      {data && <p>{JSON.stringify(data)}</p>}
    </PageLayout>
  )
}
