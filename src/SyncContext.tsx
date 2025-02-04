import React, { useContext, useMemo } from 'react';

function buildValue() {
  return new Map<string, () => unknown>();
}

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

  return cache.get(key)!() as T;
}

interface UseSyncParams<T> {
  key: string;
  query: () => Promise<T>;
}

export function useSync<T>(params: UseSyncParams<T>): T {
  const cache = useContext(SyncContext);
  return getOrCreateFromCache(params.query, cache, params.key);
}
