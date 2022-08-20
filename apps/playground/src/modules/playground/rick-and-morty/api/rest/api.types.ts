import { CharacterFilter, EpisodesFilter, LocationFilter } from '../types';
import { RMCharacter, RMEpisode, RMLocation } from '../types/rest.types';

export type Section = 'character' | 'location' | 'episode';

export type OneOrMore<T> = T | T[];
export type ID = OneOrMore<number | string>;
export type Options<S extends Section> = Query<S> & { id?: ID; };

/** intermediate type to select the appropriate query */
type Queries =
  | { for: 'character'; query: CharacterFilter }
  | { for: 'location'; query: LocationFilter }
  | { for: 'episode'; query: EpisodesFilter };

// export type Query<S extends Section> = Extract<Queries, { for: S }>['query'];
export type Query<S extends Section> =
  & { page?: number }
  & Extract<Queries, { for: S }> extends { query: infer Q } ? Q : never;

export type PaginationInfo = {
  pages: number;
  count: number;
  total: number;
  next: string | number | null; // rest url or page number w/ graphql
  prev: string | number | null; // rest url or page number w/ graphql
};

export type PaginatedResponse<T> = {
  info: PaginationInfo;
  results: T[];
};

export type PaginatedCharacters = PaginatedResponse<RMCharacter>;
export type PaginatedLocations = PaginatedResponse<RMLocation>;
export type PaginatedEpisodes = PaginatedResponse<RMEpisode>;
