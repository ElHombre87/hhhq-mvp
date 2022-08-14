import { useMemo } from 'react';
import { Group, Pagination } from '@mantine/core';
import { useSelector } from '@xstate/react';
// import { FetchButton } from '../FetchButton';

import { useRickAndMortyContext } from '../../contexts';
import { FilterForm, FilterFormValues } from './Form';

type Context = ReturnType<typeof useRickAndMortyContext>['service']['state']['context'];

const selectInfo = (context:Context) => context.info as typeof context.info & { next?:number };

export const RickAndMortyToolbar: React.FC = () => {
  const { service } = useRickAndMortyContext();

  // eslint-disable-next-line max-len
  const info = useSelector(service, ({ context }) => selectInfo(context) || {});
  const idle = useSelector(service, ({ matches }) => matches('idle'));
  const loading = useSelector(service, ({ matches }) => matches('fetching'));
  const error = useSelector(service, ({ matches }) => matches('error') || matches('timeout'));

  // count: 826, pages: 42, next: 2, prev: null

  const handlePaginationChange = (page: number) => {
    service.send(idle ? 'FETCH' : 'RETRY', { page });
  };
  const handleSubmit = (values: FilterFormValues) => {
    service.send(idle ? 'FETCH' : 'RETRY', { ...values, page: 1 });
  };

  const currentpage = useMemo(() => {
    if (!info) return 0;
    if (!info.next) return info.pages;
    return info.next > 1 ? info.next - 1 : 1;
  }, [info?.next, info?.pages]);

  return (
    <>
    <FilterForm loading={loading} error={error} onSubmit={handleSubmit} />
    <Group position="center" mt="xs">
      {info && info.pages > 1 && (
        <Pagination
          withEdges
          siblings={2}
          total={info.pages}
          onChange={handlePaginationChange}
          page={currentpage}
          initialPage={1}
        />
      )}
    </Group>
    </>
  );
};
