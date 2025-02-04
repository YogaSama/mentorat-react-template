import React, { DependencyList, useContext, useMemo } from 'react';

const buildValue = (): Map<string, () => unknown> => new Map();

export const SyncContext = React.createContext(buildValue());

export function SyncProvider({ children }: React.PropsWithChildren) {
  const value = useMemo(buildValue, []);
  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
}

function getOrCreateFromCache<T>(
  asyncFn: () => Promise<T>,
  cache: Map<string, () => unknown>,
  key: string
) {
  if (!cache.has(key)) {
    const promise = asyncFn().then(
      (value) => cache.set(key, () => value),
      (error) =>
        cache.set(key, () => {
          throw error;
        })
    );

    cache.set(key, () => {
      throw promise;
    });
  }

  return cache.get(key)?.() as T;
}

export function useSync<T>(asyncFn: () => Promise<T>, deps: DependencyList): T {
  const cache = useContext(SyncContext);
  const key = deps.join(',');

  return getOrCreateFromCache(asyncFn, cache, key);
}
