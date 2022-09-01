/**
 * Generic types for the app
 */

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Extracts the optional property keys of a given object
 */
export type OptionalPropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T],
  undefined
>;

/**
 * Returns an object-like type with all the optional properties of the given type
 * requried, with undefined exluded (but not null)
 */
export type Optionals<T extends object> = {[key in OptionalPropertyOf<T>]: Exclude<T[key], undefined> }
