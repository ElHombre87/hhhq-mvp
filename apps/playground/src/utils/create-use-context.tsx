import { createContext, useContext } from 'react';

/** create a react context and the use hook.
 * @returns Provider component and the accessor hook */
export function createUseContext<T>(defaultValue: T) {
  const Context = createContext<T>(defaultValue);

  function useContextConsumer(component?: string) {
    const ctx = useContext(Context);
    if (!ctx) {
      throw new Error(
        `${component} component was rendered outside of ${Context.displayName} component context`
      );
    }

    return ctx;
  }

  return [Context.Provider, useContextConsumer] as const;
}
