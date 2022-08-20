/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // restApi as api,
  client,
} from '../api';
import type { RMCharacter } from '../api';
import query from '../api/graphql/characters.query.graphql';
import type { Options, PaginatedResponse } from '../api/rest/api.types';

const wait = (time = 1000) => new Promise(resolve => { setTimeout(resolve, time); });

const parseResponse = async (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    const data = await response.json();
    /**
     * @dev properly parse
     * TODO: Properly parse the response
     */
    return {
      results: data?.results ?? [data],
      info: data?.info ?? { page: 1, count: 1, total: 1 },
    };
  }
  return Promise.reject(new Error(response.statusText));
};

// export async function getAllCharacters(options: Options<'character'> = {}): Promise<PaginatedResponse<RMCharacter>> {
//   // await wait(3500);
//   console.info('options', options);
//   console.info(api.url('character', options));
//   // const response = await api.get.character({ id, page, filter: { name: 'Rick' } });
//   const response = await api.get.character(options);
//   // const response = await api.get.character();
//   const data = await parseResponse(response);
//   console.info('response data', data);
//   return data;
// }

export async function getAllCharacters(options: Options<'character'> = {}): Promise<PaginatedResponse<RMCharacter>> {
  const response = await client.request(query, options);
  return response.characters;
}
