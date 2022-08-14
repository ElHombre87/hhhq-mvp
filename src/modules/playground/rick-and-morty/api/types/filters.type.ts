/**
 * Filters for both the REST API (query options) as well as GraphQL filters
 */
export type CharacterFilter = {
  name?: string
  species?: string;
  type?: string;
  status?: 'alive' | 'dead' | 'unknown';
  gender?: 'female' | 'male' | 'genderless' | 'unknown';
};

export type LocationFilter = {
  name?: string;
  type?: string;
  dimension?: string;
};
export type EpisodesFilter = {
  name?: string;
  episode?: string | number;
};
