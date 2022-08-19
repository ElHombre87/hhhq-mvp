import { Options, PaginatedResponse, PaginationInfo } from '../api/rest/api.types';
import { RMCharacter } from '../api/types/rest.types';

/**
 * Context type for the api machine
 */
export type ApiContext = {
  error?: string | null;
  info?: PaginationInfo | null;
  data?: RMCharacter[];
  lastUpdated?: number | undefined;
  query?: Options<'character'>
};

export type ApiServices = {
  fetchData: { data: PaginatedResponse<RMCharacter> };
};

export type ApiEvent =
  | { type: 'FETCH' } & Options<'character'>
  | { type: 'RETRY' };

// export type ApiTypeStates =
//   | {
//     value: 'idle',
//     context: ApiContext
//     }
//   | {
//     value: 'fetching',
//     context: ApiContext
//   }
//   | {
//     value: 'success',
//     context: ApiContext & { lastUpdated: number, data: Character | Location | Episode }
//   }
//   | {
//     value: 'error',
//     context: ApiContext & { error: string }
//   };
