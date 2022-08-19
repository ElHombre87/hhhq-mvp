/**
 * Generic types for the app
 */

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
