import { makeUrl } from './api.utils';
import type { Section, Options } from './api.types';

export * from '../types/rest.types';

export {
  makeUrl,
};

export async function get<S extends Section>(type: S, options?: Options<S>) {
  const response = await fetch(makeUrl(type, options));
  return response; //.json();
}

get.character = (options?: Options<'character'>) => get('character', options);
get.location = (options?: Options<'location'>) => get('location', options);
get.episode = (options?: Options<'episode'>) => get('episode', options);

export default {
  get,
  url: makeUrl,
};
