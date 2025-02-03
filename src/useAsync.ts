import { useEffect, useState } from 'react';

interface AsyncOptions {
  resetOnLoad?: boolean;
}

export default function useAsync<T>(
  asyncFn: (signal: AbortSignal) => Promise<T>,
  options?: AsyncOptions
): [T | null, unknown, boolean] {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    if (options?.resetOnLoad) {
      setData(null);
      setError(null);
    }
    asyncFn(abortController.signal).then(
      (data) => {
        setData(data);
        setError(null);
        setLoading(false);
      },
      (error) => {
        if (!abortController.signal.aborted) {
          setData(null);
          setError(error);
          setLoading(false);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [asyncFn, options?.resetOnLoad]);

  return [data, error, loading];
}
