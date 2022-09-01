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
 export type Optionals<T extends object, K extends keyof T = OptionalPropertyOf<T>> = {
  [key in K]: Exclude<T[key], undefined>;
};


type A = {a: number, b?:string, c?:boolean}

type B = Optionals<A>
type C = WithOptional<Optionals<A>, 'b'>
