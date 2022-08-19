import { REST_URL } from '../../config';
import type { Query, Section, OneOrMore, Options } from './api.types';

const makeQueryString = <S extends Section>(query: Query<S>): string => (
   Object.entries(query as Record<string, any>)
    .reduce((acc, [key, value]) => `${acc}&${key}=${value}`, '')
    .slice(1)
);

const concatIds = (ids: OneOrMore<number | string>): string => (
  Array.isArray(ids) ? ids.join(',') : ids.toString()
);
/**
 * Create the REST API URL for the rick and morty API
 * @param section one of the sections in the API
 * @param options object with `{ id?: number | string, query?: Query }` with strongly typed for each section
 * @returns complete url to the API with the specified parameters
 */
// export function makeUrl<S extends TUrlSection>(section: S, id?: ID, query?: Query<S>): string {
export function makeUrl<S extends Section>(section: S, options?: Options<S>): string {
  const { id, ...query } = options ?? {};

  const BASE = `${REST_URL}/${section}`;
  if (!id && !query) { return BASE; }

  const i = id && concatIds(id);
  const q = query && `?${makeQueryString(query)}`;

  return `${BASE}${i ? `/${i}` : ''}${query ? q : ''}`;
}
