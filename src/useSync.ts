import { useContext } from 'react';
import { SyncContext } from './SyncContext';

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

interface SyncParams<T> {
  query: () => Promise<T>;
  key: string[];
}

export default function useSync<T>(params: SyncParams<T>): T {
  const cache = useContext(SyncContext);
  return getOrCreateFromCache(params.query, cache, params.key.join('-'));
}
