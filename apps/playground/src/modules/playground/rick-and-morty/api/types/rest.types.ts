// export type CharacterGender = 'female' | 'male' | 'genderless' | 'unknown';
// export type CharacterStatus = 'alive' | 'dead' | 'unknown';

export type LocationRef = { name: string, url: string };

export type RMCharacter = {
  id: number;
  name: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'Unknown';
  status: 'Alive' | 'Dead' | 'Unknown';
  species: string;
  /** type of subspecies */
  type: string;
  image: string;
  /** character's origin location */
  origin: LocationRef;
  /** last known location */
  location: LocationRef;
  /** list of url for the episodes the character appears in */
  episode: string[];
  /** url to query for the character */
  url: string;
  /** character added */
  created: string;
};
export type RMLocation = {};
export type RMEpisode = {};
