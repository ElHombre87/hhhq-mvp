import * as utils from './api.utils';
import { BASE_URL } from '../constants';

describe('Make URL', () => {
  it('should return a valid base URL', () => {
    const url = utils.makeUrl('character');
    expect(url).toBe(`${BASE_URL}/character`);
  });

  it('should return a valid URL with a single ID', () => {
    const url = utils.makeUrl('character', { id: 1 });
    expect(url).toBe(`${BASE_URL}/character/1`);
  });
  it('should return a valid URL with a single ID and query', () => {
    const url = utils.makeUrl('character', { id: 1, filter: { name: 'Rick' } });
    expect(url).toBe(`${BASE_URL}/character/1?name=Rick`);
  });
  it('should return a valid URL with a multiple IDs', () => {
    const url = utils.makeUrl('character', { id: [1, 2, 3] });
    expect(url).toBe(`${BASE_URL}/character/1,2,3`);
  });
  it('should return a valid URL with a multiple IDs and query', () => {
    const url = utils.makeUrl('character', { id: [1, 2, 3], filter: { status: 'alive' } });
    expect(url).toBe(`${BASE_URL}/character/1,2,3?status=alive`);
  });
});
