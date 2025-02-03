import { DependencyList, useEffect, useState } from 'react';

type Data<T> = T | null;
type Error = unknown;
type Loading = boolean;

interface AsyncResult<T> {
  data: Data<T>;
  error: Error;
  loading: Loading;
}

export default function useAsync<T>(
  asyncFn: (signal: AbortSignal) => Promise<T>,
  deps: DependencyList
): [Data<T>, Error, Loading] {
  const [result, setResult] = useState<AsyncResult<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const abortController = new AbortController();
    setResult({ data: null, error: null, loading: true });
    asyncFn(abortController.signal).then(
      (data) => setResult({ data, error: null, loading: false }),
      (error) => setResult({ data: null, error, loading: false })
    );

    return () => {
      abortController.abort();
    };
  }, deps);

  return [result.data, result.error, result.loading];
}
